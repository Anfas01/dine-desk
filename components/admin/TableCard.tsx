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
      className="group block rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
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

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 transition-colors group-hover:border-zinc-700 group-hover:text-zinc-300">
          <UsersRound className="h-4 w-4" />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 divide-x divide-zinc-800 border-y border-zinc-800/80">
        <div className="py-3 pr-4">
          <p className="text-xs text-zinc-600">
            Capacity
          </p>

          <p className="mt-1 text-sm font-medium text-zinc-200">
            {table.capacity}{" "}
            {table.capacity === 1 ? "guest" : "guests"}
          </p>
        </div>

        <div className="py-3 pl-4">
          <p className="flex items-center gap-1.5 text-xs text-zinc-600">
            <CalendarCheck2 className="h-3.5 w-3.5" />
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
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-zinc-600 transition-colors group-hover:text-zinc-400">
          View table
        </span>

        <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400" />
      </div>
    </Link>
  );
}