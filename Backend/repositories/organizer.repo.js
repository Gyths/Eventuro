import { prisma } from "../utils/prisma.js";
// Helpers BigInt
const toBI = (v) => (typeof v === "bigint" ? v : BigInt(v));

export async function findOrganizerByUserIdRepo(userId) {
  return prisma.organizer.findUnique({
    where: { userId: toBI(userId) },
    select: { organizerId: true, status: true },
  });
}

export async function findOrganizerByIdNumberNotUserRepo(idNumber, userId) {
  return prisma.organizer.findFirst({
    where: { idNumber, NOT: { userId: toBI(userId) } },
    select: { organizerId: true },
  });
}

export async function upsertOrganizerRepo({ userId, idType, idNumber, companyName, status }) {
  return prisma.organizer.upsert({
    where: { userId: toBI(userId) },
    update: { idType, idNumber, companyName, status },
    create: { userId: toBI(userId), idType, idNumber, companyName, status },
    select: { status: true },
  });
}

export async function getUserAndAdminRepo(userId) {
  const [user, admin] = await Promise.all([
    prisma.user.findUnique({
      where: { userId: toBI(userId) },
      select: { userId: true, name: true, lastName: true, email: true },
    }),
    prisma.administrator.findUnique({
      where: { userId: toBI(userId) },
      select: { administratorId: true },
    }),
  ]);
  return { user, isAdmin: !!admin };
}
