import { prisma } from "../utils/prisma.js";
import { toJSONSafe } from "../utils/serialize.js";
import { listAuditTransactionsRepo } from "../repositories/audit.repo.js";
import { getAuditChangesRepo } from "../repositories/audit.repo.js";

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

export async function listAuditTransactionsSvc({take, skip, order}) {
  return listAuditTransactionsRepo({take, skip, order});
}

export async function getAuditChangesSvc(auditTransactionId) {
  return getAuditChangesRepo(auditTransactionId);
}