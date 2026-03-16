import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
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

    const phoneDupes = Array.from(byPhone.entries())
      .filter(([_, arr]) => arr.length > 1)
      .map(([phone, listings]) => ({ phone, listings }));

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

    const nameDupes = Array.from(byName.entries())
      .filter(([_, arr]) => arr.length > 1)
      .map(([name, listings]) => ({ name: listings[0].name, listings }));

    return NextResponse.json({
      totalListings: all.length,
      duplicatePhones: phoneDupes.length,
      duplicateNames: nameDupes.length,
      phoneDetails: phoneDupes,
      nameDetails: nameDupes,
    });
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return NextResponse.json({ error: 'Failed to check duplicates' }, { status: 500 });
  }
}
