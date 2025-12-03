import { create } from "domain";
import { dmmfToRuntimeDataModel } from "../generated/prisma/runtime/library.js";
import { prisma } from "../utils/prisma.js";
import { uploadFile, getSignedUrlForFile } from "../utils/s3.js";
import { skip } from "../generated/prisma/runtime/library.js";
import fs from "fs";
import path from "path";
import { withAudit } from "../utils/audit.util.js";
import { title } from "process";

export async function createEventRepo(userId, input) {
  return withAudit(userId, async (tx) => {
    // --- Manejo del imagenPrincipal (multer) ---
    let imagePrincipalKey = null;
    if (input.imagenPrincipal) {
      // 1. Si se sube un nuevo archivo (Multer)
      const buffer = input.imagenPrincipal.buffer;
      const fileName = `events/${Date.now()}_${input.imagenPrincipal.originalname
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
      const fileName = `events/${Date.now()}_${input.imagenBanner.originalname
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

    // --- Manejo del refundPolicyFile ---
    let refundPolicyFileKey = null;
    if (input.policyFile) {
      const buffer = input.policyFile.buffer;
      const fileName = `refund_policies/${Date.now()}_${input.policyFile.originalname
        }`;
      refundPolicyFileKey = await uploadFile(
        fileName,
        buffer,
        input.policyFile.mimetype
      );
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
    const refundPolicyText = input.refundPolicyText ?? null;

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
        refundPolicyFileKey: refundPolicyFileKey ?? null,
        description: input.description,
        accessPolicy: input.accessPolicy,
        accessPolicyDescription: input.accessPolicyDescription ?? null,
        refundPolicyText: refundPolicyText,
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
        initialQty: d.availableQty ? Number(d.availableQty) : null,
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
    where: {
      active: true,
      dates: {
        some: {
          endAt: {
            gt: new Date(),
          },
        },
      },
    },

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
      refundPolicyText: true,

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

      if (event.refundPolicyFileKey) {
        //crear url firmada refund policy
        try {
          event.refundPolicyFileURLSigned = await getSignedUrlForFile(
            event.refundPolicyFileKey
          );
        } catch (err) {
          console.error("Error generando signed URL refund policy:", err);
          event.refundPolicyFileURLSigned = null;
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

    if (event.refundPolicyFileKey) {
      try {
        event.refundPolicyFileURLSigned = await getSignedUrlForFile(
          event.refundPolicyFileKey
        );
      } catch (err) {
        console.error("Error generando signed URL refund policy:", err);
        event.refundPolicyFileURLSigned = null;
      }
    }
  }

  return event; // ✅ Devolver el objeto, no un array
}

export async function listEventsByOrganizerRepo(idOrganizer) {
  const events = await prisma.event.findMany({
    where: {
      organizerId: BigInt(idOrganizer)

    },
    select: {
      eventId: true,
      title: true,
      createdAt: true,
      status: true,
      imagePrincipalKey: true,
      imageBannerKey: true,
      refundPolicyText: true,
      inPerson: true,
      description: true,
      venue: {
        select: {
          city: true,
          address: true,
          capacity: true,
        },
      },
      dates: {
        select: {
          startAt: true,
          endAt: true,
          zoneDates: {
            select: {
              name: true,
              capacity: true,
              capacityRemaining: true, // <-- nuevo
            },
          },
        },
        orderBy: { startAt: "asc" },
      },
    },
  });

  for (const event of events) {
    if (event.imagePrincipalKey) {
      try {
        event.imagePrincipalURLSigned = await getSignedUrlForFile(
          event.imagePrincipalKey
        );
      } catch {
        event.imagePrincipalURLSigned = null;
      }
    }

    if (event.imageBannerKey) {
      try {
        event.imageBannerURLSigned = await getSignedUrlForFile(
          event.imageBannerKey
        );
      } catch {
        event.imageBannerURLSigned = null;
      }
    }


    for (const d of event.dates) {
      if (Array.isArray(d.zoneDates)) {
        for (const z of d.zoneDates) {
          z.sold = z.capacity - z.capacityRemaining; // <-- nuevo cálculo
        }
      }
    }


  }

  return events;
}

export async function listEventInfoRepo(eventId) {
  const event = await prisma.event.findUnique({
    where: { eventId: BigInt(eventId) },
    select: {
      //Se consulta toda la información del evento en caso haya habido alguna actualización durante el tiempo que el usuario estuvo en la pantalla de inicio
      eventId: true,
      organizerId: true,
      title: true,
      refundPolicyText: true,
      status: true,
      inPerson: true,
      description: true,
      accessPolicy: true,
      accessPolicyDescription: true,
      ticketLimitPerUser: true,

      refundPolicyFileKey: true,
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
            where: { active: true },
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

  if (event?.refundPolicyFileKey) {
    try {
      event.refundPolicyFileURLSigned = await getSignedUrlForFile(
        event.refundPolicyFileKey
      );
    } catch (err) {
      console.error("Error generando signed URL refund policy:", err);
      event.refundPolicyFileURLSigned = null;
    }
  }

  return event;
}

export async function listEventDateByEventIdRepo(eventId) {
  return prisma.eventDate.findMany({
    where: { eventId: BigInt(eventId), active: true },
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
        active: true,
      },
    }),

    prisma.eventDate.findUnique({
      where: { eventDateId: BigInt(eventDateId), active: true },
      select: {
        startAt: true,
        endAt: true,
      },
    }),

    prisma.eventDateZone.findMany({
      where: { eventDateId: BigInt(eventDateId), active: true },
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

export async function updateEventDetailsRepo(userId, eventId, details) {
  return withAudit(userId, async (tx) => {
    const eventIdNormalized = BigInt(eventId);

    const dataToUpdate = {
      title: details.title,
      description: details.description,
      refundPolicyText: details.refundPolicyText,
    };

    // Actualizamos el event
    const updatedEvent = await tx.event.update({
      where: { eventId: eventIdNormalized },
      data: dataToUpdate,
      select: {
        eventId: true,
        title: true,
        description: true,
        refundPolicyText: true,
        dates: {
          select: {
            eventDateId: true,
            startAt: true,
            endAt: true,
            zoneDates: {
              select: {
                eventDateZoneId: true,
                name: true,
                capacity: true,
                basePrice: true,
              },
            },
          },
        },
        venue: { select: { capacity: true } },
      },
    });

    // Si viene actualización de precios por zona
    if (details.zones?.length) {
      for (let i = 0; i < details.zones.length; i++) {
        const dateItem = details.zones[i];
        for (let j = 0; j < (dateItem.zones || []).length; j++) {
          const zoneItem = dateItem.zones[j];
          await tx.eventDateZone.update({
            where: { eventDateZoneId: BigInt(zoneItem.zoneId) },
            data: { basePrice: Number(zoneItem.price) },
          });
        }
      }
    }

    return updatedEvent;
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
        refundPolicyText: true,
        imagePrincipalKey: true,
        createdAt: true,
        organizer: {
          select: {
            companyName: true,
          },
        },
        inPerson: true,
        venue: { select: { capacity: true } }, // Capacidad máxima del recinto
        dates: {
          orderBy: { startAt: "asc" },
          select: {
            eventDateId: true,
            startAt: true,
            endAt: true,
            zoneDates: {
              select: {
                eventDateZoneId: true,
                name: true,
                basePrice: true, // Precio base de la zona
                capacity: true,  // Puedes mostrar si quieres, pero no afecta aforo total
                currency: true,
              },
            },
          },
        },
      },
    }),
    prisma.event.count({ where: { status: "P" } }),
  ]);

  return {
    page: Number(page),
    pageSize: take,
    total,
    totalPages: Math.ceil(total / take),
    items,
  };
}

export async function listSalesSummaryByOrganizer(organizerId) {
  if (!organizerId) {
    throw new Error("organizerId requerido");
  }

  // 1. Obtener todos los eventos del organizador
  const events = await prisma.event.findMany({
    where: { organizerId: BigInt(organizerId) },
    select: {
      eventId: true,
      title: true,
      dates: {
        select: {
          eventDateId: true,
          startAt: true,
          endAt: true,
          zoneDates: {
            select: {
              eventDateZoneId: true,
              name: true,
              kind: true,
              currency: true,
              capacity: true,
              basePrice: true,
              Ticket: {
                select: {
                  ticketId: true,
                  pricePaid: true,
                  status: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // 2. Transformación para el frontend
  const result = events.map((ev) => ({
    eventId: ev.eventId,
    eventName: ev.title,
    funciones: ev.dates.map((fd) => ({
      eventDateId: fd.eventDateId,
      inicio: fd.startAt,
      fin: fd.endAt,
      zonas: fd.zoneDates.map((zone) => {
        const tickets = zone.Ticket || [];

        const ticketsVendidos = tickets.length;

        const totalRecaudado = tickets.reduce(
          (acc, t) => acc + Number(t.pricePaid || 0),
          0
        );

        return {
          zoneId: zone.eventDateZoneId,
          zoneName: zone.name,
          kind: zone.kind,
          currency: zone.currency,
          capacidadMaxima: zone.capacity,
          basePrice: Number(zone.basePrice),
          ticketsVendidos,
          totalRecaudado,
        };
      }),
    })),
  }));

  return result;
}

export async function getAttendeesByEventAndOrganizer(input) {
  const { eventId, organizerId } = input;

  // 1️ Validar que el evento exista y sea del organizador
  const event = await prisma.event.findFirst({
    where: {
      eventId: BigInt(eventId),
      organizerId: BigInt(organizerId),
    },
    select: { eventId: true },
  });

  if (!event) {
    throw new Error("El evento no existe o no pertenece a este organizador.");
  }

  // 2️ Obtener fechas del evento, incluyendo los tickets
  const eventDates = await prisma.eventDate.findMany({
    where: {
      eventId: BigInt(eventId),
    },
    select: {
      eventDateId: true,
      startAt: true,
      endAt: true,
      Ticket: {
        select: {
          ticketId: true,
          attendeeName: true,
          attendeeDni: true,
          status: true,
          seat: {
            select: {
              rowNumber: true,
              colNumber: true,
            },
          },
          zone: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: { startAt: "asc" },
  });

  // 3️ Transformar el formato a algo más limpio y directo
  return eventDates.map((date) => ({
    eventDateId: date.eventDateId,
    startAt: date.startAt,
    endAt: date.endAt,
    attendees: date.Ticket.map((ticket) => ({
      ticketId: ticket.ticketId,
      attendeeName: ticket.attendeeName,
      attendeeDni: ticket.attendeeDni,
      zoneName: ticket.zone?.name ?? null,
      seat: ticket.seat
        ? {
          row: ticket.seat.rowNumber,
          col: ticket.seat.colNumber,
        }
        : null,
    })),
  }));
}

export async function deleteEventDateZoneAllocationRepo(eventDateZoneAllocationId) {
  const allocationId = BigInt(eventDateZoneAllocationId);

  return prisma.$transaction(async (tx) => {

    const allocationWithTickets = await tx.eventDateZoneAllocation.findUnique({
      where: { eventDateZoneAllocationId: allocationId },
      select: {
        Ticket: {
          select: {
            ticketId: true,
          },
        },
      },
    });

    if (!allocationWithTickets) {
      throw new Error(`EventDateZoneAllocation con ID ${eventDateZoneAllocationId} no encontrado.`);
    }

    const relatedTicketIds = allocationWithTickets.Ticket.map(t => t.ticketId);

    const updatedAllocation = await tx.eventDateZoneAllocation.update({
      where: { eventDateZoneAllocationId: allocationId },
      data: {
        active: false
      },
      select: {
        eventDateZoneAllocationId: true,
      },
    });

    return {
      updatedAllocationId: updatedAllocation.eventDateZoneAllocationId,
      relatedTicketsIds: relatedTicketIds,
    };
  });
}

export async function deleteEventDateZoneRepo(eventDateZoneId) {
  const zoneId = BigInt(eventDateZoneId);

  return prisma.$transaction(async (tx) => {

    const zoneWithAllocations = await tx.eventDateZone.findUnique({
      where: { eventDateZoneId: zoneId },
      select: {
        allocations: {
          select: {
            eventDateZoneAllocationId: true,
          },
        },
      },
    });

    if (!zoneWithAllocations) {
      throw new Error(`EventDateZone con ID ${eventDateZoneId} no encontrado.`);
    }

    const relatedAllocationIds = zoneWithAllocations.allocations.map(a => a.eventDateZoneAllocationId);

    const updatedZone = await tx.eventDateZone.update({
      where: { eventDateZoneId: zoneId },
      data: {
        active: false,
      },
      select: {
        eventDateZoneId: true,
      },
    });

    return {
      updatedEventDateZoneId: updatedZone.eventDateZoneId,
      relatedAllocationIds: relatedAllocationIds,
    };
  });
}

export async function deleteEventDateRepo(eventDateId) {
  const dateId = BigInt(eventDateId);

  return prisma.$transaction(async (tx) => {

    const eventDateWithZones = await tx.eventDate.findUnique({
      where: { eventDateId: dateId },
      select: {
        zoneDates: {
          select: {
            eventDateZoneId: true,
          },
        },
      },
    });

    if (!eventDateWithZones) {
      throw new Error(`EventDate con ID ${eventDateId} no encontrado.`);
    }

    const relatedZoneIds = eventDateWithZones.zoneDates.map(z => z.eventDateZoneId);

    const updatedEventDate = await tx.eventDate.update({
      where: { eventDateId: dateId },
      data: {
        active: false,
      },
      select: {
        eventDateId: true,
      },
    });

    return {
      updatedEventDateId: updatedEventDate.eventDateId,
      relatedEventDateZoneIds: relatedZoneIds,
    };
  });
}

export async function deleteEventRepo(eventId) {
  const evId = BigInt(eventId);

  return prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: { eventId: evId },
      select: {
        eventId: true,
        dates: {
          select: {
            eventDateId: true,
          },
        },
      },
    });

    if (!event) {
      throw new Error(`Evento con ID ${eventId} no encontrado.`);
    }

    const datesList = event.dates.map(d => d.eventDateId);

    const updatedEvent = await tx.event.update({
      where: { eventId: evId },
      data: {
        active: false,
        status: "C",
      },
      select: {
        eventId: true,
      },
    });

    return {
      updatedEventId: updatedEvent,
      relatedEventDateIds: datesList,
    };
  });
}
