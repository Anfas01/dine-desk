"use client";

import React from "react";
import { CalendarX } from "lucide-react";
import {
  AdminReservation,
  AdminReservationRow,
} from "./AdminReservationRow";

interface AdminReservationsTableProps {
  reservations: AdminReservation[];
}

const HEADERS = ["Customer", "Date", "Table", "Guests", "Status"];

export function AdminReservationsTable({
  reservations,
}: AdminReservationsTableProps) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-6 py-16 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          <CalendarX className="h-4.5 w-4.5 text-zinc-500" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-300">
            No reservations found
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            New bookings will appear here once customers reserve a table.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead className="border-b border-zinc-800/60 bg-zinc-900/40">
            <tr>
              {HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/60">
            {reservations.map((reservation) => (
              <AdminReservationRow
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}