/**
 * Seeds a test listing "Frosty's Listing Company" with:
 * - Owner user: forsticebiz@gmail.com / aditya123
 * - Featured + Verified listing in Mumbai
 * - Auto-approved claim record
 *
 * Run: npx tsx prisma/seed-test-user.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding test user + listing...');

  // 1. Find a category and location to use
  const category = await prisma.category.findFirst({
    where: { name: { contains: 'Residential', mode: 'insensitive' } },
  });
  if (!category) throw new Error('No category found — run main seed first');

  const location = await prisma.location.findFirst({
    where: { city: { contains: 'Mumbai', mode: 'insensitive' } },
  });
  if (!location) throw new Error('No Mumbai location found — run main seed first');

  // 2. Create the listing
  const slug = 'frostys-listing-company-test';

  const existing = await prisma.listing.findUnique({ where: { slug } });
  let listing = existing;

  if (!listing) {
    listing = await prisma.listing.create({
      data: {
        name: "Frosty's Listing Company",
        slug,
        description: "This is a test listing created to verify premium features, owner dashboard, and admin controls on GoSolarIndex. Frosty's team specialises in residential and commercial rooftop solar installations across Mumbai.",
        phone: '+91-98765-00001',
        email: 'forsticebiz@gmail.com',
        website: 'https://gosolarindex.in',
        address: '42, Bandra West, Mumbai, Maharashtra 400050',
        verified: true,
        featured: true,
        rating: 4.8,
        reviews: 12,
        categoryId: category.id,
        locationId: location.id,
        serviceTags: JSON.stringify([
          'Residential Solar',
          'Rooftop Installation',
          'Battery Storage',
          'Net Metering',
          'Subsidy Assistance',
          'On-Grid Systems',
          'MNRE Certified',
        ]),
      },
    });
    console.log('✅ Listing created:', listing.name, '→', listing.slug);
  } else {
    // Update to ensure featured + verified
    listing = await prisma.listing.update({
      where: { slug },
      data: {
        verified: true,
        featured: true,
        email: 'forsticebiz@gmail.com',
      },
    });
    console.log('✅ Listing already exists, updated to featured+verified');
  }

  // 3. Create or update the owner user
  const hashedPassword = await bcrypt.hash('aditya123', 12);

  let user = await prisma.user.findUnique({ where: { email: 'forsticebiz@gmail.com' } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Frosty',
        email: 'forsticebiz@gmail.com',
        password: hashedPassword,
        role: 'owner',
      },
    });
    console.log('✅ User created: forsticebiz@gmail.com (role=owner)');
  } else {
    user = await prisma.user.update({
      where: { email: 'forsticebiz@gmail.com' },
      data: {
        name: user.name || 'Frosty',
        password: hashedPassword,
        role: 'owner',
      },
    });
    console.log('✅ User updated: forsticebiz@gmail.com (role=owner, password reset)');
  }

  // 4. Link listing to user
  await prisma.listing.update({
    where: { id: listing.id },
    data: { userId: user.id },
  });
  console.log('✅ Listing linked to user');

  // 5. Create an auto-approved claim record (so it shows up in admin Claims tab)
  const existingClaim = await prisma.claimRequest.findFirst({
    where: { listingId: listing.id, email: user.email },
  });

  if (!existingClaim) {
    await prisma.claimRequest.create({
      data: {
        listingId: listing.id,
        name: 'Frosty',
        email: 'forsticebiz@gmail.com',
        phone: '+91-98765-00001',
        message: 'Test account — auto-approved for feature testing',
        status: 'approved',
      },
    });
    console.log('✅ Claim record created (status=approved)');
  } else {
    await prisma.claimRequest.update({
      where: { id: existingClaim.id },
      data: { status: 'approved' },
    });
    console.log('✅ Claim record already exists, set to approved');
  }

  console.log('\n🎉 Done! Test credentials:');
  console.log('   URL:      /dashboard/login');
  console.log('   Email:    forsticebiz@gmail.com');
  console.log('   Password: aditya123');
  console.log('   Listing:  /listing/frostys-listing-company-test');
  console.log('   Status:   Featured ⭐ + Verified ✓');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
