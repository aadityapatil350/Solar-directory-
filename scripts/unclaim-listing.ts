import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function unclaimListing() {
  const listingId = process.argv[2];

  if (!listingId) {
    console.log('❌ Usage: npx tsx scripts/unclaim-listing.ts <listing-id>');
    console.log('   Example: npx tsx scripts/unclaim-listing.ts cmm8vqovi00a9k1molwv8odmi');
    process.exit(1);
  }

  try {
    // Get listing details
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
        location: true,
        category: true,
        claimRequests: true,
      },
    });

    if (!listing) {
      console.log(`❌ Listing with ID "${listingId}" not found`);
      process.exit(1);
    }

    console.log(`\n📋 Listing Details:`);
    console.log(`   Name: ${listing.name}`);
    console.log(`   Location: ${listing.location.city}, ${listing.location.state}`);
    console.log(`   Category: ${listing.category.name}`);
    console.log(`   Current Owner: ${listing.user?.email || 'None (unclaimed)'}`);

    if (!listing.userId) {
      console.log(`\n⚠️  This listing is already unclaimed!`);
      process.exit(0);
    }

    // Unclaim the listing
    const userId = listing.userId;

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        userId: null,
        installerId: null,
      },
    });

    // Delete claim requests
    await prisma.claimRequest.deleteMany({
      where: { listingId },
    });

    // Delete the user account (if not used by other listings)
    const otherListings = await prisma.listing.count({
      where: { userId, id: { not: listingId } },
    });

    if (otherListings === 0 && userId) {
      await prisma.user.delete({
        where: { id: userId },
      });
      console.log(`\n✅ Deleted user account: ${listing.user?.email}`);
    }

    console.log(`\n✅ Listing "${listing.name}" has been unclaimed!`);
    console.log(`   - Listing is now available for claiming`);
    console.log(`   - Deleted ${listing.claimRequests.length} claim request(s)`);
    if (otherListings === 0) {
      console.log(`   - Deleted owner account`);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

unclaimListing()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
