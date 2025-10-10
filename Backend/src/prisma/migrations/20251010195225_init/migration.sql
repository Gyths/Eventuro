-- CreateEnum
CREATE TYPE "public"."GENDER" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "public"."STATUS_USER" AS ENUM ('A', 'S', 'D');

-- CreateEnum
CREATE TYPE "public"."ID_TYPE" AS ENUM ('RUC', 'DNI');

-- CreateEnum
CREATE TYPE "public"."ACCESS_POLICY" AS ENUM ('E', 'T', 'AO');

-- CreateEnum
CREATE TYPE "public"."EVENT_STATUS" AS ENUM ('P', 'A', 'D');

-- CreateEnum
CREATE TYPE "public"."ZONE_KIND" AS ENUM ('GENERAL', 'SEATED');

-- CreateEnum
CREATE TYPE "public"."CURRENCY" AS ENUM ('PEN', 'USD');

-- CreateEnum
CREATE TYPE "public"."ORDER_STATUS" AS ENUM ('CREATED', 'PENDING_PAYMENT', 'PAID', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."SEAT_STATUS" AS ENUM ('AVAILABLE', 'HELD', 'SOLD');

-- CreateEnum
CREATE TYPE "public"."TICKET_STATUS" AS ENUM ('PAID', 'CANCELLED', 'USED', 'EXPIRED');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "gender" "public"."GENDER",
    "status" "public"."STATUS_USER" NOT NULL DEFAULT 'A',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."PasswordUser" (
    "userId" BIGINT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "PasswordUser_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."OAuthUser" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,

    CONSTRAINT "OAuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Organizer" (
    "organizerId" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "companyName" TEXT NOT NULL,
    "idType" "public"."ID_TYPE" NOT NULL,
    "idNumber" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("organizerId")
);

-- CreateTable
CREATE TABLE "public"."EventCategory" (
    "eventCategoryId" BIGSERIAL NOT NULL,
    "initials" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("eventCategoryId")
);

-- CreateTable
CREATE TABLE "public"."EventToCategory" (
    "eventId" BIGINT NOT NULL,
    "eventCategoryId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventToCategory_pkey" PRIMARY KEY ("eventId","eventCategoryId")
);

-- CreateTable
CREATE TABLE "public"."Venue" (
    "venueId" BIGSERIAL NOT NULL,
    "eventId" BIGINT NOT NULL,
    "city" TEXT,
    "address" TEXT,
    "addressUrl" TEXT,
    "reference" TEXT,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("venueId")
);

-- CreateTable
CREATE TABLE "public"."Fee" (
    "feeId" BIGSERIAL NOT NULL,
    "percentage" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("feeId")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "eventId" BIGSERIAL NOT NULL,
    "organizerId" BIGINT NOT NULL,
    "feeId" BIGINT,
    "title" TEXT NOT NULL,
    "status" "public"."EVENT_STATUS" NOT NULL DEFAULT 'P',
    "inPerson" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "accessPolicy" "public"."ACCESS_POLICY" NOT NULL,
    "accessPolicyDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "public"."EventDate" (
    "eventDateId" BIGSERIAL NOT NULL,
    "eventId" BIGINT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDate_pkey" PRIMARY KEY ("eventDateId")
);

-- CreateTable
CREATE TABLE "public"."EventDateZone" (
    "eventDateZoneId" BIGSERIAL NOT NULL,
    "eventDateId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "public"."ZONE_KIND" NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "capacityRemaining" INTEGER NOT NULL,
    "seatMapId" BIGINT,
    "currency" "public"."CURRENCY" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDateZone_pkey" PRIMARY KEY ("eventDateZoneId")
);

-- CreateTable
CREATE TABLE "public"."SeatMap" (
    "seatMapId" BIGSERIAL NOT NULL,
    "rows" INTEGER NOT NULL,
    "cols" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeatMap_pkey" PRIMARY KEY ("seatMapId")
);

-- CreateTable
CREATE TABLE "public"."Seat" (
    "seatId" BIGSERIAL NOT NULL,
    "seatMapId" BIGINT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "colNumber" INTEGER NOT NULL,
    "status" "public"."SEAT_STATUS" NOT NULL DEFAULT 'AVAILABLE',
    "holdUntil" TIMESTAMP(3),

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("seatId")
);

-- CreateTable
CREATE TABLE "public"."EventDateZoneAllocation" (
    "eventDateZoneAllocationId" BIGSERIAL NOT NULL,
    "eventDateZoneId" BIGINT NOT NULL,
    "audienceName" TEXT NOT NULL,
    "discountPercent" DECIMAL(5,2) NOT NULL,
    "allocatedQuantity" INTEGER NOT NULL,
    "remainingQuantity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDateZoneAllocation_pkey" PRIMARY KEY ("eventDateZoneAllocationId")
);

-- CreateTable
CREATE TABLE "public"."EventSalesPhase" (
    "eventSalesPhaseId" BIGSERIAL NOT NULL,
    "eventId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "percentage" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventSalesPhase_pkey" PRIMARY KEY ("eventSalesPhaseId")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "orderId" BIGSERIAL NOT NULL,
    "buyerUserId" BIGINT NOT NULL,
    "status" "public"."ORDER_STATUS" NOT NULL DEFAULT 'CREATED',
    "currency" "public"."CURRENCY" NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "orderItemId" BIGSERIAL NOT NULL,
    "orderId" BIGINT NOT NULL,
    "eventId" BIGINT NOT NULL,
    "eventDateId" BIGINT NOT NULL,
    "eventDateZoneId" BIGINT NOT NULL,
    "eventDateZoneAllocationId" BIGINT,
    "quantity" INTEGER,
    "seatId" BIGINT,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2),
    "finalPrice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "ticketId" BIGSERIAL NOT NULL,
    "ownerUserId" BIGINT,
    "orderItemId" BIGINT NOT NULL,
    "eventId" BIGINT NOT NULL,
    "eventDateId" BIGINT NOT NULL,
    "eventDateZoneId" BIGINT NOT NULL,
    "eventDateZoneAllocationId" BIGINT,
    "seatId" BIGINT,
    "pricePaid" DECIMAL(10,2) NOT NULL,
    "currency" "public"."CURRENCY" NOT NULL DEFAULT 'PEN',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."TICKET_STATUS" NOT NULL DEFAULT 'PAID',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "public"."Hold" (
    "holdId" BIGSERIAL NOT NULL,
    "eventDateId" BIGINT NOT NULL,
    "eventDateZoneId" BIGINT NOT NULL,
    "seatId" BIGINT,
    "quantity" INTEGER,
    "buyerUserId" BIGINT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hold_pkey" PRIMARY KEY ("holdId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "OAuthUser_userId_idx" ON "public"."OAuthUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthUser_provider_providerUserId_key" ON "public"."OAuthUser"("provider", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_userId_key" ON "public"."Organizer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_idNumber_key" ON "public"."Organizer"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_initials_key" ON "public"."EventCategory"("initials");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_eventId_key" ON "public"."Venue"("eventId");

-- CreateIndex
CREATE INDEX "Event_organizerId_idx" ON "public"."Event"("organizerId");

-- CreateIndex
CREATE INDEX "Event_feeId_idx" ON "public"."Event"("feeId");

-- CreateIndex
CREATE INDEX "Event_title_idx" ON "public"."Event"("title");

-- CreateIndex
CREATE INDEX "EventDate_eventId_startAt_idx" ON "public"."EventDate"("eventId", "startAt");

-- CreateIndex
CREATE UNIQUE INDEX "EventDateZone_seatMapId_key" ON "public"."EventDateZone"("seatMapId");

-- CreateIndex
CREATE INDEX "EventDateZone_eventDateId_name_idx" ON "public"."EventDateZone"("eventDateId", "name");

-- CreateIndex
CREATE INDEX "Seat_seatMapId_idx" ON "public"."Seat"("seatMapId");

-- CreateIndex
CREATE INDEX "Seat_status_idx" ON "public"."Seat"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_seatMapId_rowNumber_colNumber_key" ON "public"."Seat"("seatMapId", "rowNumber", "colNumber");

-- CreateIndex
CREATE INDEX "EventDateZoneAllocation_eventDateZoneId_audienceName_idx" ON "public"."EventDateZoneAllocation"("eventDateZoneId", "audienceName");

-- CreateIndex
CREATE INDEX "EventSalesPhase_eventId_startAt_idx" ON "public"."EventSalesPhase"("eventId", "startAt");

-- CreateIndex
CREATE INDEX "Order_buyerUserId_idx" ON "public"."Order"("buyerUserId");

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "public"."Order"("status", "createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "public"."OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_eventDateId_eventDateZoneId_idx" ON "public"."OrderItem"("eventDateId", "eventDateZoneId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_seatId_key" ON "public"."OrderItem"("seatId");

-- CreateIndex
CREATE INDEX "Ticket_eventDateId_eventDateZoneId_idx" ON "public"."Ticket"("eventDateId", "eventDateZoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_eventDateId_seatId_key" ON "public"."Ticket"("eventDateId", "seatId");

-- CreateIndex
CREATE INDEX "Hold_eventDateId_eventDateZoneId_idx" ON "public"."Hold"("eventDateId", "eventDateZoneId");

-- CreateIndex
CREATE INDEX "Hold_expiresAt_idx" ON "public"."Hold"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Hold_seatId_key" ON "public"."Hold"("seatId");

-- AddForeignKey
ALTER TABLE "public"."PasswordUser" ADD CONSTRAINT "PasswordUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OAuthUser" ADD CONSTRAINT "OAuthUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Organizer" ADD CONSTRAINT "Organizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventToCategory" ADD CONSTRAINT "EventToCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventToCategory" ADD CONSTRAINT "EventToCategory_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "public"."EventCategory"("eventCategoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Venue" ADD CONSTRAINT "Venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "public"."Organizer"("organizerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "public"."Fee"("feeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventDate" ADD CONSTRAINT "EventDate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventDateZone" ADD CONSTRAINT "EventDateZone_eventDateId_fkey" FOREIGN KEY ("eventDateId") REFERENCES "public"."EventDate"("eventDateId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventDateZone" ADD CONSTRAINT "EventDateZone_seatMapId_fkey" FOREIGN KEY ("seatMapId") REFERENCES "public"."SeatMap"("seatMapId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seat" ADD CONSTRAINT "Seat_seatMapId_fkey" FOREIGN KEY ("seatMapId") REFERENCES "public"."SeatMap"("seatMapId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventDateZoneAllocation" ADD CONSTRAINT "EventDateZoneAllocation_eventDateZoneId_fkey" FOREIGN KEY ("eventDateZoneId") REFERENCES "public"."EventDateZone"("eventDateZoneId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventSalesPhase" ADD CONSTRAINT "EventSalesPhase_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_eventDateId_fkey" FOREIGN KEY ("eventDateId") REFERENCES "public"."EventDate"("eventDateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_eventDateZoneId_fkey" FOREIGN KEY ("eventDateZoneId") REFERENCES "public"."EventDateZone"("eventDateZoneId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "public"."Seat"("seatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_eventDateZoneAllocationId_fkey" FOREIGN KEY ("eventDateZoneAllocationId") REFERENCES "public"."EventDateZoneAllocation"("eventDateZoneAllocationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "public"."OrderItem"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_eventDateId_fkey" FOREIGN KEY ("eventDateId") REFERENCES "public"."EventDate"("eventDateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_eventDateZoneId_fkey" FOREIGN KEY ("eventDateZoneId") REFERENCES "public"."EventDateZone"("eventDateZoneId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "public"."Seat"("seatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_eventDateZoneAllocationId_fkey" FOREIGN KEY ("eventDateZoneAllocationId") REFERENCES "public"."EventDateZoneAllocation"("eventDateZoneAllocationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "public"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hold" ADD CONSTRAINT "Hold_eventDateId_fkey" FOREIGN KEY ("eventDateId") REFERENCES "public"."EventDate"("eventDateId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hold" ADD CONSTRAINT "Hold_eventDateZoneId_fkey" FOREIGN KEY ("eventDateZoneId") REFERENCES "public"."EventDateZone"("eventDateZoneId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hold" ADD CONSTRAINT "Hold_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "public"."Seat"("seatId") ON DELETE RESTRICT ON UPDATE CASCADE;
