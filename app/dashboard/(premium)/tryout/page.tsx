import TryoutCard from "@/components/tryout/tryout-card";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function TryoutPage() {
  const tryouts = await prisma.tryout.findMany({
    where: {
      isPublished: true,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Simulasi Tryout</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Uji kemampuanmu melalui simulasi ujian online.
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
            placeholder="Cari tryout..."
            className="h-10 w-full rounded-lg border  pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:bg-slate-950"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {tryouts.length} tryout tersedia
        </p>
      </div>

      {tryouts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tryouts.map((tryout) => (
            <TryoutCard
              key={tryout.id}
              id={tryout.id}
              title={tryout.title}
              description={tryout.description ?? ""}
              duration={tryout.durationMinutes}
              totalQuestions={tryout._count.questions}
              isPublished={tryout.isPublished}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">Belum ada tryout tersedia.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Silakan kembali lagi nanti.
          </p>
        </div>
      )}
    </div>
  );
}
