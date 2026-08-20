type ReservationSummaryProps = {
  capacity: number;
  bookingDate: string;
  startTime: string;
};

function formatTime(time: string) {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(date: string) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReservationSummary({
  capacity,
  bookingDate,
  startTime,
}: ReservationSummaryProps) {
  if (!bookingDate && !startTime) {
    return null;
  }

  return (
    <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 px-4 py-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-600">
        Reservation
      </p>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
        <span className="text-white">
          {capacity} {capacity === 1 ? "guest" : "guests"}
        </span>

        {bookingDate && (
          <>
            <span className="text-zinc-700">·</span>
            <span>{formatDate(bookingDate)}</span>
          </>
        )}

        {startTime && (
          <>
            <span className="text-zinc-700">·</span>
            <span>{formatTime(startTime)}</span>
          </>
        )}
      </div>
    </div>
  );
}