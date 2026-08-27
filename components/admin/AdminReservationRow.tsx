"use client";

import React, { useTransition } from "react";
import { ChevronDown, Users } from "lucide-react";
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

const STATUS_RING: Record<BookingStatus, string> = {
  PENDING: "focus:ring-amber-500/30",
  CONFIRMED: "focus:ring-emerald-500/30",
  CANCELLED: "focus:ring-rose-500/30",
  COMPLETED: "focus:ring-sky-500/30",
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

  const statusRing = STATUS_RING[reservation.status] ?? "focus:ring-zinc-700/50";

  return (
    <tr className="group border-b border-zinc-800/60 transition-colors last:border-b-0 hover:bg-zinc-900/40">
      <td className="max-w-55 px-4 py-3.5 align-top">
        <p className="truncate text-sm font-medium text-zinc-100">
          {reservation.user.name}
        </p>
        <p className="mt-0.5 truncate text-xs text-zinc-500">
          {reservation.user.email}
        </p>
      </td>

      <td className="px-4 py-3.5 align-top">
        <p className="whitespace-nowrap text-sm text-zinc-300">
          {formatDate(reservation.bookingDate)}
        </p>
        <p className="mt-0.5 whitespace-nowrap text-xs text-zinc-500">
          {formatTime(reservation.startTime)}
        </p>
      </td>

      <td className="px-4 py-3.5 align-top">
        <span className="inline-flex items-center whitespace-nowrap rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-xs font-medium text-zinc-300">
          Table {reservation.table.number}
        </span>
      </td>

      <td className="px-4 py-3.5 align-top">
        <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-zinc-300">
          <Users className="h-3.5 w-3.5 shrink-0 text-zinc-500" strokeWidth={2} />
          {reservation.guests}
        </div>
      </td>

      <td className="px-4 py-3.5 align-top">
        <div className="relative inline-block">
          <select
            value={reservation.status}
            onChange={handleStatusChange}
            disabled={isPending}
            className={`
              min-h-9 cursor-pointer appearance-none rounded-md border py-1.5 pl-2.5 pr-7
              text-xs font-medium uppercase tracking-wide outline-none
              transition-all duration-150
              focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50
              ${statusStyle} ${statusRing}
            `}
          >
            {ALL_STATUSES.map((status) => (
              <option
                key={status}
                value={status}
                className="bg-zinc-900 text-zinc-200"
              >
                {status}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 opacity-60"
            strokeWidth={2.5}
          />
        </div>
      </td>
    </tr>
  );
}