import { prisma } from '../utils/prisma.js';
import fs from "fs";
import path from "path";
import { withAudit } from '../utils/audit.util.js';

export async function upsertUserWithGoogle({ email, googleId, name, lastName }) {
  return prisma.$transaction(async (tx) => {
    
    const existingUser = await tx.user.findUnique({
      where: { email },
    }); 
    
    const user = await tx.user.upsert({
      where: { email },
      update: { name: name ?? undefined, lastName: lastName ?? undefined },
      create: { email, name: name ?? 'Usuario', lastName: lastName ?? '' },
    });

    await tx.oAuthUser.upsert({
      where: { provider_providerUserId: { provider: 'google', providerUserId: googleId } },
      update: { userId: user.userId },
      create: { provider: 'google', providerUserId: googleId, userId: user.userId },
    });


    // Solo log si antes no existía
    if (!existingUser) {
      const logDir = path.join(process.cwd(), "log");
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

      const now = new Date();
      const fecha = now.toISOString().split("T")[0];
      const hora = now.toTimeString().split(" ")[0];
      const logFile = path.join(logDir, `${fecha}.log`);

      const logLine = `${hora} Se creó usuario "${user.name}" con email ${user.email}\n`;
      fs.appendFileSync(logFile, logLine, "utf8");
    }


    return user;
  });
}

export async function findUserByIdString(idStr) {
  return prisma.user.findUnique({
    where: { userId: BigInt(idStr) },
    select: { userId: true, name: true, lastName: true, email: true, status: true },
  });
}

export async function findByIdFull(userId) {
  return prisma.user.findUnique({
    where: { userId: Number(userId) },
    select: {
      userId: true,
      name: true,
      lastName: true,
      phone: true,
      email: true,
      birthdate: true,
      gender: true,
      status: true,
      suspendedUntil: true,
    },
    include: {
      organizer: true,
      administrator: true,
    },
  });
}

export async function findByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      userId: true,
      name: true,
      lastName: true,
      phone: true,
      email: true,
      birthdate: true,
      gender: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      password: {
        select: {
          hashedPassword: true,
        },
      },
    },
  });
}

export async function updateUserStatusRepo(actorId, {userId, data}) {
  return withAudit(actorId, async (tx) => { 
    return await tx.user.update({
      where: { userId: userId},
      data: data,
      select: {
        userId: true,
        status: true,
        suspendedUntil: true,
      }
    });
  });
}

export async function searchUsersRepo({ tokens, status, limit, cursor }) {
  const where = {
    ...(status ? { status } : {}),
    AND: tokens.map((t) => ({
      OR: [
        { name: { contains: t, mode: "insensitive" } },
        { lastName: { contains: t, mode: "insensitive" } },
      ],
    })),
  };

  const take = limit + 1;

  const users = await prisma.user.findMany({
    where,
    orderBy: { userId: "asc" },
    take,
    ...(cursor ? { cursor: { userId: cursor }, skip: 1 } : {}),
    select: {
      userId: true,
      name: true,
      lastName: true,
      email: true,
      phone: true,
      status: true,
      suspendedUntil: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const hasMore = users.length > limit;
  const items = hasMore ? users.slice(0, limit) : users;
  const nextCursor = hasMore ? String(items[items.length - 1].userId) : null;

  return { items, nextCursor };
}
