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
  AdminReservationRow,
} from "@/components/admin/AdminReservationRow";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({
  label,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700/80">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>

        <Icon className="h-4 w-4 text-zinc-500" />
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
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
    {
      label: "Total Reservations",
      value: stats.total,
      icon: CalendarDays,
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
    },
    {
      label: "Confirmed",
      value: stats.confirmed,
      icon: CircleCheck,
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: CircleX,
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CalendarCheck,
    },
  ];

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <header className="space-y-1">
          <p className="text-sm font-medium text-zinc-500">
            Overview
          </p>

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
            <StatCard
              key={stat.label}
              {...stat}
            />
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

          <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
            {todayReservations.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <CalendarDays className="mx-auto h-5 w-5 text-zinc-700" />

                <p className="mt-4 text-sm font-medium text-zinc-300">
                  No reservations today
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  There are no reservations scheduled for today.
                </p>
              </div>
            ) : (
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
                    {todayReservations.map((reservation) => {
                      const adminReservation: AdminReservation = {
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
                      };

                      return (
                        <AdminReservationRow
                          key={adminReservation.id}
                          reservation={adminReservation}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}