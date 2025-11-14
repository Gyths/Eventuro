import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // Preventive data cleanup
  await prisma.$executeRawUnsafe(`
    DO $$
    DECLARE
      t RECORD;
    BEGIN
      FOR t IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
      LOOP
        EXECUTE 'TRUNCATE TABLE public.' || quote_ident(t.tablename) || ' RESTART IDENTITY CASCADE;';
      END LOOP;
    END $$;
  `);

  //Insert users
  await prisma.user.createMany({
    data: [
      //Admin
      {
        name: "Eventuro",
        lastName: "Admin",
        email: "admin@eventuro.com",
        phone: "911829712",
        birthdate: new Date("1985-07-15"),
        gender: "F",
        status: "A",
      },
      //Organizer
      {
        name: "Kion",
        lastName: "Tester",
        email: "kion@gmail.com",
        phone: "912943712",
        birthdate: new Date("1980-06-23"),
        gender: "F",
        status: "A",
      },
      //Client
      {
        name: "Juan",
        lastName: "Perez",
        email: "juan.perez@example.com",
        phone: "987654321",
        birthdate: new Date("1990-01-01"),
        gender: "M",
        status: "A",
      },
      //Organizer
      {
        name: "María",
        lastName: "Gonzales",
        email: "maria.gonzales@example.com",
        phone: "987111222",
        birthdate: new Date("1988-05-12"),
        gender: "F",
        status: "A",
      },
      //Organizer
      {
        name: "Carlos",
        lastName: "Ramirez",
        email: "carlos.ramirez@example.com",
        phone: "987333444",
        birthdate: new Date("1992-09-20"),
        gender: "M",
        status: "A",
      },
      //Client (Minor)
      {
        name: "Andre",
        lastName: "Gomez",
        email: "minor.user@example.com",
        phone: "965923432",
        birthdate: new Date("2015-03-25"),
        gender: "M",
        status: "A",
      },
      //Client (Deleted)
      {
        name: "Pedro",
        lastName: "Hidalgo",
        email: "deleted.user@example.com",
        phone: "973482343",
        birthdate: new Date("2005-03-25"),
        gender: "M",
        status: "D",
      },
      //Client (Suspended)
      {
        name: "Gonzalo",
        lastName: "Garrido",
        email: "suspended.user@example.com",
        phone: "965923432",
        birthdate: new Date("2002-03-25"),
        gender: "M",
        status: "S",
      },
    ],
  });
  const adminHash = await bcrypt.hash("SuperAdmin!2025", 10);
  const org1Hash = await bcrypt.hash("123456", 10);
  const clientHash = await bcrypt.hash("123A5.", 12);
  const org2Hash = await bcrypt.hash("123A56.", 12);
  const org3Hash = await bcrypt.hash("123A57.", 12);
  const minorHash = await bcrypt.hash("123A5678.", 12);
  const deletedHash = await bcrypt.hash("123A56789.", 12);
  const suspendedHash = await bcrypt.hash("123A567890.", 12);

  await prisma.passwordUser.createMany({
    data: [
      {
        userId: 1,
        hashedPassword: adminHash,
      },
      {
        userId: 2,
        hashedPassword: org1Hash,
      },
      {
        userId: 3,
        hashedPassword: clientHash,
      },
      {
        userId: 4,
        hashedPassword: org2Hash,
      },
      {
        userId: 5,
        hashedPassword: org3Hash,
      },
      {
        userId: 6,
        hashedPassword: minorHash,
      },
      {
        userId: 7,
        hashedPassword: deletedHash,
      },
      {
        userId: 8,
        hashedPassword: suspendedHash,
      },
    ],
  });

  await prisma.administrator.create({
    data: { userId: 1 },
  });

  await prisma.organizer.createMany({
    data: [
      {
        userId: 2,
        companyName: "Eventos SAC",
        idType: "RUC",
        idNumber: "20512345678",
        status: "APPROVED",
      },
      {
        userId: 4,
        companyName: "Fiesta Eventos",
        idType: "RUC",
        idNumber: "20587654321",
        status: "APPROVED",
      },
      {
        userId: 5,
        companyName: "Eventos Lima",
        idType: "RUC",
        idNumber: "20598765432",
        status: "APPROVED",
      },
    ],
  });

  console.log('Usuarios creados correctamente');

  await prisma.eventCategory.createMany({
    data: [
      {
        initials: "MUS",
        description: "Música",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "DEP",
        description: "Deportes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "TEA",
        description: "Teatro",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "CUL",
        description: "Cultura",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "TEC",
        description: "Tecnología",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "GAS",
        description: "Gastronomía",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "EDU",
        description: "Educativo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "NEG",
        description: "Negocios",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "EXP",
        description: "Exposición",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        initials: "OTR",
        description: "Otros",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true, // evita errores si ya existen
  });

  console.log('Categorias creadas correctamente');

  const events = await prisma.event.createMany({
    data: [
      //Event 1
      {
        organizerId: 1,
        title: "Evento de Prueba 01",
        imagePrincipalKey: "events/1761677737608_Evento_prueba.png",
        imageBannerKey: "events/1761677738279_Evento_prueba_banner.png",
        inPerson: false,
        status: "A",
        description:
          "Evento virtual con 300 de capacidad y dos códigos de descuento",
        accessPolicy: "E",
        accessPolicyDescription: "Apto para todo público.",
        ticketLimitPerUser: 12,
      },
      //Event 2
      {
        organizerId: 2,
        title: "Evento de Prueba 02",
        imagePrincipalKey: "events/1761677737608_Evento_prueba.png",
        imageBannerKey: "events/1761677738279_Evento_prueba_banner.png",
        inPerson: true,
        status: "A",
        description:
          "Evento presencial con 500 de capacidad, segunda fase activa y descuentos.",
        accessPolicy: "E",
        accessPolicyDescription: "Apto para todo público.",
        ticketLimitPerUser: 10,
      },
      //Event 3
      {
        organizerId: 3,
        title: "Evento de Prueba 03",
        imagePrincipalKey: "events/1761677737608_Evento_prueba.png",
        imageBannerKey: "events/1761677738279_Evento_prueba_banner.png",
        inPerson: true,
        status: "A",
        description:
          "Evento presencial con poca capacidad restante en cada zona.",
        accessPolicy: "E",
        accessPolicyDescription: "Apto para todo público.",
        ticketLimitPerUser: 9,
      },
      //Event 4
      {
        organizerId: 2,
        title: "Evento de Prueba 04",
        imagePrincipalKey: "events/1761677737608_Evento_prueba.png",
        imageBannerKey: "events/1761677738279_Evento_prueba_banner.png",
        inPerson: true,
        status: "A",
        description: "Evento ya finalizado, no debería aparecer en listado.",
        accessPolicy: "E",
        accessPolicyDescription: "Apto para todo público.",
        ticketLimitPerUser: 15,
      },
    ],
  });

  const event1 = await prisma.event.findFirst({
    where: { title: "Evento de Prueba 01" },
  });
  const event2 = await prisma.event.findFirst({
    where: { title: "Evento de Prueba 02" },
  });
  const event3 = await prisma.event.findFirst({
    where: { title: "Evento de Prueba 03" },
  });
  const event4 = await prisma.event.findFirst({
    where: { title: "Evento de Prueba 04" },
  });

  await prisma.eventToCategory.createMany({
    data: [
      { eventId: event1.eventId, eventCategoryId: 3 },
      { eventId: event1.eventId, eventCategoryId: 4 },
      { eventId: event2.eventId, eventCategoryId: 1 },
      { eventId: event2.eventId, eventCategoryId: 4 },
      { eventId: event3.eventId, eventCategoryId: 1 },
      { eventId: event3.eventId, eventCategoryId: 4 },
      { eventId: event4.eventId, eventCategoryId: 1 },
      { eventId: event4.eventId, eventCategoryId: 4 },
    ],
  });

  await prisma.venue.createMany({
    data: [
      { eventId: event1.eventId, capacity: 300 },
      {
        eventId: event2.eventId,
        city: "Lima",
        address: "Av. Universitaria 1801, San Miguel 15088",
        capacity: 500,
      },
      {
        eventId: event3.eventId,
        city: "Lima",
        address: "Av. Universitaria 1801, San Miguel 15088",
        capacity: 600,
      },
      {
        eventId: event4.eventId,
        city: "Lima",
        address: "Av. Universitaria 1801, San Miguel 15088",
        capacity: 600,
      },
    ],
  });

  const addDays = (d) => new Date(Date.now() + d * 1000 * 60 * 60 * 24);

  await prisma.eventSalesPhase.createMany({
    data: [
      // Evento 1
      {
        eventId: event1.eventId,
        name: "Preventa",
        startAt: new Date(),
        endAt: addDays(7),
        ticketLimit: 100,
        percentage: 10,
        active: true,
      },
      {
        eventId: event1.eventId,
        name: "General",
        startAt: addDays(7),
        endAt: addDays(14),
        ticketLimit: 200,
        percentage: 0,
        active: false,
      },
      // Evento 2
      {
        eventId: event2.eventId,
        name: "Preventa",
        startAt: addDays(-14),
        endAt: addDays(-7),
        ticketLimit: 150,
        percentage: 10,
        active: false,
      },
      {
        eventId: event2.eventId,
        name: "General",
        startAt: new Date(),
        endAt: addDays(7),
        ticketLimit: 350,
        percentage: 0,
        active: true,
      },
      // Evento 3
      {
        eventId: event3.eventId,
        name: "General",
        startAt: new Date(),
        endAt: addDays(7),
        ticketLimit: 600,
        percentage: 0,
        active: true,
      },
    ],
  });

  await prisma.discount.createMany({
    data: [
      {
        eventId: event1.eventId,
        scope: "EVENT",
        code: "ABCDEF",
        percentage: 15,
        stackable: true,
        startAt: new Date(),
        endAt: addDays(30),
        status: "A",
        availableQty: 10,
        appliesTo: "Experiencia VIP",
      },
      {
        eventId: event1.eventId,
        scope: "EVENT",
        code: "ABCDEFG",
        percentage: 25,
        stackable: true,
        startAt: new Date(),
        endAt: addDays(30),
        status: "A",
        availableQty: 10,
        appliesTo: "Experiencia General",
      },
      {
        eventId: event2.eventId,
        scope: "EVENT",
        code: "12345",
        percentage: 45,
        stackable: true,
        startAt: new Date(),
        endAt: addDays(30),
        status: "A",
        availableQty: 5,
        appliesTo: "Zona VIP",
      },
      {
        eventId: event2.eventId,
        scope: "EVENT",
        code: "123456",
        percentage: 10,
        stackable: true,
        startAt: new Date(),
        endAt: addDays(30),
        status: "A",
        availableQty: 20,
        appliesTo: "Zona VIP",
      },
    ],
  });

  //Dates
  const eventDates = await prisma.eventDate.createMany({
    data: [
      //Event 1
      {
        eventId: event1.eventId,
        startAt: new Date("2025-12-05T20:00:00Z"),
        endAt: new Date("2025-12-06T01:00:00Z"),
      },
      {
        eventId: event1.eventId,
        startAt: new Date("2025-12-06T20:00:00Z"),
        endAt: new Date("2025-12-07T01:00:00Z"),
      },
      {
        eventId: event1.eventId,
        startAt: new Date("2025-12-08T20:00:00Z"),
        endAt: new Date("2025-12-09T01:00:00Z"),
      },
      //Event 2
      {
        eventId: event2.eventId,
        startAt: new Date("2025-12-20T14:00:00Z"),
        endAt: new Date("2025-12-21T16:00:00Z"),
      },
      {
        eventId: event2.eventId,
        startAt: new Date("2025-12-20T18:00:00Z"),
        endAt: new Date("2025-12-21T20:00:00Z"),
      },
      // Event 3
      {
        eventId: event3.eventId,
        startAt: new Date("2025-12-15T15:00:00Z"),
        endAt: new Date("2025-12-15T20:00:00Z"),
      },
      {
        eventId: event3.eventId,
        startAt: new Date("2025-12-16T15:00:00Z"),
        endAt: new Date("2025-12-16T20:00:00Z"),
      },
      // Event 4
      {
        eventId: event4.eventId,
        startAt: new Date("2025-10-17T15:00:00Z"),
        endAt: new Date("2025-10-17T20:00:00Z"),
      },
    ],
  });

  const event1Date = await prisma.eventDate.findMany({
    where: { eventId: event1.eventId },
  });
  const event2Date = await prisma.eventDate.findMany({
    where: { eventId: event2.eventId },
  });
  const event3Date = await prisma.eventDate.findMany({
    where: { eventId: event3.eventId },
  });
  const event4Date = await prisma.eventDate.findMany({
    where: { eventId: event4.eventId },
  });

  await prisma.eventDateZone.createMany({
    data: [
      // Event 1
      // Date 1
      {
        eventDateId: event1Date[0].eventDateId,
        name: "Experiencia VIP",
        kind: "GENERAL",
        basePrice: 100,
        capacity: 100,
        capacityRemaining: 100,
        quantityTicketsReleased: 100,
        currency: "PEN",
      },
      {
        eventDateId: event1Date[0].eventDateId,
        name: "Experiencia General",
        kind: "GENERAL",
        basePrice: 50,
        capacity: 200,
        capacityRemaining: 200,
        quantityTicketsReleased: 100,
        currency: "PEN",
      },
      // Date 2
      {
        eventDateId: event1Date[1].eventDateId,
        name: "Experiencia VIP",
        kind: "GENERAL",
        basePrice: 100,
        capacity: 100,
        capacityRemaining: 100,
        quantityTicketsReleased: 100,
        currency: "PEN",
      },
      {
        eventDateId: event1Date[1].eventDateId,
        name: "Experiencia General",
        kind: "GENERAL",
        basePrice: 50,
        capacity: 200,
        capacityRemaining: 200,
        quantityTicketsReleased: 200,
        currency: "PEN",
      },
      // Date 3
      {
        eventDateId: event1Date[2].eventDateId,
        name: "Experiencia VIP",
        kind: "GENERAL",
        basePrice: 100,
        capacity: 100,
        capacityRemaining: 100,
        quantityTicketsReleased: 100,
        currency: "PEN",
      },
      {
        eventDateId: event1Date[2].eventDateId,
        name: "Experiencia General",
        kind: "GENERAL",
        basePrice: 50,
        capacity: 200,
        capacityRemaining: 200,
        quantityTicketsReleased: 200,
        currency: "PEN",
      },
      // Event 2
      //Date 1
      {
        eventDateId: event2Date[0].eventDateId,
        name: "Zona VIP",
        kind: "GENERAL",
        basePrice: 350,
        capacity: 200,
        capacityRemaining: 200,
        quantityTicketsReleased: 200,
        currency: "PEN",
      },
      {
        eventDateId: event2Date[0].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 300,
        quantityTicketsReleased: 300,
        currency: "PEN",
      },
      //Date 2
      {
        eventDateId: event2Date[1].eventDateId,
        name: "Zona VIP",
        kind: "GENERAL",
        basePrice: 350,
        capacity: 200,
        capacityRemaining: 200,
        quantityTicketsReleased: 200,
        currency: "PEN",
      },
      {
        eventDateId: event2Date[1].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 300,
        quantityTicketsReleased: 300,
        currency: "PEN",
      },
      // Event 3
      //Date 1
      {
        eventDateId: event3Date[0].eventDateId,
        name: "Zona VIP",
        kind: "GENERAL",
        basePrice: 350,
        capacity: 200,
        capacityRemaining: 8,
        quantityTicketsReleased: 200,
        currency: "PEN",
      },
      {
        eventDateId: event3Date[0].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 6,
        quantityTicketsReleased: 300,
        currency: "PEN",
      },
      {
        eventDateId: event3Date[0].eventDateId,
        name: "Zona Preferencial",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 100,
        capacityRemaining: 5,
        quantityTicketsReleased: 100,
        currency: "PEN",
      },
      //Date 2
      {
        eventDateId: event3Date[1].eventDateId,
        name: "Zona VIP",
        kind: "GENERAL",
        basePrice: 350,
        capacity: 200,
        capacityRemaining: 8,
        quantityTicketsReleased: 200,
        currency: "PEN",
      },
      {
        eventDateId: event3Date[1].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 6,
        quantityTicketsReleased: 300,
        currency: "PEN",
      },
      {
        eventDateId: event3Date[1].eventDateId,
        name: "Zona Preferencial",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 100,
        capacityRemaining: 5,
        quantityTicketsReleased: 100,
        currency: "PEN",
      },
      // Event 4
      {
        eventDateId: event4Date[0].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 600,
        capacityRemaining: 5,
        quantityTicketsReleased: 600,
        currency: "PEN",
      },
    ],
  });
  
  const zones = await prisma.eventDateZone.findMany();

  await prisma.eventDateZoneAllocation.createMany({
    data: zones.flatMap((z) => [
      {
        eventDateZoneId: z.eventDateZoneId,
        audienceName: "Niños",
        discountType: "PERCENTAGE",
        discountValue: 20,
      },
      {
        eventDateZoneId: z.eventDateZoneId,
        audienceName: "Adultos",
        discountType: "PERCENTAGE",
        discountValue: 0,
      },
    ]),
  });

  console.log('Eventos creados correctamente');

  //Vista para graficos
  await prisma.$executeRawUnsafe(`
  -- Vista: 1 fila = 1 ticket (precio final ya aplicado)
  CREATE OR REPLACE VIEW public."ReportSaleTicket" AS
  SELECT
    -- Identificadores
    t."ticketId"                                   AS "ticketId",
    oi."orderItemId"                               AS "orderItemId",
    o."orderId"                                    AS "orderId",

    -- Fechas / estados
    t."issuedAt"                                   AS "issuedAt",
    o."createdAt"                                  AS "orderCreatedAt",
    o."status"                                     AS "orderStatus",
    t."status"                                     AS "ticketStatus",
    t."refundStatus"                               AS "refundStatus",

    -- Relación organizador / evento
    e."eventId"                                    AS "eventId",
    e."title"                                      AS "eventTitle",
    e."inPerson"									 AS "inPerson",	
    org."organizerId"                              AS "organizerId",
    org."companyName"                              AS "organizerCompany",

    -- Función / zona / asiento
    t."eventDateId"                                AS "eventDateId",
    d."startAt"                                    AS "eventStartAt",
    t."eventDateZoneId"                            AS "eventDateZoneId",
    z."name"                                       AS "zoneName",
    a."eventDateZoneAllocationId"					 AS "eventDateZoneAllocationId",
    a."audienceName"								 AS "allocationName",	
    t."seatId"                                     AS "seatId",
    
    -- Moneda y montos
    t."currency"                                   AS "currency",
    t."pricePaid"::numeric                         AS "pricePaid",          -- precio final por ticket
    COALESCE(f."percentage", 0)::numeric           AS "feePercentage",      -- % comisión plataforma (0..100)
    ROUND((t."pricePaid"::numeric * COALESCE(f."percentage",0)::numeric) / 100, 2)
                                                    AS "platformCommissionAmount",
    -- Neto para organizador (sin impuestos/fees del procesador porque no existen en el modelo)
    ROUND(t."pricePaid"::numeric
          - ((t."pricePaid"::numeric * COALESCE(f."percentage",0)::numeric) / 100), 2)
                                                    AS "netForOrganizer"

  FROM public."Ticket" t
  JOIN public."OrderItem"    oi  ON oi."orderItemId"     = t."orderItemId"
  JOIN public."Order"        o   ON o."orderId"          = oi."orderId"
  JOIN public."Event"        e   ON e."eventId"          = t."eventId"
  LEFT JOIN public."Fee"     f   ON f."feeId"            = e."feeId"
  LEFT JOIN public."Organizer" org ON org."organizerId"  = e."organizerId"
  LEFT JOIN public."EventDate" d  ON d."eventDateId"     = t."eventDateId"
  LEFT JOIN public."EventDateZone" z ON z."eventDateZoneId" = t."eventDateZoneId"
  LEFT JOIN public."EventDateZoneAllocation" a ON a."eventDateZoneAllocationId" = t."eventDateZoneAllocationId"; 
  `);

  console.log('Vista ReportSaleTicket creada correctamente');


  //Triggers Auditoria
	await prisma.$executeRawUnsafe(`
		CREATE SCHEMA IF NOT EXISTS app;
	`);

	await prisma.$executeRawUnsafe(`
		DO $$ BEGIN
		  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'audit_operation_type') THEN
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

  console.log('Triggers de auditoria creados correctamente');
}

main().finally(() => prisma.$disconnect());
