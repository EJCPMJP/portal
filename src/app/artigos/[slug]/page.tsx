import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });
  if (!article) return notFound();

  return (
    <article className="token-surface border token-border rounded-2xl p-6 space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <img src={article.image} alt="" className="w-full rounded-lg" />
      <p className="whitespace-pre-line">{article.content}</p>
    </article>
  );
}

