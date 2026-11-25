type QuestionNavigationProps = {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: number[];
  onNavigate: (question: number) => void;
};

export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onNavigate,
}: QuestionNavigationProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 font-semibold">Navigasi Soal</h3>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isCurrent = currentQuestion === questionNumber;
          const isAnswered = answeredQuestions.includes(questionNumber);

          return (
            <button
              key={questionNumber}
              type="button"
              onClick={() => onNavigate(questionNumber)}
              className={`aspect-square rounded-lg border text-sm font-medium ${
                isCurrent
                  ? "border-primary bg-primary text-primary-foreground"
                  : isAnswered
                    ? "border-green-500 bg-green-500/10 text-green-600"
                    : "hover:bg-muted"
              }`}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <p>● Biru: Soal aktif</p>
        <p>● Hijau: Sudah dijawab</p>
        <p>● Abu-abu: Belum dijawab</p>
      </div>
    </div>
  );
}
