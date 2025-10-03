import { prisma } from '../utils/prisma.js';

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

