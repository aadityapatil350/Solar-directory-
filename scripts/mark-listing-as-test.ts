import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as readline from 'readline';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function markAsTest() {
  console.log('🔧 Mark Listing as Test\n');

  try {
    // Option 1: Search by name
    const searchQuery = await question('Enter listing name to search (or press Enter to list all): ');

    let listings;
    if (searchQuery.trim()) {
      listings = await prisma.listing.findMany({
        where: {
          name: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        include: {
          location: true,
          category: true,
        },
        take: 10,
      });
    } else {
      // Show recent listings
      listings = await prisma.listing.findMany({
        include: {
          location: true,
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
      });
    }

    if (listings.length === 0) {
      console.log('❌ No listings found');
      rl.close();
      return;
    }

    console.log(`\nFound ${listings.length} listings:\n`);
    listings.forEach((listing, index) => {
      const testBadge = listing.isTest ? '🧪 TEST' : '';
      console.log(`${index + 1}. ${listing.name} ${testBadge}`);
      console.log(`   ID: ${listing.id}`);
      console.log(`   Location: ${listing.location.city}, ${listing.location.state}`);
      console.log(`   Category: ${listing.category.name}`);
      console.log(`   Slug: ${listing.slug}`);
      console.log('');
    });

    const choice = await question('Enter number to toggle test status (or "q" to quit): ');

    if (choice.toLowerCase() === 'q') {
      rl.close();
      return;
    }

    const index = parseInt(choice) - 1;
    if (isNaN(index) || index < 0 || index >= listings.length) {
      console.log('❌ Invalid choice');
      rl.close();
      return;
    }

    const selectedListing = listings[index];
    const newIsTest = !selectedListing.isTest;

    const updated = await prisma.listing.update({
      where: { id: selectedListing.id },
      data: { isTest: newIsTest },
    });

    console.log(`\n✅ Success!`);
    console.log(`   "${selectedListing.name}" is now ${newIsTest ? '🧪 MARKED AS TEST' : '✓ UNMARKED (PUBLIC)'}`);
    console.log(`   This listing will ${newIsTest ? 'NOT' : 'STILL'} appear to public users.`);

    const continueChoice = await question('\nMark another listing? (y/n): ');
    if (continueChoice.toLowerCase() === 'y') {
      rl.close();
      await prisma.$disconnect();
      // Restart the function
      const { PrismaClient } = await import('@prisma/client');
      const newPrisma = new PrismaClient();
      await markAsTest();
    } else {
      rl.close();
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    rl.close();
  }
}

markAsTest()
  .catch((error) => {
    console.error('Fatal error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
