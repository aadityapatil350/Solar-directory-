import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

/**
 * Management script for variant slugs (numbered duplicates like listing-2, listing-7)
 *
 * This script helps:
 * 1. Find all variant slugs in the database
 * 2. Generate redirects for next.config.ts
 * 3. Generate SQL for cleanup
 * 4. Update next.config.ts with new redirects
 */

interface VariantListing {
  id: string;
  name: string;
  slug: string;
  baseSlug: string;
  mainListing?: {
    id: string;
    name: string;
    slug: string;
  };
}

async function findAllVariants() {
  console.log('🔍 Finding all variant slugs (numbered duplicates)...\n');

  const allListings = await prisma.listing.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  const variants: VariantListing[] = [];
  const slugMap = new Map<string, typeof allListings>();

  // Group by base slug
  allListings.forEach((listing) => {
    const match = listing.slug.match(/^(.+?)-(\d+)$/);

    if (match) {
      const baseSlug = match[1];
      const number = parseInt(match[2], 10);

      if (!slugMap.has(baseSlug)) {
        slugMap.set(baseSlug, []);
      }
      slugMap.get(baseSlug)!.push({ ...listing, number });
    }
  });

  // Find variants and their main listings
  for (const [baseSlug, listings] of slugMap.entries()) {
    if (listings.length === 1) {
      // Single variant, check if base exists
      const mainListing = await prisma.listing.findUnique({
        where: { slug: baseSlug },
        select: { id: true, name: true, slug: true },
      });

      variants.push({
        id: listings[0].id,
        name: listings[0].name,
        slug: listings[0].slug,
        baseSlug,
        mainListing: mainListing || undefined,
      });
    } else if (listings.length > 1) {
      // Multiple variants, keep the one with lowest number
      const sortedListings = [...listings].sort((a, b) => (a as any).number - (b as any).number);
      const mainVariant = sortedListings[0];
      const variantsToDelete = sortedListings.slice(1);

      for (const variant of variantsToDelete) {
        variants.push({
          id: variant.id,
          name: variant.name,
          slug: variant.slug,
          baseSlug: mainVariant.slug,
          mainListing: {
            id: mainVariant.id,
            name: mainVariant.name,
            slug: mainVariant.slug,
          },
        });
      }
    }
  }

  return variants;
}

function generateRedirects(variants: VariantListing[]): string {
  const redirects = [];

  for (const variant of variants) {
    if (variant.mainListing) {
      redirects.push(`    {
      source: '/listing/${variant.slug}',
      destination: '/listing/${variant.mainListing.slug}',
      permanent: true,
    },`);
    }
  }

  return redirects.join('\n');
}

function generateSQL(variants: VariantListing[]): string {
  const deleteIds = variants
    .filter((v) => v.mainListing)
    .map((v) => `'${v.id}'`)
    .join(', ');

  return `-- Delete variant listings that have main listings
DELETE FROM "Listing"
WHERE id IN (${deleteIds});
`;
}

function generateGSCRemovalList(variants: VariantListing[]): string {
  return variants
    .filter((v) => !v.mainListing)
    .map((v) => `https://gosolarindex.in/listing/${v.slug}`)
    .join('\n');
}

async function main() {
  const action = process.argv[2];

  if (action === 'find') {
    const variants = await findAllVariants();

    if (variants.length === 0) {
      console.log('✅ No variant slugs found in database');
      return;
    }

    console.log(`📋 Found ${variants.length} variant slugs:\n`);

    let withMain = 0;
    let withoutMain = 0;

    for (const variant of variants) {
      console.log(`📌 ${variant.slug}`);
      console.log(`   ID: ${variant.id}`);
      console.log(`   Name: ${variant.name}`);

      if (variant.mainListing) {
        console.log(`   ✅ Main exists: ${variant.mainListing.slug}`);
        console.log(`   💡 DELETE this variant (ID: ${variant.id})`);
        withMain++;
      } else {
        console.log(`   ⚠️  Main NOT FOUND: ${variant.baseSlug}`);
        console.log(`   💡 Consider renaming to: ${variant.baseSlug}`);
        withoutMain++;
      }

      console.log('');
    }

    console.log('📊 Summary:\n');
    console.log(`   Total variants: ${variants.length}`);
    console.log(`   With main listing (delete): ${withMain}`);
    console.log(`   Without main listing (rename): ${withoutMain}`);

  } else if (action === 'redirects') {
    const variants = await findAllVariants();
    const redirects = generateRedirects(variants);

    if (redirects) {
      console.log('📝 Redirects for next.config.ts:\n');
      console.log(redirects);
    } else {
      console.log('✅ No redirects needed');
    }

  } else if (action === 'sql') {
    const variants = await findAllVariants();
    const sql = generateSQL(variants);

    if (sql.includes('DELETE')) {
      console.log('🗑️  SQL to delete variants:\n');
      console.log(sql);
    } else {
      console.log('✅ No deletions needed');
    }

  } else if (action === 'gsc') {
    const variants = await findAllVariants();
    const urls = generateGSCRemovalList(variants);

    if (urls) {
      console.log('🔗 URLs to remove in Google Search Console:\n');
      console.log(urls);
    } else {
      console.log('✅ No URLs to remove');
    }

  } else if (action === 'help') {
    console.log(`
Usage: npx tsx scripts/manage-variant-slugs.ts <command>

Commands:
  find       - Find all variant slugs in database
  redirects   - Generate redirects for next.config.ts
  sql         - Generate SQL to delete variants
  gsc         - Generate URLs to remove in Google Search Console
  help        - Show this help message

Examples:
  npx tsx scripts/manage-variant-slugs.ts find
  npx tsx scripts/manage-variant-slugs.ts redirects
  npx tsx scripts/manage-variant-slugs.ts sql
  npx tsx scripts/manage-variant-slugs.ts gsc
`);
  } else {
    console.log('❌ Unknown command. Use "help" to see available commands.');
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
