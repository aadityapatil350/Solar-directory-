import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import { isAdmin } from '@/lib/auth-helpers'; // TODO: Uncomment after migration

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const locationId = searchParams.get('locationId');
    const query = searchParams.get('query');
    const verified = searchParams.get('verified');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};

    // TODO: Uncomment after running database migration
    // Hide test listings from non-admin users
    // const userIsAdmin = await isAdmin();
    // if (!userIsAdmin) {
    //   where.isTest = false;
    // }

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
        { phone: { contains: query, mode: 'insensitive' } },
        { location: { city: { contains: query, mode: 'insensitive' } } },
        { location: { state: { contains: query, mode: 'insensitive' } } },
        { category: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    const takeParam = searchParams.get('take');
    const take = takeParam ? Math.min(parseInt(takeParam), 5000) : 50;

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
      take,
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
