import Link from "next/link";
import { prisma } from "@/lib/db";
import NewsCarousel from "@/components/NewsCarousel";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [featured, articles] = await Promise.all([
    prisma.article.findMany({
      where: { important: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.article.findMany({
      where: { important: false },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-12">
      {/* Hero / Destaque institucional */}
      <section className="rounded-2xl border token-border bg-gradient-to-r from-[var(--brand)]/20 to-[var(--accent)]/20 p-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold">Bem-vindo ao Portal</h1>
        <p className="mb-8 text-lg opacity-80">
          Uma experiência moderna com conteúdos atualizados.
        </p>
        <Link
          href="/admin/login"
          className="inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--accent)]"
        >
          Acessar área admin
        </Link>
      </section>

      {/* Carrossel de notícias se houver artigos destacados */}
      {featured.length > 0 && <NewsCarousel articles={featured} />}

      {/* Lista de artigos (cards) */}
      {articles.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/artigos/${a.slug}`}
              className="token-surface overflow-hidden rounded-lg border token-border"
            >
              {a.image && (
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-semibold leading-snug">{a.title}</h2>
                {a.subtitle && (
                  <p className="text-sm opacity-80">{a.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Caso não haja artigos, um placeholder simples */}
      {featured.length === 0 && articles.length === 0 && (
        <div className="token-surface rounded-xl p-6 text-center border token-border">
          <p className="mb-4 opacity-80">Nenhum artigo publicado ainda.</p>
          <Link
            href="/admin/login"
            className="inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--accent)]"
          >
            Publicar primeiro artigo
          </Link>
        </div>
      )}

      {/* Destaques institucionais */}
      <ul className="grid gap-6 sm:grid-cols-3">
        <li className="token-surface rounded-xl p-6 text-center border token-border">
          <div className="mb-2 text-2xl">⚡</div>
          <h3 className="mb-1 font-semibold">Rápido</h3>
          <p className="text-sm opacity-80">Interface leve e responsiva.</p>
        </li>
        <li className="token-surface rounded-xl p-6 text-center border token-border">
          <div className="mb-2 text-2xl">🎨</div>
          <h3 className="mb-1 font-semibold">Visual moderno</h3>
          <p className="text-sm opacity-80">Cores pensadas para conforto.</p>
        </li>
        <li className="token-surface rounded-xl p-6 text-center border token-border">
          <div className="mb-2 text-2xl">🔐</div>
          <h3 className="mb-1 font-semibold">Admin seguro</h3>
          <p className="text-sm opacity-80">Gerencie artigos facilmente.</p>
        </li>
      </ul>
    </div>
  );
}
