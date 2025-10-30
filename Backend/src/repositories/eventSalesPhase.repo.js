import { prisma } from '../utils/prisma.js';

export async function createManyEventSalesPhasesRepo(phases, txClient) {

    const client = txClient || prisma;
    
        const rows = await client.eventSalesPhase.createManyAndReturn({
            data: phases,
            skipDuplicates: true,
            select: {
                eventSalesPhaseId: true,
                eventId: true,
                name: true,
                startAt: true,
                endAt: true,
                percentage: true,
                ticketLimit: true,
            },
        });

        return rows;
    
}
