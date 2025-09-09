# Deploy no Vercel (PostgreSQL) — 2025-09-09

## Passo a passo

1) **Instalar deps**
```bash
npm i
```

2) **Configurar `.env`** (copie do `.env.example` e ajuste):
```
NEXTAUTH_URL="https://SEU_DOMINIO.vercel.app"
AUTH_SECRET="gera-um-valor-forte"
NEXTAUTH_SECRET="gera-um-valor-forte"
ADMIN_EMAIL="admin@portal.dev"
ADMIN_PASSWORD="admin123"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
```

3) **Migrar banco**
```bash
npx prisma migrate deploy   # na Vercel
# local:
# npx prisma migrate dev
```

4) **Rodar local**
```bash
npm run dev
```

5) **Git + Vercel**
- Faça commit/push normalmente:
```bash
git add -A
git commit -m "fix: tipagem image nullable + placeholder + Postgres p/ Vercel"
git push
```
- Na Vercel, em *Project → Settings → Environment Variables*, crie as variáveis do `.env`.
- Faça o deploy.

## O que foi corrigido
- `NewsCarousel.tsx` agora aceita `image: string | null` e usa fallback `/placeholder-news.jpg`.
- `public/placeholder-news.jpg` adicionado.
- `prisma/schema.prisma` trocado para `provider = "postgresql"`.
- `src/lib/db.ts` usa **apenas** `process.env.DATABASE_URL`, sem fallback para SQLite.
- `.env.example` atualizado para DSN PostgreSQL.

> Se quiser manter **SQLite** apenas para dev local, crie `.env.development` com `DATABASE_URL="file:./dev.db"` e rode `npx prisma migrate dev` localmente. Para produção, mantenha Postgres.

