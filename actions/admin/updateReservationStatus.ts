"use server";

import { revalidatePath } from "next/cache";
import { BookingStatus } from "@/generated/prisma/client";

import { getUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/prisma";

export default async function updateReservationStatus(
  reservationId: string,
  status: BookingStatus
) {
  try {
    const user = await getUser();

    if (!user?.id) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const reservation = await prisma.tableBooking.findUnique({
      where: {
        id: reservationId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!reservation) {
      return {
        success: false,
        message: "Reservation not found.",
      };
    }

    const updatedReservation =
      await prisma.tableBooking.update({
        where: {
          id: reservationId,
        },
        data: {
          status,
        },
      });

    revalidatePath("/admin");
    revalidatePath("/admin/reservations");
    revalidatePath("/admin/tables");

    return {
      success: true,
      message: `Reservation status changed to ${status}.`,
      data: updatedReservation,
    };
  } catch (error) {
    console.error(
      "Update reservation status error:",
      error
    );

    return {
      success: false,
      message: "Failed to update reservation status.",
    };
  }
}