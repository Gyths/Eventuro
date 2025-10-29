import {
  findOrganizerByUserIdRepo,
  findOrganizerByIdNumberNotUserRepo,
  upsertOrganizerRepo,
  getUserAndAdminRepo,
} from "../repositories/organizer.repo.js";

const boom = (s, m) => { const e = new Error(m); e.status = s; return e; };

export async function upsertOrganizerSvc({ userId, idType, idNumber, companyName }) {
  if (!userId) throw boom(401, "No autenticado.");
  if (!["DNI", "RUC"].includes(idType)) throw boom(400, "idType inválido (DNI|RUC).");
  if (!idNumber || !companyName) throw boom(400, "Completa todos los campos.");
  const digits = String(idNumber).replace(/\D/g, "");
  if (idType === "DNI" && digits.length !== 8) throw boom(400, "El DNI debe tener 8 dígitos.");
  if (idType === "RUC" && digits.length !== 11) throw boom(400, "El RUC debe tener 11 dígitos.");

  const taken = await findOrganizerByIdNumberNotUserRepo(idNumber, userId);
  if (taken) throw boom(409, "El documento ya está registrado por otro usuario.");

  const current = await findOrganizerByUserIdRepo(userId);
  const nextStatus = current
    ? (["REJECTED", "DRAFT"].includes(current.status) ? "SUBMITTED" : current.status)
    : "APPROVED";

  const organizer = await upsertOrganizerRepo({ userId, idType, idNumber, companyName, status: nextStatus });

  const { user, isAdmin } = await getUserAndAdminRepo(userId);
  const roles = ["USER", "ORGANIZER"]; if (isAdmin) roles.push("ADMIN");

  return {
    user: { userId: String(user.userId), name: user.name, lastName: user.lastName, email: user.email, roles },
    organizerStatus: organizer.status,
  };
}
