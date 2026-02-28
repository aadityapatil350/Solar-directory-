/**
 * Seeds 8 realistic Indian leads into the database.
 * Run: npx tsx scripts/seed-leads.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch real locations from DB
  const locations = await prisma.location.findMany({ take: 20 });
  const byCity = (city: string) =>
    locations.find((l) => l.city.toLowerCase().includes(city.toLowerCase()));

  const leads = [
    {
      name: 'Suresh Mehta',
      phone: '9876543210',
      email: 'suresh.mehta@gmail.com',
      requirement: '5kW rooftop solar for my home in Andheri',
      budget: '₹2–3 lakh',
      urgency: 'normal',
      status: 'new',
      locationId: byCity('Mumbai')?.id ?? null,
    },
    {
      name: 'Priya Sharma',
      phone: '9812345678',
      email: 'priya.sharma@yahoo.com',
      requirement: '10kW commercial solar for our factory',
      budget: '₹5–8 lakh',
      urgency: 'urgent',
      status: 'new',
      locationId: byCity('Delhi')?.id ?? null,
    },
    {
      name: 'Rahul Desai',
      phone: '9654321098',
      email: null,
      requirement: 'Solar water heater + 3kW panel system',
      budget: '₹1–1.5 lakh',
      urgency: 'normal',
      status: 'assigned',
      locationId: byCity('Pune')?.id ?? null,
    },
    {
      name: 'Anjali Nair',
      phone: '9745678901',
      email: 'anjali.nair@outlook.com',
      requirement: 'AMC service for existing 4kW system',
      budget: '₹15,000/year',
      urgency: 'normal',
      status: 'contacted',
      locationId: byCity('Bangalore')?.id ?? null,
    },
    {
      name: 'Mohammed Irfan',
      phone: '9988776655',
      email: null,
      requirement: '3kW residential solar with battery backup',
      budget: '₹2–2.5 lakh',
      urgency: 'urgent',
      status: 'new',
      locationId: byCity('Hyderabad')?.id ?? null,
    },
    {
      name: 'Kavitha Reddy',
      phone: '9321456780',
      email: 'kavitha.reddy@gmail.com',
      requirement: 'Need solar for 3BHK apartment, interested in subsidy',
      budget: '₹1.5–2 lakh',
      urgency: 'normal',
      status: 'new',
      locationId: byCity('Chennai')?.id ?? null,
    },
    {
      name: 'Arjun Singh',
      phone: '9567890123',
      email: 'arjun.singh@business.com',
      requirement: '50kW ground-mount solar for warehouse',
      budget: '₹20–25 lakh',
      urgency: 'urgent',
      status: 'assigned',
      locationId: byCity('Ahmedabad')?.id ?? null,
    },
    {
      name: 'Deepa Verma',
      phone: '9234567812',
      email: 'deepa.verma@gmail.com',
      requirement: 'Solar panel dealer for bulk purchase (20 units)',
      budget: '₹10–12 lakh',
      urgency: 'normal',
      status: 'new',
      locationId: byCity('Jaipur')?.id ?? null,
    },
  ];

  let created = 0;
  for (const lead of leads) {
    await prisma.lead.create({ data: lead });
    created++;
    console.log(`  ✅ Created lead: ${lead.name}`);
  }

  console.log(`\n✅ Seeded ${created} leads successfully!`);
}

main()
  .catch((e) => { console.error('❌ Error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
