import { createTicketRepo } from '../repositories/ticket.repo.js';
import { updateTicketRepo } from '../repositories/ticket.repo.js';
import { setTicketToRefund } from '../repositories/ticket.repo.js';
import { getRefundList } from '../repositories/ticket.repo.js';
import { approveTicketRefund } from '../repositories/ticket.repo.js';
import { rejectTicketRefund } from '../repositories/ticket.repo.js';
import { sendConfirmationEmailCtrl } from '../controllers/email.controller.js';
import { deleteTicketRepo } from '../repositories/ticket.repo.js';
import { sendDeleteTicketEmail } from '../controllers/email.controller.js';

import { getMyTicketsRepo, countMyTicketsRepo } from "../repositories/ticket.repo.js";
import { getSignedUrlForFile } from "../utils/s3.js"
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

function toStr(v) { return v?.toString?.() ?? (v == null ? null : String(v)); }

// Pequeña caché en memoria para no firmar lo mismo N veces por página
async function signEventImages(ev, cache) {
  if (!ev) return { imagePrincipalURLSigned: null, imageBannerURLSigned: null };

  const k1 = ev.imagePrincipalKey || "";
  const k2 = ev.imageBannerKey || "";
  const cacheKey = `${k1}|${k2}`;

  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const out = { imagePrincipalURLSigned: null, imageBannerURLSigned: null };

  if (k1) {
    try { out.imagePrincipalURLSigned = await getSignedUrlForFile(k1); } catch { }
  }
  if (k2) {
    try { out.imageBannerURLSigned = await getSignedUrlForFile(k2); } catch { }
  }

  cache.set(cacheKey, out);
  return out;
}

export async function getMyTicketsService(params) {
  const { page = 1, pageSize = 50 } = params;

  const [rows, total] = await Promise.all([
    getMyTicketsRepo(params),
    countMyTicketsRepo(params),
  ]);

  const signCache = new Map();

  const items = await Promise.all(rows.map(async (t) => {
    const pricePaid =
      typeof t.pricePaid?.toNumber === "function" ? t.pricePaid.toNumber() : t.pricePaid;

    const totalAmount =
      typeof t.item?.order?.totalAmount?.toNumber === "function"
        ? t.item.order.totalAmount.toNumber()
        : t.item?.order?.totalAmount;

    // IDs reales según tu schema
    const evRaw = t?.eventDate?.event ?? null;
    const evId = evRaw?.eventId ?? null;
    const edId = t?.eventDate?.eventDateId ?? null;
    const zoneId = t?.zone?.eventDateZoneId ?? null;
    const allocId = t?.allocation?.eventDateZoneAllocationId ?? null;
    const seatId = t?.seat?.seatId ?? null;

    // Firmar imágenes del evento (si están las keys)
    const signed = await signEventImages(evRaw, signCache);

    return {
      ticketId: toStr(t.ticketId),
      status: t.status,
      refundStatus: t.refundStatus,
      refundRequestedAt: t.refundRequestedAt ?? null,
      pricePaid,
      currency: t.currency,
      issuedAt: t.issuedAt,

      event: evRaw
        ? {
          id: toStr(evId),
          title: evRaw.title,
          inPerson: evRaw.inPerson ?? false,
          imagePrincipalURLSigned: signed.imagePrincipalURLSigned ?? null,
          imageBannerURLSigned: signed.imageBannerURLSigned ?? null,
          venue: evRaw.venue
            ? {
              city: evRaw.venue.city ?? null,
              address: evRaw.venue.address ?? null,
              reference: evRaw.venue.reference ?? null,
            }
            : null,
        }
        : null,

      eventDate: t.eventDate
        ? {
          id: toStr(edId),
          startAt: t.eventDate.startAt,
        }
        : null,

      zone: t.zone
        ? {
          id: toStr(zoneId),
          name: t.zone.name,
        }
        : null,

      allocation: t.allocation
        ? {
          id: toStr(allocId),
          audienceName: t.allocation.audienceName,
        }
        : null,

      seat: t.seat
        ? {
          id: toStr(seatId),
          rowNumber: t.seat.rowNumber ?? null,
          seatNumber: t.seat.colNumber ?? null, // en tu schema es colNumber
        }
        : null,

      order: t.item?.order
        ? {
          orderId: toStr(t.item.order.orderId),
          createdAt: t.item.order.createdAt,
          totalAmount,
          currency: t.item.order.currency,
        }
        : null,

      owner: t.owner
        ? {
          userId: toStr(t.owner.userId),
          name: t.owner.name ?? null,
          lastName: t.owner.lastName ?? null,
          document: null, // si no existe en tu modelo de User
        }
        : null,
    };
  }));

  return { page, pageSize, total, items };
}

export async function deleteTicketSvc(ticketid) {
  const data = await deleteTicketRepo(ticketid);
  try {
    await sendDeleteTicketEmail(data);
  } catch (err) {
    console.error('Error enviando correo de eliminación de ticket:', err);
  }
  return data;
}
