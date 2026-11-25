"use client";

import { useEffect, useRef, useState } from "react";

type QuizTimerProps = {
  startedAt: string;
  durationMinutes: number;
  onTimeUp: () => void;
  disabled?: boolean;
};

export default function QuizTimer({
  startedAt,
  durationMinutes,
  onTimeUp,
  disabled = false,
}: QuizTimerProps) {
  const deadline = new Date(startedAt).getTime() + durationMinutes * 60 * 1000;

  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.ceil((deadline - Date.now()) / 1000)),
  );

  const timeUpCalled = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const updateTimer = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

      setRemaining(seconds);

      if (seconds <= 0 && !timeUpCalled.current) {
        timeUpCalled.current = true;
        onTimeUp();
      }
    };

    updateTimer();

    const interval = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(interval);
  }, [deadline, disabled, onTimeUp]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">Sisa Waktu</p>

      <p
        className={`mt-1 text-2xl font-bold tabular-nums ${
          remaining <= 60 ? "text-red-500" : ""
        }`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
    </div>
  );
}
