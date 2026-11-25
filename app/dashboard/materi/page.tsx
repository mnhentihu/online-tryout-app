import VideoCard from "@/components/materi/video-card";
import { Search } from "lucide-react";

const materials = [
  {
    id: 1,
    title: "Pengenalan HTML dan CSS",
    description:
      "Mempelajari dasar HTML dan CSS untuk membangun halaman website.",
    thumbnail: "https://placehold.co/600x340/172554/FFFFFF?text=HTML+%26+CSS",
    duration: "15 menit",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Dasar JavaScript",
    description:
      "Memahami variabel, tipe data, function, dan dasar pemrograman JavaScript.",
    thumbnail: "https://placehold.co/600x340/713f12/FFFFFF?text=JavaScript",
    duration: "20 menit",
    category: "JavaScript",
  },
  {
    id: 3,
    title: "Pengenalan React JS",
    description: "Mengenal component, props, state, dan konsep dasar React.",
    thumbnail: "https://placehold.co/600x340/164e63/FFFFFF?text=React+JS",
    duration: "25 menit",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Belajar Node.js",
    description: "Mengenal Node.js dan penggunaannya untuk membangun backend.",
    thumbnail: "https://placehold.co/600x340/14532d/FFFFFF?text=Node.js",
    duration: "30 menit",
    category: "Backend",
  },
  {
    id: 5,
    title: "Database dan SQL",
    description: "Memahami database relasional dan dasar penggunaan SQL.",
    thumbnail: "https://placehold.co/600x340/581c87/FFFFFF?text=Database",
    duration: "18 menit",
    category: "Database",
  },
  {
    id: 6,
    title: "Pengenalan Next.js",
    description: "Memahami routing, rendering, dan konsep dasar Next.js.",
    thumbnail: "https://placehold.co/600x340/334155/FFFFFF?text=Next.js",
    duration: "22 menit",
    category: "Frontend",
  },
];

export default function MateriPage() {
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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <VideoCard
            key={material.id}
            id={material.id}
            title={material.title}
            description={material.description}
            thumbnail={material.thumbnail}
            duration={material.duration}
            category={material.category}
          />
        ))}
      </div>
    </div>
  );
}
