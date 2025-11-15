import { createEventSvc } from "../services/event.service.js";
import { listEventSvc } from "../services/event.service.js";
import { listEventInfoSvc } from "../services/event.service.js";
import { listEventDateByEventIdSvc } from "../services/event.service.js";
import { listEventDateZonesByEventDateIdSvc } from "../services/event.service.js";
import { setEventStatusSvc } from "../services/event.service.js";
import { _getEventDetails } from "../services/event.service.js";
import { _listEventsByOrganizer } from "../services/event.service.js";
import { listEventstoApproveSvc } from "../services/event.service.js";
import { toJSONSafe } from "../utils/serialize.js";

import {
  setFinalPrices,
  formatDates,
  formatDate,
  formatHour,
} from "../utils/event.util.js";

export async function createEvent(req, res) {
  try {
    const userId = req.auth?.user?.userId ?? null;

    // Pasa el archivo con el mismo nombre que espera el repo
    console.log(req);
    const data = await createEventSvc(userId, {
      ...req.body,
      imagenPrincipal: req.files?.imagenPrincipal?.[0] || null,
      imagenBanner: req.files?.imagenBanner?.[0] || null,
      policyFile: req.files?.refundPolicyFile?.[0] || null,
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

export async function listEventInfo(req, res) {
  try {
    const { eventId } = req.params;
    const eventInfo = await listEventInfoSvc(eventId);

    if (!eventInfo) {
      return res.status(404).json({
        code: 1,
        error: "El evento no existe",
      });
    }
    if (eventInfo.status != "A") {
      return res.status(400).json({
        code: 2,
        error: "Evento inactivo",
      });
    }
    if (eventInfo.dates[eventInfo.dates.length - 1].endAt < new Date()) {
      return res.status(400).json({
        code: 3,
        error: "Evento terminado",
      });
    }
    if (!eventInfo.salesPhases || eventInfo.salesPhases.length === 0) {
      return res.status(400).json({
        code: 4,
        error: "No hay fases de venta activas.",
      });
    }

    const activeSalePhaseDiscount = Number(
      eventInfo?.salesPhases[0].percentage
    );

    eventInfo.salesPhases[0].startAt = formatDate(
      eventInfo?.salesPhases[0]?.startAt,
      "2-digit"
    );
    eventInfo.salesPhases[0].endAt = formatDate(
      eventInfo?.salesPhases[0]?.endAt,
      "2-digit"
    );

    //For each que recorre cada fecha y modifica los precios con los descuentos de allocations y fases de venta
    for (const date of eventInfo.dates) {
      date.zoneDates = setFinalPrices(date.zoneDates, activeSalePhaseDiscount);
    }

    return res.status(201).json(toJSONSafe(eventInfo));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listEventDateByEventId(req, res) {
  try {
    const { eventId } = req.params;
    let eventDates = await listEventDateByEventIdSvc(eventId);

    return res.status(201).json(toJSONSafe(formatDates(eventDates)));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listEventDateZonesByEventDateId(req, res) {
  try {
    const { userId, eventId, eventDateId } = req.params;
    const eventDateZones = await listEventDateZonesByEventDateIdSvc(
      userId,
      eventId,
      eventDateId
    );
    const user = { ticketCount: eventDateZones.ticketCount };
    const zoneDates = setFinalPrices(
      eventDateZones.zones,
      eventDateZones?.activePhase?.percentage
    );
    const date = formatDates([eventDateZones.date]);
    const remainingSalePhaseQuantity =
      parseInt(eventDateZones?.activePhase?.ticketLimit) -
      parseInt(eventDateZones?.activePhase?.quantityTicketsSold);
    return res
      .status(201)
      .json(
        toJSONSafe([{ user, zoneDates, date, remainingSalePhaseQuantity }])
      );
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
