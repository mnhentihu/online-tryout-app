import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  ClipboardList,
  Trophy,
  History,
  TrendingUp,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { startTryoutAction } from "@/actions/tryout.action";

export default async function TryoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ambil data tryout
  const tryout = await prisma.tryout.findFirst({
    where: {
      id,
      isPublished: true,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  if (!tryout) {
    notFound();
  }

  const [latestAttempt, bestAttempt] = await Promise.all([
    prisma.tryoutAttempt.findFirst({
      where: {
        userId: user.id,
        tryoutId: tryout.id,
        submittedAt: { not: null },
      },
      orderBy: {
        submittedAt: "desc",
      },
      select: {
        id: true,
        score: true,
        submittedAt: true,
      },
    }),

    prisma.tryoutAttempt.findFirst({
      where: {
        userId: user.id,
        tryoutId: tryout.id,
        submittedAt: { not: null },
        score: { not: null },
      },
      orderBy: [{ score: "desc" }, { submittedAt: "desc" }],
      select: {
        score: true,
        submittedAt: true,
      },
    }),
  ]);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeZone: "Asia/Jakarta",
    }).format(date);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/dashboard/tryout"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar tryout
      </Link>

      <div className="rounded-xl border  p-6 dark:bg-slate-950 sm:p-8">
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          <ClipboardList size={25} />
        </div>

        <h1 className="text-2xl font-bold">{tryout.title}</h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {tryout.description ??
            "Pastikan kamu sudah siap sebelum memulai pengerjaan. Bacalah petunjuk berikut dengan teliti."}
        </p>

        <div className="my-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-4">
            <ClipboardList size={20} className="mb-2" />
            <p className="text-xl font-bold">{tryout._count.questions}</p>
            <p className="text-xs text-muted-foreground">Nomor soal</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <Clock size={20} className="mb-2" />
            <p className="text-xl font-bold">{tryout.durationMinutes} Menit</p>
            <p className="text-xs text-muted-foreground">Durasi</p>
          </div>
        </div>

        {/* Riwayat pengerjaan */}
        {latestAttempt && (
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <History size={19} />
              <h2 className="font-semibold">Riwayat Pengerjaan</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Nilai terakhir */}
              <div className="rounded-xl border p-4">
                <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                  <History size={18} />
                  <span className="text-sm font-medium">Nilai Terakhir</span>
                </div>

                <p className="text-3xl font-bold">
                  {latestAttempt.score ?? 0}
                  <span className="text-base font-normal text-muted-foreground">
                    /100
                  </span>
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {latestAttempt.submittedAt
                    ? formatDate(latestAttempt.submittedAt)
                    : "-"}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <div className="mb-3 flex items-center gap-2 text-amber-500">
                  <Trophy size={18} />
                  <span className="text-sm font-medium">Nilai Terbaik</span>
                </div>

                <p className="text-3xl font-bold">
                  {bestAttempt?.score ?? 0}
                  <span className="text-base font-normal text-muted-foreground">
                    /100
                  </span>
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {bestAttempt?.submittedAt
                    ? formatDate(bestAttempt.submittedAt)
                    : "-"}
                </p>
              </div>
            </div>

            <Link
              href={`/dashboard/tryout/${tryout.id}/result`}
              className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition hover:bg-muted"
            >
              <TrendingUp size={17} />
              Lihat Hasil Pengerjaan Terakhir
            </Link>
          </div>
        )}

        <div className="space-y-3">
          <h2 className="font-semibold">Petunjuk pengerjaan</h2>

          <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Tryout terdiri dari {tryout._count.questions} nomor soal.</li>
            <li>Setiap nomor soal memiliki 3 pernyataan.</li>
            <li>Pilih Benar atau Salah untuk setiap pernyataan.</li>
            <li>Setiap pernyataan yang dijawab benar mendapatkan 1 poin.</li>
            <li>
              Pastikan seluruh jawaban sudah terisi sebelum mengakhiri tryout.
            </li>
            <li>Waktu pengerjaan adalah {tryout.durationMinutes} menit.</li>
          </ol>
        </div>

        <form action={startTryoutAction.bind(null, tryout.id)}>
          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            {latestAttempt ? "Coba Lagi" : "Mulai Pengerjaan"}
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          ID Tryout: {tryout.id}
        </p>
      </div>
    </div>
  );
}
