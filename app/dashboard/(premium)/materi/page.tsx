import VideoCard from "@/components/materi/video-card";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";

function formatDuration(seconds: number | null) {
  if (!seconds) return "Durasi tidak tersedia";

  const minutes = Math.ceil(seconds / 60);
  return `${minutes} menit`;
}

export default async function MateriPage() {
  const materials = await prisma.learningMaterial.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Materi Pembelajaran
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pelajari berbagai materi melalui video pembelajaran.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Cari materi..."
            className="h-10 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:bg-slate-950"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {materials.length} materi tersedia
        </p>
      </div>

      {materials.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">Belum ada materi tersedia</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Materi pembelajaran akan ditampilkan di sini.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <VideoCard
              key={material.id}
              id={material.id}
              title={material.title}
              description={material.description ?? ""}
              thumbnail={
                material.thumbnailUrl ??
                "https://placehold.co/600x340/172554/FFFFFF?text=Learning+Material"
              }
              duration={formatDuration(material.durationSeconds)}
              category="Materi Pembelajaran"
            />
          ))}
        </div>
      )}
    </div>
  );
}
