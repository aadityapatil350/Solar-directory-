import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const MIN_LISTINGS = 3;

export async function GET() {
  try {
    // Only surface cities that have real listings — thin/empty cities are hidden.
    const locations = await prisma.location.findMany({
      orderBy: { city: 'asc' },
      include: { _count: { select: { listings: true } } },
    });
    const visible = locations
      .filter((l) => l._count.listings >= MIN_LISTINGS)
      .map(({ _count, ...rest }) => rest);

    return NextResponse.json(visible);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
