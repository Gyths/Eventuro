
import { getAuditLogs } from "../services/audit.service.js";

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
