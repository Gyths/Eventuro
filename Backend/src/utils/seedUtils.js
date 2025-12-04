import { faker } from "@faker-js/faker";

function weightedUserStatus() {
  const r = Math.random();
  if (r < 0.2) return "B";
  if (r < 0.3) return "D";
  if (r < 0.4) return "S";
  if (r < 0.6) return "A";
  return "A";
}

export function generateUser({ isOrganizer = false } = {}) {
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: "9" + faker.string.numeric(8),
    birthdate: faker.date.birthdate({ min: 1970, max: 2005, mode: "year" }),
    gender: faker.helpers.arrayElement(["M", "F"]),
    status: weightedUserStatus(),
    isOrganizer,
  };
}
