import { faker } from "@faker-js/faker";

export default async function insertEventToCategory(prisma) {
  const events = await prisma.event.findMany();

  const MAX_CATEGORY_ID = 13;
  const MIN_CATEGORIES_PER_EVENT = 2;
  const MAX_CATEGORIES_PER_EVENT = 4;

  const data = [];

  events.forEach((event) => {
    const numCategories = faker.number.int({
      min: MIN_CATEGORIES_PER_EVENT,
      max: MAX_CATEGORIES_PER_EVENT,
    });

    const chosenCategories = new Set();

    while (chosenCategories.size < numCategories) {
      const randomCategoryId = faker.number.int({
        min: 1,
        max: MAX_CATEGORY_ID,
      });
      chosenCategories.add(randomCategoryId);
    }

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
