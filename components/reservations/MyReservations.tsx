"use client";

import Link from "next/link";
import { ArrowRight, CalendarX2 } from "lucide-react";

import ReservationCard, {
  type Reservation,
} from "./ReservationCard";

type MyReservationsProps = {
  reservations: Reservation[];
};

export default function MyReservations({
  reservations,
}: MyReservationsProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          My Reservations
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          View and manage your upcoming and past reservations.
        </p>
      </div>

      {/* Empty state */}
      {reservations.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-16 text-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-zinc-600">
            <CalendarX2 className="h-5 w-5" />
          </div>

          <h2 className="text-lg font-medium text-white">
            No reservations yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
            You don&apos;t have any reservations at the moment. Book a
            table to enjoy your next dining experience.
          </p>

          <Link
            href="/book-table"
            className="group mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            Book a Table
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </div>
      )}
    </div>
  );
}