import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// Normalize string for comparison (remove extra spaces, lowercase, remove special chars)
function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '');
}

async function findAdvancedDuplicates() {
  console.log('🔍 Advanced duplicate analysis...\n');

  const listings = await prisma.listing.findMany({
    include: {
      category: true,
      location: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  console.log(`📊 Total listings: ${listings.length}\n`);

  // 1. Check for exact name + location duplicates
  console.log('1️⃣ Checking exact name + location duplicates...');
  const exactDupes = new Map<string, typeof listings>();
  for (const listing of listings) {
    const key = `${listing.name.toLowerCase().trim()}|${listing.locationId}`;
    if (!exactDupes.has(key)) exactDupes.set(key, []);
    exactDupes.get(key)!.push(listing);
  }
  const exactDuplicateGroups = Array.from(exactDupes.values()).filter(g => g.length > 1);
  console.log(`   Found ${exactDuplicateGroups.length} exact duplicate groups\n`);

  // 2. Check for normalized name + location duplicates (similar names)
  console.log('2️⃣ Checking normalized name + location duplicates...');
  const normalizedDupes = new Map<string, typeof listings>();
  for (const listing of listings) {
    const key = `${normalize(listing.name)}|${listing.locationId}`;
    if (!normalizedDupes.has(key)) normalizedDupes.set(key, []);
    normalizedDupes.get(key)!.push(listing);
  }
  const normalizedDuplicateGroups = Array.from(normalizedDupes.values()).filter(g => g.length > 1);
  console.log(`   Found ${normalizedDuplicateGroups.length} normalized duplicate groups\n`);

  // 3. Check for duplicate slugs (shouldn't happen due to unique constraint)
  console.log('3️⃣ Checking duplicate slugs...');
  const slugs = new Map<string, typeof listings>();
  for (const listing of listings) {
    if (!slugs.has(listing.slug)) slugs.set(listing.slug, []);
    slugs.get(listing.slug)!.push(listing);
  }
  const slugDuplicates = Array.from(slugs.values()).filter(g => g.length > 1);
  console.log(`   Found ${slugDuplicates.length} duplicate slug groups\n`);

  // 4. Check for duplicate phone numbers in same location
  console.log('4️⃣ Checking duplicate phone + location...');
  const phoneDupes = new Map<string, typeof listings>();
  for (const listing of listings) {
    if (!listing.phone) continue;
    const key = `${listing.phone.trim()}|${listing.locationId}`;
    if (!phoneDupes.has(key)) phoneDupes.set(key, []);
    phoneDupes.get(key)!.push(listing);
  }
  const phoneDuplicateGroups = Array.from(phoneDupes.values()).filter(g => g.length > 1);
  console.log(`   Found ${phoneDuplicateGroups.length} phone duplicate groups\n`);

  // 5. Check for duplicate emails
  console.log('5️⃣ Checking duplicate emails...');
  const emailDupes = new Map<string, typeof listings>();
  for (const listing of listings) {
    if (!listing.email) continue;
    const key = listing.email.toLowerCase().trim();
    if (!emailDupes.has(key)) emailDupes.set(key, []);
    emailDupes.get(key)!.push(listing);
  }
  const emailDuplicateGroups = Array.from(emailDupes.values()).filter(g => g.length > 1);
  console.log(`   Found ${emailDuplicateGroups.length} email duplicate groups\n`);

  // Show details for normalized name duplicates (most likely to be real duplicates)
  if (normalizedDuplicateGroups.length > 0) {
    console.log('\n🚨 POTENTIAL DUPLICATES (normalized name + location):\n');

    const idsToDelete: string[] = [];

    for (const group of normalizedDuplicateGroups) {
      const location = group[0].location;
      console.log(`📍 ${group[0].name} (${location.city}, ${location.state})`);
      console.log(`   ${group.length} instances found:`);

      group.forEach((listing, index) => {
        const status = index === 0 ? '✓ KEEP' : '✗ DELETE';
        console.log(`   ${status} - "${listing.name}"`);
        console.log(`      ID: ${listing.id}`);
        console.log(`      Slug: ${listing.slug}`);
        console.log(`      Created: ${listing.createdAt.toISOString()}`);
        console.log(`      Featured: ${listing.featured}, Verified: ${listing.verified}`);
        console.log(`      Phone: ${listing.phone || 'N/A'}, Email: ${listing.email || 'N/A'}`);

        if (index > 0) {
          idsToDelete.push(listing.id);
        }
      });
      console.log('');
    }

    console.log(`\n📋 Summary:`);
    console.log(`   Duplicate listings to remove: ${idsToDelete.length}`);
    console.log(`   Listings to keep: ${listings.length - idsToDelete.length}`);

    if (idsToDelete.length > 0) {
      console.log(`\n   IDs to delete:\n   ${idsToDelete.join('\n   ')}`);
    }

    return idsToDelete;
  }

  return [];
}

findAdvancedDuplicates()
  .then((idsToDelete) => {
    if (idsToDelete && idsToDelete.length > 0) {
      console.log('\n\n⚠️  To delete these duplicates, run: npx tsx scripts/delete-duplicates.ts');
    } else {
      console.log('\n✅ No duplicates found - database is clean!');
    }
  })
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
