import { PrismaClient } from "@prisma/client";

// Instancia o Prisma apenas quando algum método é chamado.
// Assim, builds sem DATABASE_URL não falham e o cliente real
// é criado apenas em tempo de execução.
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
              db: { url: process.env.DATABASE_URL },
            },
          });

        if (process.env.NODE_ENV !== "production") {
          globalForPrisma.prisma = prismaInstance;
        }
      }

      // @ts-expect-error acesso dinâmico ao proxy
      return prismaInstance[prop];
    },
  }
) as PrismaClient;
