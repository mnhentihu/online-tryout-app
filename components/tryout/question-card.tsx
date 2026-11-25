"use client";

type Statement = {
  id: string;
  text: string;
};

type QuestionCardProps = {
  questionNumber: number;
  questionText: string;
  statements: Statement[];
  answers: Record<string, boolean>;
  onAnswer: (statementId: string, answer: boolean) => void;
};

export default function QuestionCard({
  questionNumber,
  questionText,
  statements,
  answers,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="space-y-6 rounded-xl border bg-card p-6">
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Soal {questionNumber}
        </p>

        <h2 className="text-lg font-semibold">{questionText}</h2>
      </div>

      <div className="space-y-4">
        {statements.map((statement, index) => (
          <div key={statement.id} className="space-y-3 rounded-lg border p-4">
            <p className="text-sm font-medium">
              {index + 1}. {statement.text}
            </p>

            <div className="flex gap-3">
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => onAnswer(statement.id, value)}
                  className={`rounded-lg border px-5 py-2 text-sm transition ${
                    answers[statement.id] === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {value ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
