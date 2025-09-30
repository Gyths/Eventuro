import { prisma } from '../utils/prisma.js';

export async function upsertUserWithGoogle({ email, googleId, name, lastName }) {
  return prisma.$transaction(async (tx) => {
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

    return user;
  });
}

export async function findUserByIdString(idStr) {
  return prisma.user.findUnique({
    where: { userId: BigInt(idStr) },
    select: { userId: true, name: true, lastName: true, email: true, status: true },
  });
}

export async function findByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      userId: true,
      password: {
        select: {
          hashedPassword: true,
        },
      },
    },
  });
}