import { faker } from "@faker-js/faker";
export default async function insertOrders(prisma) {
  const events = await prisma.event.findMany();
  const users = await prisma.user.findMany();

  const targetEvents = events.slice(3, 24); // eventos 4 al 24
  const maxTicketsPerOrder = 4;

  for (const event of targetEvents) {
    const eventDates = await prisma.eventDate.findMany({
      where: { eventId: event.eventId },
      include: { zoneDates: true },
    });

    // 20 órdenes por evento
    for (let i = 0; i < 70; i++) {
      const user = pickRandomUser(users);
      const zone = pickRandomEventDateZone(eventDates);
      const requestedQty = Math.ceil(Math.random() * maxTicketsPerOrder);

      const allowed = await computeAllowedPurchase(prisma, user.userId, event, zone, requestedQty);

      if (allowed <= 0) continue;

      await createOrderWithTickets(prisma, user.userId, event, zone, allowed);
    }
  }
}

/* ----------------------- HELPERS RANDOM ----------------------- */

function pickRandomUser(users) {
  return users[Math.floor(Math.random() * users.length)];
}

function pickRandomEventDateZone(eventDates) {
  const date = eventDates[Math.floor(Math.random() * eventDates.length)];
  const zone = date.zoneDates[Math.floor(Math.random() * date.zoneDates.length)];
  return zone;
}

/* ----------------------- LIMITES: USUARIO ----------------------- */

async function getAllowedQtyUser(prisma, userId, eventId, requestedQty) {
  const event = await prisma.event.findUnique({
    where: { eventId },
    select: { ticketLimitPerUser: true },
  });

  const limit = event.ticketLimitPerUser ?? 10;

  const alreadyOwned = await prisma.ticket.count({
    where: { ownerUserId: userId, eventId },
  });

  const remaining = limit - alreadyOwned;

  return Math.max(0, Math.min(remaining, requestedQty));
}

/* ----------------------- FASES DE VENTA ------------------------- */

async function getActivePhase(prisma, eventId) {
  return prisma.eventSalesPhase.findFirst({
    where: { eventId, active: true },
    orderBy: { startAt: "asc" },
  });
}

function getAllowedQtyPhase(phase, qty) {
  if (!phase) return qty;

  let allowed = qty;

  if (phase.ticketLimit != null) {
    const remaining = phase.ticketLimit - phase.quantityTicketsSold;
    allowed = Math.min(allowed, remaining);
  }

  if (phase.percentage != null) {
    allowed = Math.min(allowed, Number(phase.percentage));
  }

  return Math.max(0, allowed);
}

/* ----------------------- LIMITES DE ZONA ------------------------ */

function getAllowedQtyZone(zone, qty) {
  return Math.min(qty, zone.capacityRemaining, Number(zone.quantityTicketsReleased));
}

/* ----------------------- REGLAS FINALES ------------------------- */

async function computeAllowedPurchase(prisma, userId, event, zone, qty) {
  const byUser = await getAllowedQtyUser(prisma, userId, event.eventId, qty);
  if (byUser <= 0) return 0;

  const phase = await getActivePhase(prisma, event.eventId);
  const byPhase = getAllowedQtyPhase(phase, byUser);
  if (byPhase <= 0) return 0;

  const byZone = getAllowedQtyZone(zone, byPhase);
  return byZone;
}

/* ----------------------- CREAR ORDEN + ITEMS + TICKETS ------------------------ */

async function createOrderWithTickets(prisma, userId, event, zone, quantity) {
  const unitPrice = Number(zone.basePrice);
  const totalAmount = unitPrice * quantity;

  // Crear ORDEN
  const order = await prisma.order.create({
    data: {
      buyerUserId: userId,
      status: "PAID",
      currency: "PEN",
      totalAmount,
    },
  });

  // Crear ORDER ITEM
  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: order.orderId,
      eventId: event.eventId,
      eventDateId: zone.eventDateId,
      eventDateZoneId: zone.eventDateZoneId,
      quantity,
      unitPrice,
      finalPrice: unitPrice * quantity,
    },
  });

  // Crear TICKETS uno por uno
  const ticketsData = [];

  for (let i = 0; i < quantity; i++) {
    ticketsData.push({
      orderItemId: orderItem.orderItemId,
      ownerUserId: userId,
      eventId: event.eventId,
      attendeeName: faker.person.fullName(),
      attendeeDni: String(40000000 + Math.floor(Math.random() * 5000000)),
      eventDateId: zone.eventDateId,
      eventDateZoneId: zone.eventDateZoneId,
      pricePaid: unitPrice,
      currency: "PEN",
    });
  }

  await prisma.ticket.createMany({ data: ticketsData });

  // Actualizar capacidad de zona
  await prisma.eventDateZone.update({
    where: { eventDateZoneId: zone.eventDateZoneId },
    data: {
      capacityRemaining: { decrement: quantity },
      quantityTicketsReleased: { decrement: quantity },
    },
  });

  // Actualizar fase de venta activa
  await prisma.eventSalesPhase.updateMany({
    where: { eventId: event.eventId, active: true },
    data: {
      quantityTicketsSold: { increment: quantity },
    },
  });

  return order;
}
