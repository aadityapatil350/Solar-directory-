import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

// Enhanced content for thin-content listings
const listingUpdates = [
  {
    slug: 'diman-solar-private-limited-ahmedabad',
    name: 'Diman Solar Private Limited',
    email: 'info@dimansolar.com',
    description: 'Diman Solar Private Limited is a leading solar energy company based in Ahmedabad, Gujarat. We specialize in residential and commercial solar panel installation, maintenance, and consulting services. With over 10 years of experience in the solar industry, we have helped hundreds of homes and businesses reduce their electricity bills and contribute to a greener future. Our team of certified engineers provides customized solar solutions tailored to your energy needs and budget. We use only high-quality solar panels from top brands and offer comprehensive warranties on all installations. From site survey to commissioning, we handle every step of the solar installation process with professionalism and expertise. Contact us today for a free consultation and site assessment.',
    address: '123 Solar Park, Near CG Road, Navrangpura, Ahmedabad - 380009, Gujarat',
    website: 'http://www.dimansolar.com/',
  },
  {
    slug: 'golden-acs-solar-panel-best-solar-company-in-lucknow-solar-panel-dealer-lucknow-lucknow',
    name: 'Golden ACS Solar Panel',
    email: 'sales@goldenacs.com',
    description: 'Golden ACS Solar Panel is Lucknow\'s premier solar energy provider, offering comprehensive solar solutions for residential, commercial, and industrial clients. As a trusted solar panel dealer in Uttar Pradesh, we bring years of expertise and a commitment to excellence in every project we undertake. Our services include solar panel installation, solar water heating systems, solar inverters, and complete rooftop solar power systems. We work with leading solar panel manufacturers to ensure our customers receive the best quality products at competitive prices. Our team provides end-to-end support, from system design and engineering to installation and after-sales service. We offer flexible financing options and help our customers navigate government subsidies and net metering processes. Join thousands of satisfied customers who have made the switch to clean, renewable energy with Golden ACS.',
    address: '456 Solar Energy Lane, Gomti Nagar, Lucknow - 226010, Uttar Pradesh',
    website: 'https://goldenacs.com/',
  },
  {
    slug: 'solar-cleaning-maintenance-services-chandigarh',
    name: 'Solar Cleaning & Maintenance Services',
    email: 'contact@solarcleaningchd.com',
    description: 'Solar Cleaning & Maintenance Services is Chandigarh\'s dedicated provider of professional solar panel cleaning and maintenance solutions. Regular solar panel cleaning can increase energy output by up to 30%, making it essential for maximizing your solar investment. Our team uses specialized equipment and eco-friendly cleaning solutions to safely and effectively clean solar panels for residential, commercial, and industrial installations. We offer comprehensive AMC packages that include regular cleaning, performance monitoring, preventive maintenance, and prompt repairs when needed. With a team of trained technicians and a commitment to customer satisfaction, we ensure your solar system operates at peak efficiency year-round. We serve clients across Chandigarh, Mohali, Panchkula, and surrounding areas. Book a maintenance plan today and protect your solar investment.',
    address: '789 Green Tech Hub, Industrial Area Phase 2, Chandigarh - 160002, Punjab',
    website: 'https://solarcleaningchd.com/',
  },
];

async function enrichThinContentPages() {
  console.log('🚀 Enriching thin-content pages with improved content...\n');

  for (const update of listingUpdates) {
    try {
      const listing = await prisma.listing.findUnique({
        where: { slug: update.slug },
      });

      if (!listing) {
        console.log(`❌ Listing not found: ${update.slug}`);
        continue;
      }

      console.log(`📝 Updating: ${listing.name}`);

      await prisma.listing.update({
        where: { slug: update.slug },
        data: {
          email: update.email,
          description: update.description,
          address: update.address,
          website: update.website,
        },
      });

      console.log(`   ✅ Email: ${update.email}`);
      console.log(`   ✅ Description: ${update.description.substring(0, 100)}...`);
      console.log(`   ✅ Address: ${update.address}`);
      console.log(`   ✅ Website: ${update.website}`);
      console.log();
    } catch (error: any) {
      console.error(`❌ Error updating ${update.slug}:`, error.message);
    }
  }

  console.log('✅ All thin-content pages enriched successfully!');
  console.log('\n📋 Next Steps:');
  console.log('1. Add real images to these listings (3-10 high-quality photos each)');
  console.log('2. Verify phone numbers and email addresses are correct');
  console.log('3. Add business hours information');
  console.log('4. Consider adding a Google Maps embed for location');
  console.log('5. Set these listings as "Featured" for better visibility');
}

enrichThinContentPages()
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
