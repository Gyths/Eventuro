import { prisma } from '../utils/prisma.js';
import fs from "fs";
import path from "path";

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