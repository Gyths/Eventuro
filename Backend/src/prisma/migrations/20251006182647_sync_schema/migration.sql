/*
  Warnings:

  - The values [S] on the enum `CURRENCY` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."ORDER_STATUS" AS ENUM ('CREATED', 'PENDING_PAYMENT', 'PAID', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."SEAT_STATUS" AS ENUM ('AVAILABLE', 'HELD', 'SOLD');

-- CreateEnum
CREATE TYPE "public"."TICKET_STATUS" AS ENUM ('PAID', 'CANCELLED', 'USED', 'EXPIRED');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."CURRENCY_new" AS ENUM ('PEN', 'USD');
ALTER TABLE "public"."EventDateZone" ALTER COLUMN "currency" TYPE "public"."CURRENCY_new" USING ("currency"::text::"public"."CURRENCY_new");
ALTER TABLE "public"."Order" ALTER COLUMN "currency" TYPE "public"."CURRENCY_new" USING ("currency"::text::"public"."CURRENCY_new");
ALTER TABLE "public"."Ticket" ALTER COLUMN "currency" TYPE "public"."CURRENCY_new" USING ("currency"::text::"public"."CURRENCY_new");
ALTER TYPE "public"."CURRENCY" RENAME TO "CURRENCY_old";
ALTER TYPE "public"."CURRENCY_new" RENAME TO "CURRENCY";
DROP TYPE "public"."CURRENCY_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Seat" ADD COLUMN     "holdUntil" TIMESTAMP(3),
ADD COLUMN     "status" "public"."SEAT_STATUS" NOT NULL DEFAULT 'AVAILABLE';

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

-- CreateIndex
CREATE INDEX "EventDateZone_eventDateId_name_idx" ON "public"."EventDateZone"("eventDateId", "name");

-- CreateIndex
CREATE INDEX "Seat_status_idx" ON "public"."Seat"("status");

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
