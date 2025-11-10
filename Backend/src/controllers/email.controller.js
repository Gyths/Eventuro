import { confirmationEmail } from '../services/email.service.js';
import { findUserByIdFullSvc } from '../services/user.service.js';

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
