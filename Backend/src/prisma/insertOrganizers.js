import { faker } from "@faker-js/faker";

export default async function insertOrganizers(prisma, users) {
  const organizers = users
    .map((u, idx) => ({ ...u, userId: idx + 1 }))
    .filter((u) => u.isOrganizer);

  await prisma.organizer.createMany({
    data: organizers.map((o) => ({
      userId: o.userId,
      companyName: faker.company.name(),
      idType: "RUC",
      idNumber: faker.string.numeric(11),
      status: "APPROVED",
    })),
  });
}
