import Link from "next/link";
import { ArrowLeft, Clock, PlayCircle, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type MaterialDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatDuration(seconds: number | null) {
  if (!seconds) return "Durasi tidak tersedia";

  const minutes = Math.ceil(seconds / 60);
  return `${minutes} menit`;
}

export default async function MaterialDetailPage({
  params,
}: MaterialDetailPageProps) {
  const { id } = await params;

  const material = await prisma.learningMaterial.findFirst({
    where: {
      id,
      isPublished: true,
    },
  });

  if (!material) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/dashboard/materi"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Materi
      </Link>

      <div>
        <div className="mb-3 flex items-center gap-2 text-sm text-primary">
          <BookOpen className="size-4" />
          Materi Pembelajaran
        </div>

        <h1 className="text-2xl font-bold">{material.title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {material.description}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-black">
        <div className="aspect-video">
          <iframe
            src={material.videoUrl}
            title={material.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <PlayCircle className="size-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Materi ke</p>
            <p className="font-medium">{material.sortOrder}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <Clock className="size-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Durasi video</p>
            <p className="font-medium">
              {formatDuration(material.durationSeconds)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-3 font-semibold">Deskripsi Materi</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {material.description}
        </p>
      </div>
    </div>
  );
}
