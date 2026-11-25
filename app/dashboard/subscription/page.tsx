import Link from "next/link";
import { CalendarDays, Clock, Crown, Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function getRemainingDays(endsAt: Date, now: Date) {
  const difference = endsAt.getTime() - now.getTime();

  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

export default async function SubscriptionPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const now = new Date();

  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: user.id,
    },
    include: {
      redeemCode: {
        select: {
          durationDays: true,
        },
      },
    },
    orderBy: {
      startsAt: "desc",
    },
  });

  const activeSubscription = subscriptions.find(
    (subscription) => subscription.startsAt <= now && subscription.endsAt > now,
  );

  const remainingDays = activeSubscription
    ? getRemainingDays(activeSubscription.endsAt, now)
    : 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola informasi dan masa aktif langganan kamu.
        </p>
      </div>

      {/* Current Subscription */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Crown className="size-6 text-yellow-500" />
              <span className="font-semibold">Paket Premium</span>
            </div>

            <h2 className="text-3xl font-bold">
              {activeSubscription ? "Aktif" : "Tidak Aktif"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {activeSubscription
                ? "Kamu dapat menikmati seluruh fitur premium."
                : "Redeem kode untuk mengaktifkan langganan."}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-5 sm:min-w-44">
            <p className="text-sm text-muted-foreground">Sisa masa aktif</p>
            <p className="mt-1 text-3xl font-bold">
              {remainingDays}
              <span className="ml-1 text-sm font-normal">hari</span>
            </p>
          </div>
        </div>

        <div className="my-6 border-t" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Tanggal mulai</p>
              <p className="text-sm font-medium">
                {activeSubscription
                  ? formatDate(activeSubscription.startsAt)
                  : "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Tanggal berakhir</p>
              <p className="text-sm font-medium">
                {activeSubscription
                  ? formatDate(activeSubscription.endsAt)
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard/redeem"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Ticket className="size-4" />
            Perpanjang Langganan
          </Link>
        </div>
      </div>

      {/* Subscription History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Riwayat Langganan</h2>
          <p className="text-sm text-muted-foreground">
            Daftar aktivasi kode redeem sebelumnya.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[650px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-4 font-medium">Aktivasi</th>
                <th className="p-4 font-medium">Durasi</th>
                <th className="p-4 font-medium">Mulai</th>
                <th className="p-4 font-medium">Berakhir</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((item) => {
                  const isActive = item.startsAt <= now && item.endsAt > now;

                  const isUpcoming = item.startsAt > now;

                  const status = isActive
                    ? "Aktif"
                    : isUpcoming
                      ? "Akan Datang"
                      : "Berakhir";

                  return (
                    <tr key={item.id} className="border-t">
                      <td className="p-4 font-medium">Aktivasi Premium</td>
                      <td className="p-4">
                        {item.redeemCode.durationDays} Hari
                      </td>
                      <td className="p-4">{formatDate(item.startsAt)}</td>
                      <td className="p-4">{formatDate(item.endsAt)}</td>
                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            isActive
                              ? "bg-green-500/10 text-green-600"
                              : isUpcoming
                                ? "bg-blue-500/10 text-blue-600"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Belum ada riwayat langganan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
