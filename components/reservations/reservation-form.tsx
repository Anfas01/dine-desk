"use client";

import { useState, useTransition } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  Minus,
  Plus,
  Users,
} from "lucide-react";

import { createReservation } from "@/actions/reservations";

const todayISO = () => new Date().toISOString().split("T")[0];

export default function ReservationWindow() {
  const [capacity, setCapacity] = useState(2);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(
    null
  );

  const adjustCapacity = (delta: number) => {
    setCapacity((prev) => Math.min(12, Math.max(1, prev + delta)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);

    if (!bookingDate || !startTime) {
      setMessage({
        text: "Please select both date and start time.",
        error: true,
      });
      return;
    }

    const startDateTime = new Date(`${bookingDate}T${startTime}`);
    const selectedDate = new Date(`${bookingDate}T00:00:00`);

    if (
      Number.isNaN(startDateTime.getTime()) ||
      Number.isNaN(selectedDate.getTime())
    ) {
      setMessage({
        text: "Please select a valid date and time.",
        error: true,
      });
      return;
    }

    if (startDateTime.getTime() < Date.now()) {
      setMessage({
        text: "Please select a future time.",
        error: true,
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await createReservation({
          capacity,
          bookingDate: selectedDate,
          startTime: startDateTime,
        });

        // Server returned an error
        if (!result.success) {
          setMessage({
            text: result.message,
            error: true,
          });
          return;
        }

        // Reservation successful
        setMessage({
          text: result.message,
          error: false,
        });

        setBookingDate("");
        setStartTime("");
      } catch (error) {
        console.error("Reservation error:", error);

        setMessage({
          text: "Something went wrong. Please try again.",
          error: true,
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Book a table
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Pick your party size, date, and time — we&apos;ll find you a table.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-xl shadow-black/10 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Guests */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Guests
            </label>
            <div className="flex h-11 items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 pl-4 pr-2 transition-colors hover:border-zinc-700">
              <div className="flex items-center gap-2.5 text-sm text-white">
                <Users className="h-4 w-4 text-zinc-600" />
                {capacity} {capacity === 1 ? "guest" : "guests"}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustCapacity(-1)}
                  disabled={capacity <= 1}
                  aria-label="Decrease guests"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustCapacity(1)}
                  disabled={capacity >= 12}
                  aria-label="Increase guests"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="bookingDate" className="mb-2 block text-sm font-medium text-zinc-300">
              Date
            </label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
              <input
                id="bookingDate"
                type="date"
                min={todayISO()}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all scheme-dark placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="mb-2 block text-sm font-medium text-zinc-300">
              Start time
            </label>
            <div className="relative">
              <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all scheme-dark placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
            <p className="mt-1.5 text-xs text-zinc-600">
              Tables are held for 1.5 hours from your start time.
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm ${message.error
                ? "border-red-500/20 bg-red-500/10 text-red-400"
                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                }`}
            >
              {message.error ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              {message.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Finding a table...
              </>
            ) : (
              "Reserve now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}