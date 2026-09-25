import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/email';

const MAX_INSTALLERS_PER_LEAD = 3;

async function distributeToLocalInstallers(leadId: string, locationId: string | null, state?: string) {
  try {
    // 1. Find verified installers in the same city
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
          orderBy: { subscriptionType: 'desc' },
          take: MAX_INSTALLERS_PER_LEAD,
        })
      : [];

    // 2. If fewer than 3, fallback to state-level verified installers
    if (installers.length < MAX_INSTALLERS_PER_LEAD && state) {
      const existingIds = installers.map((i) => i.id);
      const stateInstallers = await prisma.installer.findMany({
        where: {
          verified: true,
          id: { notIn: existingIds },
          user: {
            listings: {
              some: {
                location: { state: { equals: state, mode: 'insensitive' } },
              },
            },
          },
        },
        orderBy: { subscriptionType: 'desc' },
        take: MAX_INSTALLERS_PER_LEAD - installers.length,
      });
      installers = [...installers, ...stateInstallers];
    }

    if (installers.length === 0) return;

    // Create LeadDelivery records
    await prisma.leadDelivery.createMany({
      data: installers.map((installer) => ({
        leadId,
        installerId: installer.id,
        status: 'pending',
        paid: false,
      })),
      skipDuplicates: true,
    });

    // Mark lead as assigned
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: 'assigned' },
    });
  } catch (err) {
    console.error('Solar lead distribution error:', err);
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, city, state, monthlyBill, systemSize, pincode, roofType, source } =
      await request.json();

    if (!name || !phone || !city) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, city' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid 10-digit phone number' },
        { status: 400 }
      );
    }

    // 1. Create SolarLead record
    const solarLead = await prisma.solarLead.create({
      data: {
        name: String(name).trim(),
        phone: cleanPhone,
        city: String(city).trim(),
        monthlyBill: Number(monthlyBill) || 0,
        systemSize: Number(systemSize) || 0,
      },
    });

    // 2. Resolve city location in Location table
    const location = await prisma.location.findFirst({
      where: {
        OR: [
          { city: { equals: String(city).trim(), mode: 'insensitive' } },
          { slug: { equals: String(city).toLowerCase().replace(/\s+/g, '-') } },
        ],
      },
    });

    // 3. Create core Lead record so it appears on admin & installer dashboards
    const requirementText = `[${source || 'Subsidy Calculator'}] ${systemSize || 3} kW System | Bill: ₹${monthlyBill || 'N/A'}/mo | Roof: ${roofType || 'RCC'} | Pincode: ${pincode || 'N/A'}`;

    const lead = await prisma.lead.create({
      data: {
        name: String(name).trim(),
        phone: cleanPhone,
        requirement: requirementText,
        locationId: location?.id || null,
        budget: monthlyBill ? `Bill ₹${monthlyBill}/mo` : null,
        urgency: 'high',
      },
    });

    // 4. Distribute to up to 2-3 verified local vendors per city
    distributeToLocalInstallers(lead.id, location?.id || null, state || location?.state);

    return NextResponse.json({
      success: true,
      leadId: solarLead.id,
      message: `Up to 3 verified installers serving ${city} will provide quotes within 24 hours.`,
    });
  } catch (error) {
    console.error('Error creating solar lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    );
  }
}
