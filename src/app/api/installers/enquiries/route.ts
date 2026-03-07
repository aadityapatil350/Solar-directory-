import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET endpoint to fetch enquiry counts for installers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
    }

    // Find installers in the given city
    const installers = await prisma.installer.findMany({
      where: {
        verified: true,
        user: {
          listings: {
            some: { location: { city: { equals: city, mode: 'insensitive' } } },
          },
        },
      },
      select: {
        id: true,
        companyName: true,
        enquiryCount: true,
        enquiryCountResetAt: true,
      },
    });

    return NextResponse.json(installers);
  } catch (error) {
    console.error('Error fetching installer enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
