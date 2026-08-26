import { getAllReservations } from "@/lib/admin/reservations";
import { AdminReservationsTable } from "@/components/admin/AdminReservationsTable";

export default async function AdminReservationsPage() {
  const reservations = await getAllReservations();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <header className="space-y-1">
          <p className="text-sm font-medium text-zinc-500">Management</p>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Reservations
          </h1>

          <p className="text-sm text-zinc-400">
            View and manage all restaurant reservations.
          </p>
        </header>

        {/* Reservations Table */}
        <AdminReservationsTable reservations={reservations} />
      </div>
    </main>
  );
}