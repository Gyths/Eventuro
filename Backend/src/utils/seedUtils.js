import { faker } from "@faker-js/faker";

export function generateUser({ isOrganizer = false, status = "A" } = {}) {
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: "9" + faker.string.numeric(8),
    birthdate: faker.date.birthdate({ min: 1970, max: 2005, mode: "year" }),
    gender: faker.helpers.arrayElement(["M", "F"]),
    status,
    isOrganizer,
  };
}
