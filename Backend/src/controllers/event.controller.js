import { createEventSvc } from '../services/event.service.js';
import { toJSONSafe } from '../utils/serialize.js';

export async function createEvent(req, res) {
    try {
        const data = await createEventSvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err){
        return res.status(400).json({ error: err.message });
    }
}