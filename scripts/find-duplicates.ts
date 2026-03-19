import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function findDuplicates() {
  console.log('🔍 Analyzing listings for duplicates...\n');

  // Fetch all listings with their relations
  const listings = await prisma.listing.findMany({
    include: {
      category: true,
      location: true,
    },
    orderBy: {
      createdAt: 'asc', // Oldest first, so we keep the original
    },
  });

  console.log(`📊 Total listings in database: ${listings.length}\n`);

  // Group by name + location to find duplicates
  const groupedByNameLocation = new Map<string, typeof listings>();

  for (const listing of listings) {
    const key = `${listing.name.toLowerCase().trim()}|${listing.locationId}`;

    if (!groupedByNameLocation.has(key)) {
      groupedByNameLocation.set(key, []);
    }
    groupedByNameLocation.get(key)!.push(listing);
  }

  // Find groups with duplicates
  const duplicateGroups = Array.from(groupedByNameLocation.entries())
    .filter(([_, listings]) => listings.length > 1);

  if (duplicateGroups.length === 0) {
    console.log('✅ No duplicates found!');
    return;
  }

  console.log(`🚨 Found ${duplicateGroups.length} duplicate groups:\n`);

  let totalDuplicates = 0;
  const idsToDelete: string[] = [];

  for (const [key, duplicates] of duplicateGroups) {
    const [name, locationId] = key.split('|');
    const location = duplicates[0].location;

    console.log(`📍 ${duplicates[0].name} (${location.city}, ${location.state})`);
    console.log(`   Found ${duplicates.length} instances:`);

    // Keep the first one (oldest), mark rest for deletion
    duplicates.forEach((listing, index) => {
      const status = index === 0 ? '✓ KEEP' : '✗ DELETE';
      console.log(`   ${status} - ID: ${listing.id}, Created: ${listing.createdAt.toISOString()}, Featured: ${listing.featured}, Verified: ${listing.verified}`);

      if (index > 0) {
        idsToDelete.push(listing.id);
        totalDuplicates++;
      }
    });
    console.log('');
  }

  console.log(`\n📋 Summary:`);
  console.log(`   Total duplicate groups: ${duplicateGroups.length}`);
  console.log(`   Total duplicate listings to remove: ${totalDuplicates}`);
  console.log(`   Listings to keep: ${listings.length - totalDuplicates}`);
  console.log(`\n   IDs to delete: ${idsToDelete.join(', ')}`);

  return idsToDelete;
}

findDuplicates()
  .then(() => {
    console.log('\n✅ Analysis complete');
  })
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
