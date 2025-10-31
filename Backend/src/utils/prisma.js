// src/utils/prisma.js
import { PrismaClient } from "@prisma/client";
// Si usaras el default, sería: import { PrismaClient } from '@prisma/client';
import { auditMiddleware } from "../middlewares/auditLogger.js";


const globalForPrisma = globalThis;
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"], // agrega 'query' si quieres depurar
  });

const middleware = auditMiddleware();
const originalRequest = prisma._request.bind(prisma);

prisma._request = async (params) => {
  return middleware(params, (p) => originalRequest(p));
};

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
