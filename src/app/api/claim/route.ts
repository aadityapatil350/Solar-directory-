import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { listingId, name, email, phone, message } = await request.json();

    if (!listingId || !name || !email || !phone) {
      return NextResponse.json({ error: 'listingId, name, email and phone are required' }, { status: 400 });
    }

    // Check listing exists
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 });

    // Check no pending/approved claim already
    const existing = await prisma.claimRequest.findFirst({
      where: { listingId, status: { in: ['pending', 'approved'] } },
    });
    if (existing) {
      return NextResponse.json({ error: 'A claim is already pending or approved for this listing.' }, { status: 409 });
    }

    const claim = await prisma.claimRequest.create({
      data: { listingId, name, email, phone, message: message || null },
    });

    return NextResponse.json({ success: true, claim }, { status: 201 });
  } catch (error) {
    console.error('Claim POST error:', error);
    return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 });
  }
}
