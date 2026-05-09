import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashPass = bcrypt.hashSync("Abcd1234", 12);
  const user1 = await prisma.users.upsert({
    where: { email: "iluvchinese@gbego.com" },
    update: {},
    create: {
      fullname: "Gbego Mariano Sourou alias Gros",
      email: "iluvchinese@gbego.com",
      description: "I luv chinese yeahh",
      jobRole: "Devops Engineer",
      jobDescription:
        "Devops Engineer who love application deployment and chinese girls",
      isAvailable: true,
      freelance: true,
      age: 24,
      address: "Rue des binguiste ,Jeanne d'arc en sueur",
      phone: "+336 00000000000",
      password: hashPass,
      role: "MarianoAdmin",
    },
  });

  console.log({ user1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
