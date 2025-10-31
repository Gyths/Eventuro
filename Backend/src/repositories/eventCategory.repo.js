import { prisma } from '../utils/prisma.js';

export async function createEventCategoryRepo({ initials, description }) {
    return prisma.$transaction(async (tx) => {
        const row = await tx.eventCategory.create({
            data: {
                initials,
                description
            },
            select: {
                eventCategoryId: true,
                initials: true,
                description: true,
            },
        });

        return row;
    });
}

export async function updateEventCategoryRepo({ eventCategoryId, data }) {
  return prisma.eventCategory.update({
    where: { eventCategoryId },
    data,
    select: {
      eventCategoryId: true,
      initials: true,
      description: true,
    },
  });
}

export async function deleteEventCategoryRepo(eventCategoryId) {
  return prisma.eventCategory.delete({
    where: { eventCategoryId },
    select: {
      eventCategoryId: true,
      initials: true,
      description: true,
    },
  });
}

export async function getEventCategoryByIdRepo(eventCategoryId) {
  return prisma.eventCategory.findUnique({
    where: { eventCategoryId },
    select: {
      eventCategoryId: true,
      initials: true,
      description: true,
    },
  });
}

export async function listEventCategoriesRepo() {
    const rows = await prisma.eventCategory.findMany({
        select: {
            eventCategoryId: true,
            initials: true,
            description: true,
        },
        orderBy: { initials: "asc" },
    });
    return rows;
}