import { prisma } from "../utils/prisma.js";

export async function listDiscountByCode(code) {
  return prisma.discount.findMany({
    where: { code },
    orderBy: { discountId: "asc" },
  });
}

export async function listDiscountsByCodes(codes) {
  if (!codes || codes.length === 0) return [];
  return prisma.discount.findMany({
    where: { code: { in: codes } },
    orderBy: { discountId: "asc" },
  });
}

export async function listDiscountByOrganizerIdRepo({ organizerId, eventId }) {
  // Si viene eventId, filtramos solo por ese evento
  if (eventId != null) {
    return prisma.discount.findMany({
      where: { eventId },
      select: {
        discountId: true,
        eventId: true,
        code: true,
        scope: true,
        percentage: true,
        initialQty: true,
        avaibleQty: true,
        appliesTo: true,
      },
      orderBy: { discountId: "asc" },
    });
  }

  // Si NO viene eventId, buscamos todos los eventos del organizador
  const events = await prisma.event.findMany({
    where: { organizerId },
    select: { eventId: true },
    orderBy: { eventId: "asc" },
  });

  const eventIds = events.map((e) => e.eventId);

  if (eventIds.length === 0) return [];

  return prisma.discount.findMany({
    where: { eventId: { in: eventIds } },
    select: {
      discountId: true,
      eventId: true,
      code: true,
      scope: true,
      percentage: true,
      initialQty: true,
      availableQty: true,
      appliesTo: true,
    },
    orderBy: { discountId: "asc" },
  });
}