DO
$$
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
END;
$$;

INSERT INTO "User" 
("name", "lastName", "email", "phone", "birthdate", "gender", "status", "createdAt", "updatedAt")
VALUES 
('Juan', 'Perez', 'juan.perez@example.com', '987654321', '1990-01-01', 'M', 'A', NOW(), NOW()), -- Cliente
('María', 'Gonzales', 'maria.gonzales@example.com', '987111222', '1988-05-12', 'F', 'A', NOW(), NOW()),	-- Organizador
('Carlos', 'Ramirez', 'carlos.ramirez@example.com', '987333444', '1992-09-20', 'M', 'A', NOW(), NOW()), -- Organizador
('Andre', 'Gomez', 'minor.user@example.com', '965923432', '2015-03-25', 'M', 'A', NOW(), NOW()), -- Cliente (Menor de edad)
('Pedro', 'Hidalgo', 'deleted.user@example.com', '973482343', '2015-03-25', 'M', 'D', NOW(), NOW()), -- Cliente (Usuario Borrado)
('Gonzalo', 'Garrido', 'suspended.user@example.com', '965923432', '2015-03-25', 'M', 'S', NOW(), NOW()); -- Cliente (Usuario Suspendido)

INSERT INTO "PasswordUser" ("userId", "hashedPassword")
VALUES 
(1, '$2a$12$hjlg3N19qPQZSIgUCvog/uUTmaZEQ3ZGaGK1JizorNWvw/FoPFz1W'), -- 123A5.
(2, '$2a$12$irmg/H4k5x.2n3CeqrCV2.yfP5Y/AEZo4JNrAMnqXUY620JUD8AcC'), -- 123A56.
(3, '$2a$12$m2bdXXIbZCznvJFUdLU87.HkNpKre/3NOms.ob1tCJP/lpoqkVvyi'), -- 123A567.
(4, '$2a$12$ct4csHLT3cuSpd6fQvKWTeQjMcvycHkoFLUj/HcfwAPpskwoWaOQq'), -- 123A5678.
(5, '$2a$12$pimbw58AGrkzXbDp9GCg0eCiH3IW8uOdClIJ2DFRy3DDa/QybaW6a'), -- 123A56789.
(6, '$2a$12$aTDY2VAptkwoYYJP0vIYgeJuqakKeDBm2S9RZtLj6CRm9ltBAoj2K'); -- 123A567890.

INSERT INTO "Organizer" ("userId", "companyName", "idType", "idNumber")
VALUES
(2, 'Fiesta Eventos', 'RUC', '20587654321'),
(3, 'Eventos Lima', 'RUC', '20598765432');

INSERT INTO "EventCategory" ("eventCategoryId", "initials", "description", "createdAt", "updatedAt") VALUES
(1, 'MUS', 'Música', now(), now()),
(2, 'DEP', 'Deportes', now(), now()),
(3, 'TEA', 'Teatro', now(), now()),
(4, 'CUL', 'Cultura', now(), now()),
(5, 'TEC', 'Tecnología', now(), now()),
(6, 'GAS', 'Gastronomía', now(), now()),
(7, 'EDU', 'Educativo', now(), now()),
(8, 'NEG', 'Negocios', now(), now()),
(9, 'EXP', 'Exposición', now(), now());

INSERT INTO "Event" (
  "organizerId", "title", "status", "inPerson", "description",
  "accessPolicy", "accessPolicyDescription",
  "createdAt", "updatedAt"
)
VALUES
-- 1
(1, 
 'Concierto Sinfónico PUCP 2025', 
 'A', 
 TRUE, 
 'Una noche mágica con la Orquesta Sinfónica de la PUCP interpretando clásicos del rock y la música peruana.', 
 'E', 
 'Apto para todo público.', 
 NOW(), NOW()),

-- 2
(1, 
 'Seminario de Ciberseguridad y Prevención de Fraudes', 
 'A', 
 FALSE, 
 'Encuentro con expertos en seguridad digital para empresas de ticketing y comercio electrónico.', 
 'AO', 
 'Solo mayores de 18 años por el nivel técnico del contenido.', 
 NOW(), NOW()),

-- 3
(1, 
 'Festival Gastronómico del Sur', 
 'P',  -- Pending
 TRUE, 
 'Evento culinario que reúne a los mejores chefs de Arequipa, Cusco y Puno. Música en vivo y degustaciones.', 
 'E', 
 'Apto para todo público. Niños menores de 12 años entran gratis.', 
 NOW(), NOW()),

-- 4
(2, 
 'Obra de Teatro: El Último Ensayo', 
 'A', 
 TRUE, 
 'Una comedia dramática sobre los desafíos de un grupo de actores que buscan el éxito.', 
 'T', 
 'Recomendado para mayores de 14 años con compañía adulta.', 
 NOW(), NOW()),

-- 5
(2, 
 'Expo Tecnología Lima 2025', 
 'A', 
 TRUE, 
 'La feria más grande del país dedicada a la innovación, startups y realidad aumentada.', 
 'E', 
 'Apto para todo público. Menores acompañados de un adulto.', 
 NOW(), NOW());


INSERT INTO "Venue" (
  "eventId", "city", "address", "addressUrl", "reference", "capacity",
  "createdAt", "updatedAt") 
VALUES
-- 1: Concierto Sinfónico PUCP 2025
(1,
 'Lima',
 'Av. Universitaria 1801, San Miguel 15088',
 'https://maps.app.goo.gl/mdCVvAdXAeprNYQo7',
 'Auditorio de la Pontificia Universidad Católica del Perú',
 2000,
 NOW(), NOW()),

-- 2: Seminario de Ciberseguridad y Prevención de Fraudes
(2,
 'Lima',
 'Av. Javier Prado Este 1066, San Isidro 15036',
 'https://maps.app.goo.gl/H6kJsmYwEHTbKHyU8',
 'Centro de Convenciones de Lima - Sala Ejecutiva 2',
 500,
 NOW(), NOW()),

-- 3: Festival Gastronómico del Sur
(3,
 'Arequipa',
 'Av. Los Incas 200, Cerro Colorado 04014',
 'https://maps.app.goo.gl/1AY4pTxGfUv1Jmft5',
 'Campo Ferial Cerro Juli',
 3000,
 NOW(), NOW()),

-- 4: Obra de Teatro “El Último Ensayo”
(4,
 'Cusco',
 'Av. El Sol 604, Cusco 08002',
 'https://maps.app.goo.gl/EtBM2pTrufyCtTFN7',
 'Teatro Municipal del Cusco',
 800,
 NOW(), NOW()),

-- 5: Expo Tecnología Lima 2025
(5,
 'Lima',
 'Av. de la Arqueología 206, San Borja 15021',
 'https://maps.app.goo.gl/v5RydYzqTqvSY4bx6',
 'Centro de Convenciones de Lima - Pabellón Principal',
 5000,
 NOW(), NOW());
 
INSERT INTO "EventToCategory" ("eventId", "eventCategoryId", "createdAt", "updatedAt") VALUES
-- 1. Concierto Sinfónico PUCP 2025 → Música, Cultura
(1, 1, NOW(), NOW()),
(1, 2, NOW(), NOW()),

-- 2. Seminario de Ciberseguridad y Prevención de Fraudes → Tecnología, Educativo, Negocios
(2, 3, NOW(), NOW()),
(2, 6, NOW(), NOW()),
(2, 7, NOW(), NOW()),

-- 3. Festival Gastronómico del Sur → Gastronomía, Cultura, Exposición
(3, 4, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(3, 8, NOW(), NOW()),

-- 4. Obra de Teatro: El Último Ensayo → Teatro, Cultura
(4, 5, NOW(), NOW()),
(4, 2, NOW(), NOW()),

-- 5. Expo Tecnología Lima 2025 → Tecnología, Exposición, Negocios
(5, 3, NOW(), NOW()),
(5, 8, NOW(), NOW()),
(5, 7, NOW(), NOW());

INSERT INTO "EventSalesPhase" ("eventId", "name", "startAt", "endAt", "percentage", "active", "createdAt", "updatedAt") VALUES
(1, 'Preventa', '2025-10-10T00:00:00.000Z', '2025-10-20T23:59:59.000Z', 10.00, FALSE, NOW(), NOW()),
(1, 'General', '2025-10-21T00:00:00.000Z', '2025-10-30T23:59:59.000Z', 0.00, FALSE, NOW(), NOW());

INSERT INTO "EventDate" ("eventId", "startAt", "endAt")
VALUES
-- 1. Concierto Sinfónico PUCP 2025
(1, '2025-12-05T20:00:00.000Z', '2025-12-06T01:00:00.000Z'),
(1, '2025-12-07T20:00:00.000Z', '2025-12-08T01:00:00.000Z'),

-- 2. Seminario de Ciberseguridad y Prevención de Fraudes
(2, '2025-09-17T12:00:00.000Z', '2025-09-17T14:00:00.000Z'),
(2, '2025-09-19T14:00:00.000Z', '2025-09-19T16:00:00.000Z'),

-- 3. Festival Gastronómico del Sur
(3, '2025-11-14T10:00:00.000Z', '2025-11-14T18:00:00.000Z'),
(3, '2025-11-15T10:00:00.000Z', '2025-11-15T18:00:00.000Z'),
(3, '2025-11-16T10:00:00.000Z', '2025-11-16T18:00:00.000Z'),

-- 4. Obra de Teatro: El Último Ensayo
(4, '2025-10-10T19:00:00.000Z', '2025-10-10T21:00:00.000Z'),
(4, '2025-10-11T19:00:00.000Z', '2025-10-11T21:00:00.000Z'),
(4, '2025-10-12T19:00:00.000Z', '2025-10-12T21:00:00.000Z'),

-- 5. Expo Tecnología Lima 2025
(5, '2025-09-25T09:00:00.000Z', '2025-09-25T18:00:00.000Z'),
(5, '2025-09-26T09:00:00.000Z', '2025-09-26T18:00:00.000Z'),
(5, '2025-09-27T09:00:00.000Z', '2025-09-27T18:00:00.000Z');

INSERT INTO "SeatMap" ("rows", "cols", "createdAt", "updatedAt")
VALUES 
-- 1. Concierto Sinfónico PUCP 2025 (recinto grande)
(20, 25, NOW(), NOW()),
(20, 25, NOW(), NOW()),
(20, 25, NOW(), NOW()),
(20, 25, NOW(), NOW()),
-- 2. Seminario de Ciberseguridad y Prevención de Fraudes (auditorio mediano)
(10, 12, NOW(), NOW()),
(10, 12, NOW(), NOW()),
(10, 12, NOW(), NOW()),
(10, 12, NOW(), NOW()),
-- 4. Obra de Teatro: El Último Ensayo (teatro tradicional)
(15, 18, NOW(), NOW()),
(15, 18, NOW(), NOW()),
(15, 18, NOW(), NOW()),
(15, 18, NOW(), NOW()),
(15, 18, NOW(), NOW()),
(15, 18, NOW(), NOW());

INSERT INTO "EventDateZone" (
  "eventDateId", "name", "kind", "basePrice", "capacity", "capacityRemaining", 
  "seatMapId", "currency", "createdAt", "updatedAt"
)
VALUES
-- 1: Concierto Sinfónico PUCP 2025 (SeatMap 1)
(1, 'Zona VIP',        'SEATED', 350.00, 200, 200, 1, 'PEN', NOW(), NOW()),
(1, 'Zona General',    'SEATED', 180.00, 300, 300, 2, 'PEN', NOW(), NOW()),
(2, 'Zona VIP',        'SEATED', 350.00, 200, 200, 3, 'PEN', NOW(), NOW()),
(2, 'Zona General',    'SEATED', 180.00, 300, 300, 4, 'PEN', NOW(), NOW()),

-- 2: Seminario de Ciberseguridad y Prevención de Fraudes (SeatMap 2)
(3, 'Asientos Preferenciales', 'SEATED', 200.00, 60, 60, 5, 'PEN', NOW(), NOW()),
(3, 'Asientos Generales',      'SEATED', 120.00, 60, 60, 6, 'PEN', NOW(), NOW()),
(4, 'Asientos Preferenciales', 'SEATED', 200.00, 60, 60, 7, 'PEN', NOW(), NOW()),
(4, 'Asientos Generales',      'SEATED', 120.00, 60, 60, 8, 'PEN', NOW(), NOW()),

-- 3: Festival Gastronómico del Sur (sin seatmap)
(5, 'Entrada General - Día 1', 'GENERAL', 40.00, 800, 800, NULL, 'PEN', NOW(), NOW()), -- 9
(6, 'Entrada General - Día 2', 'GENERAL', 40.00, 800, 800, NULL, 'PEN', NOW(), NOW()), -- 10
(7, 'Entrada General - Día 3', 'GENERAL', 40.00, 800, 800, NULL, 'PEN', NOW(), NOW()), -- 11

-- 4: Obra de Teatro “El Último Ensayo” (SeatMap 4)
(8,  'Palco VIP',       'SEATED', 150.00, 80, 80, 9, 'PEN', NOW(), NOW()), -- 12
(8,  'Platea Central',  'SEATED', 90.00, 120, 120, 10, 'PEN', NOW(), NOW()),
(9, 'Palco VIP',       'SEATED', 150.00, 80, 80, 11, 'PEN', NOW(), NOW()),
(9, 'Platea Central',  'SEATED', 90.00, 120, 120, 12, 'PEN', NOW(), NOW()),
(10, 'Palco VIP',       'SEATED', 150.00, 80, 80, 13, 'PEN', NOW(), NOW()),
(10, 'Platea Central',  'SEATED', 90.00, 120, 120, 14, 'PEN', NOW(), NOW()), -- 17

-- 5: Expo Tecnología Lima 2025 (sin seatmap)
(11, 'Pase General - Día 1', 'GENERAL', 50.00, 1200, 1200, NULL, 'PEN', NOW(), NOW()),
(12, 'Pase General - Día 2', 'GENERAL', 50.00, 1200, 1200, NULL, 'PEN', NOW(), NOW()),
(13, 'Pase General - Día 3', 'GENERAL', 50.00, 1200, 1200, NULL, 'PEN', NOW(), NOW());

INSERT INTO "EventDateZoneAllocation" 
("eventDateZoneId", "audienceName", "discountPercent", "allocatedQuantity", "remainingQuantity", "createdAt", "updatedAt") 
VALUES

-- 1: Concierto Sinfónico PUCP 2025 (eventDateZoneId 1–4)
-- Día 1
(1, '+65', 15.00, 50, 50, NOW(), NOW()),
(1, 'Estudiantes', 10.00, 150, 150, NOW(), NOW()),
(2, '+65', 15.00, 100, 100, NOW(), NOW()),
(2, 'Estudiantes', 10.00, 200, 200, NOW(), NOW()),
-- Día 2
(3, '+65', 15.00, 50, 50, NOW(), NOW()),
(3, 'Estudiantes', 10.00, 150, 150, NOW(), NOW()),
(4, '+65', 15.00, 100, 100, NOW(), NOW()),
(4, 'Estudiantes', 10.00, 200, 200, NOW(), NOW()),

-- 2: Seminario de Ciberseguridad y Prevención de Fraudes (eventDateZoneId 5–8)
(5, 'Estudiantes Universitarios', 20.00, 40, 40, NOW(), NOW()),
(5, 'Profesionales TI', 5.00, 20, 20, NOW(), NOW()),
(6, 'Estudiantes Universitarios', 20.00, 40, 40, NOW(), NOW()),
(6, 'Profesionales TI', 5.00, 20, 20, NOW(), NOW()),
(7, 'Estudiantes Universitarios', 20.00, 40, 40, NOW(), NOW()),
(7, 'Profesionales TI', 5.00, 20, 20, NOW(), NOW()),
(8, 'Estudiantes Universitarios', 20.00, 40, 40, NOW(), NOW()),
(8, 'Profesionales TI', 5.00, 20, 20, NOW(), NOW()),

-- 3: Obra de Teatro “El Último Ensayo” (eventDateZoneId 8–13 en el insert anterior)
-- Día 1
(12, 'Estudiantes', 15.00, 40, 40, NOW(), NOW()),
(12, '+65', 10.00, 40, 40, NOW(), NOW()),
(13, 'Estudiantes', 15.00, 60, 60, NOW(), NOW()),
(13, '+65', 10.00, 60, 60, NOW(), NOW()),
-- Día 2
(14, 'Estudiantes', 15.00, 40, 40, NOW(), NOW()),
(14, '+65', 10.00, 40, 40, NOW(), NOW()),
(15, 'Estudiantes', 15.00, 60, 60, NOW(), NOW()),
(15, '+65', 10.00, 60, 60, NOW(), NOW()),
-- Día 3
(16, 'Estudiantes', 15.00, 40, 40, NOW(), NOW()),
(16, '+65', 10.00, 40, 40, NOW(), NOW()),
(17, 'Estudiantes', 15.00, 60, 60, NOW(), NOW()),
(17, '+65', 10.00, 60, 60, NOW(), NOW());

DO $$
DECLARE
  r integer;
  c integer;
  sm RECORD;
  seat_label text;
BEGIN
  FOR sm IN SELECT "seatMapId", "rows", "cols" FROM "SeatMap" LOOP
    FOR r IN 1..sm.rows LOOP
      FOR c IN 1..sm.cols LOOP
        seat_label := chr(64 + r) || c;
        INSERT INTO "Seat" ("seatMapId", "rowNumber", "colNumber")
        VALUES (sm."seatMapId", r, c);
      END LOOP;
    END LOOP;
  END LOOP;
END $$;