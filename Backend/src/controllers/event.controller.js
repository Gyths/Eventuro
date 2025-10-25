import {
  createEventSvc,
  listEventSvc,
  listAvailableTicketsSvc,
} from "../services/event.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function createEvent(req, res) {
  try {
    // Pasa el archivo con el mismo nombre que espera el repo
    const data = await createEventSvc({
      ...req.body,
      imagenPrincipal: req.file, // <- aquí estaba 'file'
    });

    return res.status(201).json(toJSONSafe(data));
  } catch (err) {
    console.error("Error en createEvent:", err);
    return res.status(400).json({ error: err.message });
  }
}

export async function listEvent(req, res) {
  try {
    const users = await listEventSvc();
    return res.status(200).json(toJSONSafe(users));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listAvailableTickets(req, res) {
  try {
    const availableTickets = await listAvailableTicketsSvc(req.body);
    return res.status(201).json(toJSONSafe(availableTickets));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
