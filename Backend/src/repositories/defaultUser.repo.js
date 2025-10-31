import { prisma } from '../utils/prisma.js';
import fs from "fs";
import path from "path";


export async function createDefaultUserRepo({ name, lastName, phone, email, birthdate, gender,hashedPassword }) {
    return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { name, lastName, phone, email, birthdate, gender },
      select: {
        userId: true,
        name: true,
        lastName: true,
        phone: true,
        email: true,
        birthdate: true,
        gender: true
      }
    });

    // --- LOGGING ---
    const logDir = path.join(process.cwd(), "log");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const now = new Date();
    const fecha = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(" ")[0]; // HH:MM:SS

    const logFile = path.join(logDir, `${fecha}.log`);
    const logLine = `${hora} Se creó usuario "${user.name} ${user.lastName}" con email ${user.email}\n`;

    fs.appendFileSync(logFile, logLine, "utf8");



    //Crear registro en PasswordUser usando userId
    const passwordEntry = await tx.passwordUser.create({
      data: {
        userId: user.userId,
        hashedPassword: hashedPassword
      }
    });

    //Retornar ambos objetos si quieres
    return { user, passwordEntry };
  });
}



export async function listDefaultUserRepo() {
  return prisma.user.findMany({
    select: {
      userId: true,
      name: true,
      lastName: true,
      phone: true,
      email: true,
      birthdate: true,
      gender: true
    },
  });
}