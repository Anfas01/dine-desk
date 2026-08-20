"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarCheck,
  ChevronDown,
  LogOut,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";

import { logoutAction } from "@/actions/auth";

export type NavUser = {
  name: string;
  email?: string;
};

type NavbarProps = {
  user?: NavUser | null;
};

const navLinks = [{ label: "Reservations", href: "/reservations" }];

export default function Navbar({ user = null }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-emerald-400"
          onClick={() => setIsMenuOpen(false)}
        >
          Dine Desk
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex h-10 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 pl-2 pr-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <UserIcon className="h-4 w-4" />
                </span>
                {user.name}
                <ChevronDown
                  className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/20">
                  <Link
                    href="/reservations"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
                  >
                    <CalendarCheck className="h-4 w-4 text-zinc-500" />
                    My reservations
                  </Link>
                    <button
                      type="submit"
                      onClick={logoutAction}
                      className="flex w-full items-center gap-2.5 border-t border-zinc-800/80 px-4 py-2.5 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
                    >
                      <LogOut className="h-4 w-4 text-zinc-500" />
                      Log out
                    </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="flex h-10 items-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99]"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-white md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile panel */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800/80 px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-800/80 pt-4">
            {user ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-1.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <UserIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white">
                    {user.name}
                  </span>
                </div>
                <Link
                  href="/reservations"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                >
                  <CalendarCheck className="h-4 w-4 text-zinc-500" />
                  My reservations
                </Link>
                  <button
                    type="submit"
                    onClick={logoutAction}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                  >
                    <LogOut className="h-4 w-4 text-zinc-500" />
                    Log out
                  </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-lg border border-zinc-800 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-lg bg-emerald-500 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99]"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
