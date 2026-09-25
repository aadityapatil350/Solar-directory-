import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizeIndianPhone } from '@/lib/phone';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { listingId, name, phone, rating, reviewText, installationDate, systemSizeKw } = body;

    if (!listingId || typeof listingId !== 'string') {
      return NextResponse.json({ error: 'Valid listing ID is required' }, { status: 400 });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your full name' }, { status: 400 });
    }

    const cleanPhone = normalizeIndianPhone(phone);
    if (!cleanPhone.local || !cleanPhone.isMobile) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit Indian mobile number' }, { status: 400 });
    }

    const numRating = Number(rating);
    if (!numRating || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5 stars' }, { status: 400 });
    }

    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length < 15) {
      return NextResponse.json({ error: 'Review text must be at least 15 characters long' }, { status: 400 });
    }

    // Verify listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, name: true },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const review = await prisma.review.create({
      data: {
        listingId,
        name: name.trim(),
        phone: cleanPhone.local,
        rating: Math.round(numRating),
        reviewText: reviewText.trim(),
        installationDate: typeof installationDate === 'string' ? installationDate.trim() : null,
        systemSizeKw: typeof systemSizeKw === 'number' ? systemSizeKw : systemSizeKw ? parseFloat(systemSizeKw) : null,
        status: 'pending', // Requires admin moderation
      },
    });

    return NextResponse.json({
      success: true,
      id: review.id,
      message: 'Thank you for your review. It has been submitted for verification and will appear after moderation.',
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your review. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get('listingId');

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        listingId,
        status: 'approved',
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        rating: true,
        reviewText: true,
        installationDate: true,
        systemSizeKw: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
