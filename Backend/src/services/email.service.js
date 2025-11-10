import { transporter } from '../utils/email.js';
import { config } from '../config/env.js';
import QRCode from 'qrcode';

export async function confirmationEmail(to, orderInfo) {
  const { orderId, totalAmount, tickets } = orderInfo
  // 2. Generar los QR codes para cada ticket
  const attachments = await Promise.all(
    tickets.map(async (ticket, i) => {
      const qrData = `${ticket.status}_${ticket.ticketId}`; //Tiene que coincidir con el de front
      const qrImage = await QRCode.toBuffer(qrData);
      return {
        filename: `ticket_${i + 1}.png`,
        content: qrImage,
        cid: `qr${i + 1}`, // cid para incrustarlo en el HTML si quieres
      };
    })
  );

  // 3. Cuerpo del mensaje
  const htmlTickets = tickets.map(
    (t, i) => `
      <div style="margin-bottom:15px;">
        <p><b>Ticket #${i + 1}</b></p>
        <p>ID: ${t.ticketId}</p>
        <p>Asiento: ${t.seatId ?? 'General'}</p>
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
    attachments,
  };

  // 4. Enviar el correo
  await transporter.sendMail(mailOptions);
  console.log(`Correo de confirmación enviado a ${to}`);
}
