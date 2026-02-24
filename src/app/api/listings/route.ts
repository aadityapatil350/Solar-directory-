import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const locationId = searchParams.get('locationId');
  const query = searchParams.get('query');
  const verified = searchParams.get('verified');
  const featured = searchParams.get('featured');

  const where: Record<string, unknown> = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (locationId) {
    where.locationId = locationId;
  }

  if (verified === 'true') {
    where.verified = true;
  }

  if (featured === 'true') {
    where.featured = true;
  }

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { address: { contains: query, mode: 'insensitive' } },
    ];
  }

  const listings = await prisma.listing.findMany({
    where,
    include: {
      category: true,
      location: true,
    },
    orderBy: [
      { featured: 'desc' },
      { verified: 'desc' },
      { rating: 'desc' },
    ],
    take: 50,
  });

  return NextResponse.json(listings);
}
