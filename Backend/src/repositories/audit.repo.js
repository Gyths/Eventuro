import { prisma } from "../utils/prisma.js";

export async function listAuditTransactionsRepo({take, skip, order}) {
    
    const transactions = await prisma.auditTransaction.findMany({
      where: {
        actorUserId: { 
          not: null 
        },
      },
      select: {
        auditTransactionId: true,
        targetTableName: true,
        operationType: true,
        primaryKeyJson: true,
        actorUserId: true,
        actorIpAddress: true,
        createdAt: true,
      },
      orderBy: { createdAt: order === "asc" ? "asc" : "desc" },
      take: Number(take),
      skip: Number(skip),
    });

    return transactions;

}

export async function getAuditChangesRepo(auditTransactionId){

    const changes = await prisma.auditChange.findMany({
        where: {auditTransactionId: auditTransactionId}, 
        select: {
            columnName: true, 
            oldValueJson: true,
            newValueJson: true,
            isChanged: true
        },
    });
    return changes;

}