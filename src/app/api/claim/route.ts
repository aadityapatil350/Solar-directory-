import { prisma } from '@/lib/prisma';
import { sendOtpEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { listingId, name, email, phone, password } = await request.json();

    if (!listingId || !name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'listingId, name, email, phone and password are required' },
        { status: 400 },
      );
    }

    // Check listing exists
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Check if already claimed
    if (listing.userId) {
      return NextResponse.json(
        { error: 'This listing has already been claimed.' },
        { status: 409 },
      );
    }

    // Prevent spam: check if OTP was sent in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentOtp = await prisma.otpVerification.findFirst({
      where: {
        email,
        listingId,
        createdAt: { gte: fiveMinutesAgo },
      },
    });
    if (recentOtp) {
      return NextResponse.json(
        { error: 'An OTP was already sent to this email. Please wait 5 minutes before requesting again.' },
        { status: 429 },
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store OTP record
    await prisma.otpVerification.create({
      data: {
        email,
        otp,
        listingId,
        data: JSON.stringify({ name, email, phone, password, listingId }),
        expiresAt,
      },
    });

    // Send OTP email
    await sendOtpEmail(email, otp, listing.name);

    return NextResponse.json({ success: true, email });
  } catch (error) {
    console.error('Claim POST error:', error);
    return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 });
  }
}
