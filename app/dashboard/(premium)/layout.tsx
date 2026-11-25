import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasActiveSubscription } from "@/services/subscription.service";

export default async function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isSubscribed = await hasActiveSubscription(user.id);

  if (!isSubscribed) {
    redirect("/dashboard/subscription");
  }

  return children;
}
