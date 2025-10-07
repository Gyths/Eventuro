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
 *   discounts?: any[] // opcional - no implementado en detalle
 */
export async function createOrderRepo(input) {

    return prisma.$transaction(async (tx) => {

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

        // 2) Recorremos items (cada item = allocation+zona con/sin seat(s))
        for (const item of input.items) {
            // Validamos que el evento exista
            const eventId = BigInt(item.eventId);
            const event = await tx.event.findUnique({
                where: { eventId },
                select: { eventId: true }
            });
            if (!event) {
                throw new Error('El evento indicado no existe.');
            }

            // Validamos que el evento tenga la fecha indicada
            const eventDateId = BigInt(item.eventDateId);
            const eventDate = await tx.eventDate.findUnique({
                where: { eventDateId },
                select: { eventId: true }
            });
            if (!eventDate) {
                throw new Error('La fecha de evento no existe.');
            }
            if (BigInt(eventDate.eventId) !== eventId) {
                throw new Error('La fecha seleccionada no pertenece al evento indicado.');
            }

            const eventDateZoneId = BigInt(item.eventDateZoneId);
            const quantity = parseInt(item.quantity || 0);
            if (!quantity || quantity <= 0) throw new Error('Quantity debe ser mayor a 0');

            // a) Obtener info de la zona y (opcional) allocation
            const zone = await tx.eventDateZone.findUnique({
                where: { eventDateZoneId },
                select: {
                    eventDateZoneId: true,
                    eventDateId: true,
                    capacityRemaining: true,
                    basePrice: true,
                    currency: true,
                    kind: true,
                    seatMapId: true // para validar seatId
                }
            });

            if (!zone) throw new Error('Zona no encontrada');
            if (BigInt(zone.eventDateId) !== eventDateId) {
                throw new Error('La zona seleccionada no pertenece a la fecha indicada.');
            }

            // Validamos que el evento tenga una fase de venta activa y que el proceso de compra se realiza durante el rango de 
            // fechas de la fase activa
            const now = new Date();
            const activePhase = await tx.eventSalesPhase.findFirst({
                where: {
                    eventId,
                    active: true,
                    startAt: { lte: now }, //la fecha de inicio debe ser menor o igual a "ahora"
                    OR: [
                        { endAt: null }, //la fecha de fin puede ser null (sin fin)
                        { endAt: { gte: now } } //o la fecha de fin debe ser mayor o igual a "ahora"
                    ]
                },
                select: {
                    eventSalesPhaseId: true,
                    name: true
                }
            });
            if (!activePhase || (activePhase.endAt && now > activePhase.endAt)) {
                throw new Error('La fase de venta ha terminado. No se pueden procesar compras.');
            }

            // VALIDACIÓN DE TIPO DE ZONA DEL EVENTO PARA SABER SI SE DEBEN COMPRAR ASIENTOS
            if (zone.kind === 'SEATED' && !item.seatId) {
                throw new Error(
                    `La zona seleccionada (${zone.eventDateZoneId}) es numerada, se debe especificar un asiento.`
                );
            }

            if (zone.kind === 'GENERAL' && item.seatId) {
                throw new Error(
                    `La zona seleccionada (${zone.eventDateZoneId}) es general (sin asientos), no debe incluir uno.`
                );
            }

            // Forzar moneda PEN - si la zone.currency no es PEN, aborta la compra
            if (zone.currency !== 'PEN') {
                throw new Error('Solo se permiten órdenes en soles peruanos (PEN).');
            }

            // Verificar capacityRemaining suficiente en la zona (comprobación temprana)
            if ((zone.capacityRemaining ?? 0) < quantity) {
                throw new Error('No hay suficiente capacidad en la zona seleccionada.');
            }

            // b) Si viene allocationId -> validamos que perteneza a la zona
            let allocation = null;
            if (item.eventDateZoneAllocationId) {
                const allocationId = BigInt(item.eventDateZoneAllocationId);
                allocation = await tx.eventDateZoneAllocation.findUnique({
                    where: { eventDateZoneAllocationId: allocationId },
                    select: {
                        eventDateZoneAllocationId: true,
                        eventDateZoneId: true,
                        remainingQuantity: true,
                        allocatedQuantity: true,
                        discountPercent: true,
                        eventDateZoneId: true
                    }
                });

                if (!allocation) throw new Error('Allocation no encontrada');

                // Validar que la allocation pertenezca a la zona pedida
                if (BigInt(allocation.eventDateZoneId) !== eventDateZoneId) {
                    throw new Error('La allocation no pertenece a la zona seleccionada.');
                }

                // Comprobar cantidad en allocation (si remainingQuantity es null => lo tratamos como 0)
                if ((allocation.remainingQuantity ?? 0) < quantity) {
                    throw new Error('No hay suficiente disponibilidad en la allocation seleccionada.');
                }
            }

            // c) Si viene seatId -> numerado, quantity normalmente será 1 por asiento,
            // pero permitimos quantity >1 si client envía múltiples items.
            let seat = null;
            if (item.seatId) {
                // Verificamos que el asiento exista y esté disponible
                const seatId = BigInt(item.seatId);
                seat = await tx.seat.findUnique({
                    where: { seatId },
                    select: { status: true, seatId: true, seatMapId: true }
                });
                if (!seat) throw new Error('Asiento no encontrado');
                if (seat.status !== 'AVAILABLE') throw new Error('Asiento no disponible');

                // Validar que el asiento pertenezca al seatMap de la zona
                if (seat.seatMapId === null || zone.seatMapId === null) {
                    throw new Error('Error de configuración: seatMap faltante en asiento o zona.');
                }
                if (BigInt(seat.seatMapId) !== BigInt(zone.seatMapId)) {
                    throw new Error('El asiento no pertenece a la zona seleccionada.');
                }
            }

            // d) Control de concurrencia mediante OCC (optimistic concurrency control):
            // Orden de operaciones:
            //  1) Si seat -> intentar marcar asiento (updateMany) para validar ocupación atómica
            //  2) Si allocation -> updateMany sobre allocation.remainingQuantity (OCC)
            //  3) updateMany sobre zone.capacityRemaining (OCC)
            //
            // Todo dentro de la transacción tx: si alguno falla se hace rollback.

            // 1)Control de concurrencia SOLO para asientos numerados
            if (item.seatId) {
                const seatId = BigInt(item.seatId);

                const seatUpdate = await tx.seat.updateMany({
                    where: {
                        seatId,
                        status: 'AVAILABLE' // solo actualiza si sigue disponible
                    },
                    data: {
                        status: 'SOLD' // o 'HELD', según el flujo (falta analizar)
                    }
                });

                if (seatUpdate.count === 0) {
                    throw new Error('Colisión: el asiento fue tomado por otro usuario, reintente.');
                }

                // Forzar actualización de timestamp:
                await tx.seat.update({
                    where: { seatId },
                    data: { updatedAt: new Date() }
                });
            }


            // 2 y 3) Para zonas y allocations:
            // En caso exista allocation -> updateMany on allocation.remainingQuantity
            // aqui updateMany solo debería afectar 1 fila y eso es en caso de que la cantidad restante
            // se mantenga igual (no haya sido modificada por otra transacción)
            if (allocation) {
                const allocUpdate = await tx.eventDateZoneAllocation.updateMany({
                    where: {
                        eventDateZoneAllocationId: BigInt(allocation.eventDateZoneAllocationId),
                        remainingQuantity: allocation.remainingQuantity //este es el control de concurrencia
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

                // Forzar actualización de timestamp
                await tx.eventDateZoneAllocation.update({
                    where: { eventDateZoneAllocationId: BigInt(allocation.eventDateZoneAllocationId) },
                    data: { updatedAt: new Date() }
                });
            }

            // Actualizar la zona total capacityRemaining (OCC)
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
            await tx.eventDateZone.update({
                where: { eventDateZoneId },
                data: { updatedAt: new Date() }
            });

            // e) calcular precios (usar basePrice de zone y descuento de allocation)
            const unitPrice = Number(zone.basePrice);
            let discountPercent = allocation ? Number(allocation.discountPercent || 0) : 0;
            const subtotal = unitPrice * quantity;
            const finalPrice = subtotal * (1 - discountPercent / 100);
            const discountAmount = subtotal - finalPrice;

            // f) crear orderItem
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

            //Total de la orden
            totalAmount += finalPrice;
            createdOrderItems.push(createdItem);

            // g) crear ticket(s)
            // Si seatId presente: crear 1 ticket por item (seat específico)
            // Si no seatId pero quantity > 0: crear quantity tickets sin seat asignado
            if (item.seatId) {
                //un ticket por asiento
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
                // crear N tickets sin seat (repartimos precio)
                const perTicket = Number((finalPrice / quantity).toFixed(2));
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
                            pricePaid: new Prisma.Decimal(perTicket),
                            currency: 'PEN'
                        }
                    });
                    createdTickets.push(ticket);
                }
            }

        }

        // Actualizar total de la orden
        await tx.order.update({
            where: { orderId: order.orderId },
            data: {
                totalAmount: new Prisma.Decimal(totalAmount),
                updatedAt: new Date(),
                status: 'PAID' //Marcar status PENDING_PAYMENT o PAID
            }
        });

        return {
            orderId: Number(order.orderId),
            totalAmount,
            items: createdOrderItems.map(i => ({ orderItemId: BigInt(i.orderItemId) })),
            tickets: createdTickets.map(t => ({ ticketId: BigInt(t.ticketId) }))
        };
    });
}
