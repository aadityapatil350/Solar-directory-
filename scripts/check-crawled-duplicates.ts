import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// URLs from Google Search Console alert
const crawledURLs = [
  'https://gosolarindex.in/',
  'https://gosolarindex.in/listing/meet-enterprises-solar-dealer-solar-panel-rooftop-solar-dealer-in-nashik-router-switches-ofc-cable-in-nashik-nashik-2',
  'https://gosolarindex.in/listing/savemax-solar-systems-pvt-ltd-pune-7',
  'https://gosolarindex.in/listing/sunwave-solar-power-cleaning-service-solution-mumbai-2',
  'https://gosolarindex.in/listing/synergy-system-nagpur-4',
];

async function checkCrawledDuplicates() {
  console.log('🔍 Checking crawled URLs from Google Search Console...\n');

  for (const url of crawledURLs) {
    // Extract slug from URL
    const slugMatch = url.match(/\/listing\/([^/]+)/);

    if (!slugMatch) {
      if (url === 'https://gosolarindex.in/') {
        console.log('🏠 Homepage: https://gosolarindex.in/');
        console.log('   Status: This is the homepage, not a duplicate');
        console.log('   Action: Ensure canonical tag points to itself\n');
        continue;
      }
      console.log(`⚠️  Could not extract slug from: ${url}\n`);
      continue;
    }

    const slug = slugMatch[1];
    console.log(`🔍 Checking: ${slug}`);

    const listing = await prisma.listing.findUnique({
      where: { slug },
      include: {
        location: true,
        category: true,
      },
    });

    if (!listing) {
      console.log(`   ❌ Listing not found in database`);
      console.log(`   💡 This URL may be a deleted listing that Google still has indexed`);

      // Check for similar listings
      const baseSlug = slug.replace(/-\d+$/, '');
      const similar = await prisma.listing.findMany({
        where: {
          slug: {
            startsWith: baseSlug,
          },
        },
        take: 5,
      });

      if (similar.length > 0) {
        console.log(`   📋 Similar listings found:`);
        similar.forEach((s) => {
          console.log(`      - ${s.slug}`);
        });
      }

      console.log('');
      continue;
    }

    console.log(`   ✅ Found: ${listing.name}`);
    console.log(`   📍 Location: ${listing.location?.city || 'N/A'}, ${listing.location?.state || 'N/A'}`);
    console.log(`   🏷️  Category: ${listing.category?.name || 'N/A'}`);

    // Check if this is a numbered variant
    if (slug.includes('-2') || slug.includes('-3') || slug.includes('-4') || slug.includes('-7')) {
      console.log(`   ⚠️  This appears to be a numbered variant slug`);

      const baseSlug = slug.replace(/-\d+$/, '');
      const baseListing = await prisma.listing.findUnique({
        where: { slug: baseSlug },
      });

      if (baseListing) {
        console.log(`   🔄 Base listing exists: ${baseListing.name}`);
        console.log(`   💡 This could be a duplicate of: ${baseSlug}`);
      }
    }

    console.log('');
  }

  console.log('📊 Summary:\n');
  console.log('The Google Search Console alert means:');
  console.log('1. Google has crawled multiple URL variations of the same content');
  console.log('2. These URLs don\'t have proper canonical tags telling Google which is the "main" URL');
  console.log('3. Google is confused about which version to index\n');
  console.log('🛠️  Solutions:\n');
  console.log('1. Add canonical tags to listing pages');
  console.log('2. Remove/redirect old URLs to main URLs');
  console.log('3. Ensure no duplicate listings exist');
}

checkCrawledDuplicates()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
