import { create } from "domain";
import { dmmfToRuntimeDataModel } from "../generated/prisma/runtime/library.js";
import { prisma } from "../utils/prisma.js";
import { uploadFile, getSignedUrlForFile } from "../utils/s3.js";
import { skip } from "../generated/prisma/runtime/library.js";
import fs from "fs";
import path from "path";
import { withAudit } from "../utils/audit.util.js";

export async function createEventRepo(userId, input) {
  return withAudit(userId, async (tx) => {
    // --- Manejo del imagenPrincipal (multer) ---
    let imagePrincipalKey = null;
    if (input.imagenPrincipal) {
      // 1. Si se sube un nuevo archivo (Multer)
      const buffer = input.imagenPrincipal.buffer;
      const fileName = `events/${Date.now()}_${
        input.imagenPrincipal.originalname
      }`;
      imagePrincipalKey = await uploadFile(
        fileName,
        buffer,
        input.imagenPrincipal.mimetype
      );
    } else if (input.imagePrincipalKey) {
      // 2. Si se está reutilizando una clave (Evento copiado)
      imagePrincipalKey = input.imagePrincipalKey;
    }

    // --- Manejo del imagenBanner ---
    let imageBannerKey = null;
    if (input.imagenBanner) {
      // 1. Si se sube un nuevo archivo (Multer)
      const buffer = input.imagenBanner.buffer;
      const fileName = `events/${Date.now()}_${
        input.imagenBanner.originalname
      }`;
      imageBannerKey = await uploadFile(
        fileName,
        buffer,
        input.imagenBanner.mimetype
      );
    } else if (input.imageBannerKey) {
      // 2. Si se está reutilizando una clave (Evento copiado)
      imageBannerKey = input.imageBannerKey;
    }

    // --- Parsear y convertir tipos ---
    const organizerId = BigInt(input.organizerId);
    const inPerson = input.inPerson === "true" || input.inPerson === true;
    const venue = input.venue ? JSON.parse(input.venue) : null;
    const eventCategories = input.eventCategories
      ? JSON.parse(input.eventCategories)
      : [];
    const discounts = input.discounts ? JSON.parse(input.discounts) : [];
    const dates = input.dates ? JSON.parse(input.dates) : [];
    const zones = input.zones ? JSON.parse(input.zones) : [];
    const accessPolicyDescription = input.accessPolicyDescription ?? null;
    const salePhases = input.salePhases ? JSON.parse(input.salePhases) : [];

    const stagedSale = input.stagedSale === "true" || input.stagedSale === true;
    const quantityStagedSale = input.quantityStagedSale
      ? BigInt(input.quantityStagedSale)
      : null;
    const stagedSalePeriod = input.stagedSalePeriod ?? null;
    // --- Crear evento ---
    const event = await tx.event.create({
      data: {
        organizerId: BigInt(input.organizerId), // solo esto
        title: input.title,
        inPerson: inPerson,
        imagePrincipalKey: imagePrincipalKey ?? "",
        imageBannerKey: imageBannerKey ?? "",
        description: input.description,
        accessPolicy: input.accessPolicy,
        accessPolicyDescription: input.accessPolicyDescription ?? null,
        ticketLimitPerUser: input.ticketLimitPerUser
          ? Number(input.ticketLimitPerUser)
          : 10, // por defecto
        stagedSale: stagedSale,
        quantityStagedSale: quantityStagedSale,
        stagedSalePeriod: stagedSalePeriod,
      },
      select: { eventId: true },
    });

    //Auditoria o Logs:

    //Dirección Carpeta Log
    const logDir = path.join(process.cwd(), "log");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Fecha actual
    const now = new Date();
    const fecha = now.toISOString().split("T")[0]; // formato YYYY-MM-DD
    const hora = now.toTimeString().split(" ")[0]; // formato HH:MM:SS

    // Archivo de log para el día actual
    const logFile = path.join(logDir, `${fecha}.log`);

    // Línea de log
    const logLine = `${hora} Se creó evento "${input.title}" de organizador con ID ${input.organizerId}\n`;

    // Escribir o añadir al archivo
    fs.appendFileSync(logFile, logLine, "utf8");

    const eventId = event.eventId;
    let venueId = null;

    // --- Crear venue si es inPerson ---
    if (inPerson && venue) {
      const v = await tx.venue.create({
        data: {
          eventId,
          city: venue.city,
          address: venue.address,
          addressUrl: venue.addressUrl,
          reference: venue.reference,
          capacity: Number(venue.capacity),
        },
        select: { venueId: true },
      });
      venueId = v.venueId;
    }

    // --- Crear categorías ---
    if (Array.isArray(eventCategories) && eventCategories.length > 0) {
      const categoriesData = eventCategories.map((id) => ({
        eventId,
        eventCategoryId: Number(id),
      }));
      await tx.eventToCategory.createMany({
        data: categoriesData,
        skipDuplicates: true,
      });
    }

    // --- Crear descuentos ---
    if (Array.isArray(discounts) && discounts.length > 0) {
      const discountsData = discounts.map((d) => ({
        eventId, // el ID recién creado en la transacción
        scope: d.scope,
        userId: null,
        code: d.code,
        percentage: Number(d.percentage),
        stackable: d.stackable ?? false,
        startAt: new Date(d.startAt),
        endAt: new Date(d.endAt),
        status: d.status ?? "A",
        availableQty: d.availableQty ? Number(d.availableQty) : null,
        appliesTo: d.appliesTo ?? "ALL",
      }));
      await tx.discount.createMany({
        data: discountsData,
        skipDuplicates: true,
      });
    }

    // --- Crear fechas, zonas y allocations ---
    const datesCreated = [];
    for (const date of dates) {
      const startAt = new Date(date.startAt);
      const endAt = new Date(date.endAt);
      const eventDate = await tx.eventDate.create({
        data: { eventId, startAt, endAt },
        select: { eventDateId: true },
      });

      const eventDateId = eventDate.eventDateId;
      const zonesCreated = [];

      for (const zone of zones) {
        let seatMapId = null;

        if (zone.kind === "SEATED") {
          const seatMap = await tx.seatMap.create({
            data: { rows: Number(zone.rows), cols: Number(zone.cols) },
            select: { seatMapId: true },
          });
          seatMapId = seatMap.seatMapId;

          const seats = [];
          for (let r = 1; r <= Number(zone.rows); r++) {
            for (let c = 1; c <= Number(zone.cols); c++) {
              seats.push({ seatMapId, rowNumber: r, colNumber: c });
            }
          }
          await tx.seat.createMany({ data: seats, skipDuplicates: true });
        }

        // Determinar cuántas entradas se liberan inicialmente
        let initialCapacityRemaining;
        if (stagedSale) {
          // Si hay venta escalonada, libera la cantidad inicial configurada
          initialCapacityRemaining = Number(quantityStagedSale);
          // Seguridad: no puede ser mayor que la capacidad total
          if (initialCapacityRemaining > Number(zone.capacity)) {
            initialCapacityRemaining = Number(zone.capacity);
          }
        } else {
          // Si no hay venta escalonada, libera todo
          initialCapacityRemaining = Number(zone.capacity);
        }
        const eventDateZone = await tx.eventDateZone.create({
          data: {
            eventDateId,
            name: zone.name,
            kind: zone.kind,
            basePrice: Number(zone.basePrice),
            capacity: Number(zone.capacity),
            capacityRemaining: initialCapacityRemaining,
            quantityTicketsReleased: initialCapacityRemaining,
            seatMapId,
            currency: zone.currency,
          },
          select: { eventDateZoneId: true },
        });

        let allocationsCreated = null;

        // 🔹 Cambio aquí: coherente con discountType y discountValue
        if (Array.isArray(zone.allocations) && zone.allocations.length > 0) {
          allocationsCreated = [];
          for (const allocation of zone.allocations) {
            const alloc = await tx.eventDateZoneAllocation.create({
              data: {
                eventDateZoneId: eventDateZone.eventDateZoneId,
                audienceName: allocation.audienceName,
                discountType: allocation.discountType, // ✅ tipo de descuento
                discountValue: Number(allocation.discountValue), // ✅ valor numérico
              },
              select: { eventDateZoneAllocationId: true },
            });
            allocationsCreated.push({
              eventDateZoneAllocationId: Number(
                alloc.eventDateZoneAllocationId
              ),
            });
          }
        }

        zonesCreated.push({
          eventDateZoneId: Number(eventDateZone.eventDateZoneId),
          seatMapId: seatMapId ? Number(seatMapId) : null,
          eventDateZoneAllocation: allocationsCreated ?? null,
        });
      }

      datesCreated.push({
        eventDateId: Number(eventDateId),
        zones: zonesCreated,
      });
    }

    if (Array.isArray(salePhases) && salePhases.length > 0) {
      // Prepara los datos para la función 'createMany'
      const phasesData = salePhases.map((phase) => ({
        eventId: eventId,
        name: phase.name,
        startAt: new Date(phase.startAt),
        endAt: new Date(phase.endAt),
        percentage: Number(phase.percentage),
        ticketLimit: phase.ticketLimit ? Number(phase.ticketLimit) : null,
        active: true,
      }));

      await tx.eventSalesPhase.createManyAndReturn({
        data: phasesData,
        skipDuplicates: true,
      });
    }

    return {
      eventId: Number(eventId),
      venueId: Number(venueId) ?? null,
      dates: datesCreated,
    };
  });
}

export async function listEventRepo() {
  const events = await prisma.event.findMany({
    select: {
      eventId: true,
      organizerId: true,
      title: true,
      status: true,
      inPerson: true,
      imagePrincipalKey: true,
      imageBannerKey: true,
      description: true,
      accessPolicy: true,
      accessPolicyDescription: true,

      // relación con categorías
      categories: {
        select: {
          category: {
            select: {
              eventCategoryId: true,
              initials: true,
              description: true,
            },
          },
        },
      },

      // relación con Venue
      venue: {
        select: {
          city: true,
          address: true,
          addressUrl: true,
          reference: true,
          capacity: true,
        },
      },

      // relación con EventDate (pueden ser muchos)
      dates: {
        select: {
          startAt: true,
          endAt: true,
        },
      },
    },
  });

  const enriched = await Promise.all(
    events.map(async (event) => {
      if (event.imagePrincipalKey) {
        //crear url firmada imagen principal
        try {
          event.imagePrincipalURLSigned = await getSignedUrlForFile(
            event.imagePrincipalKey
          );
        } catch (err) {
          console.error("Error generando signed URL:", err);
          event.imagePrincipalURLSigned = null;
        }
      }

      if (event.imageBannerKey) {
        //crear url firmada imagen banner
        try {
          event.imageBannerURLSigned = await getSignedUrlForFile(
            event.imageBannerKey
          );
        } catch (err) {
          console.error("Error generando signed URL:", err);
          event.imageBannerURLSigned = null;
        }
      }

      return event;
    })
  );
  return enriched;
}

export async function eventDetails(id) {
  const event = await prisma.event.findUnique({
    where: { eventId: BigInt(id) },
    include: {
      dates: {
        include: {
          zoneDates: {
            include: {
              allocations: true,
            },
          },
        },
      },
      salesPhases: true,
      categories: {
        include: { category: true },
      },
      organizer: true,
      venue: true,
      fee: true,
    },
  });

  if (event) {
    if (event.imagePrincipalKey) {
      try {
        event.imagePrincipalURLSigned = await getSignedUrlForFile(
          event.imagePrincipalKey
        );
      } catch (err) {
        console.error("Error generando signed URL imagen principal:", err);
        event.imagePrincipalURLSigned = null;
      }
    }

    if (event.imageBannerKey) {
      try {
        event.imageBannerURLSigned = await getSignedUrlForFile(
          event.imageBannerKey
        );
      } catch (err) {
        console.error("Error generando signed URL banner:", err);
        event.imageBannerURLSigned = null;
      }
    }
  }

  return event; // ✅ Devolver el objeto, no un array
}

export async function listEventsByOrganizerRepo(idOrganizer) {
  return prisma.event.findMany({
    where: { organizerId: BigInt(idOrganizer) },
    select: {
      eventId: true,
      title: true,
      createdAt: true,
      venue: {
        select: {
          city: true,
        },
      },
    },
  });
}

export async function listEventInfoRepo(eventId) {
  const event = await prisma.event.findUnique({
    where: { eventId: BigInt(eventId) },
    select: {
      //Se consulta toda la información del evento en caso haya habido alguna actualización durante el tiempo que el usuario estuvo en la pantalla de inicio
      eventId: true,
      organizerId: true,
      title: true,
      status: true,
      inPerson: true,
      description: true,
      accessPolicy: true,
      accessPolicyDescription: true,
      ticketLimitPerUser: true,

      imagePrincipalKey: true,
      imageBannerKey: true,

      // relación con EventCategory
      categories: {
        select: {
          category: {
            select: {
              eventCategoryId: true,
              initials: true,
              description: true,
            },
          },
        },
      },

      // relación con Venue
      venue: {
        select: {
          city: true,
          address: true,
          addressUrl: true,
          reference: true,
          capacity: true,
        },
      },

      //Relación son SalesPhases
      salesPhases: {
        where: { active: true },
        select: {
          eventSalesPhaseId: true,
          name: true,
          startAt: true,
          endAt: true,
          percentage: true,
          active: false,
        },
      },

      //Relación con Organizer
      organizer: {
        select: { organizerId: true, companyName: true },
      },

      //Relación EventDate
      dates: {
        select: {
          eventDateId: true,
          startAt: true,
          endAt: true,

          //Relación EventZoneDate
          zoneDates: {
            select: {
              eventDateZoneId: true,
              eventDateId: true,
              name: true,
              kind: true,
              basePrice: true,
              capacity: true,
              capacityRemaining: true,
              seatMapId: true,
              currency: true,

              //Relación EventZoneDateAllocated
              allocations: {
                select: {
                  eventDateZoneAllocationId: true,
                  eventDateZoneId: true,
                  audienceName: true,
                  discountType: true,
                  discountValue: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // === Generar URLs firmadas ===
  if (event?.imagePrincipalKey) {
    try {
      event.imagePrincipalURLSigned = await getSignedUrlForFile(
        event.imagePrincipalKey
      );
    } catch (err) {
      console.error("Error generando signed URL principal:", err);
      event.imagePrincipalURLSigned = null;
    }
  }

  if (event?.imageBannerKey) {
    try {
      event.imageBannerURLSigned = await getSignedUrlForFile(
        event.imageBannerKey
      );
    } catch (err) {
      console.error("Error generando signed URL banner:", err);
      event.imageBannerURLSigned = null;
    }
  }

  return event;
}

export async function listEventDateByEventIdRepo(eventId) {
  return prisma.eventDate.findMany({
    where: { eventId: BigInt(eventId) },
    select: {
      eventDateId: true,
      eventId: true,
      startAt: true,
      endAt: true,
    },
  });
}

export async function listEventDateZonesByEventDateIdRepo(
  userId,
  eventId,
  eventDateId
) {
  const [ticketCount, date, zones, activePhase] = await Promise.all([
    prisma.ticket.count({
      where: {
        eventId,
        ownerUserId: userId,
        status: { in: ["PAID", "USED", "EXPIRED"] },
      },
    }),

    prisma.eventDate.findUnique({
      where: { eventDateId: BigInt(eventDateId) },
      select: {
        startAt: true,
        endAt: true,
      },
    }),

    prisma.eventDateZone.findMany({
      where: { eventDateId: BigInt(eventDateId) },
      select: {
        eventDateZoneId: true,
        eventDateId: true,
        name: true,
        kind: true,
        basePrice: true,
        capacity: true,
        capacityRemaining: true,
        seatMapId: true,
        currency: true,

        allocations: {
          select: {
            eventDateZoneAllocationId: true,
            eventDateZoneId: true,
            audienceName: true,
            discountType: true,
            discountValue: true,
          },
        },
      },
    }),

    prisma.eventSalesPhase.findFirst({
      where: {
        eventId: BigInt(eventId),
        active: true,
      },
      select: {
        eventSalesPhaseId: true,
        ticketLimit: true,
        name: true,
        startAt: true,
        endAt: true,
        percentage: true,
        quantityTicketsSold: true,
      },
    }),
  ]);

  return { ticketCount, date, zones, activePhase };
}

export async function setEventStatusRepo(
  userId,
  { eventId, status, percentage }
) {
  return withAudit(userId, async (tx) => {
    const eventIdNormalized = BigInt(eventId);

    const dataToUpdate = { status };
    if (percentage !== undefined && percentage !== null) {
      const pNum = Number(percentage);
      if (!Number.isFinite(pNum)) {
        throw new Error("percentage debe ser numérico");
      }
      const pNormalized = Number(pNum.toFixed(2));
      const fee = await tx.fee.upsert({
        where: { percentage: pNormalized },
        create: { percentage: pNormalized },
        update: {},
        select: { feeId: true, percentage: true },
      });

      dataToUpdate.feeId = fee.feeId;
    }

    const event = await tx.event.update({
      where: { eventId: eventIdNormalized },
      data: dataToUpdate,
      select: {
        eventId: true,
        title: true,
        status: true,
        fee: { select: { feeId: true, percentage: true } },
      },
    });

    return event;
  });
}

export async function listEventstoApproveRepo({ page = 1, pageSize = 10 }) {
  const take = Math.max(1, Math.min(Number(pageSize) || 10, 50));
  const skip = Math.max(0, (Number(page) - 1) * take);

  const [items, total] = await prisma.$transaction([
    prisma.event.findMany({
      skip,
      take,
      where: { status: "P" },
      orderBy: { createdAt: "desc" },
      select: {
        eventId: true,
        title: true,
        description: true,
        imagePrincipalKey: true,
        createdAt: true,
        organizer: {
          select: {
            companyName: true,
          },
        },
        dates: {
          orderBy: { startAt: "asc" },
          select: {
            eventDateId: true,
            startAt: true,
            endAt: true,
          },
        },
      },
    }),
    prisma.event.count({ where: { status: "P" } }),
  ]);

  const allDateIds = items.flatMap((ev) => ev.dates.map((d) => d.eventDateId));
  let sumsByDateId = new Map();

  if (allDateIds.length > 0) {
    const grouped = await prisma.eventDateZone.groupBy({
      by: ["eventDateId"],
      where: { eventDateId: { in: allDateIds } },
      _sum: { capacity: true },
    });

    sumsByDateId = new Map(
      grouped.map((g) => [
        String(g.eventDateId),
        {
          totalTickets: g._sum.capacity ?? 0,
        },
      ])
    );
  }

  const enriched = items.map((ev) => ({
    ...ev,
    dates: ev.dates.map((d) => {
      const sums = sumsByDateId.get(String(d.eventDateId)) ?? {
        totalTickets: 0,
        totalRemaining: 0,
      };
      return { ...d, ...sums };
    }),
  }));

  return {
    page: Number(page),
    pageSize: take,
    total,
    totalPages: Math.ceil(total / take),
    items: enriched,
  };
}
