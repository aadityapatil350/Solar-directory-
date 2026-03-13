import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await prisma.listing.findFirst({
      where: { userId: session.userId },
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

    const existing = await prisma.listing.findFirst({
      where: { userId: session.userId },
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
