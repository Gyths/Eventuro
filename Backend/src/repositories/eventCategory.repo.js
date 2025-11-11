import { prisma } from '../utils/prisma.js';
import { withAudit } from '../utils/audit.util.js';

export async function createEventCategoryRepo(userId, { initials, description }) {
  return withAudit(userId, async (tx) => {
    const row = tx.eventCategory.create({
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
  })
}

export async function updateEventCategoryRepo(userId, { eventCategoryId, data }) {
  return withAudit(userId, async (tx) => {

    const row = tx.eventCategory.update({
      where: { eventCategoryId },
      data,
      select: {
        eventCategoryId: true,
        initials: true,
        description: true,
      },
    });
    return row;
  });
}

export async function deleteEventCategoryRepo(userId, eventCategoryId) {
  return withAudit(userId, async (tx) => {

    const row = tx.eventCategory.delete({
      where: { eventCategoryId },
      select: {
        eventCategoryId: true,
        initials: true,
        description: true,
      },
    });
    return row;
  })
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