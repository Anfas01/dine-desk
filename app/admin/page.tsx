import {
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  CircleX,
  LucideIcon,
} from "lucide-react";

import {
  getAdminReservationStats,
  getTodayReservations,
} from "@/lib/admin/reservations";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

const statusStyles: Record<string, string> = {
  CONFIRMED: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  CANCELLED: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  COMPLETED: "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

function StatCard({ label, value, icon: Icon }: StatCardProps) {
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
    { label: "Total Reservations", value: stats.total, icon: CalendarDays },
    { label: "Confirmed", value: stats.confirmed, icon: CircleCheck },
    { label: "Cancelled", value: stats.cancelled, icon: CircleX },
    { label: "Completed", value: stats.completed, icon: CalendarCheck },
  ];

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

        {/* Stats Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
            {todayReservations.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-medium text-zinc-300">
                  No reservations today
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  There are no reservations scheduled for today.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-800/80">
                {todayReservations.map((reservation) => {
                  const formattedTime = new Date(
                    reservation.startTime
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <li
                      key={reservation.id}
                      className="flex items-center justify-between gap-6 px-5 py-4 transition-colors hover:bg-zinc-800/20"
                    >
                      <div className="min-w-0 space-y-1">
                        <p className="truncate text-sm font-medium text-white">
                          {reservation.user.name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {reservation.guests}{" "}
                          {reservation.guests === 1 ? "guest" : "guests"} · Table{" "}
                          {reservation.table.number}
                        </p>
                      </div>

                      <div className="shrink-0 text-right space-y-1">
                        <p className="text-sm font-medium text-zinc-300">
                          {formattedTime}
                        </p>
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                            statusStyles[reservation.status] || "text-zinc-400 bg-zinc-800/50 border-zinc-700/50"
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}