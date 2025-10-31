import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // ADMIN único
  const adminEmail = 'admin@eventuro.com';
  const adminPass  = 'SuperAdmin!2025';
  const adminHash  = await bcrypt.hash(adminPass, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Eventuro',
      lastName: 'Admin',
      password: { create: { hashedPassword: adminHash } },
    },
  });

  await prisma.administrator.upsert({
    where: { userId: adminUser.userId },
    update: {},
    create: { userId: adminUser.userId },
  });

  // USUARIO normal con organizer APROBADO para pruebas
  const orgEmail = 'kion@gmail.com';
  const orgPass  = '123456';
  const orgHash  = await bcrypt.hash(orgPass, 10);

  const user = await prisma.user.upsert({
    where: { email: orgEmail },
    update: {},
    create: {
      email: orgEmail,
      name: 'Kion',
      lastName: 'Tester',
      password: { create: { hashedPassword: orgHash } },
    },
  });

  await prisma.organizer.upsert({
    where: { userId: user.userId },
    update: { status: 'APPROVED' },
    create: {
      userId: user.userId,
      companyName: 'Eventos SAC',
      idType: 'RUC',
      idNumber: '20512345678',
      status: 'APPROVED',
    },
  });

  await prisma.eventCategory.createMany({
    data: [
      { initials: 'MUS', description: 'Música', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'DEP', description: 'Deportes', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'TEA', description: 'Teatro', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'CUL', description: 'Cultura', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'TEC', description: 'Tecnología', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'GAS', description: 'Gastronomía', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'EDU', description: 'Educativo', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'NEG', description: 'Negocios', createdAt: new Date(), updatedAt: new Date() },
      { initials: 'EXP', description: 'Exposición', createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true, // evita errores si ya existen
  });

  console.log('Seed completado ✅');
}

main().finally(() => prisma.$disconnect());
