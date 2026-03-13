import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use listingId from session directly — never rely on findFirst which can return wrong listing
    if (!session.listingId) {
      return NextResponse.json({ error: 'No listing linked to your account. Please contact support.' }, { status: 404 });
    }

    const listing = await prisma.listing.findFirst({
      where: { id: session.listingId, userId: session.userId }, // both must match
      include: {
        category: true,
        location: true,
        images: { orderBy: { order: 'asc' } },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ listing });
  } catch (error) {
    console.error('Dashboard listing GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Only allow specific fields to be updated
    const allowedFields = ['name', 'phone', 'email', 'website', 'address', 'description', 'youtubeUrl', 'serviceTags'];
    const updateData: Record<string, string> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (!session.listingId) {
      return NextResponse.json({ error: 'No listing linked to your account.' }, { status: 404 });
    }

    const existing = await prisma.listing.findFirst({
      where: { id: session.listingId, userId: session.userId }, // both must match
    });
    if (!existing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const updated = await prisma.listing.update({
      where: { id: existing.id },
      data: updateData,
      include: {
        category: true,
        location: true,
        images: { orderBy: { order: 'asc' } },
      },
    });

    return NextResponse.json({ listing: updated });
  } catch (error) {
    console.error('Dashboard listing PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
  }
}
