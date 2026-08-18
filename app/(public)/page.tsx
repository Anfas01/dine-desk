import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  UsersRound,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
          <CalendarCheck className="h-4 w-4" />
          <span>Welcome to Dine Desk</span>
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Reserve your table,
          <span className="block text-emerald-400">
            enjoy your evening.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
          Choose your preferred date, time, and table. Every reservation
          is held for 90 minutes.
        </p>

        <Link
          href="/reservation"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Reserve a Table
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Make Reservation */}
          <Link
            href="/reservation"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 transition hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-zinc-900"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CalendarCheck className="h-5 w-5" />
            </div>

            <h2 className="text-lg font-semibold">
              Make a Reservation
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Choose a date, time, number of guests, and an available
              table.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
              Reserve now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* My Reservations */}
          <Link
            href="/my-reservations"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 transition hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-zinc-900"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Clock3 className="h-5 w-5" />
            </div>

            <h2 className="text-lg font-semibold">
              My Reservations
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              View your upcoming reservations and manage your bookings.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
              View reservations
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Reservation Details */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-4xl gap-6 px-6 py-10 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                90 Minutes
              </p>
              <p className="text-xs text-zinc-500">
                Reservation duration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400">
              <UsersRound className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Flexible Seating
              </p>
              <p className="text-xs text-zinc-500">
                Choose your preferred table
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400">
              <CalendarCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Easy Booking
              </p>
              <p className="text-xs text-zinc-500">
                Reserve in just a few steps
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}