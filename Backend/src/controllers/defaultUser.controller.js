
import bcrypt from 'bcrypt';
import { toJSONSafe } from '../utils/serialize.js';
import { createDefaultUserSvc } from '../services/defaultUser.service.js';


export async function createDefaultUser(req, res) {
    try {
        const data = await createDefaultUserSvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err){
        return res.status(400).json({ error: err.message });
    }
}

