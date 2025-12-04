import { faker } from "@faker-js/faker";

export default async function insertOrders(prisma) {
  const events = await prisma.event.findMany();
  const users = await prisma.user.findMany();

  const targetEvents = events.slice(4, events.length);
  const maxTicketsPerOrder = 4;

  const minSales = 200;
  const maxSales = 800;

  for (const event of targetEvents) {
    const targetSales = faker.number.int({ min: minSales, max: maxSales });

    const eventDates = await prisma.eventDate.findMany({
      where: { eventId: event.eventId },
      include: { zoneDates: true },
    });

    let sold = 0;
    let attempts = 0;

    while (sold < targetSales && attempts < targetSales * 4) {
      attempts++;

      const user = pickRandomUser(users);
      const { zone, eventDate } = pickRandomEventDateZone(eventDates);

      const requestedQty = Math.ceil(Math.random() * maxTicketsPerOrder);

      const allowed = await computeAllowedPurchase(prisma, user.userId, event, zone, requestedQty);

      if (allowed > 0) {
        await createOrderWithTickets(prisma, user.userId, event, zone, eventDate, allowed);
        sold += allowed;
      }
    }

    console.log(`Evento ${event.eventId}: vendidos ${sold}/${targetSales}`);
  }
}

/* ----------------------- SELECCIONAR ALLOCATION ALEATORIO ----------------------- */

async function pickRandomAllocation(prisma, eventDateZoneId) {
  const allocations = await prisma.eventDateZoneAllocation.findMany({
    where: { eventDateZoneId },
  });

  if (allocations.length === 0) return null;

  return allocations[Math.floor(Math.random() * allocations.length)];
}

/* ----------------------- GENERADOR DE FECHAS ISSUEDAT ----------------------- */

function randomIssuedAt(eventDate) {
  const eventStart = new Date(eventDate.startAt);
  const earliest = new Date(eventStart.getTime() - 60 * 24 * 60 * 60 * 1000);
  const latest = new Date(eventStart.getTime() - 1 * 60 * 60 * 1000);

  const randomTime = earliest.getTime() + Math.random() * (latest.getTime() - earliest.getTime());

  return new Date(randomTime);
}

/* ----------------------- HELPERS RANDOM ----------------------- */

function pickRandomUser(users) {
  return users[Math.floor(Math.random() * users.length)];
}

function pickRandomEventDateZone(eventDates) {
  const date = eventDates[Math.floor(Math.random() * eventDates.length)];
  const zone = date.zoneDates[Math.floor(Math.random() * date.zoneDates.length)];

  return { zone, eventDate: date };
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

async function createOrderWithTickets(prisma, userId, event, zone, eventDate, quantity) {
  const unitPrice = Number(zone.basePrice);
  const totalAmount = unitPrice * quantity;

  // 1. Intentar actualizar capacidad de zona de forma segura
  const safeUpdate = await prisma.eventDateZone.updateMany({
    where: {
      eventDateZoneId: zone.eventDateZoneId,
      capacityRemaining: { gte: quantity },
      quantityTicketsReleased: { gte: quantity },
    },
    data: {
      capacityRemaining: { decrement: quantity },
      quantityTicketsReleased: { decrement: quantity },
    },
  });

  if (safeUpdate.count === 0) return null;

  // 2. Seleccionar allocation aleatorio
  const allocation = await pickRandomAllocation(prisma, zone.eventDateZoneId);

  // 3. Crear orden
  const order = await prisma.order.create({
    data: {
      buyerUserId: userId,
      status: "PAID",
      currency: "PEN",
      totalAmount,
    },
  });

  // 4. Crear order item (si tu modelo soporta allocationId, agrégalo aquí)
  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: order.orderId,
      eventId: event.eventId,
      eventDateId: zone.eventDateId,
      eventDateZoneId: zone.eventDateZoneId,
      quantity,
      unitPrice,
      finalPrice: unitPrice * quantity,
      eventDateZoneAllocationId: allocation?.eventDateZOneAllocationId ?? null,
    },
  });

  // 5. Tickets
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
      issuedAt: randomIssuedAt(eventDate),
      eventDateZoneAllocationId: allocation?.eventDateZoneAllocationId ?? null,
    });
  }

  await prisma.ticket.createMany({ data: ticketsData });

  // 6. Actualizar fase
  await prisma.eventSalesPhase.updateMany({
    where: { eventId: event.eventId, active: true },
    data: {
      quantityTicketsSold: { increment: quantity },
    },
  });

  return order;
}
