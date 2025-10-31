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

export async function getOrganizerByUserId(req, res) {
  try {
    const { id } = req.params;
    const data = await getOrganizerByUserIdSvc(id);

    if (!data) {
      return res.status(404).json({ success: false, message: "Organizer not found" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Unexpected error" });
  }
}