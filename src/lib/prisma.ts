import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dbUrl = process.env.DATABASE_URL ?? '';
const pooledUrl = dbUrl.includes('connection_limit')
  ? dbUrl
  : dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'connection_limit=3&pool_timeout=20';

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: pooledUrl } },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
