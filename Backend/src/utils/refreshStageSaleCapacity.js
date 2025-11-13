import { PrismaClient, Prisma } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

//Este código se encarga de actualizar periódicamente la capacidad restante de las zonas de eventos que tienen activada la venta escalonada.
export async function refreshStagedSaleCapacity() {
  console.log(`[${new Date().toISOString()}] Starting staged sale capacity refresh...`);

  const zones = await prisma.eventDateZone.findMany({
    where: {
      eventDate: {
        event: {
          stagedSale: true,
          status: 'A', // solo eventos activos
        },
        startAt: { gt: new Date() }, // solo fechas futuras (vigentes)
      },
    },
    include: {
      eventDate: {
        include: { event: true },
      },
    },
  });

  for (const z of zones) {
    const e = z.eventDate.event;

    // Debe tener venta escalonada válida
    if (!e.stagedSale || !e.quantityStagedSale || !e.stagedSalePeriod) continue;

    // Si ya se liberó todo, no hacer nada
    if (z.quantityTicketsReleased >= z.capacity) continue;

    // Si ya está lleno, skip
    if (z.capacityRemaining >= z.capacity) continue;

    // Determinar el periodo en milisegundos
    const periodMs =
      e.stagedSalePeriod === 'D' ? 24 * 60 * 60 * 1000 :
      e.stagedSalePeriod === 'W' ? 7 * 24 * 60 * 60 * 1000 :
      e.stagedSalePeriod === 'M' ? 30 * 24 * 60 * 60 * 1000 :
      null;

    if (!periodMs || !z.lastCapacityRemainingIncrement) continue;

    const now = new Date();
    const lastInc = new Date(z.lastCapacityRemainingIncrement);

    // Si ya pasó el tiempo necesario, liberar más entradas
    if (now - lastInc >= periodMs) {
      const qtyToAdd = Number(e.quantityStagedSale);

      // Cuántas aún faltan por liberar
      const remainingToRelease = z.capacity - z.quantityTicketsReleased;

      // Solo libera lo que falta, sin pasarse
      const increment = Math.min(qtyToAdd, remainingToRelease);

      // Nuevo capacityRemaining
      const newCapacityRemaining = Math.min(z.capacity, z.capacityRemaining + increment);
      const newTicketsReleased = z.quantityTicketsReleased + increment;

      // Solo actualizar si realmente hay incremento
      if (newCapacityRemaining > z.capacityRemaining) {
        await prisma.eventDateZone.update({
          where: { eventDateZoneId: z.eventDateZoneId },
          data: {
            capacityRemaining: newCapacityRemaining,
            quantityTicketsReleased: newTicketsReleased,
            lastCapacityRemainingIncrement: now,
            updatedAt: now,
          },
        });

        console.log(
          ` Zona ${z.eventDateZoneId}: +${increment} tickets → Liberados: ${newTicketsReleased}/${z.capacity}`
        );
      }
    }
  }

  console.log(`[${new Date().toISOString()}] Refresh finished.`);
}
