import { prisma } from '../utils/prisma.js';

export async function createEventRepo({ organizerId, title, inPerson, description, accessPolicy, accessPolicyDescription }) {
    return prisma.$transaction(async (tx) => {
        const row = await tx.event.create({
            data: { 
                organizerId, 
                title, 
                inPerson, 
                description, 
                accessPolicy, 
                ...(accessPolicyDescription !== undefined && { accessPolicyDescription })
            },
            select: {
                eventId: true,
                organizerId: true,
                title: true,
                status: true,
                inPerson: true,
                description: true,
                accessPolicy: true,
                accessPolicyDescription: true,
            },
        });

        return row;
    });
}