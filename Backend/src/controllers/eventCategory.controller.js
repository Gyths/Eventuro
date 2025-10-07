import { createtEventCategorySvc } from "../services/eventCategory.service.js";
import { listEventCategoriesSvc } from "../services/eventCategory.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function createEventCategory(req, res) {
    try {
        const data = await createtEventCategorySvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function listEventCategories(req, res) {
    try {
        const data = await listEventCategoriesSvc();
        return res.json(toJSONSafe(data));
    } catch (err) {
        return res.status(500).json({ error: 'Error al listar categorías' });
    }
}
