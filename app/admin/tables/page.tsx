import { getAllTables } from "@/lib/admin/tables";
import { TableCard } from "@/components/admin/TableCard";

export default async function AdminTablesPage() {
  const tables = await getAllTables();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-zinc-500">Management</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Tables
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            View your restaurant&apos;s table configuration.
          </p>
        </div>

        {/* Table list */}
        {tables.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-16 text-center">
            <p className="text-sm font-medium text-zinc-300">
              No tables found
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Add restaurant tables to manage them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tables.map((table) => (
              <TableCard key={table.id} table={table} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}