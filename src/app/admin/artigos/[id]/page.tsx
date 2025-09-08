import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function update(id: string, formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const image = String(formData.get("image") || "");
  const content = String(formData.get("content") || "");
  await prisma.article.update({
    where: { id },
    data: { title, slug, content, image },
  });
  redirect("/admin/artigos");
}

export default async function Edit({ params }: { params: { id: string } }) {
  const a = await prisma.article.findUnique({ where: { id: params.id } });
  if (!a) return notFound();

  return (
    <form
      action={update.bind(null, a.id)}
      className="grid gap-3 token-surface border token-border rounded-2xl p-6"
    >
      <h1 className="text-2xl font-bold">Editar</h1>
      <input
        defaultValue={a.title}
        name="title"
        className="px-3 py-2 rounded-lg token-surface border token-border"
      />
      <input
        defaultValue={a.slug}
        name="slug"
        className="px-3 py-2 rounded-lg token-surface border token-border"
      />
      <input
        defaultValue={a.image}
        name="image"
        className="px-3 py-2 rounded-lg token-surface border token-border"
      />
      <textarea
        defaultValue={a.content}
        name="content"
        className="px-3 py-2 rounded-lg token-surface border token-border min-h-[160px]"
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
