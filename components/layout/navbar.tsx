"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu, UserRound } from "lucide-react";

type NavbarProps = {
  onMenuClick: () => void;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/materi": "Materi Pembelajaran",
  "/dashboard/tryout": "Simulasi Tryout",
  "/dashboard/subscription": "Subscription",
  "/dashboard/redeem": "Redeem Code",
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/dashboard/tryout/")
      ? "Pengerjaan Tryout"
      : "Dashboard");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur dark:bg-slate-950/90 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-muted lg:hidden"
          aria-label="Buka menu"
        >
          <Menu size={21} />
        </button>

        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifikasi"
          className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 border-l pl-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <UserRound size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium">Pengguna</p>
            <p className="text-xs text-muted-foreground">Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}
