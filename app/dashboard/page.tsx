import Link from "next/link";
import { BookOpen, ClipboardList, Crown, ArrowRight } from "lucide-react";

const stats = [
  {
    title: "Materi Pembelajaran",
    value: "12",
    description: "Materi tersedia",
    icon: BookOpen,
  },
  {
    title: "Simulasi Tryout",
    value: "5",
    description: "Tryout tersedia",
    icon: ClipboardList,
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Selamat Datang, Pengguna!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Siapkan dirimu dan lanjutkan proses belajarmu hari ini.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-5 shadow-sm dark:bg-slate-950"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl bg-blue-600 p-6 text-white sm:p-8">
        <div className="max-w-2xl">
          <Crown className="mb-4" size={30} />
          <h3 className="text-xl font-bold sm:text-2xl">
            Siap Menghadapi Tryout?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-blue-100">
            Uji kemampuanmu dengan mengerjakan simulasi tryout dan evaluasi
            hasil belajarmu.
          </p>

          <Link
            href="/dashboard/tryout"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Mulai Tryout
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/materi"
          className="group rounded-xl border bg-white p-5 transition hover:border-blue-500 dark:bg-slate-950"
        >
          <BookOpen className="mb-4 text-blue-600" size={24} />
          <h3 className="font-semibold">Pelajari Materi</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Akses video pembelajaran untuk meningkatkan pemahamanmu.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
            Lihat Materi <ArrowRight size={16} />
          </span>
        </Link>

        <Link
          href="/dashboard/tryout"
          className="group rounded-xl border bg-white p-5 transition hover:border-blue-500 dark:bg-slate-950"
        >
          <ClipboardList className="mb-4 text-blue-600" size={24} />
          <h3 className="font-semibold">Kerjakan Tryout</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Latih kemampuanmu melalui simulasi ujian online.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
            Lihat Tryout <ArrowRight size={16} />
          </span>
        </Link>
      </section>
    </div>
  );
}
