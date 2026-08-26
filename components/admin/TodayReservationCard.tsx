import React from "react";
import { BookingStatus } from "@/generated/prisma/client";

export type TodayReservation = {
  id: string;
  guests: number;
  startTime: Date | string;
  status: BookingStatus;
  user: {
    name: string;
  };
  table: {
    number: number;
  };
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  CONFIRMED: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  CANCELLED: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  COMPLETED: "text-zinc-400 bg-zinc-800/50 border-zinc-700/50",
};

interface TodayReservationItemProps {
  reservation: TodayReservation;
}

export default function TodayReservationCard({ reservation }: TodayReservationItemProps) {
  const formattedTime = new Date(reservation.startTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const statusStyle =
    STATUS_STYLES[reservation.status] ??
    "text-zinc-400 bg-zinc-800/50 border-zinc-700/50";

  return (
    <li className="flex items-center justify-between gap-6 px-5 py-4 transition-colors hover:bg-zinc-800/20">
      <div className="min-w-0 space-y-1">
        <p className="truncate text-sm font-medium text-white">
          {reservation.user.name}
        </p>
        <p className="text-xs text-zinc-400">
          {reservation.guests} {reservation.guests === 1 ? "guest" : "guests"} · Table{" "}
          {reservation.table.number}
        </p>
      </div>

      <div className="shrink-0 space-y-1 text-right">
        <p className="text-sm font-medium text-zinc-300">
          {formattedTime}
        </p>
        <span
          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusStyle}`}
        >
          {reservation.status}
        </span>
      </div>
    </li>
  );
}