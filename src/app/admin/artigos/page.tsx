import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Article = { id: string; title: string };

export default async function AdminArticles() {
  const arts: Article[] = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true },
  });

  return (
    <div className="token-surface border token-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Artigos</h1>
        <Link href="/admin/artigos/novo" className="underline">
          Novo
        </Link>
      </div>
      <ul className="text-sm">
        {arts.map((a) => (
          <li
            key={a.id}
            className="border-t token-border py-2 flex items-center justify-between"
          >
            <span>{a.title}</span>
            <Link className="underline" href={`/admin/artigos/${a.id}`}>
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

  return (
    <div className="token-surface border token-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Artigos</h1>
        <Link href="/admin/artigos/novo" className="underline">
          Novo
        </Link>
      </div>
      <ul className="text-sm">
        {arts.map((a) => (
          <li
            key={a.id}
            className="border-t token-border py-2 flex items-center justify-between"
          >
            <span>{a.title}</span>
            <Link className="underline" href={`/admin/artigos/${a.id}`}>
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
