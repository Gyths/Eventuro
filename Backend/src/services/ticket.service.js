import { createTicketRepo } from '../repositories/ticket.repo.js';
import { updateTicketRepo } from '../repositories/ticket.repo.js';
import { setTicketToRefund } from '../repositories/ticket.repo.js';
import { getRefundList } from '../repositories/ticket.repo.js';
import { approveTicketRefund } from '../repositories/ticket.repo.js';
import { rejectTicketRefund } from '../repositories/ticket.repo.js';
import { sendConfirmationEmailCtrl } from '../controllers/email.controller.js';

export async function createTicketSvc(input, ctx = {}) {
  if (!input?.orderId) throw new Error('orderId es requerido para confirmar los tickets.');

  if (!input.buyerUserId) {
    throw new Error('buyerUserId requerido.');
  }

  const tickets = await createTicketRepo(input, ctx);
  try {
    await sendConfirmationEmailCtrl(input.buyerUserId, tickets);
  } catch (err) {
    console.error('Error enviando correo de confirmación:', err);
    // No abortes la compra por un error de email, solo lo registras
  }
  return tickets;
}

export async function updateTicketSvc(ticketId, payload, organizerUserId) {
  if (!ticketId || !payload) {
    throw new Error('TicketId y datos de actualización requeridos.');
  }

  if (!organizerUserId) throw new Error('El ID del usuario organizador es requerido.');
  // Validar campos permitidos
  const allowedFields = ['status', 'pricePaid', 'currency', 'seatId', 'ownerUserId'];
  const invalidFields = Object.keys(payload).filter(k => !allowedFields.includes(k));
  if (invalidFields.length > 0) {
    throw new Error(`Campos no permitidos en actualización: ${invalidFields.join(', ')}`);
  }

  return await updateTicketRepo(ticketId, payload, organizerUserId);
}

export async function requestTicketRefundSvc(ticketId) {
  if (!ticketId) {
    throw new Error('TicketId es requerido para solicitar reembolso.');
  }
  return await setTicketToRefund(ticketId);
}

export async function listRefundSolicitationsSvc(organizerId) {
  if (!organizerId) {
    throw new Error('OrganizerId es requerido para listar solicitudes de reembolso.');
  }
  return await getRefundList(organizerId);
}

export async function approveRefundSvc(ticketId) {
  if (!ticketId) {
    throw new Error('TicketId es requerido para aprobar reembolso.');
  }
  return await approveTicketRefund(ticketId);
}

export async function rejectRefundSvc(ticketId) {
  if (!ticketId) {
    throw new Error('TicketId es requerido para rechazar reembolso.');
  }
  return await rejectTicketRefund(ticketId);
}
