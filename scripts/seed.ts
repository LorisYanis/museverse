const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function seed() {
  try {
    await db.category.createMany({
      data: [
        { name: "Innovators" },
        { name: "Writers" },
        { name: "Artists" },
        { name: "Musicians" },
        { name: "Philosophers" },
        { name: "Scientists" },
      ],
    });
  } catch (error) {}
}

seed();
