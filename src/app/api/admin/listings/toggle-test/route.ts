import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth-helpers';

export async function POST(request: Request) {
  try {
    // Check if user is admin
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { listingId, isTest } = body;

    if (!listingId || typeof isTest !== 'boolean') {
      return NextResponse.json(
        { error: 'listingId and isTest (boolean) are required' },
        { status: 400 }
      );
    }

    // Update the listing
    const updated = await prisma.listing.update({
      where: { id: listingId },
      data: { isTest },
      select: {
        id: true,
        name: true,
        isTest: true,
        slug: true,
      },
    });

    return NextResponse.json({
      success: true,
      listing: updated,
      message: `Listing ${isTest ? 'marked as test' : 'unmarked as test'}`,
    });
  } catch (error: any) {
    console.error('Error toggling test status:', error);
    return NextResponse.json(
      { error: 'Failed to update listing', details: error.message },
      { status: 500 }
    );
  }
}

// Get all test listings (admin only)
export async function GET() {
  try {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const testListings = await prisma.listing.findMany({
      where: { isTest: true },
      include: {
        category: true,
        location: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      count: testListings.length,
      listings: testListings,
    });
  } catch (error: any) {
    console.error('Error fetching test listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test listings', details: error.message },
      { status: 500 }
    );
  }
}
