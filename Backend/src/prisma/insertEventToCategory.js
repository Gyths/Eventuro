import { faker } from "@faker-js/faker";

export default async function insertEventToCategory(prisma) {
  const events = await prisma.event.findMany();

  const MAX_CATEGORY_ID = 13;
  const MIN_CATEGORIES_PER_EVENT = 2;
  const MAX_CATEGORIES_PER_EVENT = 5;

  const data = [];

  // Recorrer TODOS los eventos
  events.forEach((event) => {
    const numCategories = faker.number.int({
      min: MIN_CATEGORIES_PER_EVENT,
      max: MAX_CATEGORIES_PER_EVENT,
    });

    // Crear un Set para evitar categorías duplicadas
    const chosenCategories = new Set();

    while (chosenCategories.size < numCategories) {
      const randomCategoryId = faker.number.int({
        min: 1,
        max: MAX_CATEGORY_ID,
      });
      chosenCategories.add(randomCategoryId);
    }

    // Generar los registros de inserción
    chosenCategories.forEach((categoryId) => {
      data.push({
        eventId: event.eventId,
        eventCategoryId: categoryId,
      });
    });
  });

  await prisma.eventToCategory.createMany({
    data,
  });

  console.log(`Categorías asignadas a ${events.length} eventos.`);
}
