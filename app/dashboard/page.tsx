import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  Crown,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { hasActiveSubscription } from "@/services/subscription.service";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const [profile, materialCount, tryoutCount, isPremium] = await Promise.all([
    prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        name: true,
      },
    }),

    prisma.learningMaterial.count({
      where: {
        isPublished: true,
      },
    }),

    prisma.tryout.count({
      where: {
        isPublished: true,
      },
    }),

    hasActiveSubscription(user.id),
  ]);

  const stats = [
    {
      title: "Materi Pembelajaran",
      value: materialCount,
      description: "Materi tersedia",
      icon: BookOpen,
    },
    {
      title: "Simulasi Tryout",
      value: tryoutCount,
      description: "Tryout tersedia",
      icon: ClipboardList,
    },
  ];

  const userName = profile?.name || user.email?.split("@")[0] || "Pengguna";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Selamat Datang, {userName}!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Siapkan dirimu dan lanjutkan proses belajarmu hari ini.
        </p>
      </section>

      {/* Statistics */}
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

      {/* Premium Condition */}
      {isPremium ? (
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
      ) : (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <LockKeyhole size={22} />
                <span className="text-sm font-semibold">
                  Akses Premium Belum Aktif
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                Aktifkan Akses Belajarmu!
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Kamu belum memiliki akses premium. Gunakan redeem code untuk
                mengaktifkan akses ke video pembelajaran dan simulasi tryout.
              </p>
            </div>

            <Link
              href="/dashboard/redeem"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Redeem Code
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      )}

      {/* Navigation Cards */}
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
