"use client";

import { CalendarDays, Clock } from "lucide-react";

type DateTimeFieldsProps = {
  bookingDate: string;
  startTime: string;
  minDate: string;
  disabled?: boolean;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

export default function DateTimeFields({
  bookingDate,
  startTime,
  minDate,
  disabled = false,
  onDateChange,
  onTimeChange,
}: DateTimeFieldsProps) {
  return (
    <>
      {/* Date */}
      <div>
        <label
          htmlFor="bookingDate"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          Date
        </label>

        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

          <input
            id="bookingDate"
            type="date"
            min={minDate}
            value={bookingDate}
            onChange={(e) => onDateChange(e.target.value)}
            disabled={disabled}
            required
            className="h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all scheme-dark hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {/* Time */}
      <div>
        <label
          htmlFor="startTime"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          Time
        </label>

        <div className="relative">
          <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => onTimeChange(e.target.value)}
            disabled={disabled}
            required
            className="h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all scheme-dark hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <p className="mt-1.5 text-xs text-zinc-600">
          Your table will be reserved for 1.5 hours.
        </p>
      </div>
    </>
  );
}