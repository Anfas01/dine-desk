"use client";

import React, { useTransition } from "react";
import { BookingStatus } from "@/generated/prisma/client";
import updateReservationStatus from "@/actions/admin/updateReservationStatus";

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

const ALL_STATUSES: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

interface AdminReservationRowProps {
  reservation: AdminReservation;
}

export function AdminReservationRow({ reservation }: AdminReservationRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as BookingStatus;

    startTransition(async () => {
      try {
        await updateReservationStatus(reservation.id, newStatus);
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    });
  };

  const statusStyle =
    STATUS_STYLES[reservation.status] ??
    "text-zinc-400 bg-zinc-800/50 border-zinc-700/50";

  return (
    <tr className="transition-colors hover:bg-zinc-900/60">
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-white">{reservation.user.name}</p>
        <p className="mt-1 text-xs text-zinc-500">{reservation.user.email}</p>
      </td>

      <td className="px-5 py-4 text-sm text-zinc-400">
        {formatDate(reservation.bookingDate)}
      </td>

      <td className="px-5 py-4 text-sm text-zinc-400">
        {formatTime(reservation.startTime)}
      </td>

      <td className="px-5 py-4 text-sm text-zinc-400">
        Table {reservation.table.number}
      </td>

      <td className="px-5 py-4 text-sm text-zinc-400">{reservation.guests}</td>

      <td className="px-5 py-4">
        <select
          value={reservation.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className={`cursor-pointer rounded-md border px-2 py-1 text-xs font-medium uppercase tracking-wider outline-none transition-opacity focus:ring-1 focus:ring-zinc-700 disabled:opacity-50 ${statusStyle}`}
        >
          {ALL_STATUSES.map((status) => (
            <option
              key={status}
              value={status}
              className="bg-zinc-900 text-zinc-200 uppercase"
            >
              {status}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}