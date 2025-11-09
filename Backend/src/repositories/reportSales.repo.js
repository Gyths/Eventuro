import { prisma, Prisma } from "../utils/prisma.js";

function buildWhere({ organizerId, eventId, orderStatus, ticketStatus, from, to }) {
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
    "orderCreatedAt","issuedAt","eventStartAt",
    "pricePaid","platformCommissionAmount","netForOrganizer"
  ].includes(sortBy) ? Prisma.raw(`"${sortBy}"`) : Prisma.raw(`"orderCreatedAt"`);

  const safeSortDir = sortDir?.toLowerCase() === "asc" ? Prisma.sql`ASC` : Prisma.sql`DESC`;

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
