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