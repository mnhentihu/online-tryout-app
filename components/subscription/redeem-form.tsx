"use client";

import { useActionState } from "react";
import { Ticket } from "lucide-react";
import { redeemAction, type RedeemState } from "@/actions/redeem.action";

const initialState: RedeemState = {
  status: "idle",
  message: "",
};

export default function RedeemForm() {
  const [state, formAction, isPending] = useActionState(
    redeemAction,
    initialState,
  );

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8">
      <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/10">
        <Ticket className="size-7 text-primary" />
      </div>

      <h2 className="text-xl font-semibold">Aktivasi Langganan</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Masukkan kode redeem yang kamu dapatkan untuk menikmati akses ke seluruh
        materi dan tryout premium.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="redeemCode"
            className="mb-2 block text-sm font-medium"
          >
            Kode Redeem
          </label>

          <input
            id="redeemCode"
            name="code"
            type="text"
            placeholder="Contoh: ABCD-1234-EFGH"
            required
            maxLength={100}
            autoComplete="off"
            className="w-full rounded-lg border bg-background px-4 py-3 font-mono uppercase outline-none focus:border-primary"
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
          />
        </div>

        {state.message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-lg p-3 text-sm ${
              state.status === "success"
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Memproses..." : "Aktivasi Sekarang"}
        </button>
      </form>
    </div>
  );
}
