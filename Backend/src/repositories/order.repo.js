import { prisma } from '../utils/prisma.js';
import { Prisma } from '../generated/prisma/index.js';


/**
 * Crea la orden, items y tickets (si procede) en una sola transacción
 * usando control de concurrencia optimista (updateMany -> count).
 *
 * input = {
 *   buyerUserId?: number|string (optional si tienes req.user),
 *   items: [
 *     {
 *       eventId,
 *       eventDateId,
 *       eventDateZoneId,
 *       // Si viene allocation -> no numerado por tipo (ADULTOS/NIÑOS)
 *       eventDateZoneAllocationId?: number,
 *       // Si viene seatId -> caso numerado (asiento específico)
 *       seatId?: number,
 *       quantity: number,
 *       unitPrice?: string|number (opcional; lo calculamos desde basePrice por seguridad)
 *     }, ...
 *   ],
 *   discounts?: [ /* opcional - no implementado en detalle */
export async function createOrderRepo(input) {

    return prisma.$transaction(async (tx) => {
        // buyerUserId ya convertido a BigInt en service/controller
        const buyerUserId = BigInt(input.buyerUserId);

        // 1) Crear orden base (moneda forzada a PEN)
        const order = await tx.order.create({
            data: {
                buyerUserId,
                currency: 'PEN',
                status: 'CREATED',
                totalAmount: 0,
            },
            select: { orderId: true }
        });

        let totalAmount = 0;
        const createdOrderItems = [];
        const createdTickets = [];

        // 2) Recorremos items (cada item = allocation+zona o seat(s))
        for (const item of input.items) {
            // normalizar
            const eventId = BigInt(item.eventId);
            const eventDateId = BigInt(item.eventDateId);
            const eventDateZoneId = BigInt(item.eventDateZoneId);
            const quantity = parseInt(item.quantity || 0);
            if (!quantity || quantity <= 0) throw new Error('Quantity must be > 0');

            // a) Obtener info de la zona y (opcional) allocation
            const zone = await tx.eventDateZone.findUnique({
                where: { eventDateZoneId },
                select: {
                    eventDateZoneId: true,
                    capacityRemaining: true,
                    basePrice: true,
                    currency: true
                }
            });

            if (!zone) throw new Error('Zona no encontrada');

            // Forzar moneda PEN - si tu zone.currency no es PEN, abortar
            if (zone.currency !== 'PEN') {
                throw new Error('Solo se permiten órdenes en soles peruanos (PEN).');
            }

            // Si viene allocationId -> usamos allocation flow (tipos como ADULTOS, NIÑOS)
            let allocation = null;
            if (item.eventDateZoneAllocationId) {
                const allocationId = BigInt(item.eventDateZoneAllocationId);
                allocation = await tx.eventDateZoneAllocation.findUnique({
                    where: { eventDateZoneAllocationId: allocationId },
                    select: {
                        eventDateZoneAllocationId: true,
                        remainingQuantity: true,
                        allocatedQuantity: true,
                        discountPercent: true,
                        eventDateZoneId: true
                    }
                });

                if (!allocation) throw new Error('Allocation no encontrada');
                if ((allocation.remainingQuantity ?? 0) < quantity) {
                    throw new Error('No hay suficiente disponibilidad en la allocation seleccionada.');
                }
            }

            // Si viene seatId -> numerado, quantity normalmente será 1 por asiento,
            // pero permitimos quantity >1 si client envía múltiples items.
            if (item.seatId) {
                // Verificamos que el asiento exista y esté disponible
                const seatId = BigInt(item.seatId);
                const seat = await tx.seat.findUnique({
                    where: { seatId },
                    select: { status: true, seatId: true, seatMapId: true }
                });
                if (!seat) throw new Error('Asiento no encontrado');
                if (seat.status !== 'AVAILABLE') throw new Error('Asiento no disponible');
                // Para asientos numerados no tocamos allocation.remainingQuantity (a menos que designes allocations por asiento)
            }

            // b) Control de concurrencia mediante OCC (optimistic concurrency control):

            // Control de concurrencia SOLO para asientos numerados
            if (item.seatId) {
                const seatId = BigInt(item.seatId);

                const seatUpdate = await tx.seat.updateMany({
                    where: {
                        seatId,
                        status: 'AVAILABLE' // solo actualiza si sigue disponible
                    },
                    data: {
                        status: 'SOLD' // o 'HELD', según tu flujo
                    }
                });

                if (seatUpdate.count === 0) {
                    throw new Error('Colisión: el asiento fue tomado por otro usuario, reintente.');
                }
            }


            //Para zonas y allocations:
            // - En caso exista allocation -> updateMany on allocation.remainingQuantity
            // aqui updateMany solo debería afectar 1 fila y eso es en caso de que la cantidad restante
            // se mantenga igual (no haya sido modificada por otra transacción)
            if (allocation) {
                const allocUpdate = await tx.eventDateZoneAllocation.updateMany({
                    where: {
                        eventDateZoneAllocationId: BigInt(allocation.eventDateZoneAllocationId),
                        remainingQuantity: allocation.remainingQuantity //<-este es el control de concurrencia
                    },
                    data: {
                        remainingQuantity: (allocation.remainingQuantity ?? 0) - quantity
                    }
                });
                //si otro usuario modificó allocation, es decir, la capacidad restante diferente a la que se
                // tenía en ese momento de la transaccion del usuario actual, count será 0, ya que no se modificó ninguna fila
                if (allocUpdate.count === 0) {
                    // otra transaccion cambió allocation y se lanza error para evitar overselling
                    throw new Error('Colisión: allocation fue modificada, reintente.');
                }
            }

            // - Actualizar la zona total capacityRemaining (OCC)
            // Aqui se usa la misma lógica que antes pero manejando la capacidad total solamente guiandote
            // de la zona
            const zoneUpdate = await tx.eventDateZone.updateMany({
                where: {
                    eventDateZoneId,
                    capacityRemaining: zone.capacityRemaining
                },
                data: {
                    capacityRemaining: zone.capacityRemaining - quantity
                }
            });
            if (zoneUpdate.count === 0) throw new Error('Colisión: la zona fue modificada, reintente.');

            // c) calcular precios (usar basePrice de zone y descuento de allocation)
            const unitPrice = Number(zone.basePrice);
            let discountPercent = allocation ? Number(allocation.discountPercent || 0) : 0;
            const subtotal = unitPrice * quantity;
            const finalPrice = subtotal * (1 - discountPercent / 100);
            const discountAmount = subtotal - finalPrice;

            // d) crear orderItem
            const createdItem = await tx.orderItem.create({
                data: {
                    orderId: order.orderId,
                    eventId,
                    eventDateId,
                    eventDateZoneId,
                    eventDateZoneAllocationId: allocation ? BigInt(allocation.eventDateZoneAllocationId) : undefined,
                    quantity,
                    seatId: item.seatId ? BigInt(item.seatId) : undefined,
                    unitPrice: new Prisma.Decimal(unitPrice),
                    discountAmount: new Prisma.Decimal(discountAmount),
                    finalPrice: new Prisma.Decimal(finalPrice)

                }
            });

            totalAmount += finalPrice;
            createdOrderItems.push(createdItem);

            // e) crear ticket(s)
            // - Si seatId presente -> crear 1 ticket por item (seat específico)
            // - Si no seatId pero quantity > 0 -> crear quantity tickets sin seat asignado
            if (item.seatId) {
                const ticket = await tx.ticket.create({
                    data: {
                        orderItemId: createdItem.orderItemId,
                        eventId,
                        eventDateId,
                        eventDateZoneId,
                        eventDateZoneAllocationId: allocation ? BigInt(allocation.eventDateZoneAllocationId) : undefined,
                        seatId: BigInt(item.seatId),
                        ownerUserId: buyerUserId,
                        pricePaid: new Prisma.Decimal(finalPrice), // si quantity>1 y seatId presente, tasarlo acorde
                        currency: 'PEN'
                    }
                });
                createdTickets.push(ticket);

                // marcar asiento como SOLD (o HELD hasta pago confirmado, según tu flujo)
                await tx.seat.update({
                    where: { seatId: BigInt(item.seatId) },
                    data: { status: 'SOLD' }
                });
            } else {
                // crear N tickets sin seat
                for (let i = 0; i < quantity; i++) {
                    const ticket = await tx.ticket.create({
                        data: {
                            orderItemId: createdItem.orderItemId,
                            eventId,
                            eventDateId,
                            eventDateZoneId,
                            eventDateZoneAllocationId: allocation ? BigInt(allocation.eventDateZoneAllocationId) : undefined,
                            // seatId null
                            ownerUserId: buyerUserId,
                            pricePaid: new Prisma.Decimal((finalPrice / quantity).toFixed(2)), // repartir el total entre tickets
                            currency: 'PEN'
                        }
                    });
                    createdTickets.push(ticket);
                }
            }
        } // end for items

        // 3) Actualizar total de la orden
        await tx.order.update({
            where: { orderId: order.orderId },
            data: { totalAmount }
        });

        // 4) (Opcional) marcar status PENDING_PAYMENT o PAID según integración con pasarela
        // por ahora dejamos CREATED

        return {
            orderId: Number(order.orderId),
            totalAmount,
            items: createdOrderItems.map(i => ({ orderItemId: BigInt(i.orderItemId) })),
            tickets: createdTickets.map(t => ({ ticketId: BigInt(t.ticketId) }))
        };
    });
}
