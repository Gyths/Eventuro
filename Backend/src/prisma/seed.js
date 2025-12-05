import { PrismaClient } from "../generated/prisma/index.js";
import insertUsers from "./insertUsers.js";
import insertCategories from "./insertCategories.js";
import insertEvents from "./insertEvents.js";
import insertEventToCategory from "./insertEventToCategory.js";
import insertVenues from "./insertVenues.js";
import insertEventSalesPhases from "./insertEventSalesPhases.js";
import insertDiscount from "./insertDiscounts.js";
import insertEventDates from "./insertEventDates.js";
import insertEventDateZone from "./insertEventDateZone.js";
import insertEventDateZoneAllocations from "./insertEventDateZoneAllocations.js";
import insertOrders from "./insertOrders.js";
import createViews from "./createViews.js";
import createTriggers from "./createTriggers.js";

const prisma = new PrismaClient();

async function main() {
  // Preventive data cleanup
  await prisma.$executeRawUnsafe(`
    DO $$
    DECLARE
      t RECORD;
    BEGIN
      FOR t IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
      LOOP
        EXECUTE 'TRUNCATE TABLE public.' || quote_ident(t.tablename) || ' RESTART IDENTITY CASCADE;';
      END LOOP;
    END $$;
  `);

  await insertUsers(prisma);

  await insertCategories(prisma.eventCategory);

  await insertEvents(prisma);
  await insertEventToCategory(prisma);
  await insertDiscount(prisma);
  await insertVenues(prisma);
  await insertEventSalesPhases(prisma);
  await insertEventDates(prisma);
  await insertEventDateZone(prisma);
  await insertEventDateZoneAllocations(prisma.eventDateZoneAllocation, prisma.eventDateZone);
  await insertOrders(prisma);
  await createViews(prisma);
  await createTriggers(prisma);
}

main().finally(() => prisma.$disconnect());
