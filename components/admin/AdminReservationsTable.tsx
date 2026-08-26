import React from "react";
import {
  AdminReservation,
  AdminReservationRow,
} from "./AdminReservationRow";

interface AdminReservationsTableProps {
  reservations: AdminReservation[];
  formatDate: (date: Date | string) => string;
  formatTime: (time: Date | string) => string;
}

export function AdminReservationsTable({
  reservations,
  formatDate,
  formatTime,
}: AdminReservationsTableProps) {
  if (reservations.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-zinc-400">
        No reservations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-800px text-left">
        <thead className="border-b border-zinc-800/80">
          <tr>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Customer
            </th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Date
            </th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Time
            </th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Table
            </th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Guests
            </th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800/80">
          {reservations.map((reservation) => (
            <AdminReservationRow
              key={reservation.id}
              reservation={reservation}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}