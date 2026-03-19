import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function checkCategories() {
  console.log('📋 Checking all categories...\n');

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  console.log(`Total categories: ${categories.length}\n`);

  categories.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat.name}`);
    console.log(`   Slug: ${cat.slug}`);
    console.log(`   ID: ${cat.id}`);
    console.log('');
  });
}

checkCategories()
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
