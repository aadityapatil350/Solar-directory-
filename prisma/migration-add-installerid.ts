/**
 * migration-add-installerid.ts
 * Add missing installerId column to database
 *
 * Run: npx prisma db execute
 */

const { Prisma } = require('@prisma/client');

const prisma = new Prisma();

async function main() {
  console.log('Adding installerId column to Listing model...');

  // Add installerId column as nullable String
  await prisma.$executeRaw(`
    ALTER TABLE "Listing" ADD COLUMN "installerId" TEXT;
  `);

  console.log('✅ Migration complete!');
  console.log('');
  console.log('Note: If you see an error about the column already existing,');
  console.log('the migration has already been run. This is safe.');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
