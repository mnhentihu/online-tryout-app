"use client";

import { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestionCard from "@/components/tryout/question-card";
import QuestionNavigation from "@/components/tryout/question-navigation";
import QuizTimer from "@/components/tryout/quiz-timer";

const questions = [
  {
    id: "q1",
    questionText:
      "Perhatikan pernyataan berikut mengenai dasar-dasar pemrograman JavaScript.",
    statements: [
      { id: "s1", text: "JavaScript merupakan bahasa pemrograman." },
      { id: "s2", text: "JavaScript hanya dapat berjalan di browser." },
      {
        id: "s3",
        text: "JavaScript mendukung paradigma pemrograman berorientasi objek.",
      },
    ],
  },
  {
    id: "q2",
    questionText: "Perhatikan pernyataan berikut mengenai React.",
    statements: [
      {
        id: "s4",
        text: "React merupakan library JavaScript untuk membangun antarmuka pengguna.",
      },
      { id: "s5", text: "React menggunakan konsep component." },
      { id: "s6", text: "React hanya dapat digunakan untuk aplikasi backend." },
    ],
  },
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `q${index + 3}`,
    questionText: `Perhatikan pernyataan berikut mengenai materi pemrograman nomor ${index + 3}.`,
    statements: [
      { id: `s${index * 3 + 7}`, text: "Pernyataan pertama untuk soal ini." },
      { id: `s${index * 3 + 8}`, text: "Pernyataan kedua untuk soal ini." },
      { id: `s${index * 3 + 9}`, text: "Pernyataan ketiga untuk soal ini." },
    ],
  })),
];

export default function AttemptPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentQuestion - 1];

  const handleAnswer = (statementId: string, answer: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [statementId]: answer,
    }));
  };

  const handleNavigate = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const handleSubmit = useCallback(() => {
    if (isSubmitting) return;

    const confirmed = window.confirm(
      "Apakah kamu yakin ingin mengakhiri tryout?",
    );

    if (!confirmed) return;

    setIsSubmitting(true);

    // TODO: Kirim jawaban ke backend.
    console.log({
      tryoutId: params.id,
      answers,
    });

    router.push(`/dashboard/tryout/${params.id}/result`);
  }, [answers, isSubmitting, params.id, router]);

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const answeredQuestions = questions
    .map((item, index) =>
      item.statements.every((statement) => answers[statement.id] !== undefined)
        ? index + 1
        : null,
    )
    .filter((number): number is number => number !== null);

  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Pengerjaan Tryout</h1>
          <p className="text-sm text-muted-foreground">
            Kerjakan seluruh soal dengan teliti.
          </p>
        </div>

        <QuizTimer durationMinutes={30} onTimeUp={handleTimeUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm">
            <span>
              Soal {currentQuestion} dari {questions.length}
            </span>
            <span>{totalAnswered}/30 pernyataan dijawab</span>
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
              disabled={currentQuestion === 1}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="rounded-lg border px-5 py-2 text-sm disabled:opacity-40"
            >
              Sebelumnya
            </button>

            {currentQuestion < questions.length ? (
              <button
                type="button"
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="rounded-lg bg-primary px-5 py-2 text-sm text-primary-foreground"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
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
            onNavigate={handleNavigate}
          />

          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 font-semibold">Ringkasan Jawaban</h3>
            <p className="text-sm text-muted-foreground">
              {totalAnswered} dari 30 pernyataan telah dijawab.
            </p>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
            >
              Selesaikan Tryout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
