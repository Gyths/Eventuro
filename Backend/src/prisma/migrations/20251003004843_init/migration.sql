/*
  Warnings:

  - You are about to drop the column `endWhenTotalSold` on the `EventSalesPhase` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `EventSalesPhase` table. All the data in the column will be lost.
  - Added the required column `percentage` to the `EventSalesPhase` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."EventSalesPhase_eventId_endWhenTotalSold_idx";

-- DropIndex
DROP INDEX "public"."EventSalesPhase_eventId_priority_idx";

-- AlterTable
ALTER TABLE "public"."EventSalesPhase" DROP COLUMN "endWhenTotalSold",
DROP COLUMN "priority",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "percentage" DECIMAL(10,2) NOT NULL;
