import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, phone, email, requirement, locationId, budget, urgency } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits for India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim(),
        requirement: requirement?.trim(),
        locationId,
        budget,
        urgency: urgency || 'normal',
      },
      include: {
        location: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Our solar experts will contact you soon.',
        lead: {
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        location: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
