"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Crown,
  Ticket,
  X,
} from "lucide-react";

const menus = [
  {
    title: "MENU UTAMA",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Materi",
        href: "/dashboard/materi",
        icon: BookOpen,
      },
      {
        label: "Tryout",
        href: "/dashboard/tryout",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "AKUN",
    items: [
      {
        label: "Subscription",
        href: "/dashboard/subscription",
        icon: Crown,
      },
      {
        label: "Redeem Code",
        href: "/dashboard/redeem",
        icon: Ticket,
      },
    ],
  },
];

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-300 dark:bg-slate-950 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
            TryOut<span className="text-blue-600">.</span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted lg:hidden"
            aria-label="Tutup sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-8 overflow-y-auto p-4">
          {menus.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-muted-foreground">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === item.href
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground">
            © 2026 TryOut Platform
          </p>
        </div>
      </aside>
    </>
  );
}
