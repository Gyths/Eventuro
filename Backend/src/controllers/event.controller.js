import { createEventSvc, listEventSvc } from "../services/event.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function createEvent(req, res) {
  try {
    const data = await createEventSvc(req.body);
    return res.status(201).json(toJSONSafe(data));
  } catch (err) {
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
