import { prisma } from "@/lib/prisma";

export async function getAllTables() {
  return prisma.table.findMany({
    orderBy: {
      number: "asc",
    },
    select: {
      id: true,
      number: true,
      capacity: true,
      createdAt: true,
      _count: {
        select: {
          bookings: true,
        },
      },
    },
  });
}