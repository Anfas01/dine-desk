"use client";

import { CalendarX2 } from "lucide-react";

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
          My reservations
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Everything you&apos;ve booked, past and upcoming.
        </p>
      </div>

      {/* Empty state */}
      {reservations.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <CalendarX2 className="mb-3 h-5 w-5 text-zinc-700" />

          <h2 className="text-sm font-medium text-white">
            No reservations yet
          </h2>

          <p className="mt-1.5 max-w-xs text-sm text-zinc-500">
            When you book a table, it&apos;ll show up here.
          </p>
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