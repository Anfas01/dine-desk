"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import { createReservation } from "@/actions/reservations";

import GuestSelector from "./GuestSelector";
import DateTimeFields from "./DateTimeFields";
import ReservationSummary from "./ReservationSummary";
import ReservationMessage from "./ReservationMessage";

const MAX_GUESTS = 8;
const MIN_GUESTS = 1;

const todayISO = () => new Date().toISOString().split("T")[0];

export default function ReservationForm() {
  const [capacity, setCapacity] = useState(2);
  const [guestInput, setGuestInput] = useState("2");

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);

  /*
   * Guest validation
   */
  const validateGuests = (value: string) => {
    if (value === "") {
      return null;
    }

    const guests = Number(value);

    if (!Number.isInteger(guests)) {
      return "Please enter a whole number.";
    }

    if (guests < MIN_GUESTS) {
      return "You need at least 1 guest.";
    }

    if (guests > MAX_GUESTS) {
      return `We can accommodate up to ${MAX_GUESTS} guests per table.`;
    }

    return null;
  };

  /*
   * Guest input
   */
  const handleGuestChange = (value: string) => {
    if (value === "") {
      setGuestInput("");
      setMessage(null);
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    setGuestInput(value);

    const guests = Number(value);

    if (guests >= MIN_GUESTS && guests <= MAX_GUESTS) {
      setCapacity(guests);
      setMessage(null);
      return;
    }

    const error = validateGuests(value);

    if (error) {
      setMessage({
        text: error,
        error: true,
      });
    }
  };

  /*
   * + / - guests
   */
  const adjustCapacity = (delta: number) => {
    const nextValue = Math.min(
      MAX_GUESTS,
      Math.max(MIN_GUESTS, capacity + delta)
    );

    setCapacity(nextValue);
    setGuestInput(String(nextValue));
    setMessage(null);
  };

  /*
   * Submit reservation
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage(null);

    const guestsError = validateGuests(guestInput);

    if (guestsError || guestInput === "") {
      setMessage({
        text: guestsError ?? "Please enter the number of guests.",
        error: true,
      });
      return;
    }

    const guests = Number(guestInput);

    if (guests < MIN_GUESTS || guests > MAX_GUESTS) {
      setMessage({
        text: `Please enter between ${MIN_GUESTS} and ${MAX_GUESTS} guests.`,
        error: true,
      });
      return;
    }

    if (!bookingDate || !startTime) {
      setMessage({
        text: "Please select a date and time.",
        error: true,
      });
      return;
    }

    const startDateTime = new Date(`${bookingDate}T${startTime}`);
    const selectedDate = new Date(`${bookingDate}T00:00:00`);

    if (
      Number.isNaN(startDateTime.getTime()) ||
      Number.isNaN(selectedDate.getTime())
    ) {
      setMessage({
        text: "Please select a valid date and time.",
        error: true,
      });
      return;
    }

    if (startDateTime.getTime() < Date.now()) {
      setMessage({
        text: "Please select a future time.",
        error: true,
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await createReservation({
          capacity: guests,
          bookingDate: selectedDate,
          startTime: startDateTime,
        });

        if (!result.success) {
          setMessage({
            text: result.message,
            error: true,
          });

          return;
        }

        setMessage({
          text: result.message,
          error: false,
        });

        setCapacity(2);
        setGuestInput("2");
        setBookingDate("");
        setStartTime("");
      } catch (error) {
        console.error("Reservation error:", error);

        setMessage({
          text: "Something went wrong. Please try again.",
          error: true,
        });
      }
    });
  };

  const guestError = validateGuests(guestInput);

  const isGuestCountValid =
    guestInput !== "" &&
    !guestError &&
    capacity >= MIN_GUESTS &&
    capacity <= MAX_GUESTS;

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Book a table
        </h1>

        <p className="mt-1.5 text-sm text-zinc-500">
          Choose your party size, date, and time.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-xl shadow-black/10 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <GuestSelector
            guestInput={guestInput}
            capacity={capacity}
            error={guestError}
            disabled={isPending}
            minGuests={MIN_GUESTS}
            maxGuests={MAX_GUESTS}
            onChange={handleGuestChange}
            onAdjust={adjustCapacity}
          />

          <DateTimeFields
            bookingDate={bookingDate}
            startTime={startTime}
            minDate={todayISO()}
            disabled={isPending}
            onDateChange={(value) => {
              setBookingDate(value);
              setMessage(null);
            }}
            onTimeChange={(value) => {
              setStartTime(value);
              setMessage(null);
            }}
          />

          <ReservationSummary
            capacity={capacity}
            bookingDate={bookingDate}
            startTime={startTime}
          />

          <ReservationMessage message={message} />

          <button
            type="submit"
            disabled={isPending || !isGuestCountValid}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Finding a table...
              </>
            ) : (
              "Reserve table"
            )}
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-700">
        Reservations are held for 1.5 hours.
      </p>
    </div>
  );
}