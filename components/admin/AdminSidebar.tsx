"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Table2,
  Menu,
  X,
} from "lucide-react";

import { logoutAction } from "@/actions/auth";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Reservations", href: "/admin/reservations", icon: CalendarDays },
  { label: "Tables", href: "/admin/tables", icon: Table2 },
];

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-800/60 px-4 sm:px-6">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-zinc-200"
        >
          Dine Desk
        </Link>

        <span className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`
                relative flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5
                text-sm font-medium transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700
                ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-200"
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-emerald-400" />
              )}

              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive ? "text-emerald-400" : "text-zinc-600"
                }`}
                strokeWidth={2}
              />

              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="shrink-0 space-y-0.5 border-t border-zinc-800/60 p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
        >
          Back to website
        </Link>

        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            logoutAction();
          }}
          className="group flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/50 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
        >
          <LogOut
            className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-red-400"
            strokeWidth={2}
          />
          Log out
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar (below md) */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-800/60 bg-zinc-950 px-4 md:hidden">
        <Link href="/admin" className="text-base font-semibold tracking-tight text-white">
          Dine Desk
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-300 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[min(80vw,18rem)] border-r border-zinc-800/60
          bg-zinc-950 transition-transform duration-200 ease-out md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-14 items-center justify-end border-b border-zinc-800/60 px-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-300 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
        <div className="h-[calc(100%-3.5rem)]">
          <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
      </aside>

      {/* Desktop sidebar (md and up) — unchanged behavior, widened on xl */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-zinc-800/60 bg-zinc-950 md:block xl:w-64">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}