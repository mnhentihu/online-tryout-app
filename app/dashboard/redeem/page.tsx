"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ticket, CheckCircle2 } from "lucide-react";

export default function RedeemPage() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Integrasi dengan backend
    console.log("Redeem code:", code);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Redeem Code</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Masukkan kode redeem untuk mengaktifkan atau memperpanjang langganan
          premium.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/10">
          <Ticket className="size-7 text-primary" />
        </div>

        <h2 className="text-xl font-semibold">Aktivasi Langganan</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Masukkan kode redeem yang kamu dapatkan untuk menikmati akses ke
          seluruh materi dan tryout premium.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="redeemCode"
              className="mb-2 block text-sm font-medium"
            >
              Kode Redeem
            </label>

            <input
              id="redeemCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Contoh: ABCD-1234-EFGH"
              required
              className="w-full rounded-lg border bg-background px-4 py-3 font-mono uppercase outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Aktivasi Sekarang
          </button>
        </form>
      </div>

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

      <div className="flex justify-center">
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Subscription
        </Link>
      </div>
    </div>
  );
}
