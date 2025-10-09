import { prisma } from '../utils/prisma.js';
import { Prisma } from '../generated/prisma/index.js';

export async function createTicketRepo(input) {
    const { orderId } = input;

    return prisma.$transaction(async (tx) => {
        // Buscar orden pendiente
        const order = await tx.order.findUnique({
            where: { orderId },
            include: {
                items: true
            }
        });

        if (!order) throw new Error('Orden no encontrada.');

        if (order.status !== 'PENDING_PAYMENT') {
            throw new Error('Solo se pueden confirmar órdenes pendientes de pago.');
        }

        const createdTickets = [];

        // Recorrer los items de la orden
        for (const item of order.items) {
            const {
                orderItemId,
                eventId,
                eventDateId,
                eventDateZoneId,
                eventDateZoneAllocationId,
                seatId,
                quantity,
                finalPrice
            } = item;

            const pricePerTicket = Number(finalPrice) / quantity;

            // 1️) Si tiene seatId → ticket numerado (1 ticket)
            if (seatId) {
                const seat = await tx.seat.findUnique({ where: { seatId } });

                // Esto no debería pasar ya que se supone que el asiento fue validado en la orden
                if (!seat) throw new Error('Asiento no encontrado al confirmar ticket.');

                if (seat.status !== 'HELD') {
                    throw new Error('El asiento no ha sido reservado, no puede emitirse el ticket.');
                }

                // Actualizar asiento a SOLD
                await tx.seat.update({
                    where: { seatId },
                    data: {
                        status: 'SOLD',
                        holdUntil: null,//se libera la fecha del hold
                    }
                });

                // Crear ticket
                const ticket = await tx.ticket.create({
                    data: {
                        orderItemId,
                        eventId,
                        eventDateId,
                        eventDateZoneId,
                        eventDateZoneAllocationId,
                        seatId,
                        ownerUserId: order.buyerUserId,
                        pricePaid: new Prisma.Decimal(pricePerTicket),
                        currency: 'PEN'
                    }
                });

                createdTickets.push(ticket);

                //Eliminar cualquier hold asociado al asiento (Falta discutirlo)
                /*await tx.hold.deleteMany({
                    where: { seatId: item.seatId }
                });*/

            } else {
                // 2️) Si no tiene seatId → crear tickets sin asiento (zonas generales)
                for (let i = 0; i < quantity; i++) {
                    const ticket = await tx.ticket.create({
                        data: {
                            orderItemId,
                            eventId,
                            eventDateId,
                            eventDateZoneId,
                            eventDateZoneAllocationId,
                            ownerUserId: order.buyerUserId,
                            pricePaid: new Prisma.Decimal(pricePerTicket),
                            currency: 'PEN'
                        }
                    });
                    createdTickets.push(ticket);
                }

                // Borrar hold (Falta discutirlo)
                /*await tx.hold.deleteMany({
                    where: {
                        eventDateZoneId: item.eventDateZoneId,
                        buyerUserId: order.buyerUserId
                    }
                });*/
            }
        }

        // Actualizar la orden a estado PAID 
        await tx.order.update({
            where: { orderId },
            data: {
                status: 'PAID'
            }
        });

        return {
            orderId: Number(orderId),
            tickets: createdTickets.map(t => ({
                ticketId: Number(t.ticketId),
                seatId: t.seatId ? Number(t.seatId) : null
            }))
        };
    });
}


export async function updateTicketRepo(ticketId, payload, organizerUserId) {
  return prisma.$transaction(async (tx) => {
    //Obtener el ticket y el evento asociado
    const ticket = await tx.ticket.findUnique({
      where: { ticketId },
      include: {
        eventDate: {
          include: {
            event: {
              select: { eventId: true, organizerId: true }
            }
          }
        }
      }
    });

    if (!ticket) throw new Error('Ticket no encontrado.');

    // Verificar si el usuario autenticado es el organizador del evento
    const event = ticket.eventDate.event;
    const organizer = await tx.organizer.findUnique({
      where: { organizerId: event.organizerId },
      select: { userId: true }
    });

    if (!organizer || organizer.userId !== organizerUserId) {
      throw new Error('No tienes permisos para modificar este ticket.');
    }

    // Actualizar el ticket
    const updatedTicket = await tx.ticket.update({
      where: { ticketId },
      data: {
        ...payload
      }
    });

    return updatedTicket;
  });
}
