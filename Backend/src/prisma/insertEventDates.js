import { faker } from "@faker-js/faker";

export default async function insertEventDates(prisma) {
  const events = await prisma.event.findMany();

  const phases = await prisma.eventSalesPhase.findMany({
    orderBy: { startAt: "asc" },
  });

  const phaseMap = {};
  for (const p of phases) {
    if (!phaseMap[p.eventId]) phaseMap[p.eventId] = [];
    phaseMap[p.eventId].push(p);
  }

  const data = [];

  data.push(
    // Evento 1 (día 1–3)
    {
      eventId: events[0].eventId,
      startAt: new Date("2025-12-05T13:00:00Z"),
      endAt: new Date("2025-12-05T18:00:00Z"),
    },
    {
      eventId: events[0].eventId,
      startAt: new Date("2025-12-05T20:00:00Z"),
      endAt: new Date("2025-12-06T01:00:00Z"),
    },
    {
      eventId: events[0].eventId,
      startAt: new Date("2025-12-06T13:00:00Z"),
      endAt: new Date("2025-12-06T18:00:00Z"),
    },
    {
      eventId: events[0].eventId,
      startAt: new Date("2025-12-06T20:00:00Z"),
      endAt: new Date("2025-12-07T01:00:00Z"),
    },
    {
      eventId: events[0].eventId,
      startAt: new Date("2025-12-09T13:00:00Z"),
      endAt: new Date("2025-12-09T18:00:00Z"),
    },
    {
      eventId: events[0].eventId,
      startAt: new Date("2025-12-09T20:00:00Z"),
      endAt: new Date("2025-12-10T01:00:00Z"),
    },
    // Evento 2
    {
      eventId: events[1].eventId,
      startAt: new Date("2025-11-29T14:00:00Z"),
      endAt: new Date("2025-11-29T16:00:00Z"),
    },
    {
      eventId: events[1].eventId,
      startAt: new Date("2025-12-20T18:00:00Z"),
      endAt: new Date("2025-12-20T20:00:00Z"),
    },
    {
      eventId: events[1].eventId,
      startAt: new Date("2025-12-22T18:00:00Z"),
      endAt: new Date("2025-12-22T20:00:00Z"),
    },
    {
      eventId: events[1].eventId,
      startAt: new Date("2025-12-24T18:00:00Z"),
      endAt: new Date("2025-12-24T20:00:00Z"),
    },
    // Evento 3
    {
      eventId: events[2].eventId,
      startAt: new Date("2025-12-20T18:00:00Z"),
      endAt: new Date("2025-12-20T20:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2025-12-20T20:00:00Z"),
      endAt: new Date("2025-12-20T22:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2025-12-20T22:00:00Z"),
      endAt: new Date("2025-12-21T00:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2025-12-22T18:00:00Z"),
      endAt: new Date("2025-12-22T20:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2025-12-22T20:00:00Z"),
      endAt: new Date("2025-12-22T22:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2025-12-22T22:00:00Z"),
      endAt: new Date("2025-12-23T00:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2026-01-15T18:00:00Z"),
      endAt: new Date("2026-01-15T20:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2026-01-15T20:00:00Z"),
      endAt: new Date("2026-01-15T22:00:00Z"),
    },
    {
      eventId: events[2].eventId,
      startAt: new Date("2026-01-15T22:00:00Z"),
      endAt: new Date("2026-01-16T00:00:00Z"),
    },
    // Evento 4
    {
      eventId: events[3].eventId,
      startAt: new Date("2025-10-17T15:00:00Z"),
      endAt: new Date("2025-10-17T20:00:00Z"),
    }
  );

  for (let i = 4; i < events.length; i++) {
    const event = events[i];

    const phases = phaseMap[event.eventId];
    if (!phases) continue;

    const minStart = phases[0].startAt;
    const maxEnd = phases[phases.length - 1].endAt;

    const numDates = faker.number.int({ min: 1, max: 4 });

    for (let j = 0; j < numDates; j++) {
      const eventStart = faker.date.soon({
        days: 30,
        refDate: maxEnd,
      });

      const durationHours = faker.number.int({ min: 1, max: 5 });

      const eventEnd = new Date(eventStart.getTime() + durationHours * 3600000);

      data.push({
        eventId: event.eventId,
        startAt: eventStart,
        endAt: eventEnd,
      });
    }
  }

  await prisma.eventDate.createMany({ data });

  console.log("EventDates generados y consistentes con las fases de venta.");
}
