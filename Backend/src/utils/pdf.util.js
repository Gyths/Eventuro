import PDFDocument from 'pdfkit';
import { Buffer } from 'node:buffer';

/**
 * Genera un PDF con los datos del ticket y el QR.
 * @param {Object} ticket - Ticket con relaciones: eventDate, zone, seat, etc.
 * @param {Buffer} qrBuffer - Imagen del QR generada con qrcode.
 * @returns {Promise<Buffer>} - El PDF en memoria listo para adjuntar.
 */
export async function generateTicketPDF(ticket, qrBuffer) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const chunks = [];

    doc.on('data', chunks.push.bind(chunks));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Encabezado
    doc.fontSize(20).text('Ticket de Evento', { align: 'center' });
    doc.moveDown();

    // Detalles del evento
    doc.fontSize(14).text(`Evento: ${ticket.eventName}`);
    doc.text(`Fecha: ${new Date(ticket.eventDate).toLocaleString('es-PE')}`);
    doc.text(`Zona: ${ticket.zoneName}`);
    doc.text(`Asiento Fila: ${ticket.setRow ?? 'No definido'}`);
    doc.text(`Asiento Columna: ${ticket.setCol ?? 'No definido'}`);
    doc.text(`Ticket ID: ${ticket.ticketId}`);
    doc.moveDown();

    // QR
    doc.fontSize(12).text('Código QR:', { align: 'left' });
    doc.image(qrBuffer, { fit: [150, 150], align: 'center' });

    // Cierre
    doc.moveDown();
    doc.fontSize(10).text('Presenta este ticket en el ingreso al evento.', { align: 'center' });

    doc.end();
  });
}
