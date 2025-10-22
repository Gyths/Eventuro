import { prisma } from '../utils/prisma.js';

export async function createVenueRepo({ eventId, city, address, addressUrl, reference, capacity }) {
    return prisma.$transaction(async (tx) => {
        const row = await tx.venue.create({
            data: {
                eventId,
                city, 
                address, 
                addressUrl, 
                reference, 
                capacity,
            },
            select: {
                venueId: true,
                eventId: true,
                city: true,
                address: true,
                addressUrl: true,
                reference: true, 
                capacity: true,
            },
        });

        return row;
    });
}

