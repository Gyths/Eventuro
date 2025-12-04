export default async function insertEventDateZoneAllocations(eventDateZoneAllocation, eventDateZone) {
  const zones = await eventDateZone.findMany({
    include: {
      eventDate: true,
    },
  });

  const AUDIENCES = [
    { name: "Niños", discount: 20 },
    { name: "Estudiantes", discount: 15 },
    { name: "Adultos Mayores", discount: 25 },
    { name: "Personas con Discapacidad", discount: 30 },
  ];

  const eventZonesMap = {};
  for (const z of zones) {
    const eventId = z.eventDate.eventId;
    if (!eventZonesMap[eventId]) eventZonesMap[eventId] = [];
    eventZonesMap[eventId].push(z);
  }

  const data = [];

  for (const [eventId, eventZones] of Object.entries(eventZonesMap)) {
    const numberOfAllocations = Math.floor(Math.random() * 2) + 2;
    const selectedAudiences = [...AUDIENCES].sort(() => 0.5 - Math.random()).slice(0, numberOfAllocations);

    for (const zone of eventZones) {
      for (const aud of selectedAudiences) {
        data.push({
          eventDateZoneId: zone.eventDateZoneId,
          audienceName: aud.name,
          discountType: "PERCENTAGE",
          discountValue: aud.discount,
        });
      }
    }
  }

  await eventDateZoneAllocation.createMany({
    data,
  });

  console.log("Allocations generados: iguales para todas las zonas de un mismo evento.");
}
