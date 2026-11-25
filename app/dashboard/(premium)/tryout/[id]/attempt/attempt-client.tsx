"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/tryout/question-card";
import QuestionNavigation from "@/components/tryout/question-navigation";
import QuizTimer from "@/components/tryout/quiz-timer";
import { submitTryoutAction } from "@/actions/tryout.action";

type Question = {
  id: string;
  questionText: string;
  statements: {
    id: string;
    text: string;
  }[];
};

type AttemptClientProps = {
  attemptId: string;
  tryoutId: string;
  title: string;
  durationMinutes: number;
  startedAt: string;
  questions: Question[];
};

export default function AttemptClient({
  attemptId,
  tryoutId,
  title,
  durationMinutes,
  startedAt,
  questions,
}: AttemptClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittingRef = useRef(false);

  const question = questions[currentQuestion - 1];

  const router = useRouter();

  const handleAnswer = (statementId: string, answer: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [statementId]: answer,
    }));
  };

  const handleSubmit = useCallback(
    async (timeUp = false) => {
      if (submittingRef.current) return;

      if (!timeUp) {
        const confirmed = window.confirm(
          "Apakah kamu yakin ingin mengakhiri tryout?",
        );

        if (!confirmed) return;
      }

      submittingRef.current = true;
      setIsSubmitting(true);

      try {
        const result = await submitTryoutAction(attemptId, tryoutId, answers);

        if (result.success) {
          router.replace(`/dashboard/tryout/${tryoutId}/result`);
          return;
        }

        alert(result.message);

        submittingRef.current = false;
        setIsSubmitting(false);
      } catch (error) {
        console.error("Submit Tryout Error:", error);

        submittingRef.current = false;
        setIsSubmitting(false);

        alert("Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi.");
      }
    },
    [attemptId, tryoutId, answers, router],
  );

  const handleTimeUp = useCallback(() => {
    void handleSubmit(true);
  }, [handleSubmit]);

  const answeredQuestions = questions
    .map((item, index) =>
      item.statements.every((statement) => answers[statement.id] !== undefined)
        ? index + 1
        : null,
    )
    .filter((number): number is number => number !== null);

  const totalAnswered = Object.keys(answers).length;
  const totalStatements = questions.reduce(
    (total, item) => total + item.statements.length,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Kerjakan seluruh soal dengan teliti.
          </p>
        </div>

        <QuizTimer
          startedAt={startedAt}
          durationMinutes={durationMinutes}
          onTimeUp={handleTimeUp}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm">
            <span>
              Soal {currentQuestion} dari {questions.length}
            </span>
            <span>
              {totalAnswered}/{totalStatements} pernyataan dijawab
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${(currentQuestion / questions.length) * 100}%`,
              }}
            />
          </div>

          <QuestionCard
            questionNumber={currentQuestion}
            questionText={question.questionText}
            statements={question.statements}
            answers={answers}
            onAnswer={handleAnswer}
          />

          <div className="flex justify-between gap-3">
            <button
              type="button"
              disabled={currentQuestion === 1 || isSubmitting}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="rounded-lg border px-5 py-2 text-sm disabled:opacity-40"
            >
              Sebelumnya
            </button>

            {currentQuestion < questions.length ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="rounded-lg bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-50"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-50"
              >
                {isSubmitting ? "Mengirim..." : "Selesaikan Tryout"}
              </button>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <QuestionNavigation
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            answeredQuestions={answeredQuestions}
            onNavigate={setCurrentQuestion}
          />

          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 font-semibold">Ringkasan Jawaban</h3>
            <p className="text-sm text-muted-foreground">
              {totalAnswered} dari {totalStatements} pernyataan telah dijawab.
            </p>

            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
            >
              {isSubmitting ? "Mengirim..." : "Selesaikan Tryout"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
