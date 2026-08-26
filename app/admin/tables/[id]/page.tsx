import Link from "next/link";
import { ArrowLeft, CalendarDays, Hash, UsersRound } from "lucide-react";

import { notFound } from "next/navigation";

import getTableById from "@/actions/admin/getTableById";
import {
  AdminReservation,
  AdminReservationRow,
} from "@/components/admin/AdminReservationRow";

type TablePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: Date | string) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function TablePage({
  params,
}: TablePageProps) {
  const { id } = await params;

  const table = await getTableById(id);

  if (!table) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto w-full max-w-6xl">
        {/* Back */}
        <Link
          href="/admin/tables"
          className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Tables
        </Link>

        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Table management
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
              Table #{table.number}
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              View table information and reservation history.
            </p>
          </div>

          {/* Status */}
          <div className="flex w-fit items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-zinc-400">
              Active
            </span>
          </div>
        </header>

        {/* Overview */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Table Number */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
              <Hash className="h-4 w-4" />
            </div>

            <p className="mt-4 text-xs font-medium text-zinc-600">
              Table number
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              #{table.number}
            </p>
          </div>

          {/* Capacity */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
              <UsersRound className="h-4 w-4" />
            </div>

            <p className="mt-4 text-xs font-medium text-zinc-600">
              Seating capacity
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {table.capacity}{" "}
              {table.capacity === 1 ? "guest" : "guests"}
            </p>
          </div>

          {/* Reservations */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
              <CalendarDays className="h-4 w-4" />
            </div>

            <p className="mt-4 text-xs font-medium text-zinc-600">
              Total reservations
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {table.bookings.length}
            </p>
          </div>
        </section>

        {/* Reservations */}
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-white">
              Reservations
            </h2>

            <p className="mt-1 text-sm text-zinc-600">
              Reservations associated with this table.
            </p>
          </div>

          {table.bookings.length === 0 ? (
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-6 py-16 text-center">
              <CalendarDays className="mx-auto h-5 w-5 text-zinc-700" />

              <h3 className="mt-4 text-sm font-medium text-white">
                No reservations
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-sm text-zinc-600">
                This table doesn&apos;t have any reservations yet.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
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
                    {table.bookings.map((booking) => {
                      const reservation: AdminReservation = {
                        id: booking.id,
                        bookingDate: booking.bookingDate,
                        startTime: booking.startTime,
                        guests: booking.guests,
                        status: booking.status,
                        user: {
                          name: booking.user.name,
                          email: booking.user.email,
                        },
                        table: {
                          number: table.number,
                        },
                      };

                      return (
                        <AdminReservationRow
                          key={reservation.id}
                          reservation={reservation}
                          formatDate={formatDate}
                          formatTime={formatTime}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}