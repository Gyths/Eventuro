import { createEventSvc } from "../services/event.service.js";
import { listEventSvc } from "../services/event.service.js";
import { listAvailableTicketsSvc } from "../services/event.service.js";
import { setEventStatusSvc } from "../services/event.service.js";
import { _getEventDetails } from "../services/event.service.js";
import { _listEventsByOrganizer } from "../services/event.service.js";
import { listEventstoApproveSvc } from "../services/event.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function createEvent(req, res) {
  try {
    
    const userId = req.auth?.user?.userId ?? null;

    // Pasa el archivo con el mismo nombre que espera el repo
    const data = await createEventSvc(userId, {
      ...req.body,
      imagenPrincipal: req.files?.imagenPrincipal?.[0] || null,
      imagenBanner: req.files?.imagenBanner?.[0] || null,
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
    for (const eventDate of availableTickets.dates) {
      for (const zone of eventDate.zoneDates) {
        for (const allocation of zone.allocations) {
          if (allocation.discountType === "PERCENTAGE")
            allocation.price =
              parseInt(zone.basePrice) *
              (1 - parseInt(allocation.discountValue) / 100);
          if (allocation.discountType === "CASH")
            allocation.price =
              parseInt(zone.basePrice) - parseInt(allocation.discountValue);
        }
      }
    }
    return res.status(201).json(toJSONSafe(availableTickets));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function setEventStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, percentage = null } = req.body ?? {};
    const userId = req.auth?.user?.userId ?? null;

    if (!status) {
      return res.status(400).json({ message: "status es requerido" });
    }

    const data = await setEventStatusSvc(userId, { id, status, percentage });
    return res.status(200).json(toJSONSafe(data));
  } catch (err) {
    if (err?.code === "P2025") {
      return res.status(404).json({ message: "El evento no existe." });
    }
    return next(err);
  }
}

export async function getEventDetails(req, res) {
  try {
    const { id } = req.params;
    const data = await _getEventDetails(id);
    return res.status(200).json(toJSONSafe(data));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listEventsByOrganizer(req, res) {
  try {
    const { idOrganizer } = req.params;
    const data = await _listEventsByOrganizer(idOrganizer);
    return res.status(200).json(toJSONSafe(data));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listEventstoApprove(req, res, next) {
  try {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 10);
    const data = await listEventstoApproveSvc({ page, pageSize });
    return res.status(200).json(toJSONSafe(data));
  } catch (err) {
    return next(err);
  }
}