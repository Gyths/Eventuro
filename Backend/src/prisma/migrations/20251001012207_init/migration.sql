-- CreateEnum
CREATE TYPE "public"."ACCESS_POLICY" AS ENUM ('E', 'T', 'AO');

-- CreateEnum
CREATE TYPE "public"."EVENT_STATUS" AS ENUM ('P', 'A', 'D');

-- CreateEnum
CREATE TYPE "public"."ZONE_KIND" AS ENUM ('GENERAL', 'SEATED');

-- CreateEnum
CREATE TYPE "public"."CURRENCY" AS ENUM ('S', 'USD');

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
    "endWhenTotalSold" INTEGER,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventSalesPhase_pkey" PRIMARY KEY ("eventSalesPhaseId")
);

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
CREATE INDEX "Seat_seatMapId_idx" ON "public"."Seat"("seatMapId");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_seatMapId_rowNumber_colNumber_key" ON "public"."Seat"("seatMapId", "rowNumber", "colNumber");

-- CreateIndex
CREATE INDEX "EventDateZoneAllocation_eventDateZoneId_audienceName_idx" ON "public"."EventDateZoneAllocation"("eventDateZoneId", "audienceName");

-- CreateIndex
CREATE INDEX "EventSalesPhase_eventId_startAt_idx" ON "public"."EventSalesPhase"("eventId", "startAt");

-- CreateIndex
CREATE INDEX "EventSalesPhase_eventId_priority_idx" ON "public"."EventSalesPhase"("eventId", "priority");

-- CreateIndex
CREATE INDEX "EventSalesPhase_eventId_endWhenTotalSold_idx" ON "public"."EventSalesPhase"("eventId", "endWhenTotalSold");

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
