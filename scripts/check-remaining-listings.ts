import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// Check for the remaining listings from the analysis
const remainingSlugs = [
  'jupiter-electrosolar-trading-corporation-utl-solar-shope-aurangabad-2', // aurangabad
  'shree-ram-enterprises-nagpur-3', // nagpur
];

async function checkRemainingListings() {
  console.log('🔍 Checking remaining listings from analysis...\n');

  const listings = await prisma.listing.findMany({
    where: {
      slug: {
        in: remainingSlugs,
      },
    },
    include: {
      location: true,
      category: true,
      images: true,
    },
  });

  if (listings.length === 0) {
    console.log('⚠️  These listings were not found in the database.');
    console.log('They may have been deleted or the slugs may have changed.');
    return;
  }

  console.log(`📋 Found ${listings.length} listings:\n`);

  listings.forEach((listing) => {
    const missingFields = [];

    // Check required fields
    if (!listing.location) missingFields.push('Location');
    if (!listing.phone) missingFields.push('Phone');
    if (!listing.email) missingFields.push('Email');
    if (!listing.address) missingFields.push('Address');
    if (!listing.description || listing.description.length < 200) missingFields.push('Description (< 200 chars)');
    if (listing.images.length === 0) missingFields.push('Images');
    if (!listing.website) missingFields.push('Website');

    const contentScore = 10 - missingFields.length;

    console.log(`🏢 ${listing.name}`);
    console.log(`   Slug: ${listing.slug}`);
    console.log(`   URL: https://gosolarindex.in/listing/${listing.slug}`);
    console.log(`   Location: ${listing.location?.city || 'N/A'} - ${listing.location?.state || 'N/A'}`);
    console.log(`   Category: ${listing.category?.name || 'N/A'}`);
    console.log(`   Phone: ${listing.phone || '❌ Missing'}`);
    console.log(`   Email: ${listing.email || '❌ Missing'}`);
    console.log(`   Website: ${listing.website || '❌ Missing'}`);
    console.log(`   Address: ${listing.address ? '✓' : '❌ Missing'}`);
    console.log(`   Description length: ${listing.description?.length || 0} chars`);
    console.log(`   Images: ${listing.images.length}`);
    console.log(`   Featured: ${listing.featured ? '✓' : '❌'}`);
    console.log(`   Verified: ${listing.verified ? '✓' : '❌'}`);

    if (missingFields.length > 0) {
      console.log(`   ⚠️  Missing fields: ${missingFields.join(', ')}`);
    }

    console.log(`   📊 Content Score: ${contentScore}/10`);
    console.log();
  });
}

checkRemainingListings()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
