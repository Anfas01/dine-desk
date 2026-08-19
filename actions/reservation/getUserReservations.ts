"use server";

import { getUser } from "@/lib/auth/getUser";
import { prisma } from "@/lib/prisma";

export async function getUserReservations() {
  const user = await getUser();

  if (!user?.id) {
    throw new Error("You must be logged in to view your reservations.");
  }

  const reservations = await prisma.tableBooking.findMany({
    where: { userId: user.id },
    orderBy: { startTime: "desc" },
    select: {
      id: true,
      bookingDate: true,
      startTime: true,
      endTime: true,
      guests: true,
      status: true,
      table: {
        select: {
          id: true,
          capacity: true,
          number: true,
        },
      },
    },
  });

  return reservations;
}