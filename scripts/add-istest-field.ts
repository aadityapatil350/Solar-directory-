import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function addIsTestField() {
  console.log('🔄 Adding isTest field to Listing table...\n');

  try {
    // Add the column with default false
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Listing"
      ADD COLUMN IF NOT EXISTS "isTest" BOOLEAN NOT NULL DEFAULT false;
    `);

    console.log('✅ Added isTest column');

    // Create index for performance
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Listing_isTest_idx" ON "Listing"("isTest");
    `);

    console.log('✅ Created index on isTest column');

    // Verify the column exists
    const result = await prisma.$queryRaw<any[]>`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'Listing' AND column_name = 'isTest';
    `;

    if (result.length > 0) {
      console.log('\n✅ Migration successful! Column details:');
      console.log(result[0]);
    } else {
      console.log('❌ Column not found after migration');
    }

    // Generate Prisma Client
    console.log('\n🔄 Generating Prisma Client...');
    const { execSync } = require('child_process');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('\n✅ All done! The isTest field is now available.');

  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('✅ Column already exists, skipping...');
    } else {
      console.error('❌ Error:', error);
      throw error;
    }
  }
}

addIsTestField()
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
