import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gosolarindex.in';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Always return success to avoid email enumeration
    if (!user || (user.role !== 'owner' && user.role !== 'installer')) {
      return NextResponse.json({ success: true });
    }

    // Invalidate any existing tokens
    await prisma.passwordResetToken.updateMany({
      where: { email: user.email, used: false },
      data: { used: true },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    await prisma.passwordResetToken.create({
      data: { email: user.email, token, expiresAt },
    });

    const resetUrl = `${APP_URL}/dashboard/reset-password?token=${token}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
