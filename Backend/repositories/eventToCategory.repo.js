import { prisma } from "../utils/prisma.js";

export async function createManyEventToCategoryRepo(toCategories) {
    return prisma.$transaction(async (tx) => {
        const rows = await tx.eventToCategory.createManyAndReturn({
            data: toCategories,
            skipDuplicates: true,
            select: {
                eventId: true,
                eventCategoryId: true,
            },
        });

        return rows;
    });
}