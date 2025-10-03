
import bcrypt from 'bcrypt';
import { toJSONSafe } from '../utils/serialize.js';
import { createDefaultUserSvc,listDefaultUserSvc } from '../services/defaultUser.service.js';


export async function createDefaultUser(req, res) {
    try {
        const data = await createDefaultUserSvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err){
        return res.status(400).json({ error: err.message });
    }
}


export async function listDefaultUser(req, res) {
  try {
    const users = await listDefaultUserSvc();
    return res.status(200).json(toJSONSafe(users));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
