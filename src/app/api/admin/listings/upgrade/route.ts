import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/verify-admin';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// POST /api/admin/listings/upgrade
// Body: { listingId, months } — months = 0 means downgrade (remove featured)
export async function POST(request: Request) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { listingId, months } = await request.json();

  if (!listingId || months === undefined || months === null) {
    return NextResponse.json({ error: 'listingId and months are required' }, { status: 400 });
  }

  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  if (months === 0) {
    // Downgrade — remove featured
    const updated = await prisma.listing.update({
      where: { id: listingId },
      data: { featured: false, premiumExpiresAt: null },
    });
    revalidateTag('listings', 'max');
    revalidateTag('homepage', 'max');
    return NextResponse.json({ success: true, listing: updated, action: 'downgraded' });
  }

  // Upgrade — set featured + expiry
  // If already featured, extend from current expiry; otherwise start from now
  const base = listing.premiumExpiresAt && listing.premiumExpiresAt > new Date()
    ? listing.premiumExpiresAt
    : new Date();

  const expiresAt = new Date(base);
  expiresAt.setMonth(expiresAt.getMonth() + months);

  const updated = await prisma.listing.update({
    where: { id: listingId },
    data: { featured: true, premiumExpiresAt: expiresAt },
    include: { category: true, location: true },
  });

  revalidateTag('listings', 'max');
  revalidateTag('homepage', 'max');
  return NextResponse.json({ success: true, listing: updated, expiresAt, action: 'upgraded' });
}
