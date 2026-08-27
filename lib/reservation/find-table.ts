import { prisma } from "@/lib/prisma";

export default async function findTable(
  capacity: number,
  startTime: Date,
  endTime: Date
) {
  try {
    const table = await prisma.table.findFirst({
      where: {
        // Table must have enough capacity.
        capacity: {
          gte: capacity,
        },

        /*
         * Table must not have an overlapping confirmed booking.
         *
         * Two reservations overlap when:
         *
         * existing.start < requested.end
         * AND
         * existing.end > requested.start
         */
        bookings: {
          none: {
            status: {
              in: ["CONFIRMED", "PENDING"],
            },

            startTime: {
              lt: endTime,
            },

            endTime: {
              gt: startTime,
            },
          },
        },
      },

      // Prefer the smallest suitable table.
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