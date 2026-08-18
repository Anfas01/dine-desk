"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { registerAction } from "@/actions/auth/registerAction";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-6 text-white">
      <div className="w-full max-w-sm">
        {/* Back */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="mt-1.5 text-sm leading-5 text-zinc-500">
            Create your account to start making reservations.
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-xl shadow-black/10 sm:p-6">
          <form action={formAction} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Full name
              </label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-11 text-sm text-white outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-11 text-sm text-white outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Server Action Message */}
            {state.message && (
              <p
                className={`text-sm ${
                  state.success
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {state.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="h-10 w-full rounded-lg bg-emerald-500 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-5 border-t border-zinc-800/80 pt-5 text-center">
            <p className="text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Brand Message */}
        <p className="mt-4 text-center text-xs text-zinc-700">
          Dine Desk · Simple table reservations
        </p>
      </div>
    </main>
  );
}