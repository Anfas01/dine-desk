"use server";

import { revalidatePath } from "next/cache";
import { TableBooking } from "@/generated/prisma/client";

import { getUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/prisma";
import findTable from "@/lib/reservation/find-table";

// --- Types ---

export type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type CreateReservationInput = {
  capacity: number;

  // Calendar date only.
  // Example: "2026-08-28"
  bookingDate: string;

  // Actual instant in time.
  startTime: Date;
};

// --- Actions ---

/**
 * Creates a new table reservation after verifying user authentication
 * and table availability.
 */
export async function createReservation(
  input: CreateReservationInput
): Promise<ActionResponse<TableBooking>> {
  try {
    const user = await getUser();

    if (!user?.id) {
      return {
        success: false,
        message: "You must be logged in to make a reservation.",
      };
    }

    // Validate capacity
    if (
      !Number.isFinite(input.capacity) ||
      input.capacity < 1 ||
      input.capacity > 12
    ) {
      return {
        success: false,
        message: "Party size must be between 1 and 12 guests.",
      };
    }

    // Validate booking date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.bookingDate)) {
      return {
        success: false,
        message: "Please select a valid date.",
      };
    }

    // Validate that the date actually exists.
    const [year, month, day] = input.bookingDate.split("-").map(Number);

    const dateCheck = new Date(Date.UTC(year, month - 1, day));

    if (
      dateCheck.getUTCFullYear() !== year ||
      dateCheck.getUTCMonth() !== month - 1 ||
      dateCheck.getUTCDate() !== day
    ) {
      return {
        success: false,
        message: "Please select a valid date.",
      };
    }

    // Validate start time
    if (
      !(input.startTime instanceof Date) ||
      Number.isNaN(input.startTime.getTime())
    ) {
      return {
        success: false,
        message: "Please select a valid time.",
      };
    }

    // Reservation must be in the future.
    if (input.startTime.getTime() < Date.now()) {
      return {
        success: false,
        message: "Please select a time in the future.",
      };
    }

    // Reservation lasts 90 minutes.
    const endTime = new Date(
      input.startTime.getTime() + 90 * 60 * 1000
    );

    /*
     * Find a table that does not have an overlapping confirmed booking.
     *
     * bookingDate is intentionally NOT passed here.
     * startTime/endTime already identify the reservation interval.
     */
    const table = await findTable(
      input.capacity,
      input.startTime,
      endTime
    );

    if (!table) {
      return {
        success: false,
        message: "No available tables found for the selected time slot.",
      };
    }

    const tableBooking = await prisma.tableBooking.create({
      data: {
        tableId: table.id,
        userId: user.id,

        // Store calendar date exactly as selected.
        bookingDate: input.bookingDate,

        // Store actual UTC instant.
        startTime: input.startTime,
        endTime,

        guests: input.capacity,

        // status defaults to PENDING.
      },
    });

    revalidatePath("/my-reservations");
    revalidatePath("/reservations");

    return {
      success: true,
      message:
        "Reservation request submitted and is pending confirmation!",
      data: tableBooking,
    };
  } catch (error) {
    console.error("Create reservation error:", error);

    return {
      success: false,
      message: "Failed to create reservation. Please try again.",
    };
  }
}

/**
 * Cancels an existing reservation if conditions are met.
 */
export async function cancelReservation(
  reservationId: string
): Promise<ActionResponse<TableBooking>> {
  try {
    const user = await getUser();

    if (!user?.id) {
      return {
        success: false,
        message: "You must be logged in to cancel a reservation.",
      };
    }

    const reservation = await prisma.tableBooking.findUnique({
      where: {
        id: reservationId,
      },
      select: {
        id: true,
        userId: true,
        status: true,
        startTime: true,
      },
    });

    if (!reservation) {
      return {
        success: false,
        message: "Reservation not found.",
      };
    }

    if (reservation.userId !== user.id) {
      return {
        success: false,
        message: "You don't have permission to cancel this reservation.",
      };
    }

    if (reservation.status === "CANCELLED") {
      return {
        success: false,
        message: "This reservation is already cancelled.",
      };
    }

    if (reservation.status === "COMPLETED") {
      return {
        success: false,
        message: "Completed reservations cannot be cancelled.",
      };
    }

    if (reservation.startTime.getTime() < Date.now()) {
      return {
        success: false,
        message: "Past or ongoing reservations cannot be cancelled.",
      };
    }

    const updated = await prisma.tableBooking.update({
      where: {
        id: reservationId,
      },
      data: {
        status: "CANCELLED",
      },
    });

    revalidatePath("/my-reservations");
    revalidatePath("/reservations");

    return {
      success: true,
      message: "Reservation cancelled successfully.",
      data: updated,
    };
  } catch (error) {
    console.error("Cancel reservation error:", error);

    return {
      success: false,
      message: "Failed to cancel reservation. Please try again.",
    };
  }
}

/**
 * Retrieves all reservations belonging to the currently authenticated user.
 */
export async function getUserReservations() {
  const user = await getUser();

  if (!user?.id) {
    throw new Error(
      "You must be logged in to view your reservations."
    );
  }

  return await prisma.tableBooking.findMany({
    where: {
      userId: user.id,
    },

    orderBy: {
      startTime: "asc",
    },

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
}

/**
 * Retrieves a single reservation belonging to the currently authenticated user.
 */
export async function getReservationById(
  reservationId: string
) {
  const user = await getUser();

  if (!user?.id) {
    throw new Error(
      "You must be logged in to view this reservation."
    );
  }

  if (!reservationId) {
    return null;
  }

  return await prisma.tableBooking.findFirst({
    where: {
      id: reservationId,
      userId: user.id,
    },

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
          number: true,
          capacity: true,
        },
      },
    },
  });
}