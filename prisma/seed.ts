import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "../lib/auth/password";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding tables...");

  // Clear existing tables
  await prisma.table.deleteMany({});

  const tablesData: { number: number; capacity: number }[] = [];
  let tableNumber = 1;

  // 2 tables with capacity 8
  for (let i = 0; i < 2; i++) {
    tablesData.push({
      number: tableNumber++,
      capacity: 8,
    });
  }

  // 4 tables with capacity 4
  for (let i = 0; i < 4; i++) {
    tablesData.push({
      number: tableNumber++,
      capacity: 4,
    });
  }

  // 8 tables with capacity 2
  for (let i = 0; i < 8; i++) {
    tablesData.push({
      number: tableNumber++,
      capacity: 2,
    });
  }

  await prisma.table.createMany({
    data: tablesData,
  });

  console.log(`Successfully seeded ${tablesData.length} tables!`);

  // -------------------------
  // Create Admin User
  // -------------------------

  const hashedPassword = await hashPassword("admin123");

  await prisma.user.upsert({
    where: {
      email: "admin123@gmail.com",
    },
    update: {
      name: "admin",
      role: "ADMIN",
    },
    create: {
      name: "admin",
      email: "admin123@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Successfully seeded admin user!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });