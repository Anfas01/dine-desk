"use client";

import { CalendarX2 } from "lucide-react";
import { cancelReservation } from "@/actions/reservation/cancelReservation";

type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";

type Reservation = {
  id: string;
  bookingDate: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  status: BookingStatus;
  table: {
    id: string;
    number: number;
    capacity: number;
  };
};

type MyReservationsProps = {
  reservations: Reservation[];
};

const statusDotStyles: Record<BookingStatus, string> = {
  CONFIRMED: "bg-emerald-400",
  PENDING: "bg-amber-400",
  COMPLETED: "bg-zinc-600",
  CANCELLED: "bg-red-400",
};

const statusTextStyles: Record<BookingStatus, string> = {
  CONFIRMED: "text-emerald-400",
  PENDING: "text-amber-400",
  COMPLETED: "text-zinc-500",
  CANCELLED: "text-red-400",
};

const statusLabels: Record<BookingStatus, string> = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MyReservations({ reservations }: MyReservationsProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          My reservations
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Everything you&apos;ve booked, past and upcoming.
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <CalendarX2 className="mb-3 h-5 w-5 text-zinc-700" />
          <h2 className="text-sm font-medium text-white">No reservations yet</h2>
          <p className="mt-1.5 max-w-xs text-sm text-zinc-500">
            When you book a table, it&apos;ll show up here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-800/80 border-t border-zinc-800/80">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex items-center justify-between gap-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2.5">
                  <p className="text-sm font-medium text-white">
                    {formatDate(reservation.bookingDate)}
                  </p>
                  <span className="text-sm text-zinc-500">
                    {formatTime(reservation.startTime)} – {formatTime(reservation.endTime)}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                  <span>Table {reservation.table.number}</span>
                  <span className="text-zinc-700">·</span>
                  <span>{reservation.guests} {reservation.guests === 1 ? "guest" : "guests"}</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className={`flex items-center gap-1.5 text-xs font-medium ${statusTextStyles[reservation.status]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[reservation.status]}`} />
                  {statusLabels[reservation.status]}
                </span>

                {reservation.status === "CONFIRMED" && (
                  <button
                    type="button"
                    onClick={() => cancelReservation(reservation.id)}
                    className="text-xs text-zinc-600 transition-colors hover:text-red-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}