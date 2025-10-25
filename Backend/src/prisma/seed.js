import { PrismaClient } from '@prisma/client';
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

  console.log('Seed completado ✅');
}

main().finally(() => prisma.$disconnect());
