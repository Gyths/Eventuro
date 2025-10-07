import { prisma } from '../utils/prisma.js'

/**
 * Crea una orden y sus ítems de forma transaccional con control de concurrencia.
 */
export async function createOrderRepo(input) {
    return prisma.$transaction(async (tx) => {
        const buyerUserId = BigInt(input.buyerUserId);

        // 1️ Crear la orden base
        const order = await tx.order.create({
            data: {
                buyerUserId,
                currency: 'PEN',
                status: 'CREATED',
                totalAmount: 0
            },
            select: { orderId: true }
        });

        let totalAmount = 0;
        const orderItems = [];

        // 2️ Iterar por cada ítem (allocation + zona)
        for (const item of input.items) {
            const allocation = await tx.eventDateZoneAllocation.findUnique({
                where: { eventDateZoneAllocationId: BigInt(item.allocationId) },
                select: {
                    remainingQuantity: true,
                    allocatedQuantity: true,
                    discountPercent: true,
                    eventDateZoneId: true,
                    zone: {
                        select: {
                            capacityRemaining: true,
                            basePrice: true,
                            currency: true
                        }
                    }
                }
            });

            if (!allocation) throw new Error('La asignación (allocation) no existe.');

            if (allocation.remainingQuantity < item.quantity)
                throw new Error('No hay suficiente disponibilidad en esta allocation.');

            // 3️ Calcular precios
            const unitPrice = Number(allocation.zone.basePrice);
            const subtotal = unitPrice * item.quantity;
            const discount = Number(allocation.discountPercent) || 0;
            const finalPrice = subtotal * (1 - discount / 100);

            // 4️ Actualizar concurrencia allocation
            const allocationUpdate = await tx.eventDateZoneAllocation.updateMany({
                where: {
                    eventDateZoneAllocationId: BigInt(item.allocationId),
                    remainingQuantity: allocation.remainingQuantity
                },
                data: {
                    remainingQuantity: allocation.remainingQuantity - item.quantity
                }
            });
            if (allocationUpdate.count === 0)
                throw new Error('Colisión de concurrencia: allocation ya fue modificada.');

            // 5️ Actualizar concurrencia zona total
            const zoneUpdate = await tx.eventDateZone.updateMany({
                where: {
                    eventDateZoneId: BigInt(allocation.eventDateZoneId),
                    capacityRemaining: allocation.zone.capacityRemaining
                },
                data: {
                    capacityRemaining: allocation.zone.capacityRemaining - item.quantity
                }
            });
            if (zoneUpdate.count === 0)
                throw new Error('Colisión de concurrencia: zona ya fue modificada.');

            // 6️ Crear ítem de orden
            const createdItem = await tx.orderItem.create({
                data: {
                    orderId: order.orderId,
                    eventId: BigInt(item.eventId),
                    eventDateId: BigInt(item.eventDateId),
                    eventDateZoneId: BigInt(allocation.eventDateZoneId),
                    eventDateZoneAllocationId: BigInt(item.allocationId),
                    quantity: item.quantity,
                    unitPrice,
                    discountAmount: subtotal - finalPrice,
                    finalPrice
                }
            });

            totalAmount += finalPrice;
            orderItems.push(createdItem);
        }

        // 7️ Actualizar total de la orden
        await tx.order.update({
            where: { orderId: order.orderId },
            data: { totalAmount }
        });

        return {
            orderId: Number(order.orderId),
            totalAmount,
            items: orderItems
        };
    });
}
