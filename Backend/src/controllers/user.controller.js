import { findUserByIdFullSvc } from "../services/user.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export function protectedHello(req, res) {
  res.send(`Hola ${req.user?.name ?? 'usuario'} (${req.user?.email})`);
}

export async function findUserByIdFull(req, res) {
  try{
    const { id } = req.params;
    const data = await findUserByIdFullSvc(id);
    return res.status(201).json(toJSONSafe(data));
  }
  catch ( err ){
    return res.status(400).json({ error: err.message });
  }
}
