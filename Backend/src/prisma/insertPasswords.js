import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import fs from "fs";

const basePasswords = ["SuperAdmin!2025", "123456", "123A5."];

export default async function insertPasswords(prisma, allUsers) {
  const passData = [];
  const credentials = [];

  for (let i = 1; i <= allUsers.length; i++) {
    const user = allUsers[i - 1];
    let rawPass;

    if (i > 3) rawPass = faker.internet.password({ length: 10 });
    else rawPass = basePasswords[i - 1];

    const hashed = await bcrypt.hash(rawPass, 10);

    passData.push({
      userId: i,
      hashedPassword: hashed,
    });

    let type;

    if (i - 1 === 0) type = "admin";
    else if (user.isOrganizer) type = "organizer";
    else type = "client";

    credentials.push({
      email: user.email,
      password: rawPass,
      type,
    });
  }

  await prisma.passwordUser.createMany({ data: passData });

  //Creación del archivo de credenciales
  const admins = credentials.filter((c) => c.type === "admin");
  const organizers = credentials.filter((c) => c.type === "organizer");
  const clients = credentials.filter((c) => c.type === "client");

  const formatSection = (title, list) => {
    let section = "--------------------------------------\n";
    section += `${title}\n`;
    section += "--------------------------------------\n\n";

    list.forEach((c) => {
      section += `email: ${c.email}\n`;
      section += `password: ${c.password}\n\n`;
    });

    return section;
  };

  const fileContent =
    formatSection("Administrador", admins) +
    formatSection("Organizadores", organizers) +
    formatSection("Clientes", clients);

  fs.writeFileSync("credentials.txt", fileContent);
}
