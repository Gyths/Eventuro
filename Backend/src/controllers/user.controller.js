import { findUserByIdFullSvc } from "../services/user.service.js";
import { toJSONSafe } from "../utils/serialize.js";
import { updateUserStatusSvc } from "../services/user.service.js";
import { searchUsersSvc } from "../services/user.service.js";

export function protectedHello(req, res) {
  res.send(`Hola ${req.user?.name ?? 'usuario'} (${req.user?.email})`);
}

export async function findUserByIdFull(req, res) {
  try{
    const { id } = req.params;
    const data = await findUserByIdFullSvc(id);
    return res.status(201).json(toJSONSafe(data));
  }
  catch ( err ) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateUserStatus(req, res) {
  try{
    const actorId = req.auth?.user?.userId ?? null;
    const userId = BigInt(req.params.id);
    const payload = req.body;
    const data = await updateUserStatusSvc(actorId, {userId, payload});
    return res.status(200).json(toJSONSafe(data)); 
  } catch ( err ) {
    return res.status(400).json({ message: err.message });
  }
}

export async function listUsers(req, res) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : "";
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10) || 20, 1), 100);
    const cursor = req.query.cursor ? BigInt(req.query.cursor) : undefined;

    const result = await searchUsersSvc({ search, status, limit, cursor });
    res.json(toJSONSafe(result));
  } catch (err) {
    console.error("[listUsersCtrl]", err);
    res.status(400).json({ message: err.message || "Bad request" });
  }
}