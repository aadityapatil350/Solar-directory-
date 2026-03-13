import { PrismaClient } from '@prisma/client';

// Use DIRECT_URL for DDL — bypasses PgBouncer which times out on ALTER TABLE
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL } },
});

async function main() {
  const result = await prisma.$queryRawUnsafe<any[]>(
    `SELECT column_name FROM information_schema.columns WHERE table_name='Listing' AND column_name='extraCategoryIds'`
  );
  if (result.length > 0) {
    console.log('Column extraCategoryIds already EXISTS');
  } else {
    console.log('Column MISSING — adding...');
    await prisma.$executeRawUnsafe(`ALTER TABLE "Listing" ADD COLUMN IF NOT EXISTS "extraCategoryIds" TEXT`);
    console.log('Column added successfully');
  }
  await prisma.$disconnect();
}
main().catch(console.error);
