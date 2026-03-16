import { config } from 'dotenv';
config({ path: '.env.local' });

import { prisma } from '../src/lib/prisma';

async function check() {
  const all = await prisma.listing.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      verified: true,
      featured: true,
      category: { select: { name: true } },
      location: { select: { city: true } }
    }
  });

  console.log('Total listings:', all.length);

  // Group by phone
  const byPhone = new Map<string, typeof all>();
  all.forEach(l => {
    if (l.phone) {
      const key = l.phone.replace(/\s+/g, '');
      const existing = byPhone.get(key);
      if (!existing) {
        byPhone.set(key, []);
      }
      byPhone.get(key)?.push(l);
    }
  });

  const phoneDupes = Array.from(byPhone.entries()).filter(([_, arr]) => arr.length > 1);
  console.log('\nDuplicate phone numbers:', phoneDupes.length);
  phoneDupes.forEach(([phone, listings]) => {
    console.log('\n📞', phone, '- Listings:', listings.length);
    listings.forEach(l => console.log('  -', l.name, '|', l.location.city, '|', l.category.name));
  });

  // Group by name
  const byName = new Map<string, typeof all>();
  all.forEach(l => {
    const key = l.name.toLowerCase().trim();
    const existing = byName.get(key);
    if (!existing) {
      byName.set(key, []);
    }
    byName.get(key)?.push(l);
  });

  const nameDupes = Array.from(byName.entries()).filter(([_, arr]) => arr.length > 1);
  console.log('\nDuplicate names:', nameDupes.length);
  nameDupes.forEach(([name, listings]) => {
    console.log('\n🏢', listings[0].name, '- Listings:', listings.length);
    listings.forEach(l => console.log('  -', l.id.slice(0, 8), '|', l.location.city, '|', l.category.name, '|', l.phone || 'no phone'));
  });

  await prisma.$disconnect();
}

check().catch(console.error);
