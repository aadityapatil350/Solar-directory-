import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function checkDuplicates() {
  try {
    console.log('Checking for duplicate listings...\n');

    // Get all locations
    const locations = await prisma.location.findMany({
      include: {
        listings: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      },
      orderBy: {
        state: 'asc'
      }
    });

    let totalDuplicates = 0;
    const duplicatesByLocation: any[] = [];

    for (const location of locations) {
      // Group listings by name
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
        console.log(`   Total listings: ${location.listings.length}`);
        console.log(`   Duplicate business names: ${duplicates.length}\n`);

        duplicates.forEach(([name, listings]) => {
          console.log(`   - "${name}" appears ${listings.length} times`);
          listings.forEach(listing => {
            console.log(`     ID: ${listing.id} | Slug: ${listing.slug}`);
          });
          totalDuplicates += listings.length - 1; // Count extras only
        });

        duplicatesByLocation.push({
          location: `${location.city}, ${location.state}`,
          locationId: location.id,
          duplicates: duplicates.map(([name, listings]) => ({
            businessName: name,
            count: listings.length,
            ids: listings.map(l => l.id)
          }))
        });
      }
    }

    console.log(`\n\n📊 SUMMARY`);
    console.log(`Total locations checked: ${locations.length}`);
    console.log(`Locations with duplicates: ${duplicatesByLocation.length}`);
    console.log(`Total duplicate entries to remove: ${totalDuplicates}\n`);

    return duplicatesByLocation;

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDuplicates();
