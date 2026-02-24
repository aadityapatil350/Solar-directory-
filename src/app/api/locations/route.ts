import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const locations = await prisma.location.findMany({
    orderBy: { city: 'asc' },
    take: 50,
  });

  return NextResponse.json(locations);
}
