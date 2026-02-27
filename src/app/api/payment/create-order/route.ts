import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

const PLANS: Record<string, { amount: number; label: string; days: number }> = {
  featured: { amount: 99900, label: 'Featured Plan', days: 30 },   // ₹999 in paise
  premium:  { amount: 249900, label: 'Premium Plan', days: 30 },   // ₹2499 in paise
};

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !session.installerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { plan } = await request.json();
  const planData = PLANS[plan];
  if (!planData) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  // Check Razorpay keys are configured
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 });
  }

  try {
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const installer = await prisma.installer.findUnique({
      where: { id: session.installerId },
    });
    if (!installer) {
      return NextResponse.json({ error: 'Installer not found' }, { status: 404 });
    }

    const order = await razorpay.orders.create({
      amount: planData.amount,
      currency: 'INR',
      receipt: `gsi_${session.installerId}_${Date.now()}`,
      notes: {
        installerId: session.installerId,
        plan,
        installerEmail: installer.email,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: planData.amount,
      currency: 'INR',
      plan,
      planLabel: planData.label,
      keyId,
      prefill: {
        name: installer.companyName,
        email: installer.email,
        contact: installer.phone,
      },
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
