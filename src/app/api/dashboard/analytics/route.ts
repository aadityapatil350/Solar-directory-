import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await prisma.listing.findFirst({
      where: { userId: session.userId },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Count WhatsApp clicks for this listing (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const whatsappClicks = await prisma.whatsAppClick.count({
      where: {
        listingId: listing.id,
        timestamp: { gte: thirtyDaysAgo },
      },
    });

    // Count leads (enquiries) for this listing's location (last 30 days)
    const enquiries = listing.locationId
      ? await prisma.lead.count({
          where: {
            locationId: listing.locationId,
            createdAt: { gte: thirtyDaysAgo },
          },
        })
      : 0;

    return NextResponse.json({
      views: listing.views,
      whatsappClicks,
      enquiries,
    });
  } catch (error) {
    console.error('Dashboard analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
