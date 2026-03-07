import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { listingId, city } = await request.json();

    if (!listingId || !city) {
      return NextResponse.json(
        { error: 'Missing required fields: listingId, city' },
        { status: 400 }
      );
    }

    // Track the WhatsApp click
    await prisma.whatsAppClick.create({
      data: {
        listingId,
        city,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking WhatsApp click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}
