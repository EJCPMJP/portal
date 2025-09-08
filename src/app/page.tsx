import Link from "next/link";
import { prisma } from "@/lib/db";
import NewsCarousel from "@/components/NewsCarousel";

export const dynamic = "force-dynamic";

export default async function Page() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {articles.length > 0 && <NewsCarousel articles={articles} />}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(1).map((a) => (
          <Link
            key={a.id}
            href={`/artigos/${a.slug}`}
            className="token-surface overflow-hidden rounded-lg"
          >
            <img
              src={a.image}
              alt=""
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold leading-snug">{a.title}</h2>
            </div>
          </Link>
        ))}
      </section>

      <div className="text-center">
        <Link
          href="/admin/login"
          className="inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--accent)]"
        >
          Acessar área admin
        </Link>
      </div>
    </div>
  );
}

