import { prisma } from "../../lib/prisma";

export default async function getTableById(tableId: string) {
  return await prisma.table.findUnique({
    where: {
      id: tableId,
    },
    include: {
      bookings: {
        orderBy: {
          startTime: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
}