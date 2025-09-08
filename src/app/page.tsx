import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border token-border bg-gradient-to-r from-[var(--brand)]/20 to-[var(--accent)]/20 p-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold">Bem-vindo ao Portal</h1>
        <p className="mb-8 text-lg opacity-80">Uma experiência moderna com conteúdos atualizados.</p>
        <Link
          href="/admin/login"
          className="inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--accent)]"
        >
          Acessar área admin
        </Link>
      </section>
      <ul className="grid gap-6 sm:grid-cols-3">
        <li className="token-surface rounded-xl p-6 text-center">
          <div className="mb-2 text-2xl">⚡</div>
          <h2 className="mb-1 font-semibold">Rápido</h2>
          <p className="text-sm opacity-80">Interface leve e responsiva.</p>
        </li>
        <li className="token-surface rounded-xl p-6 text-center">
          <div className="mb-2 text-2xl">🎨</div>
          <h2 className="mb-1 font-semibold">Visual moderno</h2>
          <p className="text-sm opacity-80">Cores pensadas para conforto.</p>
        </li>
        <li className="token-surface rounded-xl p-6 text-center">
          <div className="mb-2 text-2xl">🔐</div>
          <h2 className="mb-1 font-semibold">Admin seguro</h2>
          <p className="text-sm opacity-80">Gerencie artigos facilmente.</p>
        </li>
      </ul>
    </div>
  );
}
