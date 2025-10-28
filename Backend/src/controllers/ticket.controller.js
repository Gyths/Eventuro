import { createTicketSvc } from '../services/ticket.service.js';
import { updateTicketSvc } from '../services/ticket.service.js';
import { toJSONSafe } from '../utils/serialize.js';
import { requestTicketRefundSvc } from '../services/ticket.service.js';
import { listRefundSolicitationsSvc } from '../services/ticket.service.js';
import { approveRefundSvc, rejectRefundSvc } from '../services/ticket.service.js';

export async function createTicketCtrl(req, res) {
  try {
    const sessionUserId = req.user?.userId;
    if (!sessionUserId && !req.body.buyerUserId) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    //con este orderId recibido recorreremos todos los items de dicha orden y generaremos un ticket por cada uno
    if (!req.body.orderId) {
      return res.status(400).json({ error: 'orderId es requerido.' });
    }

    const result = await createTicketSvc({
      orderId: BigInt(req.body.orderId),
      buyerUserId: sessionUserId ? BigInt(sessionUserId) : BigInt(req.body.buyerUserId)
    });

    return res.status(201).json(toJSONSafe(result));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}


export async function updateTicketCtrl(req, res) {
  try {
    const ticketId = BigInt(req.params.ticketId);
    const organizerUserId = req.body.userId ? BigInt(req.body.userId) : null;
    if (!organizerUserId) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    // Validar que el body no esté vacío
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No se enviaron datos para actualizar.' });
    }

    // Se elimina userId del payload antes de pasarlo al service
    const { userId, ...payload } = req.body;

    const updatedTicket = await updateTicketSvc(ticketId, payload, organizerUserId);

    return res.status(200).json(toJSONSafe(updatedTicket));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function requestTicketRefundCtrl(req, res) {
  try {
    const ticketId = BigInt(req.params.ticketId);
    if (!ticketId) {
      return res.status(400).json({ error: 'TicketId es requerido.' });
    }

    const result = await requestTicketRefundSvc(ticketId);

    return res.status(200).json(toJSONSafe(result));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listRefundSolicitationsCtrl(req, res) {
  try {
    const organizerId = req.params.organizerId ? BigInt(req.params.organizerId) : null;
    if (!organizerId) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    const result = await listRefundSolicitationsSvc(organizerId);

    return res.status(200).json(toJSONSafe(result));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function approveRefundCtrl(req, res) {
  try {
    const ticketId = BigInt(req.params.ticketId);
    if (!ticketId) {
      return res.status(400).json({ error: 'TicketId es requerido.' });
    }

    const result = await approveRefundSvc(ticketId);

    return res.status(200).json(toJSONSafe(result));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function rejectRefundCtrl(req, res) {
  try {
    const ticketId = BigInt(req.params.ticketId);
    if (!ticketId) {
      return res.status(400).json({ error: 'TicketId es requerido.' });
    }

    const result = await rejectRefundSvc(ticketId);

    return res.status(200).json(toJSONSafe(result));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}