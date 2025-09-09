import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function create(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  if (!title || !content) return;
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  await prisma.article.create({ data: { title, slug, content } });
  redirect("/admin/artigos");
}

export default function AdminHome() {
  return (
    <div className="token-surface border token-border rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-2">Painel</h1>
      <p>Bem-vindo!</p>
      <form action={create} className="mt-4 grid gap-3">
        <input
          name="title"
          className="px-3 py-2 rounded-lg token-surface border token-border"
          placeholder="Título"
        />
        <textarea
          name="content"
          className="px-3 py-2 rounded-lg token-surface border token-border min-h-[100px]"
          placeholder="Conteúdo"
        />
        <button
          type="submit"
          className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-black hover:bg-[var(--accent)]"
        >
          Postar
        </button>
      </form>
    </div>
  );
}

