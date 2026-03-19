import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function deleteSunrideListing() {
  const listingId = 'cmm8vqwfy0269k1mo4opyr0wr';

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      console.log('❌ SUNRIDE SOLAR listing not found');
      process.exit(1);
    }

    console.log(`📋 Deleting: ${listing.name}`);
    console.log(`   ID: ${listing.id}`);
    console.log(`   Slug: ${listing.slug}`);
    console.log(`   This listing has NO location, phone, email, or description`);
    console.log(`   Only has website: ${listing.website}`);

    // Delete listing
    await prisma.listing.delete({
      where: { id: listingId },
    });

    console.log('\n✅ SUNRIDE SOLAR listing deleted!');
    console.log('   This was causing SEO issues for "solar nellore" keyword');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteSunrideListing()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
