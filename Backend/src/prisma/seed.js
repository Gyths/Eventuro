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
    ],
    skipDuplicates: true, // evita errores si ya existen
  });

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
        currency: "PEN",
      },
      {
        eventDateId: event1Date[0].eventDateId,
        name: "Experiencia General",
        kind: "GENERAL",
        basePrice: 50,
        capacity: 200,
        capacityRemaining: 200,
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
        currency: "PEN",
      },
      {
        eventDateId: event1Date[1].eventDateId,
        name: "Experiencia General",
        kind: "GENERAL",
        basePrice: 50,
        capacity: 200,
        capacityRemaining: 200,
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
        currency: "PEN",
      },
      {
        eventDateId: event1Date[2].eventDateId,
        name: "Experiencia General",
        kind: "GENERAL",
        basePrice: 50,
        capacity: 200,
        capacityRemaining: 200,
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
        currency: "PEN",
      },
      {
        eventDateId: event2Date[0].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 300,
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
        currency: "PEN",
      },
      {
        eventDateId: event2Date[1].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 300,
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
        currency: "PEN",
      },
      {
        eventDateId: event3Date[0].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 6,
        currency: "PEN",
      },
      {
        eventDateId: event3Date[0].eventDateId,
        name: "Zona Preferencial",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 100,
        capacityRemaining: 5,
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
        currency: "PEN",
      },
      {
        eventDateId: event3Date[1].eventDateId,
        name: "Zona General",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 300,
        capacityRemaining: 6,
        currency: "PEN",
      },
      {
        eventDateId: event3Date[1].eventDateId,
        name: "Zona Preferencial",
        kind: "GENERAL",
        basePrice: 180,
        capacity: 100,
        capacityRemaining: 5,
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
}

main().finally(() => prisma.$disconnect());
