import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get Mumbai and Bangalore location IDs
  const mumbai    = await prisma.location.findFirst({ where: { city: { equals: 'Mumbai',    mode: 'insensitive' } } });
  const bangalore = await prisma.location.findFirst({ where: { city: { equals: 'Bangalore', mode: 'insensitive' } } });

  if (!mumbai || !bangalore) {
    console.error('Could not find Mumbai or Bangalore locations. Run the main seed first.');
    process.exit(1);
  }

  // Sample lead 1 — Mumbai homeowner
  const lead1 = await prisma.lead.upsert({
    where: { id: 'sample-lead-001' },
    update: {},
    create: {
      id:          'sample-lead-001',
      name:        'Priya Menon',
      phone:       '9876543201',
      email:       'priya.menon@example.com',
      requirement: '5kW Residential',
      budget:      '₹2L – ₹3L',
      urgency:     'normal',
      status:      'new',
      locationId:  mumbai.id,
    },
  });

  // Sample lead 2 — Bangalore urgent
  const lead2 = await prisma.lead.upsert({
    where: { id: 'sample-lead-002' },
    update: {},
    create: {
      id:          'sample-lead-002',
      name:        'Arjun Patel',
      phone:       '9988776655',
      email:       null,
      requirement: '10kW+ Residential',
      budget:      '₹5L – ₹10L',
      urgency:     'urgent',
      status:      'new',
      locationId:  bangalore.id,
    },
  });

  console.log('✓ Sample leads seeded:');
  console.log(' ', lead1.name, '—', mumbai.city);
  console.log(' ', lead2.name, '—', bangalore.city);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
