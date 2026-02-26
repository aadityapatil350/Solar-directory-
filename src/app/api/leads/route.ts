import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// How many verified installers to notify per lead
const MAX_INSTALLERS_PER_LEAD = 3;

async function distributeLeadToInstallers(leadId: string, locationId: string | null) {
  try {
    // Find verified installers in the same location
    let installers = locationId
      ? await prisma.installer.findMany({
          where: {
            verified: true,
            user: {
              listings: {
                some: { locationId },
              },
            },
          },
          orderBy: { subscriptionType: 'desc' }, // premium first
          take: MAX_INSTALLERS_PER_LEAD,
        })
      : [];

    // If not enough city-level installers, top up with any verified installers
    if (installers.length < MAX_INSTALLERS_PER_LEAD) {
      const existingIds = installers.map((i) => i.id);
      const extra = await prisma.installer.findMany({
        where: {
          verified: true,
          id: { notIn: existingIds },
        },
        orderBy: { subscriptionType: 'desc' },
        take: MAX_INSTALLERS_PER_LEAD - installers.length,
      });
      installers = [...installers, ...extra];
    }

    if (installers.length === 0) return;

    // Create LeadDelivery records for each installer
    await prisma.leadDelivery.createMany({
      data: installers.map((installer) => ({
        leadId,
        installerId: installer.id,
        status: 'pending',
        paid: false,
      })),
      skipDuplicates: true,
    });

    // Update lead status to 'assigned'
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: 'assigned' },
    });
  } catch (err) {
    // Non-fatal — lead is still saved even if distribution fails
    console.error('Lead distribution error:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, requirement, locationId, budget, urgency } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(phone) && phone !== '0000000000') {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        requirement: requirement?.trim() || null,
        locationId: locationId || null,
        budget: budget || null,
        urgency: urgency || 'normal',
      },
    });

    // Distribute lead to verified installers (async, non-blocking)
    distributeLeadToInstallers(lead.id, locationId);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Our solar experts will contact you soon.',
        lead: { id: lead.id, name: lead.name, phone: lead.phone },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to submit request. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const leads = await prisma.lead.findMany({
      where,
      include: { location: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
