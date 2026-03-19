import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// List of single-listing cities that likely have thin content
const thinContentSlugs = [
  'golden-acs-solar-panel-best-solar-company-in-lucknow-solar-panel-dealer-lucknow-lucknow', // lucknow
  'diman-solar-private-limited-ahmedabad', // ahmedabad
  'jupiter-electrosolar-trading-corporation-utl-solar-shope-aurangabad-2', // aurangabad
  'shree-ram-enterprises-nagpur-3', // nagpur
  'solar-cleaning-maintenance-services-chandigarh', // chandigarh
];

async function checkThinContentPages() {
  console.log('🔍 Checking thin-content pages for missing information...\n');

  const listings = await prisma.listing.findMany({
    where: {
      slug: {
        in: thinContentSlugs,
      },
    },
    include: {
      location: true,
      category: true,
      images: true,
    },
  });

  if (listings.length === 0) {
    console.log('❌ No listings found');
    return;
  }

  console.log(`📋 Found ${listings.length} thin-content listings:\n`);

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

    const contentScore = 10 - missingFields.length; // Out of 10

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
    console.log(`   ${contentScore < 5 ? '❌ VERY THIN CONTENT - Needs urgent improvement' : contentScore < 8 ? '⚠️  THIN CONTENT - Needs improvement' : '✓ Decent content'}`);
    console.log();
  });

  // Summary
  const avgScore = listings.reduce((sum, listing) => {
    const missingFields = [];
    if (!listing.location) missingFields.push('Location');
    if (!listing.phone) missingFields.push('Phone');
    if (!listing.email) missingFields.push('Email');
    if (!listing.address) missingFields.push('Address');
    if (!listing.description || listing.description.length < 200) missingFields.push('Description');
    if (listing.images.length === 0) missingFields.push('Images');
    if (!listing.website) missingFields.push('Website');
    return sum + (10 - missingFields.length);
  }, 0) / listings.length;

  console.log('📊 Summary:');
  console.log(`   Average content score: ${avgScore.toFixed(1)}/10`);
  console.log(`   Listings needing urgent attention (< 5/10): ${listings.filter((l) => {
    const missingFields = [];
    if (!l.location) missingFields.push('Location');
    if (!l.phone) missingFields.push('Phone');
    if (!l.email) missingFields.push('Email');
    if (!l.address) missingFields.push('Address');
    if (!l.description || l.description.length < 200) missingFields.push('Description');
    if (l.images.length === 0) missingFields.push('Images');
    if (!l.website) missingFields.push('Website');
    return (10 - missingFields.length) < 5;
  }).length}`);
}

checkThinContentPages()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
