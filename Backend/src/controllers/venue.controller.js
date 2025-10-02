import { createVenueSvc } from '../services/venue.service.js';
import { toJSONSafe } from '../utils/serialize.js';

export async function createVenue(req, res) {
    try {
        const data = await createVenueSvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err){
        return res.status(400).json({ error: err.message });
    }
}