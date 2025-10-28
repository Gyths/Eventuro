import { prisma } from "../utils/prisma.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function getAuditLogs() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      administrator: {
        select: {
          administratorId: true, // ID del administrador
          userId: true,           // ID del usuario asociado al admin
        },
      },
    },
  });

  return toJSONSafe(logs);
}
