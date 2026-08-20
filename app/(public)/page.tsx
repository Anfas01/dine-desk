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
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
          <CalendarCheck className="h-3.5 w-3.5" />
          Simple table reservations
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Your table,
          <span className="block text-emerald-400">
            reserved with ease.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-500 sm:text-base">
          Choose your date, time, and party size. We&apos;ll find an
          available table for you.
        </p>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/book-table"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 sm:w-auto"
          >
            Book a Table
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/my-reservations"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-zinc-800 px-6 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white sm:w-auto"
          >
            My Reservations
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-zinc-800/80">
        <div className="mx-auto grid max-w-5xl divide-y divide-zinc-800/80 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Duration */}
          <div className="flex items-center gap-4 py-7 sm:px-7 sm:py-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400">
              <Clock3 className="h-4.5 w-4.5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                90-minute seating
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Plenty of time to enjoy
              </p>
            </div>
          </div>

          {/* Party Size */}
          <div className="flex items-center gap-4 py-7 sm:px-7 sm:py-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400">
              <UsersRound className="h-4.5 w-4.5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Flexible party size
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Tables for up to 8 guests
              </p>
            </div>
          </div>

          {/* Booking */}
          <div className="flex items-center gap-4 py-7 sm:px-7 sm:py-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400">
              <CalendarCheck className="h-4.5 w-4.5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Simple booking
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Reserve in just a few steps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Ready to book your table?
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
          Select a date and time to find the best available table for
          your party.
        </p>

        <Link
          href="/book-table"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        >
          Book a Table
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}