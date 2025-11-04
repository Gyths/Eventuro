import { getAuditLogs } from "../services/audit.service.js";
import { listAuditTransactionsSvc } from "../services/audit.service.js";
import { getAuditChangesSvc } from "../services/audit.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function listAuditLogs(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await getAuditLogs(limit);
    res.json(logs);
  } catch (error) {
    console.error("Error al obtener logs de auditoría:", error);
    res.status(500).json({ error: "Error al obtener registros de auditoría" });
  }
}

export async function listAuditTransactions(req, res) {
  try {
    const { take = 20, skip = 0, order = "desc" } = req.query;
    const transactions = await listAuditTransactionsSvc({ take, skip, order });
    return res.json(toJSONSafe(transactions));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getAuditChanges(req, res) {
  try {
    const { id } = req.params;
    const changes = await getAuditChangesSvc(id);
    res.status(200).json(toJSONSafe(changes));
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}