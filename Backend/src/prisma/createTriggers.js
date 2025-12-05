export default async function createTriggers(prisma) {
  //Triggers Auditoria
  await prisma.$executeRawUnsafe(`
		CREATE SCHEMA IF NOT EXISTS app;
	`);

  await prisma.$executeRawUnsafe(`
		DO $$ BEGIN
		  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'auditOperationType') THEN
			CREATE TYPE app."auditOperationType" AS ENUM ('INSERT','UPDATE','DELETE');
		  END IF;
		END $$;
	`);

  await prisma.$executeRawUnsafe(`
		-- CABECERA: 1 fila por operación
		CREATE TABLE IF NOT EXISTS app."AuditTransaction" (
		  "auditTransactionId"   BIGSERIAL PRIMARY KEY,
		  "targetTableName"      TEXT NOT NULL,                 -- nombre de la tabla afectada
		  "operationType"        app."auditOperationType" NOT NULL,
		  "primaryKeyJson"       JSONB,                         -- {"eventId": 123}, etc.
		  "actorUserId"          BIGINT,                        -- de current_setting('app.userId', true)
		  "actorIpAddress"       TEXT,
		  "createdAt"            TIMESTAMPTZ NOT NULL DEFAULT now()
		);
	`);

  await prisma.$executeRawUnsafe(`
		CREATE INDEX IF NOT EXISTS "ix_auditTransaction_createdAt"
		  ON app."AuditTransaction" ("createdAt" DESC);
	`);

  await prisma.$executeRawUnsafe(`
		CREATE INDEX IF NOT EXISTS "ix_auditTransaction_table_op"
		  ON app."AuditTransaction" ("targetTableName", "operationType");
	`);

  await prisma.$executeRawUnsafe(`
		-- DETALLE: 1 fila por columna afectada
		CREATE TABLE IF NOT EXISTS app."AuditChange" (
		  "auditChangeId"        BIGSERIAL PRIMARY KEY,
		  "auditTransactionId"   BIGINT NOT NULL REFERENCES app."AuditTransaction"("auditTransactionId") ON DELETE CASCADE,
		  "columnName"           TEXT   NOT NULL,
		  "oldValueJson"         JSONB,                         -- NULL en INSERT
		  "newValueJson"         JSONB,                         -- NULL en DELETE
		  "isChanged"            BOOLEAN GENERATED ALWAYS AS (
			("oldValueJson" IS DISTINCT FROM "newValueJson")
		  ) STORED
		);
	`);

  await prisma.$executeRawUnsafe(`
		CREATE INDEX IF NOT EXISTS "ix_auditChange_auditTransactionId"
		  ON app."AuditChange" ("auditTransactionId");
	`);

  await prisma.$executeRawUnsafe(`
		CREATE INDEX IF NOT EXISTS "ix_auditChange_columnName"
		  ON app."AuditChange" ("columnName");
	`);

  await prisma.$executeRawUnsafe(`
		-- FUNCION GENERICA PARA AUDITORIA
		CREATE OR REPLACE FUNCTION app."tgAuditRow"() RETURNS TRIGGER AS $$
		DECLARE
		  vPkColumnName  TEXT := TG_ARGV[0];     -- nombre de la PK de la tabla (ej: eventId)
		  vBefore        JSONB;
		  vAfter         JSONB;
		  vTxId          BIGINT;
		  vPkJson        JSONB;
		  vIgnoreColumns TEXT[] := ARRAY['updatedAt']; -- agrega 'password', 'imagePrincipalKey', etc.
		BEGIN
		  IF TG_OP = 'INSERT' THEN
			vAfter := to_jsonb(NEW);
		  ELSIF TG_OP = 'DELETE' THEN
			vBefore := to_jsonb(OLD);
		  ELSE
			vBefore := to_jsonb(OLD);
			vAfter  := to_jsonb(NEW);
		  END IF;

		  -- Construir {"<pk>": <valor>}
		  vPkJson := COALESCE(to_jsonb(NEW)->vPkColumnName, to_jsonb(OLD)->vPkColumnName);
		  IF vPkJson IS NOT NULL THEN
			vPkJson := jsonb_build_object(vPkColumnName, vPkJson);
		  END IF;

		  -- Insertar CABECERA
		  INSERT INTO app."AuditTransaction" (
			"targetTableName", "operationType", "primaryKeyJson", "actorUserId", "actorIpAddress"
		  )
		  VALUES (
			TG_TABLE_NAME,
			TG_OP::app."auditOperationType",
			vPkJson,
			NULLIF(current_setting('app.userId', true), '')::BIGINT,
			inet_client_addr()::TEXT
		  )
		  RETURNING "auditTransactionId" INTO vTxId;

		  -- Insertar DETALLES por columna
		  IF TG_OP = 'INSERT' THEN
			INSERT INTO app."AuditChange" ("auditTransactionId", "columnName", "oldValueJson", "newValueJson")
			SELECT vTxId, n.key, NULL, n.value
			FROM jsonb_each(vAfter) AS n(key, value)
			WHERE NOT (n.key = ANY(vIgnoreColumns));

		  ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO app."AuditChange" ("auditTransactionId", "columnName", "oldValueJson", "newValueJson")
			SELECT vTxId, o.key, o.value, NULL
			FROM jsonb_each(vBefore) AS o(key, value)
			WHERE NOT (o.key = ANY(vIgnoreColumns));

		  ELSE  -- UPDATE
			INSERT INTO app."AuditChange" ("auditTransactionId", "columnName", "oldValueJson", "newValueJson")
			SELECT vTxId, n.key, o.value, n.value
			FROM jsonb_each(vAfter) AS n(key, value)
			JOIN jsonb_each(vBefore) AS o USING (key)
			WHERE n.value IS DISTINCT FROM o.value
			  AND NOT (n.key = ANY(vIgnoreColumns));
		  END IF;

		  IF TG_OP = 'DELETE' THEN
			RETURN OLD;
		  ELSE
			RETURN NEW;
		  END IF;
		END;
		$$ LANGUAGE plpgsql SECURITY DEFINER;
	`);

  // TRIGGER PARA CATEGORIAS
  await prisma.$executeRawUnsafe(`
  DROP TRIGGER IF EXISTS "trAuditEventCategory" ON "EventCategory";
`);
  await prisma.$executeRawUnsafe(`
  CREATE TRIGGER "trAuditEventCategory"
  AFTER INSERT OR UPDATE OR DELETE ON "EventCategory"
  FOR EACH ROW EXECUTE FUNCTION app."tgAuditRow"('eventCategoryId');
`);

  // TRIGGER PARA EVENTOS
  await prisma.$executeRawUnsafe(`
  DROP TRIGGER IF EXISTS "trAuditEvent" ON "Event";
`);
  await prisma.$executeRawUnsafe(`
  CREATE TRIGGER "trAuditEvent"
  AFTER INSERT OR UPDATE OR DELETE ON "Event"
  FOR EACH ROW EXECUTE FUNCTION app."tgAuditRow"('eventId');
`);

  // TRIGGER PARA USUARIOS
  await prisma.$executeRawUnsafe(`
  DROP TRIGGER IF EXISTS "trAuditUser" ON "User";
`);
  await prisma.$executeRawUnsafe(`
  CREATE TRIGGER "trAuditUser"
  AFTER INSERT OR UPDATE OR DELETE ON "User"
  FOR EACH ROW EXECUTE FUNCTION app."tgAuditRow"('userId');
`);

  // COMO LA FUNCION ES GENERICA SE PUEDE ADAPTAR A PARA CADA TABLA QUE SE QUIERA AUDITAR.
  // NO OLVIDAR EN BACK USAR LOS MIDDLEWARES VERIFY TOKEN Y ATTACHUSERCONTEXT PARA OBTENER EL USER ID DE QUIEN REALIZO EL CAMBIO
  // Y USAR LA FUNCION WITHAUDIT UBICADA EN /BACKEND/SRC/UTILS PARA GUARDAR EL USER ID EN BD.

  console.log("Triggers de auditoria creados correctamente");
}
