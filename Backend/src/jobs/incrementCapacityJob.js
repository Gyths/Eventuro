import cron from "node-cron";
import { refreshStagedSaleCapacity } from '../utils/refreshStageSaleCapacity.js';

//Este código programa una tarea que se ejecuta cada 10 minutos para actualizar la capacidad restante de las zonas 
// de eventos con venta escalonada.
// Ejecutar cada 10 minutos
const job = cron.schedule("0 */10 * * * *", async () => {
  console.log("Ejecutando refresh de capacidad escalonada...");
  try {
    await refreshStagedSaleCapacity();
  } catch (err) {
    console.error(" Error en el job de capacidad:", err);
  }
});

job.start(); // asegúrate de iniciar el job
console.log("Cron job inicializado correctamente");
