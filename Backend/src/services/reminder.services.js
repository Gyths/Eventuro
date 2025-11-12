import { getPendingReminders, markReminderSent } from '../repositories/order.repo.js';
import { sendReminderEmail } from './email.service.js';

export async function processReminders() {
  const orders = await getPendingReminders();

  for (const order of orders) {
    // cada orden tiene varios items, tomamos el primero (todas son del mismo comprador)
    const firstItem = order.items[0];
    if (!firstItem) continue;

    const ticket = firstItem.Ticket[0];
    if (!ticket || !ticket.owner) continue;

    const owner = ticket.owner;
    const event = firstItem.eventDate.event;

    const eventInfo = {
      title: event.title,
      clientName: owner.name,
      eventDate: firstItem.eventDate.startAt,
      venue: event.venueName ?? 'Lugar por confirmar',
    };

    await sendReminderEmail(owner.email, eventInfo);
    await markReminderSent(order.orderId);
  }

  console.log(`Recordatorios enviados: ${orders.length}`);
}
