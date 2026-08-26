"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Table2,
} from "lucide-react";

import { logoutAction } from "@/actions/auth";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Reservations",
    href: "/admin/reservations",
    icon: CalendarDays,
  },
  {
    label: "Tables",
    href: "/admin/tables",
    icon: Table2,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-zinc-800/60 bg-zinc-950 md:block">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-zinc-800/60 px-6">
          <Link
            href="/admin"
            className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-zinc-200"
          >
            Dine Desk
          </Link>

          <span className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-3 py-5">
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
                className={`
                  relative flex items-center gap-3 rounded-lg px-3 py-2.5
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
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-emerald-400" : "text-zinc-600"
                  }`}
                  strokeWidth={2}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="space-y-0.5 border-t border-zinc-800/60 p-3">
          {/* Back to site */}
          <Link
            href="/"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
          >
            Back to website
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={logoutAction}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/50 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
          >
            <LogOut className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-red-400" strokeWidth={2} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}