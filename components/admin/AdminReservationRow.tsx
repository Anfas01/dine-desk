import React from "react";
import { BookingStatus } from "@/generated/prisma/client";

export type AdminReservation = {
  id: string;
  bookingDate: Date | string;
  startTime: Date | string;
  guests: number;
  status: BookingStatus;
  user: {
    name: string;
    email: string;
  };
  table: {
    number: number;
  };
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  CONFIRMED: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  CANCELLED: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  COMPLETED: "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

interface AdminReservationRowProps {
  reservation: AdminReservation;
  formatDate: (date: Date | string) => string;
  formatTime: (time: Date | string) => string;
}

export function AdminReservationRow({
  reservation,
  formatDate,
  formatTime,
}: AdminReservationRowProps) {
  const statusStyle =
    STATUS_STYLES[reservation.status] ??
    "text-zinc-400 bg-zinc-800/50 border-zinc-700/50";

  return (
    <tr className="transition-colors hover:bg-zinc-900/60">
      {/* Customer */}
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-white">{reservation.user.name}</p>
        <p className="mt-1 text-xs text-zinc-500">{reservation.user.email}</p>
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-sm text-zinc-400">
        {formatDate(reservation.bookingDate)}
      </td>

      {/* Time */}
      <td className="px-5 py-4 text-sm text-zinc-400">
        {formatTime(reservation.startTime)}
      </td>

      {/* Table */}
      <td className="px-5 py-4 text-sm text-zinc-400">
        Table {reservation.table.number}
      </td>

      {/* Guests */}
      <td className="px-5 py-4 text-sm text-zinc-400">{reservation.guests}</td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusStyle}`}
        >
          {reservation.status}
        </span>
      </td>
    </tr>
  );
}