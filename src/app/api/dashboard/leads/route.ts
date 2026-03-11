import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

function maskPhone(phone: string): string {
  if (phone.length <= 5) return phone;
  return phone.slice(0, 5) + '*****';
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await prisma.listing.findFirst({
      where: { userId: session.userId },
      include: { location: true },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const leads = await prisma.lead.findMany({
      where: {
        locationId: listing.locationId,
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { location: true },
    });

    const isFeatured = listing.featured;

    const maskedLeads = leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      phone: isFeatured ? lead.phone : maskPhone(lead.phone),
      email: isFeatured ? lead.email : null,
      requirement: lead.requirement,
      budget: lead.budget,
      city: lead.location?.city,
      createdAt: lead.createdAt,
      phoneMasked: !isFeatured,
    }));

    return NextResponse.json({ leads: maskedLeads, isFeatured });
  } catch (error) {
    console.error('Dashboard leads GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
