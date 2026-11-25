import TryoutCard from "@/components/tryout/tryout-card";
import { Search } from "lucide-react";

const tryouts = [
  {
    id: "tryout-1",
    title: "Simulasi Dasar Pemrograman",
    description:
      "Uji pengetahuan dasar HTML, CSS, JavaScript, dan konsep pemrograman.",
    duration: 30,
    totalQuestions: 10,
    isPublished: true,
  },
  {
    id: "tryout-2",
    title: "Simulasi Web Development",
    description:
      "Uji pemahaman mengenai frontend, backend, dan pengembangan website.",
    duration: 30,
    totalQuestions: 10,
    isPublished: true,
  },
  {
    id: "tryout-3",
    title: "Simulasi Database",
    description:
      "Latihan memahami database relasional, SQL, dan pengelolaan data.",
    duration: 30,
    totalQuestions: 10,
    isPublished: false,
  },
];

export default function TryoutPage() {
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
            className="h-10 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:bg-slate-950"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {tryouts.filter((item) => item.isPublished).length} tryout tersedia
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tryouts.map((tryout) => (
          <TryoutCard key={tryout.id} {...tryout} />
        ))}
      </div>
    </div>
  );
}
