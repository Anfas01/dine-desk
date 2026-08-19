"use server";

import { getUser } from "@/lib/auth/getUser";
import findTable from "@/lib/reservation/findeTable";
import { prisma } from "@/lib/prisma";

type FormData = {
  capacity: number;
  bookingDate: Date;
  startTime: Date;
};

export async function createReservation(props: FormData) {
  // 1. Await user authentication
  const user = await getUser();
  if (!user?.id) {
    throw new Error("You must be logged in to make a reservation.");
  }

  // 2. Validate input
  if (!Number.isFinite(props.capacity) || props.capacity < 1 || props.capacity > 12) {
    throw new Error("Party size must be between 1 and 12 guests.");
  }

  if (Number.isNaN(props.startTime.getTime()) || Number.isNaN(props.bookingDate.getTime())) {
    throw new Error("Please select a valid date and time.");
  }

  if (props.startTime.getTime() < Date.now()) {
    throw new Error("Please select a time in the future.");
  }

  // 3. Calculate end time (1.5 hours after start time)
  const endTime = new Date(props.startTime.getTime() + 90 * 60 * 1000);

  // 4. Await table lookup
  const table = await findTable(
    props.capacity,
    props.bookingDate,
    props.startTime,
    endTime
  );

  if (!table) {
    throw new Error("No available tables found for the selected time slot.");
  }

  // 5. Create reservation with validated string values
  const tableBooking = await prisma.tableBooking.create({
    data: {
      tableId: table.id,
      userId: user.id,
      bookingDate: props.bookingDate,
      startTime: props.startTime,
      endTime: endTime,
      guests: props.capacity,
      status: "CONFIRMED",
    },
  });

  return tableBooking;
}