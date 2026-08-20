"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth/getUser";
import { prisma } from "@/lib/prisma";

export async function cancelReservation(reservationId: string) {
  const user = await getUser();
  if (!user?.id) {
    throw new Error("You must be logged in to cancel a reservation.");
  }

  const reservation = await prisma.tableBooking.findUnique({
    where: { id: reservationId },
    select: { id: true, userId: true, status: true, startTime: true },
  });

  if (!reservation) {
    throw new Error("Reservation not found.");
  }

  // Ownership check — don't let a user cancel someone else's booking
  if (reservation.userId !== user.id) {
    throw new Error("You don't have permission to cancel this reservation.");
  }

  if (reservation.status === "CANCELLED") {
    throw new Error("This reservation is already cancelled.");
  }

  if (reservation.status === "COMPLETED") {
    throw new Error("Completed reservations can't be cancelled.");
  }

  if (reservation.startTime.getTime() < Date.now()) {
    throw new Error("This reservation has already started.");
  }

  const updated = await prisma.tableBooking.update({
    where: { id: reservationId },
    data: { status: "CANCELLED" },
  });

  // Re-fetch the reservations list on the page so the UI reflects the change
  revalidatePath("/reservations");

  return updated;
}