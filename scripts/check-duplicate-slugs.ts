import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function checkDuplicateSlugs() {
  console.log('🔍 Checking for duplicate slugs in database...\n');

  // Find all slugs that appear more than once
  const slugsWithCounts = await prisma.listing.groupBy({
    by: ['slug'],
    having: {
      slug: {
        _count: {
          gt: 1,
        },
      },
    },
    _count: {
      slug: true,
    },
  });

  if (slugsWithCounts.length === 0) {
    console.log('✅ No duplicate slugs found in database');
    return;
  }

  console.log(`⚠️  Found ${slugsWithCounts.length} duplicate slugs:\n`);

  for (const item of slugsWithCounts) {
    console.log(`\n📌 Slug: ${item.slug}`);
    console.log(`   Duplicates: ${item._count.slug}`);

    const listings = await prisma.listing.findMany({
      where: { slug: item.slug },
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
        location: {
          select: {
            city: true,
            state: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    listings.forEach((listing, index) => {
      console.log(`   ${index + 1}. ID: ${listing.id}`);
      console.log(`      Name: ${listing.name}`);
      console.log(`      Location: ${listing.location?.city || 'N/A'}, ${listing.location?.state || 'N/A'}`);
      console.log(`      Created: ${listing.createdAt.toISOString()}`);
    });

    console.log(`   💡 Recommendation: Keep the newest listing (ID: ${listings[0].id}) and delete older duplicates`);
  }

  // Also check for similar slugs (e.g., listing-name-2, listing-name)
  console.log('\n\n🔍 Checking for similar slugs (numbered variants)...\n');

  const allListings = await prisma.listing.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  const slugMap = new Map<string, typeof allListings>();

  allListings.forEach((listing) => {
    const baseSlug = listing.slug.replace(/-\d+$/, ''); // Remove trailing numbers
    if (!slugMap.has(baseSlug)) {
      slugMap.set(baseSlug, []);
    }
    slugMap.get(baseSlug)!.push(listing);
  });

  const similarSlugs = Array.from(slugMap.entries())
    .filter(([_, listings]) => listings.length > 1)
    .slice(0, 10); // Show first 10

  if (similarSlugs.length > 0) {
    console.log(`⚠️  Found ${similarSlugs.length} groups of similar slugs:\n`);

    similarSlugs.forEach(([baseSlug, listings]) => {
      console.log(`📌 Base: ${baseSlug}`);
      listings.forEach((l, i) => {
        console.log(`   ${i + 1}. ${l.slug} (${l.name})`);
      });
      console.log('');
    });
  } else {
    console.log('✅ No similar numbered variants found');
  }
}

checkDuplicateSlugs()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
