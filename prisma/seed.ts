import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'residential-installers' },
      update: {},
      create: {
        name: 'Residential Solar Installers',
        slug: 'residential-installers',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'commercial-installers' },
      update: {},
      create: {
        name: 'Commercial Solar Installers',
        slug: 'commercial-installers',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'solar-dealers' },
      update: {},
      create: {
        name: 'Solar Panel Dealers',
        slug: 'solar-dealers',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'inverter-specialists' },
      update: {},
      create: {
        name: 'Solar Inverter Specialists',
        slug: 'inverter-specialists',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'maintenance-services' },
      update: {},
      create: {
        name: 'Solar AMC & Maintenance',
        slug: 'maintenance-services',
      },
    }),
  ]);

  // Create Locations
  const locations = await Promise.all([
    prisma.location.upsert({
      where: { slug: 'mumbai-maharashtra' },
      update: {},
      create: {
        city: 'Mumbai',
        state: 'Maharashtra',
        slug: 'mumbai-maharashtra',
      },
    }),
    prisma.location.upsert({
      where: { slug: 'delhi-delhi' },
      update: {},
      create: {
        city: 'Delhi',
        state: 'Delhi',
        slug: 'delhi-delhi',
      },
    }),
    prisma.location.upsert({
      where: { slug: 'bangalore-karnataka' },
      update: {},
      create: {
        city: 'Bangalore',
        state: 'Karnataka',
        slug: 'bangalore-karnataka',
      },
    }),
    prisma.location.upsert({
      where: { slug: 'pune-maharashtra' },
      update: {},
      create: {
        city: 'Pune',
        state: 'Maharashtra',
        slug: 'pune-maharashtra',
      },
    }),
    prisma.location.upsert({
      where: { slug: 'hyderabad-telangana' },
      update: {},
      create: {
        city: 'Hyderabad',
        state: 'Telangana',
        slug: 'hyderabad-telangana',
      },
    }),
  ]);

  // Create Sample Listings
  const sampleListings = [
    {
      name: 'SunRise Solar Solutions',
      slug: 'sunrise-solar-solutions-mumbai',
      description: 'Premium residential and commercial solar installation with 10+ years experience. MNRE approved vendor with excellent after-sales support.',
      phone: '+91 98765 43210',
      email: 'info@sunrisesolar.com',
      website: 'https://sunrisesolar.com',
      address: 'Andheri West, Mumbai, Maharashtra',
      verified: true,
      featured: true,
      rating: 4.8,
      reviews: 127,
      categoryId: categories[0].id,
      locationId: locations[0].id,
    },
    {
      name: 'SolarTech India Pvt Ltd',
      slug: 'solartech-india-delhi',
      description: 'Leading solar EPC company specializing in industrial rooftop projects. Completed 500+ MW installations across India.',
      phone: '+91 98765 43211',
      email: 'contact@solartechindia.com',
      website: 'https://solartechindia.com',
      address: 'Connaught Place, Delhi',
      verified: true,
      featured: true,
      rating: 4.9,
      reviews: 89,
      categoryId: categories[1].id,
      locationId: locations[1].id,
    },
    {
      name: 'Green Energy Distributors',
      slug: 'green-energy-distributors-bangalore',
      description: 'Authorized dealer for top solar brands - Tata Power Solar, Loom Solar, Adani Solar. Best prices guaranteed.',
      phone: '+91 98765 43212',
      email: 'sales@greenenergy.com',
      website: 'https://greenenergy.com',
      address: 'Whitefield, Bangalore, Karnataka',
      verified: true,
      featured: false,
      rating: 4.5,
      reviews: 203,
      categoryId: categories[2].id,
      locationId: locations[2].id,
    },
    {
      name: 'Bright Inverters & More',
      slug: 'bright-inverters-pune',
      description: 'Specialist in solar inverters and battery solutions. Service center for all major brands.',
      phone: '+91 98765 43213',
      email: 'support@brightinverters.com',
      website: 'https://brightinverters.com',
      address: 'Koregaon Park, Pune, Maharashtra',
      verified: false,
      featured: false,
      rating: 4.2,
      reviews: 45,
      categoryId: categories[3].id,
      locationId: locations[3].id,
    },
    {
      name: 'SolarCare Services',
      slug: 'solarcare-services-hyderabad',
      description: 'Annual maintenance contracts for solar plants. Cleaning, inspection, repair, and performance optimization.',
      phone: '+91 98765 43214',
      email: 'amc@solarcareservices.com',
      website: 'https://solarcareservices.com',
      address: 'Madhapur, Hyderabad, Telangana',
      verified: true,
      featured: false,
      rating: 4.6,
      reviews: 78,
      categoryId: categories[4].id,
      locationId: locations[4].id,
    },
    {
      name: 'Urja Solar Systems',
      slug: 'urja-solar-mumbai',
      description: 'Complete solar solutions for homes and businesses. Free site visit and consultation. Subsidy assistance available.',
      phone: '+91 98765 43215',
      email: 'info@urjasolar.com',
      website: 'https://urjasolar.com',
      address: 'Bandra Kurla Complex, Mumbai, Maharashtra',
      verified: true,
      featured: true,
      rating: 4.7,
      reviews: 156,
      categoryId: categories[0].id,
      locationId: locations[0].id,
    },
  ];

  for (const listing of sampleListings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {},
      create: listing,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
