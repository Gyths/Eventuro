import { createManyEventSalesPhasesSvc } from '../services/eventSalesPhase.service.js';
import { toJSONSafe } from '../utils/serialize.js';

export async function createManyEventSalesPhases(req, res) {
    try {
        const data = await createManyEventSalesPhasesSvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err){
        return res.status(400).json({ error: err.message });
    }
}