import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          TryOut<span className="text-blue-500">.</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500"
          >
            Daftar
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          Platform Simulasi Tryout Online
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Persiapkan Dirimu,
          <span className="block text-blue-500">Raih Hasil Terbaik.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Tingkatkan kemampuan dan persiapkan dirimu menghadapi ujian melalui
          materi pembelajaran dan simulasi tryout yang dapat diakses kapan saja.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Mulai Sekarang
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-slate-700 px-7 py-3.5 text-sm font-semibold transition hover:bg-slate-800"
          >
            Saya Sudah Punya Akun
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "Materi Video", description: "Belajar lebih fleksibel" },
            { title: "Simulasi Tryout", description: "Latihan sebelum ujian" },
            { title: "Evaluasi Hasil", description: "Ketahui kemampuanmu" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TryOut. All rights reserved.
      </footer>
    </main>
  );
}
