
import { prisma } from "../utils/prisma.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function getAuditLogs(limit = 50) {
  const logs = await prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return toJSONSafe(logs);
}
