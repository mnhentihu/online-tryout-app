import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import AttemptClient from "./attempt-client";

export default async function AttemptPage({
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

  const tryout = await prisma.tryout.findFirst({
    where: {
      id,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      durationMinutes: true,
      questions: {
        orderBy: {
          sortOrder: "asc",
        },
        select: {
          id: true,
          questionText: true,
          sortOrder: true,
          statements: {
            orderBy: {
              sortOrder: "asc",
            },
            select: {
              id: true,
              statement: true,
              sortOrder: true,
            },
          },
        },
      },
    },
  });

  if (!tryout) {
    notFound();
  }

  const attempt = await prisma.tryoutAttempt.findFirst({
    where: {
      userId: user.id,
      tryoutId: tryout.id,
      submittedAt: null,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (!attempt) {
    redirect(`/dashboard/tryout/${tryout.id}`);
  }

  const isValidStructure =
    tryout.questions.length === 10 &&
    tryout.questions.every((question) => question.statements.length === 3);

  if (!isValidStructure) {
    throw new Error("Struktur soal tryout tidak valid.");
  }

  const questions = tryout.questions.map((question) => ({
    id: question.id,
    questionText: question.questionText,
    statements: question.statements.map((statement) => ({
      id: statement.id,
      text: statement.statement,
    })),
  }));

  return (
    <AttemptClient
      attemptId={attempt.id}
      tryoutId={tryout.id}
      title={tryout.title}
      durationMinutes={tryout.durationMinutes}
      startedAt={attempt.startedAt.toISOString()}
      questions={questions}
    />
  );
}
