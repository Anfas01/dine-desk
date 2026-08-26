import { getAllReservations } from "@/lib/admin/reservations";
import { AdminReservationsTable } from "@/components/admin/AdminReservationsTable"; // Adjust path as needed

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminReservationsPage() {
  const reservations = await getAllReservations();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-zinc-500">Management</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Reservations
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            View and manage all restaurant reservations.
          </p>
        </div>

        {/* Reservations Table */}
        <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
          <AdminReservationsTable
            reservations={reservations}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        </div>
      </div>
    </main>
  );
}