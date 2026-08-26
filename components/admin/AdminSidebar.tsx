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
    <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-zinc-800/80 bg-zinc-950 md:block">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex h-16 items-center border-b border-zinc-800/80 px-6">
          <Link
            href="/admin"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Dine Desk
          </Link>

          <span className="ml-2 rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-5">
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-200"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-emerald-400" : "text-zinc-600"
                  }`}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="space-y-1 border-t border-zinc-800/80 p-3">
          {/* Back to site */}
          <Link
            href="/"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-900/60 hover:text-white"
          >
            Back to website
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={logoutAction}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-900/60 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-red-400" />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}