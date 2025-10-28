import { prisma } from '../utils/prisma.js';

export async function createManyEventSalesPhasesRepo(phases) {
    return prisma.$transaction(async (tx) => {
        const rows = await tx.eventSalesPhase.createManyAndReturn({
            data: phases,
            skipDuplicates: true,
            select: {
                eventSalesPhaseId: true,
                eventId: true,
                name: true,
                startAt: true,
                endAt: true,
                percentage: true, 
            },
        });

        return rows;
    });
}
