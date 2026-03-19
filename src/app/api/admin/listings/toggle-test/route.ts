import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth-helpers';

/**
 * API Route for toggling test listings
 *
 * NOTE: This route is DISABLED until database migration is complete.
 * See MIGRATION_REQUIRED.md for details.
 *
 * To enable after migration:
 * 1. Uncomment isTest field in prisma/schema.prisma
 * 2. Run database migration
 * 3. Uncomment all code below and delete the disabled versions
 */

export async function POST(_request: Request) {
  return NextResponse.json(
    {
      error: 'Test listings feature is disabled pending database migration',
      message: 'See MIGRATION_REQUIRED.md for details',
    },
    { status: 503 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Test listings feature is disabled pending database migration',
      message: 'See MIGRATION_REQUIRED.md for details',
    },
    { status: 503 }
  );
}

/* eslint-disable */
/*
// ENABLED VERSION - Uncomment after migration:

export async function POST(request: Request) {
  try {
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
*/
/* eslint-enable */
