import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function checkSEO() {
  console.log('🔍 Checking SEO keywords and Sunride Solar listing...\n');

  // Search for Sunride Solar
  const sunride = await prisma.listing.findFirst({
    where: {
      name: {
        contains: 'sunride',
        mode: 'insensitive',
      },
    },
  });

  if (sunride) {
    console.log(`📋 Found: ${sunride.name}`);
    console.log(`   Location: ${sunride.location?.city || 'N/A'}, ${sunride.location?.state || 'N/A'}`);
    console.log(`   Category: ${sunride.category?.name || 'N/A'}`);
    console.log(`   Slug: ${sunride.slug}`);
    console.log(`   ID: ${sunride.id}`);
    console.log(`   Phone: ${sunride.phone || 'N/A'}`);
    console.log(`   Email: ${sunride.email || 'N/A'}`);
    console.log(`   Website: ${sunride.website || 'N/A'}`);
    console.log(`   Description: ${sunride.description?.substring(0, 200) || 'N/A'}`);
    console.log(`   Featured: ${sunride.featured}`);
    console.log(`   Verified: ${sunride.verified}`);
    console.log(`   Views: ${sunride.views}`);
    console.log(`   Created: ${sunride.createdAt.toISOString()}`);
  } else {
    console.log('❌ SUNRIDE SOLAR not found in database');
  }

  // Check if listing is optimized for "solar nellore"
  const nellore = await prisma.listing.findFirst({
    where: {
      OR: [
        { name: { contains: 'nellore', mode: 'insensitive' } },
        { description: { contains: 'nellore', mode: 'insensitive' } },
      ],
    },
  });

  console.log(`\n📊 Listings with 'nellore': ${nellore?.length || 0}`);

  if (nellore && nellore.length > 0) {
    console.log('\nNellore listings:');
    nellore.slice(0, 5).forEach((listing, i) => {
      console.log(`${i + 1}. ${listing.name} (${listing.location.city})`);
    });
  }

  // Check all listings for keyword patterns
  const allListings = await prisma.listing.findMany({
    where: {},
    take: 10,
    orderBy: { views: 'desc' },
    include: {
      location: true,
      category: true,
    },
  });

  console.log(`\n📊 Top 10 listings by views:\n`);

  allListings.forEach((listing, i) => {
    console.log(`${i + 1}. ${listing.name}`);
    console.log(`   Views: ${listing.views}`);
    console.log(`   Location: ${listing.location.city}`);
    console.log(`   Featured: ${listing.featured}, Verified: ${listing.verified}`);
  });
}

checkSEO()
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
