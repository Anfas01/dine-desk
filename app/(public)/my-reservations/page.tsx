import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { getUserReservations } from "@/actions/reservations";
import MyReservations from "@/components/reservations/MyReservations";

export default async function ReservationsListPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/my-reservations");
  }

  const reservations = await getUserReservations();

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-950 px-6 py-8 text-white sm:py-12">
      <MyReservations reservations={reservations} />
    </main>
  );
}