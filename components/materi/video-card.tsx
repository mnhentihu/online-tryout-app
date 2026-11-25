import Image from "next/image";
import Link from "next/link";
import { Clock, Play } from "lucide-react";

type VideoCardProps = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
};

export default function VideoCard({
  id,
  title,
  description,
  thumbnail,
  duration,
  category,
}: VideoCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-950">
      <div className="relative aspect-video bg-slate-100 dark:bg-slate-900">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow">
            <Play size={21} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {category}
          </span>

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={13} />
            {duration}
          </span>
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Link
          href={`/dashboard/materi/${id}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Lihat Materi
        </Link>
      </div>
    </div>
  );
}
