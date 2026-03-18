import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function checkClaimedListings() {
  console.log('🔍 Checking claimed listings...\n');

  // Check listings with userId (claimed)
  const claimedListings = await prisma.listing.findMany({
    where: {
      userId: { not: null },
    },
    include: {
      user: true,
      location: true,
      category: true,
    },
  });

  console.log(`📊 Total claimed listings: ${claimedListings.length}\n`);

  if (claimedListings.length > 0) {
    console.log('Claimed listings:\n');
    claimedListings.forEach((listing, index) => {
      console.log(`${index + 1}. ${listing.name}`);
      console.log(`   ID: ${listing.id}`);
      console.log(`   Location: ${listing.location.city}, ${listing.location.state}`);
      console.log(`   Category: ${listing.category.name}`);
      console.log(`   Owner Email: ${listing.user?.email || 'N/A'}`);
      console.log(`   Owner Name: ${listing.user?.name || 'N/A'}`);
      console.log(`   Claimed Date: ${listing.updatedAt.toISOString()}`);
      console.log('');
    });
  }

  // Check claim requests
  const claimRequests = await prisma.claimRequest.findMany({
    include: {
      listing: {
        include: {
          location: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`📋 Total claim requests: ${claimRequests.length}\n`);

  if (claimRequests.length > 0) {
    console.log('Claim requests:\n');
    claimRequests.forEach((req, index) => {
      console.log(`${index + 1}. ${req.listing.name}`);
      console.log(`   Status: ${req.status}`);
      console.log(`   Requested by: ${req.name} (${req.email})`);
      console.log(`   Date: ${req.createdAt.toISOString()}`);
      console.log('');
    });
  }

  console.log('\n✅ To unclaim a listing, run:');
  console.log('   npx tsx scripts/unclaim-listing.ts <listing-id>');
}

checkClaimedListings()
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
