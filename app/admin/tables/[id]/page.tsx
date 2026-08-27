import Link from "next/link";
import { ArrowLeft, CalendarDays, Hash, UsersRound } from "lucide-react";
import { notFound } from "next/navigation";

import getTableById from "@/actions/admin/getTableById";
import { AdminReservationsTable } from "@/components/admin/AdminReservationsTable";
import { AdminReservation } from "@/components/admin/AdminReservationRow";

type TablePageProps = {
  params: Promise<{
    id: string;
  }>;
};

interface OverviewStatProps {
  label: string;
  value: string;
  icon: typeof Hash;
}

function OverviewStat({ label, value, icon: Icon }: OverviewStatProps) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition-colors duration-200 hover:border-zinc-700/80">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>

      <p className="mt-4 text-xs font-medium text-zinc-500">{label}</p>

      <p className="mt-1 truncate text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default async function TablePage({ params }: TablePageProps) {
  const { id } = await params;
  const table = await getTableById(id);

  if (!table) {
    notFound();
  }

  // Map database bookings to the AdminReservation model
  const reservations: AdminReservation[] = table.bookings.map((booking) => ({
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
  }));

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/admin/tables"
        className="inline-flex w-fit items-center gap-2 text-sm text-zinc-500 transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Tables
      </Link>

      {/* Header */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-zinc-500">
            Table management
          </p>

          <h1 className="truncate text-3xl font-semibold tracking-tight text-white">
            Table #{table.number}
          </h1>

          <p className="text-sm text-zinc-400">
            View table information and reservation history.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-zinc-800/60 bg-zinc-900/30 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-zinc-400">Active</span>
        </div>
      </header>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <OverviewStat
          label="Table number"
          value={`#${table.number}`}
          icon={Hash}
        />
        <OverviewStat
          label="Seating capacity"
          value={`${table.capacity} ${table.capacity === 1 ? "guest" : "guests"}`}
          icon={UsersRound}
        />
        <OverviewStat
          label="Total reservations"
          value={String(table.bookings.length)}
          icon={CalendarDays}
        />
      </section>

      {/* Reservations Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Reservations
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Reservations associated with this table.
          </p>
        </div>

        <AdminReservationsTable reservations={reservations} />
      </section>
    </div>
  );
}