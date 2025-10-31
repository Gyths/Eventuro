import { upsertOrganizerSvc } from "../services/organizer.service.js";

export async function upsertOrganizerCtrl(req, res) {
  try {
    const userId = req.user.id; // ✅
    const { idType, idNumber, companyName } = req.body;

    const result = await upsertOrganizerSvc({ userId, idType, idNumber, companyName });
    return res.json(result);
  } catch (e) {
    const status = e.status ?? 500;
    return res.status(status).json({ message: e.message ?? "Error creando/actualizando organizador." });
  }
}
