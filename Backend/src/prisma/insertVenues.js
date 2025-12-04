import { faker } from "@faker-js/faker";

export default async function insertVenues(prisma) {
  const events = await prisma.event.findMany();
  const LIMA_ADDRESSES = [
    { city: "Lima", address: "Av. Arequipa 1500, Lince" },
    { city: "Lima", address: "Av. Javier Prado Este 4200, La Molina" },
    { city: "Lima", address: "Av. La Marina 2000, San Miguel" },
    { city: "Lima", address: "Av. Brasil 2600, Jesús María" },
    { city: "Lima", address: "Av. Angamos Oeste 900, Miraflores" },
    { city: "Lima", address: "Av. Salaverry 2400, Jesús María" },
    { city: "Lima", address: "Av. Primavera 1200, Surco" },
  ];

  const AREQUIPA_ADDRESSES = [
    { city: "Arequipa", address: "Av. Ejército 800, Cayma" },
    { city: "Arequipa", address: "Av. Dolores 115, JLBR" },
    { city: "Arequipa", address: "Av. Ejército 1010, Cayma" },
    { city: "Arequipa", address: "Calle Bolívar 405, Cercado" },
    { city: "Arequipa", address: "Av. Parra 320, Cercado" },
  ];

  const CUSCO_ADDRESSES = [
    { city: "Cusco", address: "Av. El Sol 100, Cusco" },
    { city: "Cusco", address: "Calle San Agustín 400, Cusco" },
    { city: "Cusco", address: "Av. de la Cultura 2500, Cusco" },
    { city: "Cusco", address: "Calle Maruri 340, Cusco" },
    { city: "Cusco", address: "Av. Pardo 550, Cusco" },
  ];

  const ALL_ADDRESSES = [...LIMA_ADDRESSES, ...AREQUIPA_ADDRESSES, ...CUSCO_ADDRESSES];

  const data = [];

  data.push(
    {
      eventId: events[0].eventId,
      city: "Lima",
      address: "Dirección fija para evento 1",
      capacity: 300,
    },
    {
      eventId: events[1].eventId,
      city: "Lima",
      address: "Costa Verde, Magdalena del Mar, Lima, Perú",
      capacity: 500,
    },
    {
      eventId: events[2].eventId,
      city: "Lima",
      address: "Campus PUCP, San Miguel 15088",
      capacity: 600,
    },
    {
      eventId: events[3].eventId,
      city: "Lima",
      address: "Av. Universitaria 1801, San Miguel 15088",
      capacity: 600,
    }
  );

  for (let i = 4; i < events.length; i++) {
    const randomAddress = ALL_ADDRESSES[faker.number.int({ min: 0, max: ALL_ADDRESSES.length - 1 })];

    data.push({
      eventId: events[i].eventId,
      city: randomAddress.city,
      address: randomAddress.address,
      capacity: faker.number.int({ min: 150, max: 1500 }),
    });
  }

  await prisma.venue.createMany({ data });

  console.log("Se insertaron venues para", events.length, "eventos");
}
