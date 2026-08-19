import { prisma } from "@/lib/prisma";

export default async function findTable(
  capacity: number,
  bookingDate: Date,
  startTime: Date,
  endTime: Date
) {
  try {
    const table = await prisma.table.findFirst({
      where: {
        // Table must have enough capacity
        capacity: {
          gte: capacity,
        },

        // Table must not have an overlapping confirmed booking
        bookings: {
          none: {
            bookingDate,
            status: "CONFIRMED",

            // Existing booking starts before requested booking ends
            startTime: {
              lt: endTime,
            },

            // Existing booking ends after requested booking starts
            endTime: {
              gt: startTime,
            },
          },
        },
      },

      // Prefer the smallest suitable table
      orderBy: {
        capacity: "asc",
      },
    });

    return table;
  } catch (error) {
    console.error("Error finding available table:", error);

    throw new Error("Failed to find available table");
  }
}