import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  g.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL as string,
      },
    },
  });

if (process.env.NODE_ENV !== "production") g.prisma = prisma;
