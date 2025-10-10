import { prisma } from '../utils/prisma.js';
import { Prisma } from '../generated/prisma/index.js';

//Módulo para crear una orden de compra
export async function createOrderRepo(input) {

    return prisma.$transaction(async (tx) => {

        const buyerUserId = BigInt(input.buyerUserId);

        // Creación de orden base (moneda forzada a PEN)
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

        // Recorrido de items de la orden (cada item puede ser zona general o numerada, con/sin allocation)
        for (const item of input.items) {

            // Validar que el evento exista
            const eventId = BigInt(item.eventId);
            const event = await tx.event.findUnique({
                where: { eventId },
                select: { eventId: true }
            });
            if (!event) {
                throw new Error('El evento indicado no existe.');
            }


            // Validar que el evento tenga una fecha existente y que esta pertenezca al evento
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


            // Validar que la cantidad de items a comprar sea mayor a 0
            const quantity = parseInt(item.quantity || 0);
            if (!quantity || quantity <= 0) throw new Error('Quantity debe ser mayor a 0');


            // Validar que la zona exista y que esta pertenezca a la fecha del evento
            const eventDateZoneId = BigInt(item.eventDateZoneId);

            const zone = await tx.eventDateZone.findUnique({
                where: { eventDateZoneId },
                select: {
                    eventDateZoneId: true,
                    eventDateId: true,
                    capacityRemaining: true,
                    basePrice: true,
                    currency: true,
                    kind: true,
                    seatMapId: true
                }
            });

            if (!zone) throw new Error('Zona no encontrada');
            if (BigInt(zone.eventDateId) !== eventDateId) {
                throw new Error('La zona seleccionada no pertenece a la fecha indicada.');
            }


            // Validar que el evento tenga una fase de venta activa y que el proceso de  
            // compra se realiza durante el rango de fechas de la fase activa

            /*NO BORRAR: COMENTADO HASTA CORREGIR LA ZONA HORARIA EN EL SCHEMA.PRISMA
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
            */


            // Validar tipo de zona del evento
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


            // Forzar moneda PEN (si la zone.currency no es PEN, aborta la compra)
            if (zone.currency !== 'PEN') {
                throw new Error('Solo se permiten órdenes en soles peruanos (PEN).');
            }

            // Verificar capacityRemaining suficiente en la zona
            if ((zone.capacityRemaining ?? 0) < quantity) {
                throw new Error('No hay suficiente capacidad en la zona seleccionada.');
            }


            // Si se recibe un allocationId
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

                // Comprobar cantidad en allocation
                if ((allocation.remainingQuantity ?? 0) < quantity) {
                    throw new Error('No hay suficiente disponibilidad en la allocation seleccionada.');
                }
            }


            // Si se recibe un seatId y es zona de tipo numerado, quantity normalmente será 1 por asiento,
            // pero permitimos quantity >1 si client envía múltiples items, esto en caso de zonas de tipo
            // general
            let seat = null;
            if (item.seatId) {

                // Validar que quantity sea exactamente 1
                if (quantity !== 1) {
                    throw new Error(
                        `No puedes reservar el asiento (seatId ${item.seatId} para dos o más personas).`
                    );
                }
                // Verificar que el asiento exista y esté disponible
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

            const holdExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos
            // CONTROL DE CONCURRENCIA OCC (optimistic concurrency control):
            // Todo dentro de la transacción tx: si alguno falla se hace rollback.

            // 1)Control de concurrencia SOLO para asientos numerados: Si se recibe seatId
            if (item.seatId) {
                const seatId = BigInt(item.seatId);

                const seatUpdate = await tx.seat.updateMany({
                    where: {
                        seatId,
                        status: 'AVAILABLE' // solo actualiza si sigue disponible
                    },
                    data: {
                        status: 'HELD', // se reserva el asiento (luego se actualiza a SOLD al emitir el ticket)
                        holdUntil: holdExpiration
                    }
                });

                if (seatUpdate.count === 0) {
                    throw new Error('Colisión: el asiento fue reservado por otro usuario, reintente.');
                }

                // Crear registro en Hold
                await tx.hold.create({
                    data: {
                        eventDateId,
                        eventDateZoneId,
                        seatId,
                        quantity: 1,
                        buyerUserId,
                        expiresAt: holdExpiration
                    }
                });
            } else {
                // Crear hold por cantidad sin seatId (zonas generales)
                await tx.hold.create({
                    data: {
                        eventDateId,
                        eventDateZoneId,
                        quantity,
                        buyerUserId,
                        expiresAt: holdExpiration
                    }
                });
            }


            // 2) Control de concurrencia para allocation: Si se recibe eventDateZoneAllocationId
            if (allocation) {
                const allocUpdate = await tx.eventDateZoneAllocation.updateMany({
                    where: {
                        eventDateZoneAllocationId: BigInt(allocation.eventDateZoneAllocationId),
                        remainingQuantity: allocation.remainingQuantity
                    },
                    data: {
                        remainingQuantity: (allocation.remainingQuantity ?? 0) - quantity
                    }
                });

                if (allocUpdate.count === 0) {
                    throw new Error('Colisión: allocation fue modificada, reintente.');
                }

                // Forzar actualización de timestamp (updatedAt)
                await tx.eventDateZoneAllocation.update({
                    where: { eventDateZoneAllocationId: BigInt(allocation.eventDateZoneAllocationId) },
                    data: { updatedAt: new Date() }
                });
            }


            // 3) Control de concurrencia para zonas
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

            // Forzar actualización de timestamp (updatedAt)
            await tx.eventDateZone.update({
                where: { eventDateZoneId },
                data: { updatedAt: new Date() }
            });



            // Calcular precios (usa basePrice de zone y %descuento de allocation)
            const unitPrice = Number(zone.basePrice);
            let discountPercent = allocation ? Number(allocation.discountPercent || 0) : 0;
            const subtotal = unitPrice * quantity;
            const finalPrice = subtotal * (1 - discountPercent / 100);
            const discountAmount = subtotal - finalPrice;


            // Crear orderItem
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

            // Obtener valores actualizados después de actualizar la zona/allocation ===
            const updatedZone = await tx.eventDateZone.findUnique({
                where: { eventDateZoneId },
                select: { capacityRemaining: true }
            });

            let updatedAllocation = null;
            if (allocation) {
                updatedAllocation = await tx.eventDateZoneAllocation.findUnique({
                    where: { eventDateZoneAllocationId: allocation.eventDateZoneAllocationId },
                    select: { remainingQuantity: true }
                });
            }

            // Guardamos los valores de entradas restantes junto con el ítem
            createdOrderItems.push({
                orderItemId: Number(createdItem.orderItemId),
                remaining: {
                    zoneRemaining: updatedZone ? updatedZone.capacityRemaining : null,
                    allocationRemaining: updatedAllocation ? updatedAllocation.remainingQuantity : null
                }
            });

            //Total de la orden
            totalAmount += finalPrice;
        }

        // Actualizar total y estado de la orden
        await tx.order.update({
            where: { orderId: order.orderId },
            data: {
                totalAmount: new Prisma.Decimal(totalAmount),
                updatedAt: new Date(),
                status: 'PENDING_PAYMENT'
            }
        });


        return {
            orderId: Number(order.orderId),
            totalAmount,
            items: createdOrderItems
        };
    });
}

//Módulo para actualizar estados en caso de que un usuario cancele una orden
//y a su vez, borrar las reservas (holds) y liberar asientos o capacidad reservada
export async function cancelOrderRepo(orderId) {
    return prisma.$transaction(async (tx) => {

        const order = await tx.order.findUnique({
            where: { orderId },
            include: {
                items: true
            }
        });

        if (!order) throw new Error('Orden no encontrada.');

        if (order.status !== 'CREATED' && order.status !== 'PENDING_PAYMENT') {
            throw new Error('Solo pueden cancelarse órdenes pendientes o recién creadas.');
        }

        // Revertir los efectos de la reserva
        for (const item of order.items) {
            const {
                seatId,
                quantity,
                eventDateZoneId,
                eventDateZoneAllocationId
            } = item;

            // Liberar asiento si lo había
            if (seatId) {
                await tx.seat.updateMany({
                    where: {
                        seatId,
                        status: 'HELD'
                    },
                    data: {
                        status: 'AVAILABLE',
                        holdUntil: null,
                        updatedAt: new Date()
                    }
                });

                await tx.hold.deleteMany({
                    where: { seatId: item.seatId }
                });

            } else {
                // Restaurar capacidad de zona
                await tx.eventDateZone.update({
                    where: { eventDateZoneId },
                    data: {
                        capacityRemaining: (zone.capacityRemaining ?? 0) + quantity,
                        updatedAt: new Date()
                    }
                });

                // Restaurar allocation si aplica
                if (eventDateZoneAllocationId) {
                    await tx.eventDateZoneAllocation.update({
                        where: { eventDateZoneAllocationId },
                        data: {
                            remainingQuantity: (alloc.remainingQuantity ?? 0) + quantity,
                            updatedAt: new Date()
                        }
                    });
                }

                // Borrar hold
                await tx.hold.deleteMany({
                    where: {
                        eventDateZoneId: item.eventDateZoneId,
                        buyerUserId: order.buyerUserId
                    }
                });
            }


        }

        // Finalmente, actualizar la orden
        await tx.order.update({
            where: { orderId },
            data: {
                status: 'CANCELLED',
                updatedAt: new Date()
            }
        });

        return { orderId: Number(orderId), status: 'CANCELLED' };
    });
}
