import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function create(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const content = String(formData.get("content") || "");
  if (!title || !slug || !content) return;
  await prisma.article.create({ data: { title, slug, content } });
  redirect("/admin/artigos");
}

export default function New() {
  return (
    <form
      action={create}
      className="grid gap-3 token-surface border token-border rounded-2xl p-6"
    >
      <h1 className="text-2xl font-bold">Novo Artigo</h1>
      <input
        name="title"
        className="px-3 py-2 rounded-lg token-surface border token-border"
        placeholder="Título"
      />
      <input
        name="slug"
        className="px-3 py-2 rounded-lg token-surface border token-border"
        placeholder="slug-exemplo"
      />
      <textarea
        name="content"
        className="px-3 py-2 rounded-lg token-surface border token-border min-h-[160px]"
        placeholder="Conteúdo"
      />
    </form>
  );
}
