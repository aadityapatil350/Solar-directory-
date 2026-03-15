import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all locations (no limit) - we have ~79 cities which is manageable
    const locations = await prisma.location.findMany({
      orderBy: { city: 'asc' },
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
