import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ClipboardList } from "lucide-react";

type TryoutCardProps = {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  isPublished: boolean;
};

export default function TryoutCard({
  id,
  title,
  description,
  duration,
  totalQuestions,
  isPublished,
}: TryoutCardProps) {
  return (
    <div className="flex flex-col rounded-xl border  p-5 shadow-sm transition hover:shadow-md dark:bg-slate-950">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          <ClipboardList size={22} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isPublished
              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          }`}
        >
          {isPublished ? "Tersedia" : "Belum tersedia"}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="my-5 flex items-center gap-5 border-y py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClipboardList size={16} />
          {totalQuestions} Soal
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          {duration} Menit
        </div>
      </div>

      {isPublished ? (
        <Link
          href={`/dashboard/tryout/${id}`}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Mulai Tryout
          <ArrowRight size={17} />
        </Link>
      ) : (
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground"
        >
          <CheckCircle2 size={17} />
          Segera Hadir
        </button>
      )}
    </div>
  );
}
