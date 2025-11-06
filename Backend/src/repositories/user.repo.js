// src/repositories/user.repo.js
import { prisma } from "../utils/prisma.js";
import fs from "fs";
import path from "path";

/** Normaliza cualquier id (string | number | bigint) a BigInt seguro para Prisma */
function toBigIntId(x) {
  if (typeof x === "bigint") return x;
  if (typeof x === "number") return BigInt(Math.trunc(x));
  const s = String(x ?? "").trim();
  if (!/^\d+$/.test(s)) throw new Error("INVALID_ID");
  return BigInt(s);
}

/**
 * Login/registro con Google: crea o actualiza el usuario y su OAuthUser,
 * y escribe un log local si el usuario recién se creó.
 */
export async function upsertUserWithGoogle({ email, googleId, name, lastName }) {
  return prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({ where: { email } });

    const user = await tx.user.upsert({
      where: { email },
      update: {
        name: name ?? undefined,
        lastName: lastName ?? undefined,
      },
      create: {
        email,
        name: name ?? "Usuario",
        lastName: lastName ?? "",
      },
    });

    // Nota: en Prisma el modelo OAuthUser se expone como oAuthUser
    await tx.oAuthUser.upsert({
      where: { provider_providerUserId: { provider: "google", providerUserId: googleId } },
      update: { userId: user.userId },
      create: { provider: "google", providerUserId: googleId, userId: user.userId },
    });

    if (!existingUser) {
      const logDir = path.join(process.cwd(), "log");
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

      const now = new Date();
      const fecha = now.toISOString().slice(0, 10);
      const hora = now.toTimeString().slice(0, 8);
      const logFile = path.join(logDir, `${fecha}.log`);

      const logLine = `${hora} Se creó usuario "${user.name}" con email ${user.email}\n`;
      fs.appendFileSync(logFile, logLine, "utf8");
    }

    return user;
  });
}

/** Búsqueda liviana por id en string (p. ej., para headers/UI) */
export async function findUserByIdString(idStr) {
  const id = toBigIntId(idStr);
  return prisma.user.findUnique({
    where: { userId: id },
    select: {
      userId: true,
      name: true,
      lastName: true,
      email: true,
      status: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

/** Perfil completo para /me (incluye organizer/administrator) */
export async function findByIdFull(userIdLike) {
  const id = toBigIntId(userIdLike);
  return prisma.user.findUnique({
    where: { userId: id },
    include: {
      organizer: true,
      administrator: true,
    },
  });
}

/** Búsqueda por email (típico en login/password) */
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
        select: { hashedPassword: true },
      },
    },
  });
}

/** Alias genérico por id (incluye relaciones de roles) */
export async function findUserById(userIdLike) {
  const id = toBigIntId(userIdLike);
  return prisma.user.findUnique({
    where: { userId: id },
    include: {
      organizer: true,
      administrator: true,
    },
  });
}

/** Update “seguro” por id (acepta string/number/bigint) */
export async function updateUserById(userIdLike, data) {
  const id = toBigIntId(userIdLike);
  return prisma.user.update({
    where: { userId: id },
    data,
    include: {
      organizer: true,
      administrator: true,
    },
  });
}
