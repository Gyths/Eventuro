import { faker } from "@faker-js/faker";

export default async function insertEventSalesPhases(prisma) {
  const events = await prisma.event.findMany();
  const venues = await prisma.venue.findMany();

  const venueMap = Object.fromEntries(venues.map((v) => [v.eventId, v.capacity]));

  const addDays = (d) => new Date(Date.now() + d * 86400000);
  const data = [];

  // Evento 1
  data.push({
    eventId: events[0].eventId,
    name: "Preventa",
    startAt: new Date(),
    endAt: addDays(7),
    ticketLimit: 100,
    quantityTicketsSold: 97,
    percentage: 10,
    active: true,
  });
  data.push({
    eventId: events[0].eventId,
    name: "General",
    startAt: addDays(7),
    endAt: addDays(14),
    ticketLimit: 200,
    quantityTicketsSold: 0,
    percentage: 0,
    active: false,
  });

  // Evento 2
  data.push({
    eventId: events[1].eventId,
    name: "Preventa",
    startAt: addDays(-14),
    endAt: addDays(-7),
    ticketLimit: 150,
    quantityTicketsSold: 0,
    percentage: 10,
    active: false,
  });
  data.push({
    eventId: events[1].eventId,
    name: "General",
    startAt: new Date(),
    endAt: addDays(7),
    ticketLimit: 350,
    quantityTicketsSold: 0,
    percentage: 0,
    active: true,
  });

  // Evento 3
  data.push({
    eventId: events[2].eventId,
    name: "General",
    startAt: new Date(),
    endAt: addDays(7),
    ticketLimit: 600,
    quantityTicketsSold: 0,
    percentage: 0,
    active: true,
  });

  for (let i = 3; i < events.length; i++) {
    const event = events[i];
    const capacity = venueMap[event.eventId] ?? 500;

    const hasPreSale = faker.datatype.boolean();

    if (hasPreSale) {
      const preLimit = Math.floor(capacity * faker.number.float({ min: 0.1, max: 0.3 }));
      const generalLimit = capacity - preLimit;

      const preStart = faker.date.future();
      const preEnd = faker.date.soon({ days: 7, refDate: preStart });
      const genStart = preEnd;
      const genEnd = faker.date.soon({ days: 10, refDate: genStart });

      const activePhase = faker.helpers.arrayElement(["Preventa", "General"]);

      data.push({
        eventId: event.eventId,
        name: "Preventa",
        startAt: preStart,
        endAt: preEnd,
        ticketLimit: preLimit,
        quantityTicketsSold: 0,
        percentage: faker.helpers.arrayElement([5, 10, 15]),
        active: activePhase === "Preventa",
      });

      data.push({
        eventId: event.eventId,
        name: "General",
        startAt: genStart,
        endAt: genEnd,
        ticketLimit: generalLimit,
        quantityTicketsSold: 0,
        percentage: 0,
        active: activePhase === "General",
      });
    } else {
      data.push({
        eventId: event.eventId,
        name: "General",
        startAt: new Date(),
        endAt: addDays(faker.number.int({ min: 5, max: 20 })),
        ticketLimit: capacity,
        quantityTicketsSold: 0,
        percentage: 0,
        active: true,
      });
    }
  }

  await prisma.eventSalesPhase.createMany({ data });

  console.log("Fases generadas con al menos una activa por evento.");
}
