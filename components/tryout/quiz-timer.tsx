"use client";

import { useEffect, useState } from "react";

type QuizTimerProps = {
  durationMinutes: number;
  onTimeUp: () => void;
};

export default function QuizTimer({
  durationMinutes,
  onTimeUp,
}: QuizTimerProps) {
  const [remaining, setRemaining] = useState(durationMinutes * 60);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onTimeUp]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">Sisa Waktu</p>

      <p className="mt-1 text-2xl font-bold tabular-nums">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
    </div>
  );
}
