import { findByIdFull } from "../repositories/user.repo.js";
import { updateUserStatusRepo } from "../repositories/user.repo.js";
import { searchUsersRepo } from "../repositories/user.repo.js";

export async function findUserByIdFullSvc(userId) {
    return findByIdFull(userId);
}

export async function updateUserStatusSvc(actorId, { userId, payload }) {
    if (!actorId) throw new Error("Actor no identificado.");
    if (!userId) throw new Error("userId requerido.");
    if (!payload || typeof payload !== "object") throw new Error("Payload inválido.");

    const { status, days } = payload;
    let data;

    switch (status) {
        case "B":
            data = { status: "B", suspendedUntil: null };
            break;

        case "S": {
            const d = Number(days);
            if (!Number.isFinite(d) || d <= 0) {
                throw new Error("Debe especificar 'days' > 0 para la suspensión.");
            }
            const until = new Date();
            until.setDate(until.getDate() + d);
            data = { status: "S", suspendedUntil: until };
            break;
        }

        case "A":
            data = { status: "A", suspendedUntil: null };
            break;

        default:
            throw new Error("Estado inválido.");
    }

    if (BigInt(actorId) === BigInt(userId) && status !== "A") {
        throw new Error("No puedes cambiar tu propio estado a SUSPENDED/BANNED.");
    }

    return await updateUserStatusRepo(actorId, { userId, data });
}

export async function searchUsersSvc({ search, status, limit, cursor }) {
  const tokens = (search || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return searchUsersRepo({ tokens, status, limit, cursor });
}
