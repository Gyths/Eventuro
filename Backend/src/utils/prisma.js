// src/utils/prisma.js
import { PrismaClient } from '../generated/prisma/index.js'; // por tu "output" del generator
// Si usaras el default, sería: import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'], // agrega 'query' si quieres depurar
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
