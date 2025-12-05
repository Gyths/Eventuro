import { generateUser } from "../utils/seedUtils.js";
import insertPasswords from "./insertPasswords.js";
import insertOrganizers from "./insertOrganizers.js";

const organizerUsers = Array.from({ length: 5 }).map(() => generateUser({ isOrganizer: true }));

const clientUsers = Array.from({ length: 40 }).map(() => generateUser({ isOrganizer: false }));

const baseUsers = [
  {
    name: "Eventuro",
    lastName: "Admin",
    email: "admin@eventuro.com",
    phone: "911829712",
    birthdate: new Date("1985-07-15"),
    gender: "F",
    status: "A",
    isOrganizer: false,
  },
  {
    name: "Kion",
    lastName: "Tester",
    email: "kion@gmail.com",
    phone: "912943712",
    birthdate: new Date("1980-06-23"),
    gender: "F",
    status: "A",
    isOrganizer: true,
  },
  {
    name: "Juan",
    lastName: "Perez",
    email: "juan.perez@example.com",
    phone: "987654321",
    birthdate: new Date("1990-01-01"),
    gender: "M",
    status: "A",
  },
];

const allUsers = [...baseUsers, ...organizerUsers, ...clientUsers];

export default async function insertUsers(prisma) {
  //Insert users
  await prisma.user.createMany({ data: allUsers.map(({ isOrganizer, ...cleanData }) => cleanData) });

  await insertPasswords(prisma, allUsers.length);
  await insertOrganizers(prisma, allUsers);
  await prisma.administrator.create({ data: { userId: 1 } });
}
