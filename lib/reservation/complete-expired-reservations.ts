import { prisma } from "@/lib/prisma";

export async function completeExpiredReservations() {
  const now = new Date();

  const result = await prisma.tableBooking.updateMany({
    where: {
      status: {
        in: ["CONFIRMED", "PENDING"],
      },
      endTime: {
        lte: now,
      },
    },
    data: {
      status: "COMPLETED",
    },
  });

  return result.count;
}