import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RedeemForm from "@/components/subscription/redeem-form";

export default function RedeemPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Redeem Code</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Masukkan kode redeem untuk mengaktifkan atau memperpanjang langganan
          premium.
        </p>
      </div>

      <RedeemForm />

      {/* Instructions */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold">Cara Menggunakan Kode</h3>

        <div className="space-y-4">
          {[
            "Dapatkan kode redeem dari penyedia layanan.",
            "Masukkan kode redeem pada kolom yang tersedia.",
            "Tekan tombol Aktivasi Sekarang.",
            "Nikmati akses premium sesuai durasi kode.",
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {index + 1}
              </div>
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Navigation */}
      <div className="flex justify-center">
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Subscription
        </Link>
      </div>
    </div>
  );
}
