import { createTicketRepo } from '../repositories/ticket.repo.js';
import { updateTicketRepo } from '../repositories/ticket.repo.js';
import { findTicketsByUser } from '../repositories/ticket.repo.js';
import { setTicketToRefund } from '../repositories/ticket.repo.js';
import { getRefundList } from '../repositories/ticket.repo.js';
import { approveTicketRefund } from '../repositories/ticket.repo.js';
import { rejectTicketRefund } from '../repositories/ticket.repo.js';

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
export const getTicketsByUser = async ({
  userId,
  page = 1,
  pageSize = 20,
  status,
  upcoming = false,
  from,
  to,
  order = 'desc',
}) => {
  const take = Math.min(Number(pageSize) || 20, 100);
  const p = Math.max(Number(page) || 1, 1);
  const skip = (p - 1) * take;

  const ownerUserId = BigInt(userId);

  // Construcción de filtros de dominio (no atados a Prisma aún)
  const filters = {
    ownerUserId,
    ...(status ? { status } : {}),
  };

  // Rango de fechas por EventDate.startAt
  const dateRange = {};
  if (from) dateRange.gte = new Date(from);
  if (to)   dateRange.lte = new Date(to);
  if (Object.keys(dateRange).length > 0) {
    filters.eventDate = { startAt: dateRange };
  }

  // Solo próximos
  if (upcoming) {
    filters.eventDate = {
      ...(filters.eventDate || {}),
      startAt: {
        ...(filters.eventDate?.startAt || {}),
        gte: new Date(),
      },
    };
  }

  const { items, total } = await findTicketsByUser({
    where: filters,
    skip,
    take,
    order,
  });

  return {
    page: p,
    pageSize: take,
    total,
    items,
  };
};

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
