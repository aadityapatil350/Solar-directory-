import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env.local
config({ path: '.env.local' });

const prisma = new PrismaClient();

const missingListings = [
  {
    slug: 'bengal-solar-power-extra',
    name: 'Bengal Solar Power',
    description: 'Commercial solar for Kolkata industries. Howrah, Durgapur corridor. WBSEDCL net metering specialist.',
    phone: '+91 98765 60017',
    email: 'contact@bengalsolarepc.com',
    website: null,
    address: 'Howrah, Kolkata, West Bengal',
    verified: true,
    featured: false,
    rating: 4.5,
    reviews: 89,
    cityName: 'Kolkata',
    categorySlug: 'commercial-installers',
  },
  {
    slug: 'patna-solar-services',
    name: 'Patna Solar Services',
    description: 'Solar AMC and repair in Patna. Panel cleaning, inverter maintenance. Serving all of Bihar.',
    phone: '+91 90990 20004',
    email: null,
    website: null,
    address: 'Kankarbagh, Patna, Bihar',
    verified: false,
    featured: false,
    rating: 4.1,
    reviews: 37,
    cityName: 'Patna',
    categorySlug: 'maintenance-services',
  },
];

async function main() {
  console.log('🔍 Checking for missing listings in production database...\n');

  for (const listingData of missingListings) {
    const { slug, cityName, categorySlug, ...data } = listingData;

    // Check if listing exists
    const existing = await prisma.listing.findUnique({
      where: { slug },
      select: { id: true, name: true },
    });

    if (existing) {
      console.log(`✅ EXISTS: ${slug} (ID: ${existing.id})`);
      continue;
    }

    console.log(`❌ MISSING: ${slug}`);
    console.log(`   Creating listing: ${data.name}...`);

    // Find the location
    const location = await prisma.location.findFirst({
      where: { city: { equals: cityName, mode: 'insensitive' } },
    });

    if (!location) {
      console.log(`   ⚠️  ERROR: Location "${cityName}" not found in database`);
      continue;
    }

    // Find the category
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      console.log(`   ⚠️  ERROR: Category "${categorySlug}" not found in database`);
      continue;
    }

    // Create the listing
    try {
      const created = await prisma.listing.create({
        data: {
          slug,
          name: data.name,
          description: data.description,
          phone: data.phone,
          email: data.email,
          website: data.website,
          address: data.address,
          verified: data.verified,
          featured: data.featured,
          rating: data.rating,
          reviews: data.reviews,
          categoryId: category.id,
          locationId: location.id,
        },
      });

      console.log(`   ✅ CREATED: ${created.slug} (ID: ${created.id})`);
    } catch (error: any) {
      console.log(`   ❌ ERROR creating listing: ${error.message}`);
    }
  }

  console.log('\n✅ Done!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
