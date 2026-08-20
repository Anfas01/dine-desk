"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";

import { cancelReservation } from "@/actions/reservations";

type CancelReservationButtonProps = {
  reservationId: string;
};

export default function CancelReservationButton({
  reservationId,
}: CancelReservationButtonProps) {
  const [isCancelling, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelReservation(reservationId);

      if (!result.success) {
        console.error(result.message);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={isCancelling}
      className="flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isCancelling ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Cancelling...
        </>
      ) : (
        "Cancel reservation"
      )}
    </button>
  );
}