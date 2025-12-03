export default async function insertEventDateZoneAllocations(eventDateZoneAllocation, eventDateZone) {
  const zones = await eventDateZone.findMany();

  // Conjunto de audiencias disponibles
  const AUDIENCES = [
    { name: "Niños", discount: 20 },
    { name: "Estudiantes", discount: 15 },
    { name: "Adultos Mayores", discount: 25 },
    { name: "Personas con Discapacidad", discount: 30 },
  ];

  const data = zones.flatMap((z) => {
    // Generar entre 2 y 3 audiencias distintas
    const numberOfAllocations = Math.floor(Math.random() * 2) + 2; // 2 o 3

    // Mezclamos y elegimos las audiencias
    const selectedAudiences = AUDIENCES.sort(() => 0.5 - Math.random()).slice(0, numberOfAllocations);

    // Transformamos en registros compatibles con createMany
    return selectedAudiences.map((aud) => ({
      eventDateZoneId: z.eventDateZoneId,
      audienceName: aud.name,
      discountType: "PERCENTAGE",
      discountValue: aud.discount,
    }));
  });

  await eventDateZoneAllocation.createMany({
    data,
  });
}
