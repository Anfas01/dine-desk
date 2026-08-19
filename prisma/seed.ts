import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Setup pg Pool and Prisma Adapter
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding tables...");

  // Optional: Clear existing tables to avoid duplicate table numbers on re-runs
  await prisma.table.deleteMany({});

  const tablesData: { number: number; capacity: number }[] = [];
  let tableNumber = 1;

  // 1. Two tables with capacity 8
  for (let i = 0; i < 2; i++) {
    tablesData.push({
      number: tableNumber++,
      capacity: 8,
    });
  }

  // 2. Four tables with capacity 4
  for (let i = 0; i < 4; i++) {
    tablesData.push({
      number: tableNumber++,
      capacity: 4,
    });
  }

  // 3. Eight tables with capacity 2
  for (let i = 0; i < 8; i++) {
    tablesData.push({
      number: tableNumber++,
      capacity: 2,
    });
  }

  // Insert all 14 tables into the database
  await prisma.table.createMany({
    data: tablesData,
  });

  console.log(`Successfully seeded ${tablesData.length} tables!`);
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