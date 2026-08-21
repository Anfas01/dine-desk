import ReservationWindow from "@/components/reservations/reservation-form/ReservationForm";
import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

export default async function ReservationPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/book-table");
  }
  
  return (
    <main className="min-h-[calc(100vh-4rem)] overflow-hidden bg-zinc-950 px-6 py-8 text-white sm:py-10">
      <ReservationWindow />
    </main>
  );
}