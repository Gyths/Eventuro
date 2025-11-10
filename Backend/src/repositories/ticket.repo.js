import { prisma } from '../utils/prisma.js';
import { Prisma } from '../generated/prisma/index.js';

export async function createTicketRepo(input) {
  const { orderId, discountIds = [] } = input;

  return prisma.$transaction(async (tx) => {

    const now = new Date();
    // Buscar orden pendiente
    const order = await tx.order.findUnique({

      // 1) Buscar orden pendiente con sus items
      where: { orderId },
      include: {
        items: {
          select: {
            orderItemId: true,
            eventId: true,
            eventDateId: true,
            eventDateZoneId: true,
            eventDateZoneAllocationId: true,
            quantity: true,
            seatId: true,
            unitPrice: true,
            discountAmount: true,
            finalPrice: true,
          },
        },
      },
    });

    if (!order) throw new Error('Orden no encontrada.');
    if (order.status !== 'PENDING_PAYMENT') {
      throw new Error('Solo se pueden confirmar órdenes pendientes de pago.');
    }


    // 2) Traer descuentos (validos) que se enviaron: deben existir y estar activos
    const discounts = discountIds && discountIds.length
      ? await tx.discount.findMany({
        where: {
          discountId: { in: discountIds },
          status: 'A',
          startAt: { lte: now },
          endAt: { gte: now },
        },
      })
      : [];

    // Si el front aseguró validez puede que no haga falta, pero validamos que se encontraron todos
    if (discountIds.length && discounts.length !== discountIds.length) {
      throw new Error('Uno o más descuentos no son válidos o están inactivos/expirados.');
    }

    // 3) Calcular porcentaje total (suma simple de percentages)
    //    Si quieres aplicar reglas diferentes (p. ej. max cap), agrégalas aquí.
    const totalPercent = discounts.reduce((acc, d) => acc + Number(d.percentage || 0), 0);
    const multiplier = 1 - totalPercent / 100; // ej. 0.70 para 30


    // 4) Reducir availableQty por cada descuento (solo 1 unidad por orden, como pediste)
    for (const d of discounts) {
      if (d.availableQty !== null && d.availableQty !== undefined) {
        const dec = Number(d.availableQty) - 1; // solo 1 por orden
        await tx.discount.update({
          where: { discountId: d.discountId },
          data: {
            availableQty: dec,
            status: dec <= 0 ? 'I' : 'A',
          },
        });
        // actualizar el objeto local por si lo necesitamos luego
        d.availableQty = dec;
        d.status = dec <= 0 ? 'I' : 'A';
      }
    }

    const createdTickets = [];
    let newOrderTotal = 0;

    // Recorrer los items de la orden y aplicamos descuentos por item
    for (const item of order.items) {
      const {
        orderItemId,
        eventId,
        eventDateId,
        eventDateZoneId,
        eventDateZoneAllocationId,
        seatId,
        quantity,
      } = item;

      const oldFinal = Number(item.finalPrice); // finalPrice guardado al crear la orden
      const newFinal = Number((oldFinal * multiplier).toFixed(2)); // aplicar totalPct al finalPrice del item
      const newDiscountAmount = Number((oldFinal - newFinal).toFixed(2)); // cuanto se descontó en este item
      const newUnitPrice = Number((newFinal / Number(quantity)).toFixed(2)); // nuevo precio unitario con su descuento aplicado

      // Actualizamos el orderItem con los nuevos valores
      await tx.orderItem.update({
        where: { orderItemId },
        data: {
          unitPrice: new Prisma.Decimal(newUnitPrice.toFixed(2)),
          discountAmount: new Prisma.Decimal(newDiscountAmount.toFixed(2)),
          finalPrice: new Prisma.Decimal(newFinal.toFixed(2)),
        },
      });

      // Crear tickets usando el nuevo unit price (pricePaid)
      const pricePerTicket = newUnitPrice;

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
            pricePaid: new Prisma.Decimal(pricePerTicket.toFixed(2)),
            currency: 'PEN'
          }
        });

        createdTickets.push(ticket);

        //Eliminar cualquier hold asociado al asiento (Falta discutirlo)
        /*await tx.hold.deleteMany({
            where: { seatId: item.seatId }
        });*/

      } else {
        // 2️) Si no tiene seatId → crear quantity tickets sin asiento (zonas generales)
        for (let i = 0; i < Number(quantity); i++) {
          const ticket = await tx.ticket.create({
            data: {
              orderItemId,
              eventId,
              eventDateId,
              eventDateZoneId,
              eventDateZoneAllocationId,
              ownerUserId: order.buyerUserId,
              pricePaid: new Prisma.Decimal(pricePerTicket.toFixed(2)),
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
      newOrderTotal += newFinal;
    }

    // 6) Actualizar la orden: nuevo total y estado PAID
    await tx.order.update({
      where: { orderId },
      data: {
        totalAmount: new Prisma.Decimal(newOrderTotal.toFixed(2)),
        status: 'PAID'
      }
    });

    const ticketsWithInfo = await tx.ticket.findMany({
      where: {
        ticketId: { in: createdTickets.map(t => t.ticketId) },
      },
      include: {
        eventDate: {
          include: { event: true },
        },
        zone: true,
        seat: true,
      },
    });

    return {
      orderId: Number(orderId),
      totalAmount: newOrderTotal,
      tickets: ticketsWithInfo.map(t => ({
        ticketId: Number(t.ticketId),
        eventName: t.eventDate.event.title,
        eventDate: t.eventDate.startAt,
        zoneName: t.zone?.name || 'No definida',
        setRow: t.seat?.row,
        setCol: t.seat?.col,
        seatId: t.seatId ? Number(t.seatId) : null,
        status: t.status
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

export async function setTicketToRefund(ticketid) {
  return prisma.ticket.update({
    where: { ticketId: ticketid },
    data: {
      refundStatus: 'REQUESTED',
      refundRequestedAt: new Date()
    }
  });
}

export async function getRefundList(organizerId) {
  return prisma.ticket.findMany({
    where: {
      eventDate: {
        is: {
          event: {
            organizerId
          }
        }
      },
      refundStatus: 'REQUESTED'
    },
    select: {
      ticketId: true,
      eventDate: {
        select: {
          event: {
            select: { title: true }
          }
        }
      },
      owner: {
        select: {
          name: true,
          lastName: true,
          email: true
        }
      },
      refundRequestedAt: true
    }
  });
}

export async function approveTicketRefund(ticketId) {
  return prisma.$transaction(async (tx) => {
    // Buscar el ticket y su zona
    const ticket = await tx.ticket.findUnique({
      where: { ticketId },
      include: { zone: true, seat: true },
    });

    if (!ticket) throw new Error("Ticket no encontrado.");

    // 1. Marcar el ticket como reembolsado
    await tx.ticket.update({
      where: { ticketId },
      data: {
        refundStatus: "APPROVED",
      },
    });

    // 2. Liberar capacidad o asiento
    if (ticket.seatId) {
      // Si es un asiento numerado, liberar el asiento
      await tx.seat.update({
        where: { seatId: ticket.seatId },
        data: {
          status: "AVAILABLE",
          holdUntil: null,
        },
      });
    } else {
      // Si es zona general, devolver la capacidad
      await tx.eventDateZone.update({
        where: { eventDateZoneId: ticket.eventDateZoneId },
        data: {
          capacityRemaining: { increment: 1 },
        },
      });
    }

    return { success: true, ticketId: Number(ticketId) };
  });
}

export async function rejectTicketRefund(ticketId) {
  return prisma.ticket.update({
    where: { ticketId },
    data: {
      refundStatus: 'REJECTED'
    }
  });
}


function toBigIntIfPossible(v) {
  if (v === null || v === undefined) return v;
  if (typeof v === "bigint") return v;
  try { return BigInt(v); } catch { return v; }
}

/* ================= Where builder ================= */
export function buildWhere(params) {
  const { userId, eventId, status, refundStatus, search } = params;

  const where = {
    OR: [
      { ownerUserId: toBigIntIfPossible(userId) },
      {
        item: {
          is: {
            order: {
              is: {
                buyerUserId: toBigIntIfPossible(userId),
              },
            },
          },
        },
      },
    ],
  };

  if (eventId != null) {
    where.eventDate = { is: { eventId: toBigIntIfPossible(eventId) } };
  }

  if (status) where.status = status;
  if (refundStatus) where.refundStatus = refundStatus;

  if (search && search.trim()) {
    const q = search.trim();
    where.AND = [
      {
        OR: [
          { eventDate: { is: { event: { is: { title: { contains: q, mode: "insensitive" } } } } } },
          { zone: { is: { name: { contains: q, mode: "insensitive" } } } },
          { allocation: { is: { audienceName: { contains: q, mode: "insensitive" } } } },
        ],
      },
    ];
  }

  return where;
}

/* ================= Select alineado al schema ================= */
const ticketSelect = {
  ticketId: true,
  status: true,
  refundStatus: true,
  refundRequestedAt: true,
  pricePaid: true,
  currency: true,
  issuedAt: true,

  eventDate: {
    select: {
      eventDateId: true,
      startAt: true,
      endAt: true,
      event: {
        select: {
          eventId: true,
          title: true,
          imagePrincipalKey: true,
          imageBannerKey: true,
          inPerson: true,
          imagePrincipalKey: true,   // <-- IMPORTANTE
          imageBannerKey: true,
          accessPolicy: true,
          accessPolicyDescription: true,
          venue: {
            select: {
              venueId: true,
              city: true,
              address: true,
              addressUrl: true,
              reference: true,
              capacity: true,
            },
          },
        },
      },
    },
  },

  zone: {
    select: {
      eventDateZoneId: true,
      name: true,
      kind: true,
      currency: true,
    },
  },

  allocation: {
    select: {
      eventDateZoneAllocationId: true,
      audienceName: true,
      discountType: true,
      discountValue: true,
    },
  },

  seat: {
    select: {
      seatId: true,
      rowNumber: true,
      colNumber: true,
    },
  },

  item: {
    select: {
      order: {
        select: {
          orderId: true,
          createdAt: true,
          totalAmount: true,
          currency: true,
          buyerUserId: true,
        },
      },
    },
  },

  owner: {
    select: {
      userId: true,
      name: true,
      lastName: true,
    },
  },

  ownerUserId: true,
};

/* ================= Queries ================= */
export async function getMyTicketsRepo(params) {
  const { page = 1, pageSize = 50 } = params;
  const where = buildWhere(params);

  return prisma.ticket.findMany({
    where,
    select: ticketSelect,
    skip: (page - 1) * pageSize,
    take: pageSize,
    // Orden “por evento”: título del evento ASC, luego fecha de inicio ASC, y estabilidad por issuedAt DESC
    orderBy: [
      { eventDate: { event: { title: "asc" } } },
      { eventDate: { startAt: "asc" } },
      { issuedAt: "desc" },
    ],
  });
}

export async function countMyTicketsRepo(params) {
  const where = buildWhere(params);
  return prisma.ticket.count({ where });
}
