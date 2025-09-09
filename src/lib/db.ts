import { PrismaClient } from "@prisma/client";

// Prevent Prisma from initializing during builds when no database
// connection string is available. This avoids build-time failures on
// platforms like Vercel where `DATABASE_URL` might only be set at
// runtime. When the variable is missing we return a proxy that throws
// a helpful error if the client is actually used.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    return new Proxy(
      {},
      {
        get() {
          throw new Error(
            "DATABASE_URL is not set. Define it to enable database access."
          );
        },
      }
    ) as PrismaClient;
  }

  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
  );
}

export const prisma = createPrismaClient();

if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma;
}
