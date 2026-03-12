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

    const data = JSON.parse(otpRecord.data) as {
      name: string;
      email: string;
      phone: string;
      password: string;
      listingId: string;
    };

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    let user;

    if (existingUser) {
      // Only allow re-claim if the account was previously demoted (role='user')
      // This happens when admin deletes a claim — user account stays but role is reset to 'user'
      if (existingUser.role === 'pending_owner') {
        return NextResponse.json(
          { error: 'You already have a pending claim under review. Please wait for admin approval.' },
          { status: 409 },
        );
      }
      if (existingUser.role === 'owner') {
        return NextResponse.json(
          { error: 'This email already has an owner account. Please login at /dashboard/login.' },
          { status: 409 },
        );
      }
      if (existingUser.role === 'admin') {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
      // role === 'user': previously claimed but admin deleted it — allow re-claim
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: data.name,
          password: hashedPassword,
          role: 'pending_owner',
        },
      });
    } else {
      // New user — create account
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          role: 'pending_owner',
        },
      });
    }

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

    return NextResponse.json({ success: true, status: 'pending' });
  } catch (error) {
    console.error('Claim verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
