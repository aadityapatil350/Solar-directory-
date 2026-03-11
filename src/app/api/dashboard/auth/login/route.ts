import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email first
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check if claim is still pending approval
    if (user.role === 'pending_owner') {
      return NextResponse.json(
        { error: 'Your claim is under review. You will receive an email once approved by our team.' },
        { status: 403 },
      );
    }

    // Must be an owner
    if (user.role !== 'owner') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Get their listing
    const listing = await prisma.listing.findFirst({
      where: { userId: user.id },
    });

    // Create session
    const token = await createSession({
      userId: user.id,
      email: user.email,
      role: 'owner',
      listingId: listing?.id,
    });

    const cookieStore = await cookies();
    cookieStore.set('gsi_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Dashboard login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
