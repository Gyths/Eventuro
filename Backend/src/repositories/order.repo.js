// src/repositories/order.repo.js
import { prisma } from "../utils/prisma.js";
import { Prisma } from "../generated/prisma/index.js";

// Crear una orden con subcategorías (EventDateZoneAllocation)
export async function createOrderRepo(input) {
  return prisma.$transaction(async (tx) => {
    const buyerUserId = BigInt(input.buyerUserId);

    // Crear orden base
    const order = await tx.order.create({
      data: {
        buyerUserId,
        currency: "PEN",
        status: "CREATED",
        totalAmount: 0,
      },
      select: { orderId: true },
    });

    let totalAmount = 0;
    const createdOrderItems = [];

    for (const item of input.items) {
      const eventId = BigInt(item.eventId);
      const eventDateId = BigInt(item.eventDateId);
      const eventDateZoneId = BigInt(item.eventDateZoneId);
      const allocationId = item.eventDateZoneAllocationId
        ? BigInt(item.eventDateZoneAllocationId)
        : null;
      const quantity = parseInt(item.quantity || 0);

      if (!quantity || quantity <= 0)
        throw new Error("Quantity debe ser mayor a 0");

      // Validar zona
      const zone = await tx.eventDateZone.findUnique({
        where: { eventDateZoneId },
        select: {
          eventDateZoneId: true,
          eventDateId: true,
          capacityRemaining: true,
          basePrice: true,
          currency: true,
          kind: true,
          seatMapId: true,
        },
      });
      if (!zone) throw new Error("Zona no encontrada");
      if (BigInt(zone.eventDateId) !== eventDateId)
        throw new Error("La zona seleccionada no pertenece a la fecha indicada.");
      if (zone.currency !== "PEN")
        throw new Error("Solo se permiten órdenes en soles peruanos (PEN).");
      if ((zone.capacityRemaining ?? 0) < quantity)
        throw new Error("No hay suficiente capacidad en la zona seleccionada.");

      // Validar subcategoría (allocation)
      let allocation = null;
      if (allocationId) {
        allocation = await tx.eventDateZoneAllocation.findUnique({
          where: { eventDateZoneAllocationId: allocationId },
          select: {
            eventDateZoneAllocationId: true,
            eventDateZoneId: true,
            audienceName: true,
            discountType: true,
            discountValue: true,
            remainingQuantity: true,
            allocatedQuantity: true,
          },
        });
        if (!allocation)
          throw new Error("Subcategoría no encontrada.");
        if (BigInt(allocation.eventDateZoneId) !== eventDateZoneId)
          throw new Error("La subcategoría no pertenece a la zona indicada.");
        if (
          allocation.remainingQuantity != null &&
          allocation.remainingQuantity < quantity
        ) {
          throw new Error("No hay capacidad suficiente en la subcategoría seleccionada.");
        }
      }

      // Validar asientos si aplica
      let seat = null;
      if (zone.kind === "SEATED") {
        if (!item.seatId) throw new Error("Debe especificar un asiento.");
        const seatId = BigInt(item.seatId);
        seat = await tx.seat.findUnique({
          where: { seatId },
          select: { seatId: true, seatMapId: true, status: true },
        });
        if (!seat) throw new Error("Asiento no encontrado");
        if (seat.status !== "AVAILABLE")
          throw new Error("Asiento no disponible.");
        if (BigInt(seat.seatMapId) !== BigInt(zone.seatMapId))
          throw new Error("El asiento no pertenece a la zona seleccionada.");
      }

      // Control de concurrencia
      const holdExpiration = new Date(Date.now() + 5 * 60 * 1000);

      if (seat) {
        const updated = await tx.seat.updateMany({
          where: { seatId: seat.seatId, status: "AVAILABLE" },
          data: { status: "HELD", holdUntil: holdExpiration },
        });
        if (updated.count === 0)
          throw new Error("El asiento fue reservado por otro usuario.");

        await tx.hold.create({
          data: {
            eventDateId,
            eventDateZoneId,
            seatId: seat.seatId,
            quantity: 1,
            buyerUserId,
            expiresAt: holdExpiration,
          },
        });
      } else {
        await tx.hold.create({
          data: {
            eventDateId,
            eventDateZoneId,
            quantity,
            buyerUserId,
            expiresAt: holdExpiration,
          },
        });
      }

      // Actualizar capacidad de zona
      const zoneUpdate = await tx.eventDateZone.updateMany({
        where: { eventDateZoneId, capacityRemaining: zone.capacityRemaining },
        data: {
          capacityRemaining: zone.capacityRemaining - quantity,
          updatedAt: new Date(),
        },
      });
      if (zoneUpdate.count === 0)
        throw new Error("Colisión: la zona fue modificada, reintente.");

      // Actualizar subcategoría si aplica
      if (allocation) {
        await tx.eventDateZoneAllocation.update({
          where: { eventDateZoneAllocationId: allocation.eventDateZoneAllocationId },
          data: {
            remainingQuantity:
              allocation.remainingQuantity != null
                ? allocation.remainingQuantity - quantity
                : undefined,
            allocatedQuantity:
              allocation.allocatedQuantity != null
                ? allocation.allocatedQuantity + quantity
                : undefined,
            updatedAt: new Date(),
          },
        });
      }

      // Calcular precio con descuento (si aplica)
      const unit = Number(zone.basePrice);
      let discount = 0;
      if (allocation?.discountType === "PERCENTAGE") {
        discount = unit * Number(allocation.discountValue) / 100;
      } else if (allocation?.discountType === "FIXED") {
        discount = Number(allocation.discountValue);
      }

      const unitPrice = unit;
      const finalUnit = Math.max(0, unit - discount);
      const finalPrice = finalUnit * quantity;

      // Crear orderItem con allocation
      const createdItem = await tx.orderItem.create({
        data: {
          orderId: order.orderId,
          eventId,
          eventDateId,
          eventDateZoneId,
          eventDateZoneAllocationId: allocationId ?? undefined,
          quantity,
          seatId: item.seatId ? BigInt(item.seatId) : undefined,
          unitPrice: new Prisma.Decimal(unitPrice),
          discountAmount: new Prisma.Decimal(discount * quantity),
          finalPrice: new Prisma.Decimal(finalPrice),
        },
      });

      createdOrderItems.push({
        orderItemId: Number(createdItem.orderItemId),
        zoneRemaining: zone.capacityRemaining - quantity,
      });

      totalAmount += finalPrice;
    }

    // Actualizar total
    await tx.order.update({
      where: { orderId: order.orderId },
      data: {
        totalAmount: new Prisma.Decimal(totalAmount),
        status: "PENDING_PAYMENT",
        updatedAt: new Date(),
      },
    });

    return {
      orderId: Number(order.orderId),
      totalAmount,
      items: createdOrderItems,
    };
  });
}

// Cancelar orden (igual que antes)
export async function cancelOrderRepo(orderId) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { orderId },
      include: { items: true },
    });
    if (!order) throw new Error("Orden no encontrada.");
    if (!["CREATED", "PENDING_PAYMENT"].includes(order.status))
      throw new Error("Solo pueden cancelarse órdenes pendientes o recién creadas.");

    for (const item of order.items) {
      const { seatId, quantity, eventDateZoneId } = item;

      if (seatId) {
        await tx.seat.updateMany({
          where: { seatId, status: "HELD" },
          data: { status: "AVAILABLE", holdUntil: null, updatedAt: new Date() },
        });
        await tx.hold.deleteMany({ where: { seatId } });
      } else {
        const zone = await tx.eventDateZone.findUnique({
          where: { eventDateZoneId },
          select: { capacityRemaining: true },
        });
        if (zone) {
          await tx.eventDateZone.update({
            where: { eventDateZoneId },
            data: {
              capacityRemaining: zone.capacityRemaining + quantity,
              updatedAt: new Date(),
            },
          });
        }
        await tx.hold.deleteMany({
          where: { eventDateZoneId, buyerUserId: order.buyerUserId },
        });
      }
    }

    await tx.order.update({
      where: { orderId },
      data: { status: "CANCELLED", updatedAt: new Date() },
    });

    return { orderId: Number(orderId), status: "CANCELLED" };
  });
}

// Buscar órdenes por usuario
export const findByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: { buyerUserId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          Ticket: true,
          eventDate: {
            include: {
              event: {
                select: {
                  title: true,
                  description: true,
                  inPerson: true,
                  venue: {
                    select: {
                      city: true,
                      address: true,
                      addressUrl: true,
                    },
                  },
                  categories: {
                    include: {
                      category: { select: { description: true } },
                    },
                  },
                },
              },
            },
          },
          zone: { select: { name: true, kind: true } },
          allocation: { select: { audienceName: true } },
          seat: { select: { rowNumber: true, colNumber: true } },
        },
      },
    },
  });
};
