import cron from 'node-cron';
import { processReminders } from '../services/reminder.services.js';

cron.schedule('*/1 * * * *', async () => {
  console.log('Buscando órdenes para recordatorio...');
  try {
    await processReminders();
  } catch (err) {
    console.error('Error en recordatorios:', err);
  }
});
