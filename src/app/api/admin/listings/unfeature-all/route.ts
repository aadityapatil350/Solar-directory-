import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/verify-admin';

// POST /api/admin/listings/unfeature-all — set featured=false on all listings
export async function POST(request: Request) {
  try {
    const session = await verifyAdmin(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await prisma.listing.updateMany({
      where: { featured: true },
      data: { featured: false },
    });

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `Removed featured status from ${result.count} listing${result.count !== 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Error unfeaturing all listings:', error);
    return NextResponse.json({ error: 'Failed to unfeature listings' }, { status: 500 });
  }
}
