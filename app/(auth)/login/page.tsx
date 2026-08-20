"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { loginAction, type AuthState } from "@/actions/auth";

const initialState: AuthState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <div className="w-full max-w-sm">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Sign in to manage your reservations.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-xl shadow-black/10 sm:p-7">
          <form action={formAction} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-300"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-zinc-500 transition-colors hover:text-emerald-400"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-11 text-sm text-white outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10"
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

            {/* Server Action Message */}
            {state.message && (
              <p
                className={`rounded-lg border px-3 py-2.5 text-sm ${
                  state.success
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}
              >
                {state.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="h-11 w-full rounded-lg bg-emerald-500 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 border-t border-zinc-800/80 pt-6 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Brand Message */}
        <p className="mt-6 text-center text-xs text-zinc-700">
          Dine Desk · Simple table reservations
        </p>
      </div>
    </main>
  );
}