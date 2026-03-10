import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find all listings with the same name and location
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });

    if (!listing) {
      return NextResponse.json({ categories: [] });
    }

    // Find all categories this company is listed in
    const allListings = await prisma.listing.findMany({
      where: {
        name: listing.name,
        locationId: listing.locationId,
      },
      include: {
        category: true,
      },
      distinct: ['categoryId'],
    });

    const categories = allListings.map((l) => l.category);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ categories: [] });
  }
}
