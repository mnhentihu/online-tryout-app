import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-10 block text-center text-2xl font-bold tracking-tight"
        >
          TryOut<span className="text-blue-500">.</span>
        </Link>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Buat Akun Baru</h1>
            <p className="mt-2 text-sm text-slate-400">
              Daftar sekarang dan mulai persiapkan dirimu.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimal 8 karakter"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Daftar
            </button>
          </div>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-900 px-3 text-xs text-slate-500">
                ATAU
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-700 py-3 text-sm font-medium transition hover:bg-slate-800"
          >
            <span className="font-bold text-lg">G</span>
            Daftar dengan Google
          </button>

          <p className="mt-7 text-center text-sm text-slate-400">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Masuk
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-slate-500 transition hover:text-white"
        >
          ← Kembali ke halaman utama
        </Link>
      </div>
    </main>
  );
}
