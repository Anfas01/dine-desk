import { UsersRound } from "lucide-react";

import { getAllTables } from "@/lib/admin/tables";

export default async function AdminTablesPage() {
  const tables = await getAllTables();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-zinc-500">Management</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Tables
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            View your restaurant&apos;s table configuration.
          </p>
        </div>

        {/* Table list */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-600">
                    Table
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    #{table.number}
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-zinc-500">
                  <UsersRound className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-800/80 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">
                    Capacity
                  </span>

                  <span className="text-sm font-medium text-zinc-300">
                    {table.capacity}{" "}
                    {table.capacity === 1 ? "guest" : "guests"}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">
                    Reservations
                  </span>

                  <span className="text-sm font-medium text-zinc-300">
                    {table._count.bookings}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {tables.length === 0 && (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-16 text-center">
            <p className="text-sm font-medium text-zinc-300">
              No tables found
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Add restaurant tables to manage them here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}