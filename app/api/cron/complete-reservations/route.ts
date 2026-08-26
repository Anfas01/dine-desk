import { NextResponse } from "next/server";

import { completeExpiredReservations } from "@/lib/reservation/complete-expired-reservations";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const count = await completeExpiredReservations();

    return NextResponse.json({
      success: true,
      completed: count,
    });
  } catch (error) {
    console.error("Complete expired reservations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to complete expired reservations.",
      },
      { status: 500 }
    );
  }
}