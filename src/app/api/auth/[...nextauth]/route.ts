import { handlers } from "@/lib/auth";

export const runtime = "nodejs";   // ✅ obrigatória com NextAuth + Prisma
export const { GET, POST } = handlers;
