import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { city: 'asc' },
      take: 50,
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
