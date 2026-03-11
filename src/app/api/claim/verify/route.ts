import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, otp, listingId } = await request.json();

    if (!email || !otp || !listingId) {
      return NextResponse.json({ error: 'email, otp and listingId are required' }, { status: 400 });
    }

    // Find OTP record
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        email,
        otp,
        listingId,
        expiresAt: { gte: new Date() },
      },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Parse stored data
    const data = JSON.parse(otpRecord.data) as {
      name: string;
      email: string;
      phone: string;
      password: string;
      listingId: string;
    };

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered. Please login.' },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user with pending role — will be upgraded to 'owner' on admin approval
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: 'pending_owner',
      },
    });

    // Create ClaimRequest with status='pending' — admin must approve
    await prisma.claimRequest.create({
      data: {
        listingId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: 'pending',
        installerId: null,
      },
    });

    // Delete OTP record
    await prisma.otpVerification.delete({ where: { id: otpRecord.id } });

    // Do NOT create session or link listing yet — admin must approve first
    return NextResponse.json({ success: true, status: 'pending' });
  } catch (error) {
    console.error('Claim verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
