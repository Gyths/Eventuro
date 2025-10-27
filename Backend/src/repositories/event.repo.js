import { create } from "domain";
import { dmmfToRuntimeDataModel } from "../generated/prisma/runtime/library.js";
import { prisma } from "../utils/prisma.js";
import { uploadFile, getSignedUrlForFile } from "../utils/s3.js";

export async function createEventRepo(input) {
  return prisma.$transaction(async (tx) => {

    // --- Manejo del imagenPrincipal (multer) ---
    let imagePrincipalKey = null;
    if (input.imagenPrincipal) {
      const buffer = input.imagenPrincipal.buffer;
      const fileName = `events/${Date.now()}_${input.imagenPrincipal.originalname}`;
      imagePrincipalKey = await uploadFile(fileName, buffer, input.imagenPrincipal.mimetype);
    }

    // --- Manejo del imagenBanner (multer) ---
    let imageBannerKey = null;
    if (input.imagenBanner) {
      const buffer = input.imagenBanner.buffer;
      const fileName = `events/${Date.now()}_${input.imagenBanner.originalname}`;
      imageBannerKey = await uploadFile(fileName, buffer, input.imagenBanner.mimetype);
    }

    // --- Parsear y convertir tipos ---
    const organizerId = BigInt(input.organizerId);
    const inPerson = input.inPerson === "true" || input.inPerson === true;
    const venue = input.venue ? JSON.parse(input.venue) : null;
    const eventCategories = input.eventCategories ? JSON.parse(input.eventCategories) : [];
    const dates = input.dates ? JSON.parse(input.dates) : [];
    const zones = input.zones ? JSON.parse(input.zones) : [];
    const accessPolicyDescription = input.accessPolicyDescription ?? null;

    // --- Crear evento ---
    const event = await tx.event.create({
  data: {
    organizerId: BigInt(input.organizerId), // solo esto
    title: input.title,
    inPerson: inPerson,
    imagePrincipalKey: imagePrincipalKey  ?? "",
    imageBannerKey: imageBannerKey  ?? "",
    description: input.description,
    accessPolicy: input.accessPolicy,
    accessPolicyDescription: input.accessPolicyDescription ?? null,
  },
  select: { eventId: true },
});

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
      await tx.eventToCategory.createMany({ data: categoriesData, skipDuplicates: true });
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

        const eventDateZone = await tx.eventDateZone.create({
          data: {
            eventDateId,
            name: zone.name,
            kind: zone.kind,
            basePrice: Number(zone.basePrice),
            capacity: Number(zone.capacity),
            capacityRemaining: Number(zone.capacity),
            seatMapId,
            currency: zone.currency,
          },
          select: { eventDateZoneId: true },
        });

        let allocationsCreated = null;
        if (Array.isArray(zone.allocations) && zone.allocations.length > 0) {
          allocationsCreated = [];
          for (const allocation of zone.allocations) {
            const alloc = await tx.eventDateZoneAllocation.create({
              data: {
                eventDateZoneId: eventDateZone.eventDateZoneId,
                audienceName: allocation.audienceName,
                discountPercent: Number(allocation.discountPercent)
              },
              select: { eventDateZoneAllocationId: true },
            });
            allocationsCreated.push({ eventDateZoneAllocationId: Number(alloc.eventDateZoneAllocationId) });
          }
        }

        zonesCreated.push({
          eventDateZoneId: Number(eventDateZone.eventDateZoneId),
          seatMapId: seatMapId ? Number(seatMapId) : null,
          eventDateZoneAllocation: allocationsCreated ?? null,
        });
      }

      datesCreated.push({ eventDateId: Number(eventDateId), zones: zonesCreated });
    }

    return { eventId: Number(eventId), venueId: Number(venueId) ?? null, dates: datesCreated };
  });
}


export async function listEventRepo() {
  const events= await prisma.event.findMany({
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
    if (event.imagePrincipalKey) { //crear url firmada imagen principal
      try {
        event.imagePrincipalURLSigned = await getSignedUrlForFile(event.imagePrincipalKey);
      } catch (err) {
        console.error("Error generando signed URL:", err);
        event.imagePrincipalURLSigned = null;
      }
    }

    
    if (event.imageBannerKey) { //crear url firmada imagen banner
      try {
        event.imageBannerURLSigned = await getSignedUrlForFile(event.imageBannerKey);
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
  return prisma.event.findUnique({
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
  })
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


export async function listAvailableTicketsRepo(input) {
  const event = await prisma.event.findUnique({
    where: { eventId: BigInt(input.eventId) },
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
                  discountPercent: true,
                },
              },

              //SeatMaps relacionados al evento
              seatMap: {
                select: {
                  seatMapId: true,
                  rows: true,
                  cols: true,

                  //Asientos relacionados a cada seatMap
                  occupiedSeats: {
                    orderBy: {
                      seatId: "asc",
                    },
                    select: {
                      seatId: true,
                      rowNumber: true,
                      colNumber: true,
                      status: true,
                    },
                  },
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
      event.imagePrincipalURLSigned = await getSignedUrlForFile(event.imagePrincipalKey);
    } catch (err) {
      console.error("Error generando signed URL principal:", err);
      event.imagePrincipalURLSigned = null;
    }
  }

  if (event?.imageBannerKey) {
    try {
      event.imageBannerURLSigned = await getSignedUrlForFile(event.imageBannerKey);
    } catch (err) {
      console.error("Error generando signed URL banner:", err);
      event.imageBannerURLSigned = null;
    }
  }

  return event;

}

export async function setEventFeeRepo({ eventId, percentage }) {
  const eventIdNormalized = BigInt(eventId);
  const percentageNormalized = Number(percentage).toFixed(2);

  return prisma.$transaction(async (tx) => {

    let fee = await tx.fee.findFirst({
      where: { percentage: percentageNormalized },
      select: {
        feeId: true,
        percentage: true
      },
    });

    if (!fee) {
      fee = await tx.fee.create({
        data: { percentage: percentageNormalized },
        select: {
          feeId: true,
          percentage: true
        },
      });
    }

    const event = await tx.event.update({
      where: { eventId: eventIdNormalized },
      data: { feeId: fee.feeId },
      select: {
        eventId: true,
        title: true,
        fee: { select: { feeId: true, percentage: true } },
      }
    });
    return event;
  });
}
