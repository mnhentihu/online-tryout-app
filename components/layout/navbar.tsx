"use client";

import { usePathname } from "next/navigation";
import { Menu, UserRound, Crown, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth.action";

type NavbarProps = {
  onMenuClick: () => void;
  userName: string;
  email: string;
  isPremium: boolean;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/materi": "Materi Pembelajaran",
  "/dashboard/tryout": "Simulasi Tryout",
  "/dashboard/subscription": "Subscription",
  "/dashboard/redeem": "Redeem Code",
};

export default function Navbar({
  onMenuClick,
  userName,
  email,
  isPremium,
}: NavbarProps) {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/dashboard/tryout/")
      ? "Pengerjaan Tryout"
      : "Dashboard");

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-muted lg:hidden"
          aria-label="Buka menu"
        >
          <Menu size={21} />
        </button>

        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <UserRound size={20} />
          </div>

          <div className="min-w-0">
            <p className="max-w-40 truncate text-sm font-semibold">
              {userName}
            </p>

            <p className="max-w-40 truncate text-xs text-muted-foreground">
              {email}
            </p>

            <span
              className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                isPremium
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isPremium && <Crown size={11} />}
              {isPremium ? "PREMIUM" : "FREE"}
            </span>
          </div>
        </div>

        {/* Logout */}
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={14} />
            <span>Keluar</span>
          </button>
        </form>
      </div>
    </header>
  );
}
