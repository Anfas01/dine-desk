"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth/getUser";
import { createToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import findTable from "@/lib/reservation/findTable";

// --- Types ---

export type ActionResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ReservationInput = {
  capacity: number;
  bookingDate: Date;
  startTime: Date;
};

// --- Actions ---

/**
 * Handles user registration, creates a session token, and sets the auth cookie.
 */
export async function registerAction(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  // Input Validation
  if (!name || !email || !password || !confirmPassword) {
    return { success: false, message: "Please fill in all fields." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "An account with this email already exists." };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await createToken(user.id);
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }

  redirect("/");
}

/**
 * Validates availability and creates a table reservation for the authenticated user.
 */
export async function createReservation(
  input: ReservationInput
): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user?.id) {
      return { success: false, message: "You must be logged in to make a reservation." };
    }

    if (!Number.isFinite(input.capacity) || input.capacity < 1 || input.capacity > 12) {
      return { success: false, message: "Party size must be between 1 and 12 guests." };
    }

    if (
      Number.isNaN(input.startTime.getTime()) ||
      Number.isNaN(input.bookingDate.getTime())
    ) {
      return { success: false, message: "Please select a valid date and time." };
    }

    if (input.startTime.getTime() < Date.now()) {
      return { success: false, message: "Please select a time in the future." };
    }

    // 1.5 hours duration
    const endTime = new Date(input.startTime.getTime() + 90 * 60 * 1000);

    const table = await findTable(
      input.capacity,
      input.bookingDate,
      input.startTime,
      endTime
    );

    if (!table) {
      return { success: false, message: "No available tables found for the selected time slot." };
    }

    const tableBooking = await prisma.tableBooking.create({
      data: {
        tableId: table.id,
        userId: user.id,
        bookingDate: input.bookingDate,
        startTime: input.startTime,
        endTime,
        guests: input.capacity,
        status: "CONFIRMED",
      },
    });

    revalidatePath("/my-reservations");

    return {
      success: true,
      message: "Reservation confirmed successfully!",
      data: tableBooking,
    };
  } catch (error) {
    console.error("Create reservation error:", error);
    return { success: false, message: "Failed to create reservation. Please try again." };
  }
}

/**
 * Retrieves all reservations associated with the current user.
 */
export async function getUserReservations() {
  const user = await getUser();

  if (!user?.id) {
    throw new Error("You must be logged in to view your reservations.");
  }

  return await prisma.tableBooking.findMany({
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
}