import { getAllReservations } from "@/lib/admin/reservations";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const statusStyles = {
  CONFIRMED: "text-emerald-400",
  PENDING: "text-amber-400",
  CANCELLED: "text-red-400",
  COMPLETED: "text-zinc-500",
} as const;

export default async function AdminReservationsPage() {
  const reservations = await getAllReservations();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-zinc-500">Management</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Reservations
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            View and manage all restaurant reservations.
          </p>
        </div>

        {/* Reservations */}
        <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
          {reservations.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-medium text-zinc-300">
                No reservations found
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Reservations will appear here once customers make a booking.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-800px text-left">
                <thead className="border-b border-zinc-800/80">
                  <tr>
                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Date
                    </th>

                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Time
                    </th>

                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Table
                    </th>

                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Guests
                    </th>

                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800/80">
                  {reservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="transition-colors hover:bg-zinc-900/60"
                    >
                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-white">
                          {reservation.user.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {reservation.user.email}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {formatDate(reservation.bookingDate)}
                      </td>

                      {/* Time */}
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {formatTime(reservation.startTime)}
                      </td>

                      {/* Table */}
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        Table {reservation.table.number}
                      </td>

                      {/* Guests */}
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {reservation.guests}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-medium ${
                            statusStyles[reservation.status]
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}