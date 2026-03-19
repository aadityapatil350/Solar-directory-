import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// All duplicate URLs from Google Search Console
const duplicateSlugs = [
  'clearsky-solar-nagpur-2',
  'gurukrupa-solar-trading-corporation-nagpur-2',
  'unique-solar-tata-power-solar-authorise-channel-partner-aurangabad-10',
  'priority-solar-solutions-pvt-ltd-solar-rooftop-for-industrial-and-residential-mumbai-2',
  'powertune-inverterlift-inverter-online-ups-battery-solar-panel-dealer-mumbai-2',
  'nalanda-inverter-airconditioner-authorised-luminous-distributor-in-raigad-navi-mumbai-mumbai-2',
  'bg-solar-system-aurangabad-7',
  'tech-solar-and-systems-nagpur-9',
  'tulsi-battery-solar-pune-2',
];

async function checkAllVariantSlugs() {
  console.log('🔍 Checking all variant slugs from Google Search Console...\n');

  const results = {
    exists: [] as Array<{ slug: string; id: string; name: string; baseSlug: string }>,
    notExists: [] as Array<{ slug: string; baseSlug: string; mainExists: boolean }>,
  };

  for (const slug of duplicateSlugs) {
    const variantListing = await prisma.listing.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const baseSlug = slug.replace(/-\d+$/, '');
    const mainListing = await prisma.listing.findUnique({
      where: { slug: baseSlug },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (variantListing) {
      console.log(`⚠️  VARIANT EXISTS IN DATABASE`);
      console.log(`   Slug: ${slug}`);
      console.log(`   ID: ${variantListing.id}`);
      console.log(`   Name: ${variantListing.name}`);
      console.log(`   Base: ${baseSlug}`);
      if (mainListing) {
        console.log(`   Main listing EXISTS: ${mainListing.slug}`);
        console.log(`   💡 DELETE this duplicate listing (ID: ${variantListing.id})`);
      } else {
        console.log(`   ⚠️  Main listing DOES NOT EXIST`);
        console.log(`   💡 Consider renaming this slug to base: ${baseSlug}`);
      }
      results.exists.push({
        slug,
        id: variantListing.id,
        name: variantListing.name,
        baseSlug,
      });
    } else {
      console.log(`✅ Variant not in database (already deleted)`);
      console.log(`   Slug: ${slug}`);
      console.log(`   Base: ${baseSlug}`);
      if (mainListing) {
        console.log(`   Main listing EXISTS: ${mainListing.slug}`);
        console.log(`   💡 Redirect this URL to: ${mainListing.slug}`);
      } else {
        console.log(`   ⚠️  Main listing also NOT FOUND`);
      }
      results.notExists.push({
        slug,
        baseSlug,
        mainExists: !!mainListing,
      });
    }
    console.log('');
  }

  // Summary
  console.log('📊 Summary:\n');
  console.log(`   Total duplicates checked: ${duplicateSlugs.length}`);
  console.log(`   Still exist in DB: ${results.exists.length}`);
  console.log(`   Already deleted: ${results.notExists.length}\n`);

  if (results.exists.length > 0) {
    console.log('🗑️  Listings to DELETE (found in database):\n');
    results.exists.forEach((item) => {
      console.log(`   DELETE: ${item.slug}`);
      console.log(`   ID: ${item.id}`);
      console.log(`   Name: ${item.name}`);
      console.log(`   Rename to: ${item.baseSlug}`);
      console.log('');
    });

    console.log('📝 SQL to delete these duplicates:\n');
    const deleteIds = results.exists.map((item) => `'${item.id}'`).join(', ');
    console.log(`DELETE FROM "Listing" WHERE id IN (${deleteIds});`);
  }

  if (results.notExists.filter((item) => item.mainExists).length > 0) {
    console.log('\n🔄 Redirects needed for deleted URLs with main listing:\n');
    results.notExists
      .filter((item) => item.mainExists)
      .forEach((item) => {
        console.log(`   ${item.slug} → ${item.baseSlug}`);
      });
  }
}

checkAllVariantSlugs()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
