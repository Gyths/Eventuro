import { listAuditTransactionsRepo } from "../repositories/audit.repo.js";
import { getAuditChangesRepo } from "../repositories/audit.repo.js";


export async function listAuditTransactionsSvc({take, skip, order}) {
  return listAuditTransactionsRepo({take, skip, order});
}

export async function getAuditChangesSvc(auditTransactionId) {
  return getAuditChangesRepo(auditTransactionId);
}