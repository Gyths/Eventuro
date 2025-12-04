import { faker } from "@faker-js/faker";

const COMMON_ASSETS = {
  principal: "events/1761677737608_Evento_prueba.png",
  banner: "events/1761677738279_Evento_prueba_banner.png",
  refundFile: "refund_policies/1763014632484_Informatica.pdf",
};

const eventTitles = [
  "Evento de Prueba 01",
  "Feria Gastronómica Internacional MISTURA DE LIMA (Edición 2025)",
  "Evento de Prueba 03",
  "Evento de Prueba 04",
];

export default async function insertEvents(prisma) {
  const baseEvents = [
    //Event 1
    {
      organizerId: 1,
      title: eventTitles[0],
      imagePrincipalKey: COMMON_ASSETS.principal,
      imageBannerKey: COMMON_ASSETS.banner,
      refundPolicyFileKey: COMMON_ASSETS.refundFile,
      refundPolicyText: "Política de devoluciones para el evento de prueba 02",
      inPerson: false,
      feeId: 1,
      status: "A",
      description: "Evento virtual con 12 tickets por usario,fase de preventa activa con solo 3 tickets disponibles y dos códigos de descuento",
      accessPolicy: "E",
      accessPolicyDescription: "Permisos de entrada para el evento 01",
      ticketLimitPerUser: 12,
    },
    //Event 2
    {
      organizerId: 2,
      title: eventTitles[1],
      imagePrincipalKey: "events/1763156323547_images.png",
      imageBannerKey: "events/1763156324001_cartel-mistura-2009-feria-gastronomica-de-lima-1-1024x398.jpg",
      refundPolicyFileKey: "refund_policies/1763156324176_PolÃ­tica de DevoluciÃ³n de Entradas - Mistura.pdf",

      inPerson: true,
      feeId: 2,
      status: "A",
      description: "Evento presencial con 500 de capacidad, segunda de venta general activa y 2 dos códigos de descuento.",
      accessPolicy: "E",
      accessPolicyDescription: "Permisos de entrada para el evento 02",
      ticketLimitPerUser: 10,
    },
    //Event 3
    {
      organizerId: 3,
      title: eventTitles[2],
      imagePrincipalKey: COMMON_ASSETS.principal,
      imageBannerKey: COMMON_ASSETS.banner,
      refundPolicyText: "Política de devoluciones para el evento de prueba 02",
      inPerson: true,
      status: "P",
      description: "Evento presencial con poca capacidad restante en cada zona.",
      accessPolicy: "E",
      accessPolicyDescription: "Permisos de entrada para el evento 03",
      ticketLimitPerUser: 9,
    },
    //Event 4
    {
      organizerId: 2,
      title: eventTitles[3],
      imagePrincipalKey: COMMON_ASSETS.principal,
      imageBannerKey: COMMON_ASSETS.banner,
      refundPolicyText: "Política de devoluciones para el evento de prueba 01",
      inPerson: true,
      feeId: 3,
      status: "A",
      description: "Evento ya finalizado, no debería aparecer en listado.",
      accessPolicy: "E",
      accessPolicyDescription: "Permisos de entrada para el evento 04",
      ticketLimitPerUser: 15,
    },
  ];

  function weightedStatus() {
    const r = Math.random();
    if (r < 0.1) return "C";
    if (r < 0.15) return "D";
    if (r < 0.3) return "P";
    return "A";
  }

  const generatedPercentages = new Set();
  const extraFees = [];

  while (extraFees.length < 20) {
    const feePercentage = faker.number
      .float({
        min: 5,
        max: 20,
        precision: 0.01,
      })
      .toFixed(2);

    if (!generatedPercentages.has(feePercentage)) {
      generatedPercentages.add(feePercentage);
      extraFees.push({ percentage: feePercentage });
    }
  }

  // Insertar tarifas
  await prisma.fee.createMany({
    data: extraFees,
  });

  // Obtener las tarifas ya insertadas para asociarlas a los eventos
  const fees = await prisma.fee.findMany();

  const extraEvents = Array.from({ length: 50 }).map((_, index) => {
    const inPerson = faker.datatype.boolean();
    const title = faker.company.catchPhrase();
    const status = weightedStatus();
    const randomFeeIndex = faker.number.bigInt({ min: 0, max: 19 });
    eventTitles.push(title);

    return {
      organizerId: faker.number.int({ min: 1, max: 5 }),
      title,
      imagePrincipalKey: COMMON_ASSETS.principal,
      imageBannerKey: COMMON_ASSETS.banner,
      refundPolicyFileKey: COMMON_ASSETS.refundFile,
      status: status,
      refundPolicyText: faker.lorem.sentence(),

      inPerson,
      description: faker.lorem.paragraph(),

      accessPolicy: "E",
      accessPolicyDescription: faker.lorem.sentence(),

      ticketLimitPerUser: faker.number.int({ min: 5, max: 20 }),

      feeId: status === "A" ? fees[randomFeeIndex].feeId : null,
    };
  });

  await prisma.event.createMany({
    data: [...baseEvents, ...extraEvents],
  });
}
