import { PackageX } from "lucide-react";
import { getAllTables } from "@/lib/admin/tables";
import { TableCard } from "@/components/admin/TableCard";

export default async function AdminTablesPage() {
  const tables = await getAllTables();

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-zinc-500">Management</p>

        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Tables
        </h1>

        <p className="text-sm text-zinc-400">
          View your restaurant&apos;s table configuration.
        </p>
      </header>

      {/* Table list */}
      {tables.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
            <PackageX className="h-4.5 w-4.5 text-zinc-500" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">
              No tables found
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Add restaurant tables to manage them here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      )}
    </div>
  );
}