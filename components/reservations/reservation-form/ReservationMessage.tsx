"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

type ReservationMessageProps = {
  message: {
    text: string;
    error: boolean;
  } | null;
};

export default function ReservationMessage({
  message,
}: ReservationMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm ${
        message.error
          ? "border-red-500/20 bg-red-500/10 text-red-400"
          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      }`}
    >
      {message.error ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}

      <span>{message.text}</span>
    </div>
  );
}