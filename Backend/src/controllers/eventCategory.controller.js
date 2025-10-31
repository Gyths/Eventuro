import { createtEventCategorySvc } from "../services/eventCategory.service.js";
import { listEventCategoriesSvc } from "../services/eventCategory.service.js";
import { updateEventCategorySvc } from "../services/eventCategory.service.js";
import { deleteEventCategorySvc } from "../services/eventCategory.service.js";
import { getEventCategoryByIdSvc } from "../services/eventCategory.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function createEventCategory(req, res) {
    try {
        const data = await createtEventCategorySvc(req.body);
        return res.status(201).json(toJSONSafe(data));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function updateEventCategory(req, res) {
    try {
        const { id } = req.params;
        const payload = req.body;
        const data = await updateEventCategorySvc({ id, payload });
        res.status(200).json(toJSONSafe(data));
    } catch (err) {
        if (err?.code === 'P2025') {
            return res.status(404).json({ message: 'La categoría no existe.' });
        }
        if (err?.code === 'P2002') {
            return res.status(409).json({ message: 'Ya existe una categoría con esas iniciales (conflicto de unicidad).' });
        }
        if (err?.status) {
            return res.status(err.status).json({ message: err.message });
        }
        return next(err);
    }
}

export async function deleteEventCategory(req, res) {
    try {
        const { id } = req.params;
        const data = await deleteEventCategorySvc(id);
        return res.status(200).json(toJSONSafe(data));
    } catch (err) {
        if (err?.code === 'P2025') {
            return res.status(404).json({ message: 'La categoría no existe.' });
        }
        if (err?.code === 'P2003') {
            return res.status(409).json({
                message: 'No se puede eliminar: la categoría está siendo referenciada por otros registros.',
            });
        }
        if (err?.status) {
            return res.status(err.status).json({ message: err.message });
        }
        return next(err);
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
