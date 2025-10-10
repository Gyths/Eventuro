import { createTicketRepo } from '../repositories/ticket.repo.js';
import { updateTicketRepo } from '../repositories/ticket.repo.js';

export async function createTicketSvc(input, ctx = {}) {
  if (!input?.orderId) throw new Error('orderId es requerido para confirmar los tickets.');

  if (!input.buyerUserId) {
    throw new Error('buyerUserId requerido.');
  }
  
  return await createTicketRepo(input, ctx);
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
