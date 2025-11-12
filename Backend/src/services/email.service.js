import { transporter } from '../utils/email.js';
import { config } from '../config/env.js';
import { generateTicketPDF } from '../utils/pdf.util.js';
import QRCode from 'qrcode';

export async function confirmationEmail(to, orderInfo) {
  const { orderId, totalAmount, tickets } = orderInfo
  // 2. Generar los QR codes para cada ticket
  const attachments = await Promise.all(
    tickets.map(async (ticket, i) => {
      const qrData = `${ticket.status}_${ticket.ticketId}`; //Tiene que coincidir con el de front
      const qrBuffer = await QRCode.toBuffer(qrData);
      const pdfBuffer = await generateTicketPDF(ticket, qrBuffer);

      return [
        {
          filename: `qr_ticket_${i + 1}.png`,
          content: qrBuffer,
          cid: `qr${i + 1}`,
        },
        {
          filename: `ticket_${i + 1}.pdf`,
          content: pdfBuffer,
        },
      ];
    })
  );

  const flattenedAttachments = attachments.flat();
  // 3. Cuerpo del mensaje
  const htmlTickets = tickets.map(
    (t, i) => `
      <div style="margin-bottom:15px;">
        <p><b>Ticket #${i + 1}</b></p>
        <p>Evento: ${t.eventName}</p>
        <p>Fecha: ${new Date(t.eventDate).toLocaleString('es-PE')}</p>
        <p>Zona: ${t.zoneName}</p>
        <p>Asiento Col: ${t.setCol ?? 'No definido'}</p>
        <p>Asiento Fil: ${t.setRow ?? 'No definido'}</p>
        <p>ID: ${t.ticketId}</p>
        <img src="cid:qr${i + 1}" alt="QR Ticket" style="width:150px;height:150px;" />
      </div>
    `
  ).join('');

  const mailOptions = {
    from: `"Eventuro" <${config.EMAIL_USER}>`,
    to,
    subject: `Confirmación de compra - Pedido #${orderId}`,
    html: `
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu pedido #${orderId} fue confirmado por un total de <b>S/${totalAmount}</b>.</p>
      <p>A continuación encontrarás tus tickets con su código QR:</p>
      ${htmlTickets}
    `,
    attachments: flattenedAttachments,
  };

  // 4. Enviar el correo
  await transporter.sendMail(mailOptions);
  console.log(`Correo de confirmación enviado a ${to}`);
}

export async function sendReminderEmail(to, eventInfo) {
  const { title, eventDate, venue, clientName } = eventInfo;
  const mailOptions = {
    from: `"Eventuro" <${config.EMAIL_USER}>`,
    to,
    subject: `${clientName}, recuerda tu evento ${title}`,
    html: `
      <h2>¡No olvides tu próximo evento!</h2>
      <p>Te recordamos que el evento <b>${title}</b> se llevará a cabo el <b>${new Date(eventDate).toLocaleString('es-PE')}</b> en <b>${venue}</b>.</p>
      <p>¡Te esperamos!</p>
    `,
  };

  // Enviar el correo
  await transporter.sendMail(mailOptions);
  console.log(`Correo de recordatorio enviado a ${to}`);
}
