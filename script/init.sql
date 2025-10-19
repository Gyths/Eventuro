BEGIN;

-- 1) Limpieza total (borra datos y reinicia secuencias)
TRUNCATE TABLE
  "EventDateZoneAllocation",
  "EventDateZone",
  "EventSalesPhase",
  "EventToCategory",
  "Venue",
  "EventDate",
  "Seat",             -- si existe en tu esquema
  "SeatMap",
  "EventCategory",
  "Event",
  "Organizer",
  "PasswordUser",
  "User"
RESTART IDENTITY CASCADE;

-- 2) Usuarios base + credenciales + organizadores
-- Usuario 1
WITH u AS (
  INSERT INTO "User" (name, "lastName", email, phone, birthdate, gender, status, "createdAt", "updatedAt")
  VALUES ('Juan', 'Perez', 'juan.perez@example.com', '987654321', '1990-01-01', 'M', 'A', NOW(), NOW())
  RETURNING "userId"
), pw AS (
  INSERT INTO "PasswordUser" ("userId", "hashedPassword")
  SELECT "userId", 'hashed_password_demo' FROM u
  RETURNING "userId"
)
INSERT INTO "Organizer" ("userId", "companyName", "idType", "idNumber")
SELECT "userId", 'Eventos SAC', 'RUC', '20512345678' FROM u;

-- Usuario 2
WITH u AS (
  INSERT INTO "User" (name, "lastName", email, phone, birthdate, gender, status, "createdAt", "updatedAt")
  VALUES ('María', 'Gonzales', 'maria.gonzales@example.com', '987111222', '1988-05-12', 'F', 'A', NOW(), NOW())
  RETURNING "userId"
), pw AS (
  INSERT INTO "PasswordUser" ("userId", "hashedPassword")
  SELECT "userId", 'hashed_password_demo' FROM u
  RETURNING "userId"
)
INSERT INTO "Organizer" ("userId", "companyName", "idType", "idNumber")
SELECT "userId", 'Fiesta Eventos', 'RUC', '20587654321' FROM u;

-- Usuario 3
WITH u AS (
  INSERT INTO "User" (name, "lastName", email, phone, birthdate, gender, status, "createdAt", "updatedAt")
  VALUES ('Carlos', 'Ramirez', 'carlos.ramirez@example.com', '987333444', '1992-09-20', 'M', 'A', NOW(), NOW())
  RETURNING "userId"
), pw AS (
  INSERT INTO "PasswordUser" ("userId", "hashedPassword")
  SELECT "userId", 'hashed_password_demo' FROM u
  RETURNING "userId"
)
INSERT INTO "Organizer" ("userId", "companyName", "idType", "idNumber")
SELECT "userId", 'Eventos Lima', 'RUC', '20598765432' FROM u;

-- 3) Categorías de evento
INSERT INTO "EventCategory" ("eventCategoryId", "initials", "description", "createdAt", "updatedAt") VALUES
(1, 'MUS', 'Música',  NOW(), NOW()),
(2, 'DEP', 'Deportes', NOW(), NOW()),
(3, 'TEA', 'Teatro',  NOW(), NOW());

-- 4) Evento principal (organizerId = 1 tras el TRUNCATE+RESTART)
WITH ev AS (
  INSERT INTO "Event" (
    "organizerId", "title", "status", "inPerson", "description",
    "accessPolicy", "accessPolicyDescription",
    "createdAt", "updatedAt"
  )
  VALUES (
    1,
    'Concierto de Rock en Lima',
    'P',                            -- Pending
    TRUE,
    'Un evento en vivo con bandas nacionales e internacionales.',
    'AO',
    'Solo mayores de 18 años con documento de identidad válido.',
    NOW(), NOW()
  )
  RETURNING "eventId"
),
-- 5) Venue del evento
vn AS (
  INSERT INTO "Venue" ("eventId", "city", "address", "addressUrl", "reference", "capacity", "createdAt", "updatedAt")
  SELECT "eventId",
         'Lima',
         'Av. Universitaria 1801, San Miguel 15088',
         'https://maps.app.goo.gl/mdCVvAdXAeprNYQo7',
         'Universidad de rojos',
         2000,
         NOW(), NOW()
  FROM ev
  RETURNING "venueId"
)
-- 6) Relación evento-categorías
INSERT INTO "EventToCategory" ("eventId", "eventCategoryId", "createdAt", "updatedAt")
SELECT (SELECT "eventId" FROM ev), ec_id, NOW(), NOW()
FROM (VALUES (1),(2),(3)) AS ec(ec_id);

-- 7) Fases de venta
WITH ev AS (SELECT "eventId" FROM "Event" WHERE "title" = 'Concierto de Rock en Lima' LIMIT 1)
INSERT INTO "EventSalesPhase" ("eventId","name","startAt","endAt","percentage","active","createdAt","updatedAt")
SELECT "eventId", 'Preventa', NOW(), NOW(), 10.00, FALSE, NOW(), NOW() FROM ev
UNION ALL
SELECT "eventId", 'General',  NOW(), NOW(),  0.00, FALSE, NOW(), NOW() FROM ev;

WITH ev AS (SELECT "eventId" FROM "Event" WHERE "title" = 'Concierto de Rock en Lima' LIMIT 1)
INSERT INTO "EventDate" ("eventId","startAt","endAt")
SELECT "eventId", NOW(), NOW() FROM ev;

WITH ev AS (SELECT "eventId" FROM "Event" WHERE "title" = 'Concierto de Rock en Lima' LIMIT 1)
INSERT INTO "EventDate" ("eventId","startAt","endAt")
SELECT "eventId", NOW(), NOW() FROM ev;


-- Identificar las dos fechas (menor id = primera fecha)
WITH ed AS (
  SELECT "eventDateId"
  FROM "EventDate"
  WHERE "eventId" = (SELECT "eventId" FROM "Event" WHERE "title" = 'Concierto de Rock en Lima' LIMIT 1)
  ORDER BY "eventDateId" ASC
),
ed_pair AS (
  SELECT MIN("eventDateId") AS ed1, MAX("eventDateId") AS ed2 FROM ed
),
-- 9) Crear dos SeatMap en CTEs separados
sm1 AS (
  INSERT INTO "SeatMap" ("rows","cols","createdAt","updatedAt")
  VALUES (12,10, NOW(), NOW())
  RETURNING "seatMapId"
),
sm2 AS (
  INSERT INTO "SeatMap" ("rows","cols","createdAt","updatedAt")
  VALUES (12,10, NOW(), NOW())
  RETURNING "seatMapId"
),
-- 10) Zonas SEATED (una por fecha, cada una con su propio seatMap)
z_seated AS (
  INSERT INTO "EventDateZone" (
    "eventDateId", "name", "kind", "basePrice", "capacity", "capacityRemaining",
    "seatMapId", "currency", "createdAt", "updatedAt"
  )
  SELECT ed1, 'Platea Numerada', 'SEATED', 300.00, 120, 120, (SELECT "seatMapId" FROM sm1), 'PEN', NOW(), NOW()
  FROM ed_pair
  RETURNING "eventDateZoneId"
),
z_seated_2 AS (
  INSERT INTO "EventDateZone" (
    "eventDateId", "name", "kind", "basePrice", "capacity", "capacityRemaining",
    "seatMapId", "currency", "createdAt", "updatedAt"
  )
  SELECT ed2, 'Platea Numerada', 'SEATED', 300.00, 120, 120, (SELECT "seatMapId" FROM sm2), 'PEN', NOW(), NOW()
  FROM ed_pair
  RETURNING "eventDateZoneId"
)
-- 11) Asignaciones de audiencia para SEATED
INSERT INTO "EventDateZoneAllocation" ("eventDateZoneId", "audienceName", "discountPercent", "allocatedQuantity", "remainingQuantity", "createdAt", "updatedAt")
SELECT z."eventDateZoneId", a.name, a.disc, a.qty, a.qty, NOW(), NOW()
FROM (
  SELECT ' +65'::text AS name, 15.00::numeric AS disc, 15::int AS qty
  UNION ALL
  SELECT 'Menores de edad', 10.00, 50
) a
CROSS JOIN (
  SELECT "eventDateZoneId" FROM z_seated
  UNION ALL
  SELECT "eventDateZoneId" FROM z_seated_2
) z;

-- 12) Zonas GENERAL (sin seatMapId)
WITH ed_pair AS (
  SELECT MIN("eventDateId") AS ed1, MAX("eventDateId") AS ed2
  FROM "EventDate"
  WHERE "eventId" = (SELECT "eventId" FROM "Event" WHERE "title" = 'Concierto de Rock en Lima' LIMIT 1)
),
z_general AS (
  INSERT INTO "EventDateZone" (
    "eventDateId","name","kind","basePrice","capacity","capacityRemaining",
    "currency","createdAt","updatedAt"
  )
  SELECT ed1, 'General', 'GENERAL'::"ZONE_KIND", 200.00, 1000, 1000,
         'PEN'::"CURRENCY", NOW(), NOW() FROM ed_pair
  UNION ALL
  SELECT ed2, 'General', 'GENERAL'::"ZONE_KIND", 200.00, 1000, 1000,
         'PEN'::"CURRENCY", NOW(), NOW() FROM ed_pair
  RETURNING "eventDateZoneId"
)
INSERT INTO "EventDateZoneAllocation" ("eventDateZoneId","audienceName","discountPercent","allocatedQuantity","remainingQuantity","createdAt","updatedAt")
SELECT z."eventDateZoneId", 'CONADIS', 17.00, 400, 400, NOW(), NOW()
FROM z_general z;


COMMIT;

