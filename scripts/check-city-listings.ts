import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

const citiesToCheck = ['aurangabad', 'nagpur', 'lucknow', 'ahmedabad', 'chandigarh'];

async function checkCityListings() {
  console.log('🔍 Checking listings in cities identified as thin-content...\n');

  for (const cityName of citiesToCheck) {
    // Find location with this city name
    const locations = await prisma.location.findMany({
      where: {
        city: {
          mode: 'insensitive',
          equals: cityName,
        },
      },
    });

    if (locations.length === 0) {
      console.log(`❌ No location found for: ${cityName}`);
      continue;
    }

    const location = locations[0];
    const listings = await prisma.listing.findMany({
      where: {
        locationId: location.id,
      },
      include: {
        location: true,
        category: true,
        images: true,
      },
    });

    console.log(`🏙️  ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}: ${listings.length} listings`);

    if (listings.length > 0) {
      listings.forEach((listing) => {
        const missingFields = [];
        if (!listing.phone) missingFields.push('Phone');
        if (!listing.email) missingFields.push('Email');
        if (!listing.description || listing.description.length < 200) missingFields.push('Description');
        if (listing.images.length === 0) missingFields.push('Images');
        if (!listing.website) missingFields.push('Website');
        const score = 10 - missingFields.length;

        console.log(`   📋 ${listing.name}`);
        console.log(`      Slug: ${listing.slug}`);
        console.log(`      Score: ${score}/10 ${score < 7 ? '⚠️ Thin' : '✓'}`);
        if (missingFields.length > 0) {
          console.log(`      Missing: ${missingFields.join(', ')}`);
        }
      });
    } else {
      console.log(`   ⚠️  No listings in this city`);
    }

    console.log();
  }

  console.log('📊 Summary:');
  console.log('   Checked 5 cities from the analysis');
  console.log('   Some listings from the crawled URLs may have been deleted');
  console.log('   Focus on improving content for existing listings');
}

checkCityListings()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
