import { getUserReservations } from "@/actions/reservations";
import MyReservations from "@/components/reservations/my-reservations";

export default async function ReservationsListPage() {
  const reservations = await getUserReservations();

  return (
    <main className="flex min-h-screen justify-center bg-zinc-950 px-6 py-12 text-white">
      <MyReservations reservations={reservations} />
    </main>
  );
}