import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  CircleHelp,
  Trophy,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

type ResultPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  // Verifikasi user
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ambil attempt terakhir yang sudah disubmit oleh user
  const attempt = await prisma.tryoutAttempt.findFirst({
    where: {
      userId: user.id,
      tryoutId: id,
      submittedAt: {
        not: null,
      },
    },
    orderBy: {
      submittedAt: "desc",
    },
    select: {
      score: true,
      startedAt: true,
      submittedAt: true,
      tryout: {
        select: {
          title: true,
          questions: {
            select: {
              statements: {
                select: {
                  id: true,
                  isTrue: true,
                },
              },
            },
          },
        },
      },
      answers: {
        select: {
          statementId: true,
          answer: true,
        },
      },
    },
  });

  if (!attempt || !attempt.submittedAt) {
    notFound();
  }

  // Hitung hasil berdasarkan jawaban di database
  const statements = attempt.tryout.questions.flatMap(
    (question) => question.statements,
  );

  const answerMap = new Map(
    attempt.answers.map((answer) => [answer.statementId, answer.answer]),
  );

  const correctAnswers = statements.filter(
    (statement) => answerMap.get(statement.id) === statement.isTrue,
  ).length;

  const wrongAnswers = statements.filter(
    (statement) =>
      answerMap.has(statement.id) &&
      answerMap.get(statement.id) !== statement.isTrue,
  ).length;

  const unanswered = statements.length - correctAnswers - wrongAnswers;

  const totalQuestions = attempt.tryout.questions.length;
  const totalStatements = statements.length;
  const score = attempt.score ?? 0;

  const isPassed = score >= 70;

  // Hitung durasi pengerjaan
  const durationSeconds = Math.max(
    0,
    Math.floor(
      (attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000,
    ),
  );

  const durationMinutes = Math.floor(durationSeconds / 60);
  const remainingSeconds = durationSeconds % 60;

  const duration = `${durationMinutes} menit ${remainingSeconds} detik`;

  // Format tanggal menggunakan zona waktu Indonesia
  const completedAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(attempt.submittedAt);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="size-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold">Tryout Selesai!</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Berikut hasil pengerjaan tryout kamu.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">{attempt.tryout.title}</p>

        <div className="my-6">
          <p className="text-6xl font-bold tracking-tight">{score}</p>
          <p className="mt-2 text-sm text-muted-foreground">dari 100 poin</p>
        </div>

        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
            isPassed
              ? "bg-green-500/10 text-green-600"
              : "bg-red-500/10 text-red-600"
          }`}
        >
          {isPassed ? "Hasil Memuaskan" : "Perlu Belajar Lagi"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-green-600">
            <CheckCircle2 className="size-5" />
            <span className="text-sm font-medium">Benar</span>
          </div>
          <p className="text-3xl font-bold">{correctAnswers}</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-red-500">
            <XCircle className="size-5" />
            <span className="text-sm font-medium">Salah</span>
          </div>
          <p className="text-3xl font-bold">{wrongAnswers}</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <CircleHelp className="size-5" />
            <span className="text-sm font-medium">Tidak Dijawab</span>
          </div>
          <p className="text-3xl font-bold">{unanswered}</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-5 font-semibold">Informasi Pengerjaan</h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Jumlah soal</span>
            <span className="font-medium">{totalQuestions} soal</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Total pernyataan</span>
            <span className="font-medium">{totalStatements} pernyataan</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Durasi pengerjaan</span>
            <span className="font-medium">{duration}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Selesai pada</span>
            <span className="text-right font-medium">{completedAt}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/dashboard/tryout"
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Tryout
        </Link>

        <Link
          href={`/dashboard/tryout/${id}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <RotateCcw className="size-4" />
          Coba Lagi
        </Link>
      </div>
    </div>
  );
}
