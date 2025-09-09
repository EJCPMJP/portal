import { PrismaClient } from "@prisma/client";

// Lazily instantiate Prisma so builds without a DATABASE_URL do not fail.
// The real client is only created when first used at runtime and the
// environment variable is available.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prismaInstance: PrismaClient | undefined = globalForPrisma.prisma;

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      if (!prismaInstance) {
        if (!process.env.DATABASE_URL) {
          throw new Error(
            "DATABASE_URL is not set. Define it to enable database access."
          );
        }

        prismaInstance =
          globalForPrisma.prisma ??
          new PrismaClient({
            datasources: {
              db: {
                url: process.env.DATABASE_URL,
              },
            },
          });

        if (process.env.NODE_ENV !== "production") {
          globalForPrisma.prisma = prismaInstance;
        }
      }

      // @ts-expect-error dynamic access on the Prisma proxy
      return prismaInstance[prop];
    },
  }
) as PrismaClient;
