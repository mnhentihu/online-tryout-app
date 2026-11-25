import Link from "next/link";
import { CalendarDays, Clock, Crown, Ticket } from "lucide-react";

export default function SubscriptionPage() {
  // Dummy data
  const subscription = {
    isActive: true,
    planName: "Premium",
    startsAt: "20 November 2026",
    endsAt: "20 Desember 2026",
    remainingDays: 25,
  };

  const history = [
    {
      id: 1,
      code: "XXXX-XXXX-XXXX",
      duration: "30 Hari",
      startsAt: "20 November 2026",
      endsAt: "20 Desember 2026",
      status: "Aktif",
    },
    {
      id: 2,
      code: "YYYY-YYYY-YYYY",
      duration: "30 Hari",
      startsAt: "20 Oktober 2026",
      endsAt: "19 November 2026",
      status: "Berakhir",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola informasi dan masa aktif langganan kamu.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Crown className="size-6 text-yellow-500" />
              <span className="font-semibold">Paket Premium</span>
            </div>

            <h2 className="text-3xl font-bold">
              {subscription.isActive ? "Aktif" : "Tidak Aktif"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {subscription.isActive
                ? "Kamu dapat menikmati seluruh fitur premium."
                : "Redeem kode untuk mengaktifkan langganan."}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-5 sm:min-w-44">
            <p className="text-sm text-muted-foreground">Sisa masa aktif</p>
            <p className="mt-1 text-3xl font-bold">
              {subscription.remainingDays}
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
              <p className="text-sm font-medium">{subscription.startsAt}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Tanggal berakhir</p>
              <p className="text-sm font-medium">{subscription.endsAt}</p>
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
                <th className="p-4 font-medium">Kode Redeem</th>
                <th className="p-4 font-medium">Durasi</th>
                <th className="p-4 font-medium">Mulai</th>
                <th className="p-4 font-medium">Berakhir</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 font-mono">{item.code}</td>
                  <td className="p-4">{item.duration}</td>
                  <td className="p-4">{item.startsAt}</td>
                  <td className="p-4">{item.endsAt}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.status === "Aktif"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
