import { prisma } from '../utils/prisma.js'
import crypto from 'crypto'

/**
 * Confirma el pago de una orden y genera los tickets asociados.
 * 
 * - Actualiza el estado de la orden a 'PAID'
 * - Crea un ticket por cada item y cantidad comprada
 * - Todo ocurre dentro de una transacción
 */
export async function confirmOrderPaymentRepo(orderId) {
  return prisma.$transaction(async (tx) => {
    // 1️ Buscar la orden y sus items
    const order = await tx.order.findUnique({
      where: { orderId: BigInt(orderId) },
      include: {
        items: true
      }
    });

    if (!order) throw new Error('Orden no encontrada.');
    if (order.status !== 'CREATED' && order.status !== 'PENDING_PAYMENT') {
      throw new Error('La orden no está disponible para pago.');
    }

    // 2️ Actualizar estado de la orden
    await tx.order.update({
      where: { orderId: order.orderId },
      data: { status: 'PAID' }
    });

    // 3️ Generar tickets
    const tickets = [];

    for (const item of order.items) {
      const quantity = item.quantity ?? 1;

      for (let i = 0; i < quantity; i++) {
        const qrCode = crypto.randomUUID();

        const ticket = await tx.ticket.create({
          data: {
            orderItemId: item.orderItemId,
            ownerUserId: order.buyerUserId,
            eventId: item.eventId,
            eventDateId: item.eventDateId,
            eventDateZoneId: item.eventDateZoneId,
            eventDateZoneAllocationId: item.eventDateZoneAllocationId ?? null,
            seatId: item.seatId ?? null,
            pricePaid: item.finalPrice,
            currency: order.currency,
            status: 'PAID',
          },
          select: {
            ticketId: true,
            eventDateId: true,
            eventDateZoneId: true,
            seatId: true,
            status: true
          }
        });

        tickets.push(ticket);
      }
    }

    return {
      orderId: Number(order.orderId),
      totalTickets: tickets.length,
      tickets
    };
  });
}
