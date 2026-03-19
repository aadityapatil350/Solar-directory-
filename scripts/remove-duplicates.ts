import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function removeDuplicates() {
  try {
    console.log('Finding and removing duplicate listings...\n');

    // Get all locations
    const locations = await prisma.location.findMany({
      include: {
        listings: {
          select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc' // Keep the oldest one
          }
        }
      }
    });

    let totalRemoved = 0;

    for (const location of locations) {
      // Group listings by name (case-insensitive)
      const listingsByName: { [key: string]: any[] } = {};

      location.listings.forEach(listing => {
        const name = listing.name.toLowerCase().trim();
        if (!listingsByName[name]) {
          listingsByName[name] = [];
        }
        listingsByName[name].push(listing);
      });

      // Find duplicates
      const duplicates = Object.entries(listingsByName).filter(([_, listings]) => listings.length > 1);

      if (duplicates.length > 0) {
        console.log(`\n📍 ${location.city}, ${location.state}`);
        
        for (const [name, listings] of duplicates) {
          // Keep the first one (oldest), delete the rest
          const toKeep = listings[0];
          const toDelete = listings.slice(1);
          
          console.log(`\n   "${name}"`);
          console.log(`   ✅ Keeping: ${toKeep.slug} (ID: ${toKeep.id})`);
          console.log(`   🗑️  Deleting ${toDelete.length} duplicates:`);
          
          for (const listing of toDelete) {
            console.log(`      - ${listing.slug} (ID: ${listing.id})`);
            
            // Delete the duplicate listing
            await prisma.listing.delete({
              where: { id: listing.id }
            });
            
            totalRemoved++;
          }
        }
      }
    }

    console.log(`\n\n✅ CLEANUP COMPLETE`);
    console.log(`Total duplicate listings removed: ${totalRemoved}\n`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicates();
