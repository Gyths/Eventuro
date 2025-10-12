import { dmmfToRuntimeDataModel } from "../generated/prisma/runtime/library.js";
import { prisma } from "../utils/prisma.js";

export async function createEventRepo(input) {
  return prisma.$transaction(async (tx) => {
    const event = await tx.event.create({
      data: {
        organizerId: BigInt(input.organizerId),
        title: input.title,
        inPerson: input.inPerson,
        description: input.description,
        accessPolicy: input.accessPolicy,
        accessPolicyDescription: input.accessPolicyDescription ?? null,
      },
      select: {
        eventId: true,
      },
    });

    const eventId = event.eventId;

    let venueId = null;

    if (input.inPerson) {
      const venue = input.venue;
      const v = await tx.venue.create({
        data: {
          eventId,
          city: venue.city,
          address: venue.address,
          addressUrl: venue.addressUrl,
          reference: venue.reference,
          capacity: venue.capacity,
        },
        select: {
          venueId: true,
        },
      });

      venueId = v.venueId;
    }

    const categories = [];

    if (
      Array.isArray(input.eventCategories) &&
      input.eventCategories.length > 0
    ) {
      for (const eventToCategoryId of input.eventCategories) {
        categories.push({
          eventId,
          eventCategoryId: eventToCategoryId,
        });
      }

      await tx.eventToCategory.createMany({
        data: categories,
        skipDuplicates: true,
      });
    }

    const salePhasesCreated = [];
    if (Array.isArray(input.salePhases) && input.salePhases.length > 0) {
      for (const salePhase of input.salePhases) {
        const eventSalePhase = await tx.eventSalesPhase.create({
          data: {
            eventId,
            name: salePhase.name,
            startAt: new Date(salePhase.startAt),
            endAt: new Date(salePhase.endAt),
            percentage: Number(salePhase.percentage),
          },
          select: {
            eventSalesPhaseId: true,
          },
        });

        salePhasesCreated.push({
          eventSalePhaseId: Number(eventSalePhase.eventSalesPhaseId),
        });
      }
    }

    const datesCreated = [];
    for (const date of input.dates) {
      const eventDate = await tx.eventDate.create({
        data: {
          eventId,
          startAt: new Date(date.startAt),
          endAt: new Date(date.endAt),
        },
        select: {
          eventDateId: true,
        },
      });

      const eventDateId = eventDate.eventDateId;
      const zonesCreated = [];

      for (const zone of input.zones) {
        let seatMapId = null;
        //Si es zona numerada se crean los asientos y sus seatMap
        if (zone.kind == "SEATED") {
          const seatMap = await tx.seatMap.create({
            data: {
              rows: zone.rows,
              cols: zone.cols,
            },
            select: {
              seatMapId: true,
            },
          });

          seatMapId = seatMap.seatMapId;
          const seats = [];

          for (let r = 1; r <= zone.rows; r++) {
            for (let c = 1; c <= zone.cols; c++) {
              seats.push({
                seatMapId,
                rowNumber: r,
                colNumber: c,
              });
            }
          }

          await tx.seat.createMany({
            data: seats,
            skipDuplicates: true,
          });
        }

        const eventDateZone = await tx.eventDateZone.create({
          data: {
            eventDateId,
            name: zone.name,
            kind: zone.kind,
            basePrice: zone.basePrice,
            capacity: zone.capacity,
            capacityRemaining: zone.capacity,
            seatMapId,
            currency: zone.currency,
          },
          select: {
            eventDateZoneId: true,
          },
        });

        const eventDateZoneId = eventDateZone.eventDateZoneId;

        //Si tiene allocations(+65, estudiante, etc), lo que Luis Flores llama tipos
        let allocationsCreated = null;
        if (Array.isArray(zone.allocations) && zone.allocations.length > 0) {
          allocationsCreated = [];

          for (const allocation of zone.allocations) {
            const eventDateZoneAllocation =
              await tx.eventDateZoneAllocation.create({
                data: {
                  eventDateZoneId,
                  audienceName: allocation.audienceName,
                  discountPercent: allocation.discountPercent,
                  allocatedQuantity: allocation.allocatedQuantity,
                  remainingQuantity: allocation.remainingQuantity,
                },
                select: {
                  eventDateZoneAllocationId: true,
                },
              });

            allocationsCreated.push({
              eventDateZoneAllocationId: Number(
                eventDateZoneAllocation.eventDateZoneAllocationId
              ),
            });
          }
        }

        zonesCreated.push({
          eventDateZoneId: Number(eventDateZoneId),
          seatMapId: seatMapId ? Number(seatMapId) : null,
          eventDateZoneAllocation: allocationsCreated
            ? allocationsCreated
            : null,
        });
      }

      datesCreated.push({
        eventDateId: Number(eventDateId),
        zones: zonesCreated,
      });
    }
    return {
      eventId: Number(eventId),
      venueId: Number(venueId) ?? null,
      salePhases: salePhasesCreated,
      dates: datesCreated,
    };
  });
}

export async function listEventRepo() {
  return prisma.event.findMany({
    select: {
      eventId: true,
      organizerId: true,
      title: true,
      status: true,
      inPerson: true,
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
}

export async function listAvailableTicketsRepo(input) {
  return prisma.event.findUnique({
    where: { eventId: BigInt(input.eventId) },
    select: {
      //Solo se devuelve el id del evento, el resto de campos se obtiene de listEventRepo
      eventId: true,
      //Relación EventDate
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
      dates: {
        select: {
          eventDateId: true,
          startAt: true,
          endAt: true,
          //Relación EventZoneDate
          zoneDates: {
            select: {
              eventDateZoneId: true,
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
                  audienceName: true,
                  discountPercent: true,
                  allocatedQuantity: true,
                  remainingQuantity: true,
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
}
