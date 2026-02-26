import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

const PLAN_DAYS: Record<string, number> = {
  featured: 30,
  premium: 30,
};

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !session.installerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await request.json();

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 });
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
  }

  // Upgrade installer subscription
  const days = PLAN_DAYS[plan] || 30;
  const subscriptionEnd = new Date();
  subscriptionEnd.setDate(subscriptionEnd.getDate() + days);

  await prisma.installer.update({
    where: { id: session.installerId },
    data: {
      subscriptionType: plan,
      paymentStatus: 'active',
      subscriptionEnd,
    },
  });

  // Upgrade their listing to featured if on featured/premium
  if (plan === 'featured' || plan === 'premium') {
    await prisma.listing.updateMany({
      where: { userId: session.userId },
      data: { featured: true },
    });
  }

  return NextResponse.json({
    success: true,
    message: `Subscription upgraded to ${plan} successfully!`,
    subscriptionEnd,
  });
}
