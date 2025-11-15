import { transporter } from '../utils/email.js';
import { config } from '../config/env.js';
import { generateTicketPDF } from '../utils/pdf.util.js';
import QRCode from 'qrcode';

export async function confirmationEmail(to, orderInfo) {
  const { orderId, totalAmount, tickets } = orderInfo;

  // Generar los QR codes y PDFs para cada ticket
  const attachments = await Promise.all(
    tickets.map(async (ticket, i) => {
      const qrData = `${ticket.status}_${ticket.ticketId}`;
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

  // Generar HTML para cada ticket con el diseño mejorado
  const ticketsHtml = tickets.map(
    (t, i) => `
      <div style="
        background: white;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      ">
        <!-- Logo/Imagen del evento -->
        <div style="
          background: #e5e7eb;
          border-radius: 12px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: 600;
          color: #6b7280;
        ">
          ${t.eventID || 'Logo evento'}
        </div>

        <!-- Zona/Tipo -->
        <p style="
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 12px 0;
        ">
          ${t.zoneName || 'General'}${t.setRow && t.setCol ? ` - Fila ${t.setRow} Asiento ${t.setCol}` : ''}
        </p>

        <!-- QR Code -->
        <div style="text-align: center; margin: 20px 0;">
          <img 
            src="cid:qr${i + 1}" 
            alt="QR Ticket" 
            style="
              width: 150px;
              height: 150px;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 8px;
            " 
          />
        </div>
      </div>
    `
  ).join('');

  // Formatear fecha y hora del primer ticket
  const firstTicket = tickets[0];
  const eventDate = firstTicket?.eventDate ? new Date(firstTicket.eventDate).toLocaleString('es-PE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Por confirmar';

  const eventLocation = firstTicket?.eventLocation ? new String(firstTicket.eventLocation) : 'Por confirmar';
  const mailOptions = {
    from: `"Eventuro" <${config.EMAIL_USER}>`,
    to,
    subject: `Confirmación de compra - Pedido #${orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: #f3f4f6;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        ">
          <!-- Header con icono -->
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="
              display: inline-block;
              background: #8b5cf6;
              width: 60px;
              height: 60px;
              border-radius: 12px;
              position: relative;
              margin-bottom: 16px;
            ">
              <span style="
                font-size: 32px;
                color: white;
                line-height: 60px;
              ">🎫</span>
            </div>
            <h1 style="
              font-size: 32px;
              font-weight: 700;
              color: #111827;
              margin: 0;
            ">
              ¡Aquí están tus tickets!
            </h1>
          </div>

          <!-- Mensaje de bienvenida -->
          <div style="
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            text-align: center;
          ">
            <p style="
              font-size: 16px;
              color: #374151;
              line-height: 1.6;
              margin: 0 0 12px 0;
            ">
              Hola, muchas gracias por tu compra. A continuación encontrarás tus tickets y sus códigos QR.
            </p>
            <p style="
              font-size: 14px;
              color: #6b7280;
              line-height: 1.6;
              margin: 0;
            ">
              No olvides escanearlos en la entrada del evento para poder ingresar.
            </p>
          </div>

          <!-- Información del evento -->
          <div style="
            background: white;
            border-radius: 12px;
            padding: 20px 24px;
            margin-bottom: 24px;
          ">
            <h2 style="
              font-size: 20px;
              font-weight: 600;
              color: #111827;
              margin: 0 0 16px 0;
              text-align: center;
            ">
              ${firstTicket?.eventName || 'Evento'}
            </h2>
            <div style="margin-bottom: 12px;">
              <span style="font-size: 18px; margin-right: 8px;">📅</span>
              <span style="font-size: 14px; color: #6b7280;">
                Fecha - Hora
              </span>
              <p style="
                margin: 4px 0 0 26px;
                font-size: 14px;
                color: #374151;
              ">
                ${eventDate}
              </p>
            </div>
            <div>
              <span style="font-size: 18px; margin-right: 8px;">📍</span>
              <span style="font-size: 14px; color: #6b7280;">
                Ubicación
              </span>
              <p style="
                margin: 4px 0 0 26px;
                font-size: 14px;
                color: #374151;
              ">
                ${eventLocation}
              </p>
            </div>
          </div>

          <!-- Tickets -->
          ${ticketsHtml}

          <!-- Total -->
          <div style="
            background: white;
            border-radius: 12px;
            padding: 20px 24px;
            margin-top: 24px;
            text-align: center;
          ">
            <p style="
              font-size: 14px;
              color: #6b7280;
              margin: 0 0 8px 0;
            ">
              Total de la compra
            </p>
            <p style="
              font-size: 28px;
              font-weight: 700;
              color: #111827;
              margin: 0;
            ">
              S/${totalAmount}
            </p>
          </div>

          <!-- Footer -->
          <div style="
            text-align: center;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
          ">
            <p style="
              font-size: 14px;
              color: #6b7280;
              margin: 0;
            ">
              Gracias por confiar en <strong style="color: #8b5cf6;">Eventuro</strong>
            </p>
            <p style="
              font-size: 12px;
              color: #9ca3af;
              margin: 12px 0 0 0;
            ">
              Si tienes alguna duda, contáctanos a eventuriotickets@gmail.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: flattenedAttachments,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Correo de confirmación enviado a ${to}`);
}

export async function sendReminderEmail(to, eventInfo) {
  const { title, eventDate, venue, clientName } = eventInfo;
  
  const formattedDate = new Date(eventDate).toLocaleString('es-PE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const mailOptions = {
    from: `"Eventuro" <${config.EMAIL_USER}>`,
    to,
    subject: `${clientName}, recuerda tu evento ${title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: #f3f4f6;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        ">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="
              display: inline-block;
              background: #f59e0b;
              width: 60px;
              height: 60px;
              border-radius: 12px;
              margin-bottom: 16px;
            ">
              <span style="
                font-size: 32px;
                color: white;
                line-height: 60px;
              ">⏰</span>
            </div>
            <h1 style="
              font-size: 32px;
              font-weight: 700;
              color: #111827;
              margin: 0;
            ">
              ¡No olvides tu próximo evento!
            </h1>
          </div>

          <div style="
            background: white;
            border-radius: 12px;
            padding: 32px 24px;
            text-align: center;
          ">
            <p style="
              font-size: 18px;
              color: #374151;
              line-height: 1.6;
              margin: 0 0 24px 0;
            ">
              Hola <strong>${clientName}</strong>, te recordamos que el evento <strong style="color: #8b5cf6;">${title}</strong> se llevará a cabo el:
            </p>
            
            <div style="
              background: #f9fafb;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            ">
              <p style="
                font-size: 16px;
                color: #111827;
                font-weight: 600;
                margin: 0 0 8px 0;
              ">
                📅 ${formattedDate}
              </p>
              <p style="
                font-size: 14px;
                color: #6b7280;
                margin: 0;
              ">
                📍 ${venue}
              </p>
            </div>

            <p style="
              font-size: 16px;
              color: #374151;
              margin: 24px 0 0 0;
            ">
              ¡Que no se te pase la fecha! 🎉
            </p>
          </div>

          <div style="
            text-align: center;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
          ">
            <p style="
              font-size: 14px;
              color: #6b7280;
              margin: 0;
            ">
              <strong style="color: #8b5cf6;">Eventuro</strong> - Tus eventos, siempre contigo
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Correo de recordatorio enviado a ${to}`);
}