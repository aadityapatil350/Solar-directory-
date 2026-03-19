import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// Usage: npx tsx scripts/mark-test-by-id.ts <listing-id> <true|false>
// Example: npx tsx scripts/mark-test-by-id.ts cmm8vqp3i00c9k1movx6zkbvd true

async function markTestById() {
  const listingId = process.argv[2];
  const isTestStr = process.argv[3];

  if (!listingId || !isTestStr) {
    console.log('❌ Usage: npx tsx scripts/mark-test-by-id.ts <listing-id> <true|false>');
    console.log('   Example: npx tsx scripts/mark-test-by-id.ts cmm8vqp3i00c9k1movx6zkbvd true');
    process.exit(1);
  }

  const isTest = isTestStr.toLowerCase() === 'true';

  try {
    // First, check if listing exists
    const existing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: {
        id: true,
        name: true,
        isTest: true,
        slug: true,
        location: { select: { city: true, state: true } },
        category: { select: { name: true } },
      },
    });

    if (!existing) {
      console.log(`❌ Listing with ID "${listingId}" not found`);
      process.exit(1);
    }

    console.log(`\n📋 Listing Details:`);
    console.log(`   Name: ${existing.name}`);
    console.log(`   Location: ${existing.location.city}, ${existing.location.state}`);
    console.log(`   Category: ${existing.category.name}`);
    console.log(`   Current Status: ${existing.isTest ? '🧪 TEST' : '✓ PUBLIC'}`);

    if (existing.isTest === isTest) {
      console.log(`\n⚠️  Listing is already ${isTest ? 'marked as TEST' : 'PUBLIC'}`);
      process.exit(0);
    }

    // Update
    const updated = await prisma.listing.update({
      where: { id: listingId },
      data: { isTest },
    });

    console.log(`\n✅ Success!`);
    console.log(`   "${existing.name}" is now ${isTest ? '🧪 MARKED AS TEST' : '✓ PUBLIC'}`);
    console.log(`   URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/listing/${existing.slug}`);
    console.log(`   ${isTest ? 'Only admins can see this listing now.' : 'Public users can now see this listing.'}`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

markTestById()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
