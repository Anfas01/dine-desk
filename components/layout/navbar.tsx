"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

export default function Navbar({ user = null }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  /*
   * Close user dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Close mobile menu when switching to desktop.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * Close mobile menu and user dropdown.
   */
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-emerald-400"
        >
          Dine Desk
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/book-table"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Book a Table
          </Link>

          {user && (
            <Link
              href="/my-reservations"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              My Reservations
            </Link>
          )}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div ref={userMenuRef} className="relative">
              {/* User Button */}
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                className="flex h-10 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 pl-2 pr-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <UserIcon className="h-4 w-4" />
                </span>

                <span className="max-w-28 truncate">
                  {user.name}
                </span>

                <ChevronDown
                  className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/30"
                >
                  {/* User Info */}
                  <div className="border-b border-zinc-800/80 px-4 py-3">
                    <p className="truncate text-sm font-medium text-white">
                      {user.name}
                    </p>

                    {user.email && (
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* My Reservations */}
                  <Link
                    href="/my-reservations"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
                  >
                    <CalendarCheck className="h-4 w-4 text-zinc-500" />
                    My Reservations
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={logoutAction}
                    role="menuitem"
                    className="flex w-full items-center gap-3 border-t border-zinc-800/80 px-4 py-3 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
                  >
                    <LogOut className="h-4 w-4 text-zinc-500" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Log in */}
              <Link
                href="/login"
                className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                Log in
              </Link>

              {/* Create Account */}
              <Link
                href="/register"
                className="flex h-10 items-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99]"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsUserMenuOpen(false);
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800/80 bg-zinc-950 px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {/* Book a Table */}
            <Link
              href="/book-table"
              onClick={closeMenus}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              <CalendarCheck className="h-4 w-4 text-zinc-500" />
              Book a Table
            </Link>

            {/* My Reservations */}
            {user && (
              <Link
                href="/my-reservations"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                <CalendarCheck className="h-4 w-4 text-zinc-500" />
                My Reservations
              </Link>
            )}
          </div>

          {/* Mobile Auth Section */}
          <div className="mt-4 border-t border-zinc-800/80 pt-4">
            {user ? (
              <div className="flex flex-col gap-2">
                {/* User */}
                <div className="flex items-center gap-3 px-3 py-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <UserIcon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {user.name}
                    </p>

                    {user.email && (
                      <p className="truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Logout */}
                <button
                  type="button"
                  onClick={logoutAction}
                  className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                >
                  <LogOut className="h-4 w-4 text-zinc-500" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Log in */}
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex h-11 items-center justify-center rounded-lg border border-zinc-800 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                >
                  Log in
                </Link>

                {/* Create Account */}
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex h-11 items-center justify-center rounded-lg bg-emerald-500 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:scale-[0.99]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}