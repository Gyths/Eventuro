import { prisma, Prisma } from "../utils/prisma.js";

function buildWhere({
  organizerId,
  eventId,
  orderStatus,
  ticketStatus,
  from,
  to,
}) {
  const conds = [];
  const params = [];

  if (organizerId) {
    conds.push(Prisma.sql`"organizerId" = ${Number(organizerId)}`);
  }
  if (eventId) {
    conds.push(Prisma.sql`"eventId" = ${Number(eventId)}`);
  }
  if (orderStatus) {
    conds.push(Prisma.sql`"orderStatus" = ${orderStatus}`);
  }
  if (ticketStatus) {
    conds.push(Prisma.sql`"ticketStatus" = ${ticketStatus}`);
  }
  if (from) {
    conds.push(Prisma.sql`"orderCreatedAt" >= ${new Date(from)}`);
  }
  if (to) {
    conds.push(Prisma.sql`"orderCreatedAt" < ${new Date(to)}`);
  }

  if (conds.length === 0) return Prisma.empty;
  return Prisma.sql`WHERE ${Prisma.join(conds, Prisma.sql` AND `)}`;
}

export async function listReportSaleTicketsRepo({
  page = 1,
  pageSize = 20,
  sortBy = "orderCreatedAt",
  sortDir = "desc",
  filters = {},
}) {
  const safeSortBy = [
    "orderCreatedAt",
    "issuedAt",
    "eventStartAt",
    "pricePaid",
    "platformCommissionAmount",
    "netForOrganizer",
  ].includes(sortBy)
    ? Prisma.raw(`"${sortBy}"`)
    : Prisma.raw(`"orderCreatedAt"`);

  const safeSortDir =
    sortDir?.toLowerCase() === "asc" ? Prisma.sql`ASC` : Prisma.sql`DESC`;

  const where = buildWhere(filters);
  const offset = Math.max(0, (Number(page) - 1) * Number(pageSize));
  const limit = Math.max(1, Math.min(200, Number(pageSize))); // evita páginas enormes

  // 1) total
  const totalRows = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(*)::bigint AS "count" FROM public."ReportSaleTicket" ${where}`
  );
  const total = Number(totalRows?.[0]?.count ?? 0);

  // 2) page
  const rows = await prisma.$queryRaw(
    Prisma.sql`
      SELECT
        "ticketId","orderItemId","orderId","issuedAt","orderCreatedAt","orderStatus",
        "ticketStatus","refundStatus","eventId","eventTitle","inPerson",
        "organizerId","organizerCompany","eventDateId","eventStartAt","eventDateZoneId",
        "zoneName","eventDateZoneAllocationId","allocationName","seatId","currency",
        -- montos como string para precisión:
        ("pricePaid")::text AS "pricePaid",
        ("feePercentage")::text AS "feePercentage",
        ("platformCommissionAmount")::text AS "platformCommissionAmount",
        ("netForOrganizer")::text AS "netForOrganizer"
      FROM public."ReportSaleTicket"
      ${where}
      ORDER BY ${safeSortBy} ${safeSortDir}, "ticketId" DESC
      LIMIT ${limit} OFFSET ${offset}
    `
  );

  return { total, page: Number(page), pageSize: limit, rows };
}

export async function exportReportSaleTicketsCsvRepo({ filters = {} }) {
  const where = buildWhere(filters);
  const rows = await prisma.$queryRaw(
    Prisma.sql`
      SELECT
        "ticketId","orderItemId","orderId","issuedAt","orderCreatedAt","orderStatus",
        "ticketStatus","refundStatus","eventId","eventTitle","inPerson",
        "organizerId","organizerCompany","eventDateId","eventStartAt","eventDateZoneId",
        "zoneName","eventDateZoneAllocationId","allocationName","seatId","currency",
        ("pricePaid")::text AS "pricePaid",
        ("feePercentage")::text AS "feePercentage",
        ("platformCommissionAmount")::text AS "platformCommissionAmount",
        ("netForOrganizer")::text AS "netForOrganizer"
      FROM public."ReportSaleTicket" ${where}
      ORDER BY "orderCreatedAt" DESC, "ticketId" DESC
    `
  );
  return rows;
}

export const showSalesReportRepo = async (organizerId) => {
  const events = await prisma.event.findMany({
    where: { organizerId, status: "A" },
    include: {
      venue: true,
      dates: {
        include: {
          zoneDates: true,
          Ticket: true,
        },
      },
    },
  });

  let totalGross = 0;
  let totalNet = 0;
  let totalTicketsSold = 0;
  let totalRefunds = 0;

  const eventReports = [];

  // ===============================
  // NUEVO: AGRUPAR VENTAS POR MES Y POR EVENTO
  // ===============================
  const sales = await prisma.ticket.findMany({
    where: {
      status: { in: ["PAID", "USED"] },
      eventDate: {
        event: {
          organizerId,
        },
      },
    },
    select: {
      pricePaid: true,
      issuedAt: true,
      eventDate: {
        select: {
          eventId: true,
        },
      },
    },
  });

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const monthlySales = {};

  // inicializamos todos los meses con []
  monthNames.forEach(m => (monthlySales[m] = []));

  // poblamos las ventas
  for (const s of sales) {
    const monthIndex = s.issuedAt.getMonth(); // 0–11
    const monthName = monthNames[monthIndex];

    monthlySales[monthName].push({
      eventId: s.eventDate.eventId,
      monto: Number(s.pricePaid),
    });
  }


  // ===============================
  // REPORTES POR EVENTO
  // ===============================
  for (const event of events) {
    let eventGross = 0;
    let eventRefunds = 0;
    let ticketsSold = 0;
    let totalCapacity = 0;

    // SUMAR CAPACIDAD DE TODAS LAS ZONAS DE TODAS LAS FECHAS
    for (const date of event.dates) {
      for (const zone of date.zoneDates) {
        totalCapacity += zone.capacity;
      }
    }

    // PROCESAR TICKETS DEL EVENTO
    for (const date of event.dates) {
      for (const ticket of date.Ticket) {
        const price = Number(ticket.pricePaid);

        eventGross += price;

        if (ticket.refundStatus === "APPROVED") {
          eventRefunds += price;
        }

        if (ticket.status === "PAID" || ticket.status === "USED") {
          ticketsSold++;
        }
      }
    }

    const eventNet = eventGross - eventRefunds;
    const refundRate = eventGross ? (eventRefunds / eventGross) * 100 : 0;

    const occupancy =
      totalCapacity > 0 ? (ticketsSold / totalCapacity) * 100 : 0;

    // ACUMULACIÓN GLOBAL
    totalGross += eventGross;
    totalNet += eventNet;
    totalTicketsSold += ticketsSold;
    totalRefunds += eventRefunds;

    eventReports.push({
      eventId: event.eventId,
      title: event.title,

      // capacidades y ventas
      capacity: totalCapacity,
      sold: ticketsSold,

      // dinero
      gross: eventGross.toFixed(2),
      net: eventNet.toFixed(2),
      refundAmount: eventRefunds.toFixed(2),
      refundRate: refundRate.toFixed(2),

      // ocupación
      occupancy: occupancy.toFixed(2),

      // estado
      status:
        event.status === "A"
          ? "Aceptado"
          : event.status === "P"
            ? "Pendiente"
            : "Denegado",

      dates: event.dates.map((d) => ({
        startAt: d.startAt,
        endAt: d.endAt,
      })),
    });
  }

  const refundRateTotal = totalGross
    ? (totalRefunds / totalGross) * 100
    : 0;

  return {
    summary: {
      gross: totalGross.toFixed(2),
      net: totalNet.toFixed(2),
      ticketsSold: totalTicketsSold,
      refundRate: refundRateTotal.toFixed(2),
    },
    events: eventReports,

    charts: {
      salesByMonth: [monthlySales],
    },
  };
};
