"use client";

import { Clock, Users } from "lucide-react";
import { cancelReservation } from "@/actions/reservations";

export type BookingStatus =
  | "CONFIRMED"
  | "PENDING"
  | "CANCELLED"
  | "COMPLETED";

export type Reservation = {
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

type ReservationCardProps = {
  reservation: Reservation;
};

const statusDotStyles: Record<BookingStatus, string> = {
  CONFIRMED: "bg-emerald-400",
  PENDING: "bg-amber-400",
  CANCELLED: "bg-red-400",
  COMPLETED: "bg-zinc-600",
};

const statusTextStyles: Record<BookingStatus, string> = {
  CONFIRMED: "text-emerald-400",
  PENDING: "text-amber-400",
  CANCELLED: "text-red-400",
  COMPLETED: "text-zinc-500",
};

const statusLabels: Record<BookingStatus, string> = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
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

export default function ReservationCard({
  reservation,
}: ReservationCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-xl shadow-black/5 transition-colors hover:border-zinc-700/80">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">
            {formatDate(reservation.bookingDate)}
          </p>

          <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-500">
            <Clock className="h-3.5 w-3.5" />

            <span>
              {formatTime(reservation.startTime)} –{" "}
              {formatTime(reservation.endTime)}
            </span>
          </div>
        </div>

        {/* Status */}
        <span
          className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${
            statusTextStyles[reservation.status]
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              statusDotStyles[reservation.status]
            }`}
          />

          {statusLabels[reservation.status]}
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-zinc-800/80" />

      {/* Details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>
            Table{" "}
            <span className="font-medium text-zinc-300">
              {reservation.table.number}
            </span>
          </span>

          <span className="text-zinc-700">·</span>

          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />

            {reservation.guests}{" "}
            {reservation.guests === 1 ? "guest" : "guests"}
          </span>
        </div>

        {/* Cancel */}
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
  );
}