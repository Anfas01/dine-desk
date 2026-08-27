"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  CalendarDays,
  Clock3,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";

import { cancelReservation } from "@/actions/reservations";

export type BookingStatus =
  | "CONFIRMED"
  | "PENDING"
  | "CANCELLED"
  | "COMPLETED";

export type Reservation = {
  id: string;
  bookingDate: string;
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

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  const calendarDate = new Date(year, month - 1, day);

  return calendarDate.toLocaleDateString("en-US", {
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
  const [isCancelling, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      try {
        await cancelReservation(reservation.id);
      } catch (error) {
        console.error("Failed to cancel reservation:", error);
      }
    });
  };

  return (
    <Link
      href={`/my-reservations/${reservation.id}`}
      className="group block rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-zinc-600" />

            <p className="text-sm font-medium text-white">
              {formatDate(reservation.bookingDate)}
            </p>
          </div>

          {/* Time */}
          <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
            <Clock3 className="h-3.5 w-3.5 shrink-0 text-zinc-600" />

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
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
          {/* Table */}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-zinc-600" />

            <span>
              Table{" "}
              <span className="font-medium text-zinc-300">
                {reservation.table.number}
              </span>
            </span>
          </span>

          {/* Guests */}
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-zinc-600" />

            <span>
              {reservation.guests}{" "}
              {reservation.guests === 1 ? "guest" : "guests"}
            </span>
          </span>
        </div>

        {/* Cancel */}
        {(reservation.status === "CONFIRMED" ||
          reservation.status === "PENDING") && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleCancel();
            }}
            disabled={isCancelling}
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCancelling ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Cancelling
              </>
            ) : (
              "Cancel"
            )}
          </button>
        )}
      </div>

      {/* Hover hint */}
      <div className="mt-4 flex items-center justify-end">
        <span className="text-xs text-zinc-700 transition-colors group-hover:text-zinc-500">
          View details
        </span>
      </div>
    </Link>
  );
}