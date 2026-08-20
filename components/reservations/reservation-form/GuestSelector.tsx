"use client";

import { Minus, Plus, Users } from "lucide-react";

type GuestSelectorProps = {
  guestInput: string;
  capacity: number;
  error: string | null;
  disabled?: boolean;
  minGuests: number;
  maxGuests: number;
  onChange: (value: string) => void;
  onAdjust: (delta: number) => void;
};

export default function GuestSelector({
  guestInput,
  capacity,
  error,
  disabled = false,
  minGuests,
  maxGuests,
  onChange,
  onAdjust,
}: GuestSelectorProps) {
  return (
    <div>
      <label
        htmlFor="guests"
        className="mb-2 block text-sm font-medium text-zinc-300"
      >
        Number of guests
      </label>

      <div
        className={`flex h-12 items-center justify-between rounded-lg border bg-zinc-950 px-3 transition-colors ${
          error
            ? "border-red-500/50"
            : "border-zinc-800 hover:border-zinc-700"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Users className="h-4 w-4 text-zinc-600" />

          <input
            id="guests"
            type="text"
            inputMode="numeric"
            value={guestInput}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? "guest-error" : "guest-help"}
            className="w-16 bg-transparent text-sm text-white outline-none placeholder:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="2"
          />

          <span className="text-sm text-zinc-500">
            {capacity === 1 ? "guest" : "guests"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onAdjust(-1)}
            disabled={capacity <= minGuests || disabled}
            aria-label="Decrease guests"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onAdjust(1)}
            disabled={capacity >= maxGuests || disabled}
            aria-label="Increase guests"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {error ? (
        <p id="guest-error" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : (
        <p id="guest-help" className="mt-1.5 text-xs text-zinc-600">
          Maximum {maxGuests} guests per table.
        </p>
      )}
    </div>
  );
}