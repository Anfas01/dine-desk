import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck2,
  UsersRound,
} from "lucide-react";

export type RestaurantTable = {
  id: string;
  number: number;
  capacity: number;
  _count: {
    bookings: number;
  };
};

interface TableCardProps {
  table: RestaurantTable;
}

export function TableCard({ table }: TableCardProps) {
  const hasBookings = table._count.bookings > 0;

  return (
    <Link
      href={`/admin/tables/${table.id}`}
      className="group relative block overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-lg hover:shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
    >
      {/* Subtle gradient wash, only visible on hover */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-600">
              Table
            </span>

            <span
              className={`h-1.5 w-1.5 rounded-full ${
                hasBookings ? "bg-emerald-400" : "bg-zinc-700"
              }`}
            />
          </div>

          <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-white">
            #{table.number}
          </h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 transition-colors duration-200 group-hover:border-zinc-700 group-hover:text-zinc-300">
          <UsersRound className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      {/* Stats */}
      <div className="relative mt-6 grid grid-cols-2 divide-x divide-zinc-800/60 border-y border-zinc-800/60">
        <div className="py-3 pr-4">
          <p className="text-xs text-zinc-600">Capacity</p>

          <p className="mt-1 text-sm font-medium text-zinc-200">
            {table.capacity} {table.capacity === 1 ? "guest" : "guests"}
          </p>
        </div>

        <div className="py-3 pl-4">
          <p className="flex items-center gap-1.5 text-xs text-zinc-600">
            <CalendarCheck2 className="h-3.5 w-3.5" strokeWidth={2} />
            Bookings
          </p>

          <p
            className={`mt-1 text-sm font-medium ${
              hasBookings ? "text-emerald-400" : "text-zinc-500"
            }`}
          >
            {table._count.bookings}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-4 flex items-center justify-between">
        <span className="text-xs text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400">
          View table
        </span>

        <ArrowUpRight
          className="h-4 w-4 text-zinc-700 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400"
          strokeWidth={2}
        />
      </div>
    </Link>
  );
}