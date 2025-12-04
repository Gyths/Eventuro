import { faker } from "@faker-js/faker";

export default async function insertEventSalesPhases(prisma) {
  const events = await prisma.event.findMany();
  const venues = await prisma.venue.findMany();

  const venueMap = Object.fromEntries(venues.map((v) => [v.eventId, v.capacity]));

  const data = [];

  data.push(
    {
      eventId: events[0].eventId,
      name: "Preventa",
      startAt: new Date("2025-11-10T09:00:00Z"),
      endAt: new Date("2025-11-20T23:59:00Z"),
      ticketLimit: 120,
      quantityTicketsSold: 115,
      percentage: 10,
      active: false,
    },
    {
      eventId: events[0].eventId,
      name: "General",
      startAt: new Date("2025-11-21T00:00:00Z"),
      endAt: new Date("2025-12-04T23:59:00Z"),
      ticketLimit: 200,
      quantityTicketsSold: 180,
      percentage: 0,
      active: true, // Evento 1 tiene fase activa
    }
  );

  data.push(
    {
      eventId: events[1].eventId,
      name: "Preventa",
      startAt: new Date("2025-11-01T09:00:00Z"),
      endAt: new Date("2025-11-10T23:59:00Z"),
      ticketLimit: 150,
      quantityTicketsSold: 80,
      percentage: 10,
      active: false,
    },
    {
      eventId: events[1].eventId,
      name: "General",
      startAt: new Date("2025-11-11T00:00:00Z"),
      endAt: new Date("2025-11-28T23:59:00Z"),
      ticketLimit: 350,
      quantityTicketsSold: 0,
      percentage: 0,
      active: true, // Fase activa
    }
  );

  data.push(
    {
      eventId: events[2].eventId,
      name: "Preventa",
      startAt: new Date("2025-12-01T09:00:00Z"),
      endAt: new Date("2025-12-10T23:59:00Z"),
      ticketLimit: 300,
      quantityTicketsSold: 150,
      percentage: 10,
      active: false,
    },
    {
      eventId: events[2].eventId,
      name: "General",
      startAt: new Date("2025-12-11T00:00:00Z"),
      endAt: new Date("2025-12-19T23:59:00Z"),
      ticketLimit: 600,
      quantityTicketsSold: 0,
      percentage: 0,
      active: true,
    }
  );

  data.push(
    {
      eventId: events[3].eventId,
      name: "Preventa",
      startAt: new Date("2025-09-20T09:00:00Z"),
      endAt: new Date("2025-09-30T23:59:00Z"),
      ticketLimit: 80,
      quantityTicketsSold: 50,
      percentage: 15,
      active: false,
    },
    {
      eventId: events[3].eventId,
      name: "General",
      startAt: new Date("2025-10-01T00:00:00Z"),
      endAt: new Date("2025-10-16T23:59:00Z"),
      ticketLimit: 150,
      quantityTicketsSold: 0,
      percentage: 0,
      active: false, // Evento ya ocurrió, no puede tener fase activa
    }
  );

  // utilidades
  function randomPastDate() {
    const now = Date.now();
    const twoYearsMs = 2 * 365 * 24 * 60 * 60 * 1000;
    return new Date(now - Math.random() * twoYearsMs);
  }

  function randomPastRange(minDays = 5, maxDays = 20) {
    const start = randomPastDate();
    const duration = faker.number.int({ min: minDays, max: maxDays });
    const end = new Date(start.getTime() + duration * 86400000);
    return { start, end };
  }

  function randomFutureRange(minDays = 5, maxDays = 20) {
    const start = faker.date.soon({ days: faker.number.int({ min: 1, max: 20 }) });
    const duration = faker.number.int({ min: minDays, max: maxDays });
    const end = new Date(start.getTime() + duration * 86400000);
    return { start, end };
  }

  for (let event of events) {
    const capacity = venueMap[event.eventId] ?? 500;
    const hasPreSale = faker.datatype.boolean();
    const shouldHaveActivePhase = faker.number.int({ min: 1, max: 100 }) <= 30;

    if (hasPreSale) {
      const preLimit = Math.floor(capacity * faker.number.float({ min: 0.1, max: 0.3 }));
      const generalLimit = capacity - preLimit;

      let preStart, preEnd, genStart, genEnd;

      if (shouldHaveActivePhase) {
        // Preventa → Pasado reciente
        ({ start: preStart, end: preEnd } = randomPastRange(5, 12));

        // General → Activa
        ({ start: genStart, end: genEnd } = randomFutureRange(5, 15));
      } else {
        // ambas fases totalmente pasadas en los últimos dos años
        ({ start: preStart, end: preEnd } = randomPastRange(7, 15));
        ({ start: genStart, end: genEnd } = randomPastRange(7, 20));
      }

      const activePhase = shouldHaveActivePhase ? "General" : null;

      data.push({
        eventId: event.eventId,
        name: "Preventa",
        startAt: preStart,
        endAt: preEnd,
        ticketLimit: preLimit,
        quantityTicketsSold: faker.number.int({ min: 0, max: preLimit }),
        percentage: faker.helpers.arrayElement([5, 10, 15]),
        active: activePhase === "Preventa",
      });

      data.push({
        eventId: event.eventId,
        name: "General",
        startAt: genStart,
        endAt: genEnd,
        ticketLimit: generalLimit,
        quantityTicketsSold: faker.number.int({ min: 0, max: generalLimit }),
        percentage: 0,
        active: activePhase === "General",
      });
    } else {
      // Solo fase General
      let start, end;

      if (shouldHaveActivePhase) {
        ({ start, end } = randomFutureRange(7, 20)); // activa
      } else {
        ({ start, end } = randomPastRange(7, 20)); // pasada
      }

      data.push({
        eventId: event.eventId,
        name: "General",
        startAt: start,
        endAt: end,
        ticketLimit: capacity,
        quantityTicketsSold: faker.number.int({ min: 0, max: capacity }),
        percentage: 0,
        active: shouldHaveActivePhase,
      });
    }
  }

  await prisma.eventSalesPhase.createMany({ data });

  console.log("Fases generadas con fechas pasadas y algunas activas.");
}
