import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const basePasswords = ["SuperAdmin!2025", "123456", "123A5."];

export default async function insertPasswords(prisma, totalUsers) {
  const passData = [];

  for (let i = 1; i <= totalUsers; i++) {
    let rawPass;
    if (i > 3) rawPass = faker.internet.password({ length: 10 });
    else rawPass = basePasswords[i - 1];

    const hashed = await bcrypt.hash(rawPass, 10);
    console.log(rawPass);

    passData.push({
      userId: i,
      hashedPassword: hashed,
    });
  }

  await prisma.passwordUser.createMany({ data: passData });
}
