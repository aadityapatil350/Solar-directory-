import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function checkPhoneDuplicates() {
  console.log('🔍 Checking phone number duplicates in detail...\n');

  const listings = await prisma.listing.findMany({
    where: {
      phone: {
        not: null,
      },
    },
    include: {
      category: true,
      location: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const phoneDupes = new Map<string, typeof listings>();
  for (const listing of listings) {
    if (!listing.phone) continue;
    const key = `${listing.phone.trim()}|${listing.locationId}`;
    if (!phoneDupes.has(key)) phoneDupes.set(key, []);
    phoneDupes.get(key)!.push(listing);
  }

  const duplicateGroups = Array.from(phoneDupes.values()).filter(g => g.length > 1);

  if (duplicateGroups.length === 0) {
    console.log('✅ No phone duplicates found!');
    return [];
  }

  console.log(`🚨 Found ${duplicateGroups.length} groups with duplicate phone numbers:\n`);

  const potentialDuplicates: string[] = [];

  for (const group of duplicateGroups) {
    const location = group[0].location;
    console.log(`📞 Phone: ${group[0].phone} (${location.city}, ${location.state})`);
    console.log(`   ${group.length} listings with this number:\n`);

    group.forEach((listing, index) => {
      console.log(`   ${index + 1}. ${listing.name}`);
      console.log(`      ID: ${listing.id}`);
      console.log(`      Category: ${listing.category.name}`);
      console.log(`      Created: ${listing.createdAt.toISOString()}`);
      console.log(`      Featured: ${listing.featured}, Verified: ${listing.verified}`);
      console.log(`      Email: ${listing.email || 'N/A'}`);
      console.log(`      Address: ${listing.address || 'N/A'}`);
      console.log('');
    });

    // Check if names are similar - if so, likely duplicates
    const uniqueNames = new Set(group.map(l => l.name.toLowerCase().trim()));
    if (uniqueNames.size === 1) {
      console.log(`   ⚠️  LIKELY DUPLICATES - All have same name!`);
      // Keep oldest, mark rest for deletion
      for (let i = 1; i < group.length; i++) {
        potentialDuplicates.push(group[i].id);
      }
    } else {
      console.log(`   ℹ️  Different names - could be same company with multiple divisions`);
    }
    console.log('\n' + '='.repeat(80) + '\n');
  }

  if (potentialDuplicates.length > 0) {
    console.log(`\n📋 Potential duplicates to delete: ${potentialDuplicates.length}`);
    console.log(`   IDs: ${potentialDuplicates.join(', ')}`);
  }

  return potentialDuplicates;
}

checkPhoneDuplicates()
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
