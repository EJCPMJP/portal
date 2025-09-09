import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function create(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title || !slug || !content) return;

  await prisma.article.create({
    data: {
      title,
      slug,
      content,
      image: image || null, // compatível com image String?
    },
  });

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

      <input
        type="url"
        name="image"
        className="px-3 py-2 rounded-lg token-surface border token-border"
        placeholder="URL da imagem (opcional)"
      />

      <textarea
        name="content"
        className="px-3 py-2 rounded-lg token-surface border token-border min-h-[160px]"
        placeholder="Conteúdo"
      />

      <button
        type="submit"
        className="mt-2 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-black hover:bg-[var(--accent)]"
      >
        Salvar
      </button>
    </form>
  );
}
