import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import CancelReservationButton from "@/components/ui/CancelReservationButton";

import { getUser } from "@/lib/auth/get-user";
import {
  getReservationById,
} from "@/actions/reservations";

type ReservationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const statusStyles = {
  CONFIRMED: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    label: "Confirmed",
  },
  PENDING: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    label: "Pending",
  },
  CANCELLED: {
    dot: "bg-red-400",
    text: "text-red-400",
    label: "Cancelled",
  },
  COMPLETED: {
    dot: "bg-zinc-600",
    text: "text-zinc-500",
    label: "Completed",
  },
} as const;

/**
 * bookingDate is stored as a calendar date string:
 *
 * "2026-08-30"
 *
 * We intentionally parse it as a calendar date rather than
 * using new Date("2026-08-30"), which can introduce timezone
 * shifts depending on the environment.
 */
function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  const calendarDate = new Date(year, month - 1, day);

  return calendarDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * startTime and endTime are actual DateTime values.
 */
function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function ReservationPage({
  params,
}: ReservationPageProps) {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/my-reservations");
  }

  const { id } = await params;

  const reservation = await getReservationById(id);

  if (!reservation) {
    notFound();
  }

  const status = statusStyles[reservation.status];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back */}
        <Link
          href="/my-reservations"
          className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          My Reservations
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">
                Reservation details
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                Your Table Reservation
              </h1>
            </div>

            {/* Status */}
            <div
              className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${status.text}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
              />

              {status.label}
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 shadow-sm">
          {/* Date & Time */}
          <div className="border-b border-zinc-800/80 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-emerald-400">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                  Date
                </p>

                <p className="mt-1 text-base font-medium text-white">
                  {formatDate(reservation.bookingDate)}
                </p>

                <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-500">
                  <Clock3 className="h-3.5 w-3.5" />

                  <span>
                    {formatTime(reservation.startTime)} –{" "}
                    {formatTime(reservation.endTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid divide-y divide-zinc-800/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {/* Table */}
            <div className="flex items-center gap-3 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-zinc-500">
                <MapPin className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-zinc-600">
                  Table
                </p>

                <p className="mt-0.5 text-sm font-medium text-white">
                  Table {reservation.table.number}
                </p>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-zinc-500">
                <Users className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-zinc-600">
                  Guests
                </p>

                <p className="mt-0.5 text-sm font-medium text-white">
                  {reservation.guests}{" "}
                  {reservation.guests === 1 ? "guest" : "guests"}
                </p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="border-t border-zinc-800/80 px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">
                Reservation duration
              </span>

              <span className="font-medium text-zinc-300">
                90 minutes
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {(reservation.status === "CONFIRMED" ||
          reservation.status === "PENDING") && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">
                Need to cancel?
              </p>

              <p className="mt-0.5 text-xs text-zinc-600">
                You can cancel your reservation anytime.
              </p>
            </div>

            <CancelReservationButton
              reservationId={reservation.id}
            />
          </div>
        )}

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-zinc-700">
          Please arrive on time. Your table is reserved for 90 minutes.
        </p>
      </div>
    </main>
  );
}