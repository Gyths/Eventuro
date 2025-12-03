import { faker } from "@faker-js/faker";

export default async function insertEventDateZone(prisma) {
  const eventDates = await prisma.eventDate.findMany();
  const venues = await prisma.venue.findMany();

  // Mapa eventId -> capacidad del venue
  const venueMap = Object.fromEntries(venues.map((v) => [v.eventId, v.capacity]));

  // Mapa eventId -> eventDates[]
  const eventDateMap = {};
  for (const d of eventDates) {
    if (!eventDateMap[d.eventId]) eventDateMap[d.eventId] = [];
    eventDateMap[d.eventId].push(d);
  }

  // ZONAS FIJAS (mantener nombres y precios)
  const zoneTemplates = {
    1: [
      { name: "Experiencia VIP", basePrice: 100, percent: 0.33 },
      { name: "Experiencia General", basePrice: 50, percent: 0.67 },
    ],
    2: [
      { name: "Zona VIP", basePrice: 350, percent: 0.4 },
      { name: "Zona General", basePrice: 180, percent: 0.6 },
    ],
    3: [
      { name: "Zona VIP", basePrice: 350, percent: 0.33 },
      { name: "Zona General", basePrice: 180, percent: 0.5 },
      { name: "Zona Preferencial", basePrice: 180, percent: 0.17 },
    ],
    4: [{ name: "Zona General", basePrice: 180, percent: 1.0 }],
  };

  const zonesToInsert = [];

  for (const [eventIdString, dates] of Object.entries(eventDateMap)) {
    const eventId = Number(eventIdString);
    const venueCapacity = venueMap[eventId];

    if (!venueCapacity) {
      console.warn("⚠ Evento sin venue:", eventId);
      continue;
    }

    if (zoneTemplates[eventId]) {
      const template = zoneTemplates[eventId];

      dates.forEach((date) => {
        template.forEach((zone) => {
          const capacity = Math.floor(zone.percent * venueCapacity);

          zonesToInsert.push({
            eventDateId: date.eventDateId,
            name: zone.name,
            kind: "GENERAL",
            basePrice: zone.basePrice,
            capacity,
            capacityRemaining: capacity,
            quantityTicketsReleased: capacity,
            currency: "PEN",
          });
        });
      });

      continue;
    }

    dates.forEach((date) => {
      const numberOfZones = faker.number.int({ min: 1, max: 4 });

      let remaining = venueCapacity;

      for (let i = 0; i < numberOfZones; i++) {
        const isLast = i === numberOfZones - 1;

        let capacity;

        if (isLast) {
          capacity = remaining;
        } else {
          const fraction = faker.number.float({ min: 0.1, max: 0.4 });
          capacity = Math.floor(venueCapacity * fraction);

          if (capacity > remaining) {
            capacity = remaining;
          }

          remaining -= capacity;
        }

        const zoneName = faker.helpers.arrayElement(["Zona General", "Zona Preferencial", "Zona VIP", "Butaca", "Mesa", "Sector A", "Sector B"]);

        const basePrice = faker.number.int({
          min: 30,
          max: 300,
        });

        zonesToInsert.push({
          eventDateId: date.eventDateId,
          name: zoneName,
          kind: "GENERAL",
          basePrice,
          capacity,
          capacityRemaining: capacity,
          quantityTicketsReleased: capacity,
          currency: "PEN",
        });
      }
    });
  }

  await prisma.eventDateZone.createMany({ data: zonesToInsert });

  console.log("Zonas generadas coherentes con el venue, respetando tu estructura.");
}
