export default async function createViews(prisma) {
  await prisma.$executeRawUnsafe(`
  -- Vista: 1 fila = 1 ticket (precio final ya aplicado)
  CREATE OR REPLACE VIEW public."ReportSaleTicket" AS
  SELECT
    -- Identificadores
    t."ticketId"                                   AS "ticketId",
    oi."orderItemId"                               AS "orderItemId",
    o."orderId"                                    AS "orderId",

    -- Fechas / estados
    t."issuedAt"                                   AS "issuedAt",
    o."createdAt"                                  AS "orderCreatedAt",
    o."status"                                     AS "orderStatus",
    t."status"                                     AS "ticketStatus",
    t."refundStatus"                               AS "refundStatus",

    -- Relación organizador / evento
    e."eventId"                                    AS "eventId",
    e."title"                                      AS "eventTitle",
    e."inPerson"									 AS "inPerson",	
    org."organizerId"                              AS "organizerId",
    org."companyName"                              AS "organizerCompany",

    -- Función / zona / asiento
    t."eventDateId"                                AS "eventDateId",
    d."startAt"                                    AS "eventStartAt",
    t."eventDateZoneId"                            AS "eventDateZoneId",
    z."name"                                       AS "zoneName",
    a."eventDateZoneAllocationId"					 AS "eventDateZoneAllocationId",
    a."audienceName"								 AS "allocationName",	
    t."seatId"                                     AS "seatId",
    
    -- Moneda y montos
    t."currency"                                   AS "currency",
    t."pricePaid"::numeric                         AS "pricePaid",          -- precio final por ticket
    COALESCE(f."percentage", 0)::numeric           AS "feePercentage",      -- % comisión plataforma (0..100)
    ROUND((t."pricePaid"::numeric * COALESCE(f."percentage",0)::numeric) / 100, 2)
                                                    AS "platformCommissionAmount",
    -- Neto para organizador (sin impuestos/fees del procesador porque no existen en el modelo)
    ROUND(t."pricePaid"::numeric
          - ((t."pricePaid"::numeric * COALESCE(f."percentage",0)::numeric) / 100), 2)
                                                    AS "netForOrganizer"

  FROM public."Ticket" t
  JOIN public."OrderItem"    oi  ON oi."orderItemId"     = t."orderItemId"
  JOIN public."Order"        o   ON o."orderId"          = oi."orderId"
  JOIN public."Event"        e   ON e."eventId"          = t."eventId"
  LEFT JOIN public."Fee"     f   ON f."feeId"            = e."feeId"
  LEFT JOIN public."Organizer" org ON org."organizerId"  = e."organizerId"
  LEFT JOIN public."EventDate" d  ON d."eventDateId"     = t."eventDateId"
  LEFT JOIN public."EventDateZone" z ON z."eventDateZoneId" = t."eventDateZoneId"
  LEFT JOIN public."EventDateZoneAllocation" a ON a."eventDateZoneAllocationId" = t."eventDateZoneAllocationId"; 
  `);
  console.log("Vista ReportSaleTicket creada correctamente");
}
