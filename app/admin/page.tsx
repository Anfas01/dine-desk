import {
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock,
  LucideIcon,
} from "lucide-react";

import {
  getAdminReservationStats,
  getTodayReservations,
} from "@/lib/admin/reservations";

import {
  AdminReservation,
} from "@/components/admin/AdminReservationRow";
import { AdminReservationsTable } from "@/components/admin/AdminReservationsTable";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/50">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">
        <p className="text-sm text-zinc-500">{label}</p>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 transition-colors duration-200 group-hover:border-zinc-700 group-hover:text-zinc-300">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <p className="relative mt-4 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}

export default async function AdminPage() {
  const [stats, todayReservations] = await Promise.all([
    getAdminReservationStats(),
    getTodayReservations(),
  ]);

  const statCards: StatCardProps[] = [
    { label: "Total Reservations", value: stats.total, icon: CalendarDays },
    { label: "Pending", value: stats.pending, icon: Clock },
    { label: "Confirmed", value: stats.confirmed, icon: CircleCheck },
    { label: "Cancelled", value: stats.cancelled, icon: CircleX },
    { label: "Completed", value: stats.completed, icon: CalendarCheck },
  ];

  const todayAdminReservations: AdminReservation[] = todayReservations.map(
    (reservation) => ({
      id: reservation.id,
      bookingDate: reservation.bookingDate,
      startTime: reservation.startTime,
      guests: reservation.guests,
      status: reservation.status,
      user: {
        name: reservation.user.name,
        email: reservation.user.email,
      },
      table: {
        number: reservation.table.number,
      },
    })
  );

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <header className="space-y-1">
          <p className="text-sm font-medium text-zinc-500">Overview</p>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-400">
            Monitor reservations and manage your restaurant.
          </p>
        </header>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {statCards.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        {/* Today's Reservations */}
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-medium text-white">
              Today&apos;s Reservations
            </h2>
            <p className="mt-0.5 text-sm text-zinc-400">
              Reservations scheduled for today.
            </p>
          </div>

          <AdminReservationsTable reservations={todayAdminReservations} />
        </section>
      </div>
    </main>
  );
}