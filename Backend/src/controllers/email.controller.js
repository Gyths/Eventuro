import { confirmationEmail } from '../services/email.service.js';
import { findUserByIdFullSvc } from '../services/user.service.js';
import { sendDeleteTicketEmailSvc } from '../services/email.service.js';
import { sendDeleteEventEmailSvc } from '../services/email.service.js';

export async function sendConfirmationEmailCtrl(idClient, orderInfo) {
  try {
    const clientInfo = await findUserByIdFullSvc(idClient);
    const to = clientInfo.email;
    if (!to || !orderInfo) {
      return res.status(400).json({ error: 'Destinatario y detalles del pedido son requeridos.' });
    }

    await confirmationEmail(to, orderInfo);

    return { success: true, message: 'Correo enviado exitosamente.' };
  } catch (err) {
    console.error('Error en sendConfirmationEmailCtrl:', err);
    return { success: false, message: 'Error al enviar el correo de confirmación.' };
  }
}

export async function resendConfirmationEmailCtrl(idClient, orderInfo) {
  try {
    const clientInfo = await findUserByIdFullSvc(idClient);
    const to = clientInfo.email;

    if (!to || !orderInfo) {
      throw new Error('Destinatario y detalles del pedido son requeridos.');
    }

    const transformedOrderInfo = {
      orderId: orderInfo.orderId,
      totalAmount: orderInfo.totalAmount,

      tickets: (orderInfo.items?.[0]?.Ticket || []).map(ticket => ({
        ticketId: ticket.ticketId,
        status: ticket.refundStatus || 'ACTIVE',
        eventName: ticket.eventDate?.event?.title || 'Evento',
        eventDate: ticket.eventDate?.startAt || new Date().toISOString(),
        zoneName: ticket.zone?.name || ticket.allocation?.audienceName || 'General',
        setCol: ticket.seat?.seatNumber || null,
        setRow: ticket.seat?.rowNumber || null,
      }))
    };

    // Validar que haya tickets
    if (!transformedOrderInfo.tickets || transformedOrderInfo.tickets.length === 0) {
      throw new Error('No se encontraron tickets en la orden');
    }

    await confirmationEmail(to, transformedOrderInfo);

    return { success: true, message: 'Correo enviado exitosamente.' };
  } catch (err) {
    console.error('Error en sendConfirmationEmailCtrl:', err);
    return { success: false, message: err.message || 'Error al enviar el correo de confirmación.' };
  }
}

export async function resendConfirmationEmail(req, res) {
  try {
    const { idClient, orderInfo } = req.body;

    if (!idClient || !orderInfo) {
      return res.status(400).json({
        error: 'idClient y orderInfo son requeridos.'
      });
    }

    const result = await resendConfirmationEmailCtrl(idClient, orderInfo);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error en ruta /tickets/email:', error);
    return res.status(500).json({
      error: 'Error al procesar la solicitud.'
    });
  }
}

export async function sendDeleteTicketEmail(data) {
  const to = data.ownerEmail;
  if (!to) {
    throw new Error('El correo del propietario no está disponible.');
  }

  const ticketInfo = {
    ticketId: data.ticketid,
    eventTitle: data.eventTitle,
    eventDateStart: data.eventDateStart,
  };

  await sendDeleteTicketEmailSvc(to, ticketInfo);
}

export async function sendDeleteEventEmailCtrl(userEmail, eventTitle) {
  if (!userEmail) {
    throw new Error('El correo del usuario no está disponible.');
  }

  await sendDeleteEventEmailSvc(userEmail, eventTitle);
}
