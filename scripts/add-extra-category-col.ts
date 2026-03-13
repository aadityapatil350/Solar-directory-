import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE "Listing" ADD COLUMN IF NOT EXISTS "extraCategoryIds" TEXT');
    console.log('Column extraCategoryIds added successfully');
  } catch (e: any) {
    console.error('Error:', e.message);
  }
  await prisma.$disconnect();
}
main();
