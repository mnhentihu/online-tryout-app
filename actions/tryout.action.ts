"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { hasActiveSubscription } from "@/services/subscription.service";

export async function startTryoutAction(tryoutId: string, _formData: FormData) {
  // 1. Verifikasi user
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Verifikasi subscription
  const isSubscribed = await hasActiveSubscription(user.id);

  if (!isSubscribed) {
    redirect("/dashboard/subscription");
  }

  // 3. Ambil data tryout beserta jumlah soal dan pernyataannya
  const tryout = await prisma.tryout.findFirst({
    where: {
      id: tryoutId,
      isPublished: true,
    },
    include: {
      questions: {
        include: {
          _count: {
            select: {
              statements: true,
            },
          },
        },
      },
    },
  });

  if (!tryout) {
    redirect("/dashboard/tryout");
  }

  // 4. Validasi struktur soal
  const isValidStructure =
    tryout.questions.length === 10 &&
    tryout.questions.every((question) => question._count.statements === 3);

  if (!isValidStructure) {
    throw new Error("Struktur tryout belum memenuhi ketentuan.");
  }

  const now = new Date();

  // 5. Cek apakah user masih memiliki attempt yang belum selesai
  const existingAttempt = await prisma.tryoutAttempt.findFirst({
    where: {
      userId: user.id,
      tryoutId: tryout.id,
      submittedAt: null,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (existingAttempt) {
    const deadline = new Date(
      existingAttempt.startedAt.getTime() + tryout.durationMinutes * 60 * 1000,
    );

    if (deadline > now) {
      // Lanjutkan attempt yang masih aktif
      redirect(`/dashboard/tryout/${tryout.id}/attempt`);
    }

    // Tandai attempt kedaluwarsa
    await prisma.tryoutAttempt.update({
      where: {
        id: existingAttempt.id,
      },
      data: {
        submittedAt: deadline,
        score: 0,
      },
    });
  }

  // 6. Buat attempt baru
  await prisma.tryoutAttempt.create({
    data: {
      userId: user.id,
      tryoutId: tryout.id,
    },
  });

  // 7. Arahkan user ke halaman pengerjaan
  redirect(`/dashboard/tryout/${tryout.id}/attempt`);
}

export async function submitTryoutAction(
  attemptId: string,
  tryoutId: string,
  answers: Record<string, boolean>,
) {
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

  const attempt = await prisma.tryoutAttempt.findFirst({
    where: {
      id: attemptId,
      tryoutId,
      userId: user.id,
      submittedAt: null,
    },
    include: {
      tryout: {
        include: {
          questions: {
            include: {
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
    },
  });

  if (!attempt) {
    return {
      success: false,
      message: "Attempt tidak ditemukan atau sudah disubmit.",
    };
  }

  const statements = attempt.tryout.questions.flatMap(
    (question) => question.statements,
  );

  if (statements.length !== 30) {
    throw new Error("Struktur soal tidak valid.");
  }

  // Pastikan client hanya mengirim ID pernyataan yang valid.
  const validStatementIds = new Set(
    statements.map((statement) => statement.id),
  );

  const submittedAnswers = Object.entries(answers);

  if (
    submittedAnswers.some(
      ([statementId, answer]) =>
        !validStatementIds.has(statementId) || typeof answer !== "boolean",
    )
  ) {
    throw new Error("Data jawaban tidak valid.");
  }

  // Penilaian sepenuhnya dilakukan di server.
  const correctCount = statements.filter(
    (statement) => answers[statement.id] === statement.isTrue,
  ).length;

  const score = Math.round((correctCount / statements.length) * 100);

  const savedAnswers = statements
    .filter((statement) => typeof answers[statement.id] === "boolean")
    .map((statement) => ({
      attemptId: attempt.id,
      statementId: statement.id,
      answer: answers[statement.id],
    }));

  const now = new Date();

  await prisma.$transaction(async (tx) => {
    // Klaim attempt agar tidak dapat disubmit dua kali.
    const updated = await tx.tryoutAttempt.updateMany({
      where: {
        id: attempt.id,
        userId: user.id,
        submittedAt: null,
      },
      data: {
        submittedAt: now,
        score,
      },
    });

    if (updated.count !== 1) {
      throw new Error("ATTEMPT_ALREADY_SUBMITTED");
    }

    if (savedAnswers.length > 0) {
      await tx.attemptAnswer.createMany({
        data: savedAnswers,
      });
    }
  });

  return { success: true };
}
