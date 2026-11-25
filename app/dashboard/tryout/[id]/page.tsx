import Link from "next/link";
import { ArrowLeft, Clock, ClipboardList } from "lucide-react";

export default async function TryoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/dashboard/tryout"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar tryout
      </Link>

      <div className="rounded-xl border bg-white p-6 dark:bg-slate-950 sm:p-8">
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          <ClipboardList size={25} />
        </div>

        <h1 className="text-2xl font-bold">Persiapan Simulasi Tryout</h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Pastikan kamu sudah siap sebelum memulai pengerjaan. Bacalah petunjuk
          berikut dengan teliti.
        </p>

        <div className="my-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-4">
            <ClipboardList size={20} className="mb-2" />
            <p className="text-xl font-bold">10</p>
            <p className="text-xs text-muted-foreground">Nomor soal</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <Clock size={20} className="mb-2" />
            <p className="text-xl font-bold">30 Menit</p>
            <p className="text-xs text-muted-foreground">Durasi</p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold">Petunjuk pengerjaan</h2>
          <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Tryout terdiri dari 10 nomor soal.</li>
            <li>Setiap nomor soal memiliki 3 pernyataan.</li>
            <li>Pilih Benar atau Salah untuk setiap pernyataan.</li>
            <li>Setiap pernyataan yang dijawab benar mendapatkan 1 poin.</li>
            <li>
              Pastikan seluruh jawaban sudah terisi sebelum mengakhiri tryout.
            </li>
          </ol>
        </div>

        <button
          type="button"
          disabled
          className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white opacity-50"
        >
          Mulai Pengerjaan (Belum Aktif)
        </button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          ID Tryout: {id}
        </p>
      </div>
    </div>
  );
}
