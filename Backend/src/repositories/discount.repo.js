import { prisma } from '../utils/prisma.js';

export async function listDiscountByCode(code) {
    return prisma.discount.findMany({
        where: { code},
        orderBy: { discountId: "asc" }
    });
}

export async function listDiscountsByCodes(codes) {
  if (!codes || codes.length === 0) return [];
  return prisma.discount.findMany({
    where: { code: { in: codes } },
    orderBy: { discountId: "asc" }
  });
}
