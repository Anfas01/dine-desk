import ReservationWindow from "@/components/reservations/reservation-form/ReservationForm";

export default function ReservationPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] overflow-hidden bg-zinc-950 px-6 py-8 text-white sm:py-10">
      <ReservationWindow />
    </main>
  );
}