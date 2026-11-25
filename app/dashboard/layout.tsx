import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { hasActiveSubscription } from "@/services/subscription.service";
import DashboardShell from "@/components/layout/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profile, isPremium] = await Promise.all([
    prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        name: true,
      },
    }),
    hasActiveSubscription(user.id),
  ]);

  const userName = profile?.name || user.email?.split("@")[0] || "Pengguna";

  return (
    <DashboardShell
      userName={userName}
      email={user.email ?? ""}
      isPremium={isPremium}
    >
      {children}
    </DashboardShell>
  );
}
