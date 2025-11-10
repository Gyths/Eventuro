import { prisma } from "../utils/prisma.js";
import { Prisma } from "../generated/prisma/index.js";

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

    if (!order) throw new Error("Orden no encontrada.");
    if (order.status !== "PENDING_PAYMENT") {
      throw new Error("Solo se pueden confirmar órdenes pendientes de pago.");
    }

    // 2) Traer descuentos (validos) que se enviaron: deben existir y estar activos
    const discounts =
      discountIds && discountIds.length
        ? await tx.discount.findMany({
            where: {
              discountId: { in: discountIds },
              status: "A",
              startAt: { lte: now },
              endAt: { gte: now },
            },
          })
        : [];

    // Si el front aseguró validez puede que no haga falta, pero validamos que se encontraron todos
    if (discountIds.length && discounts.length !== discountIds.length) {
      throw new Error(
        "Uno o más descuentos no son válidos o están inactivos/expirados."
      );
    }

    // 3) Calcular porcentaje total (suma simple de percentages)
    //    Si quieres aplicar reglas diferentes (p. ej. max cap), agrégalas aquí.
    const totalPercent = discounts.reduce(
      (acc, d) => acc + Number(d.percentage || 0),
      0
    );
    const multiplier = 1 - totalPercent / 100; // ej. 0.70 para 30

    // 4) Reducir availableQty por cada descuento (solo 1 unidad por orden, como pediste)
    for (const d of discounts) {
      if (d.availableQty !== null && d.availableQty !== undefined) {
        const dec = Number(d.availableQty) - 1; // solo 1 por orden
        await tx.discount.update({
          where: { discountId: d.discountId },
          data: {
            availableQty: dec,
            status: dec <= 0 ? "I" : "A",
          },
        });
        // actualizar el objeto local por si lo necesitamos luego
        d.availableQty = dec;
        d.status = dec <= 0 ? "I" : "A";
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

      // 1) Si tiene seatId → ticket numerado (1 ticket)
      if (seatId) {
        //Validamos que exista el asiento y esté en estado HELD
        const seat = await tx.seat.findUnique({ where: { seatId } });

        // Esto no debería pasar ya que se supone que el asiento fue validado en la orden
        if (!seat)
          throw new Error("Asiento no encontrado al confirmar ticket.");

        if (seat.status !== "HELD") {
          throw new Error(
            "El asiento no ha sido reservado, no puede emitirse el ticket."
          );
        }

        // Validamos que exista una reserva asociada para dicho asiento específico
        const hold = await tx.hold.findFirst({
          where: {
            buyerUserId: order.buyerUserId,
            eventDateId,
            eventDateZoneId,
            seatId,
            createdAt: order.createdAt,
          },
        });

        if (!hold) {
          throw new Error(
            `No se encontró un hold válido para el asiento ${seatId}. No se puede generar el ticket.`
          );
        }

        // Una vez validado todo lo anterior , podemos actualizar el asiento a SOLD
        await tx.seat.update({
          where: { seatId },
          data: {
            status: "SOLD",
            holdUntil: null, //se libera la fecha del hold
          },
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
            currency: "PEN",
          },
        });

        createdTickets.push(ticket);

        //Eliminar cualquier hold asociado al asiento (Falta discutirlo)
        await tx.hold.deleteMany({
          where: { seatId: item.seatId },
        });
      } else {
        // 2) Si no tiene seatId → crear quantity tickets sin asiento (zonas generales)

        // Validar que exista una reserva para zona general(sin asientos) de dicho item de la orden
        const hold = await tx.hold.findFirst({
          where: {
            buyerUserId: order.buyerUserId,
            eventDateId,
            eventDateZoneId,
            createdAt: order.createdAt,
            quantity: Number(quantity),
          },
        });

        if (!hold) {
          throw new Error(
            `No se encontró un hold válido para la zona ${eventDateZoneId} (general).`
          );
        }

        //Una vez validado que hayan un hold, se crean los tickets
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
              currency: "PEN",
            },
          });
          createdTickets.push(ticket);
        }

        // Borrar hold
        await tx.hold.deleteMany({
          where: {
            eventDateZoneId: item.eventDateZoneId,
            buyerUserId: order.buyerUserId,
          },
        });
      }
      newOrderTotal += newFinal;
    }

    // 6) Actualizar la orden: nuevo total y estado PAID
    await tx.order.update({
      where: { orderId },
      data: {
        totalAmount: new Prisma.Decimal(newOrderTotal.toFixed(2)),
        status: "PAID",
      },
    });

    return {
      orderId: Number(orderId),
      totalAmount: newOrderTotal,
      tickets: createdTickets.map((t) => ({
        ticketId: Number(t.ticketId),
        seatId: t.seatId ? Number(t.seatId) : null,
      })),
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
              select: { eventId: true, organizerId: true },
            },
          },
        },
      },
    });

    if (!ticket) throw new Error("Ticket no encontrado.");

    // Verificar si el usuario autenticado es el organizador del evento
    const event = ticket.eventDate.event;
    const organizer = await tx.organizer.findUnique({
      where: { organizerId: event.organizerId },
      select: { userId: true },
    });

    if (!organizer || organizer.userId !== organizerUserId) {
      throw new Error("No tienes permisos para modificar este ticket.");
    }

    // Actualizar el ticket
    const updatedTicket = await tx.ticket.update({
      where: { ticketId },
      data: {
        ...payload,
      },
    });

    return updatedTicket;
  });
}

export async function setTicketToRefund(ticketid) {
  return prisma.ticket.update({
    where: { ticketId: ticketid },
    data: {
      refundStatus: "REQUESTED",
      refundRequestedAt: new Date(),
    },
  });
}

export async function getRefundList(organizerId) {
  return prisma.ticket.findMany({
    where: {
      eventDate: {
        is: {
          event: {
            organizerId,
          },
        },
      },
      refundStatus: "REQUESTED",
    },
    select: {
      ticketId: true,
      eventDate: {
        select: {
          event: {
            select: { title: true },
          },
        },
      },
      owner: {
        select: {
          name: true,
          lastName: true,
          email: true,
        },
      },
      refundRequestedAt: true,
    },
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
      refundStatus: "REJECTED",
    },
  });
}
