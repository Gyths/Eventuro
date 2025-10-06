import { createManyEventToCategorySvc } from '../services/eventoToCategory.service.js';
import { toJSONSafe } from '../utils/serialize.js';

export async function createManyEventToCategory(req, res) {
    try {
        const data = await createManyEventToCategorySvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err){
        return res.status(400).json({ error: err.message });
    }
}