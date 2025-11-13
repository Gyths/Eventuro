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

    // Si ya está lleno, skip
    if (z.capacityRemaining >= z.capacity) continue;

    // Debe tener venta escalonada válida
    if (!e.stagedSale || !e.quantityStagedSale || !e.stagedSalePeriod) continue;

    // Determinar el periodo en milisegundos
    const periodMs =
      e.stagedSalePeriod === 'D' ? 24 * 60 * 60 * 1000 :
      e.stagedSalePeriod === 'W' ? 7 * 24 * 60 * 60 * 1000 :
      e.stagedSalePeriod === 'M' ? 30 * 24 * 60 * 60 * 1000 :
      null;

    if (!periodMs || !z.lastCapacityRemainingIncrement) continue;

    const now = new Date();
    const lastInc = new Date(z.lastCapacityRemainingIncrement);

    // Verificar si ya corresponde liberar
    if (now - lastInc >= periodMs) {
      const qtyToAdd = Number(e.quantityStagedSale);
      const newCapacityRemaining = Math.min(z.capacity, z.capacityRemaining + qtyToAdd);

      // Solo actualizar si realmente hay incremento
      if (newCapacityRemaining > z.capacityRemaining) {
        await prisma.eventDateZone.update({
          where: { eventDateZoneId: z.eventDateZoneId },
          data: {
            capacityRemaining: newCapacityRemaining,
            lastCapacityRemainingIncrement: now,
            updatedAt: now,
          },
        });

        console.log(
          ` Zone ${z.eventDateZoneId}: ${z.capacityRemaining} → ${newCapacityRemaining} / ${z.capacity}`
        );
      }
    }
  }

  console.log(`[${new Date().toISOString()}] Refresh finished.`);
}
