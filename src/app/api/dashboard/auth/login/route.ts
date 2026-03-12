import { prisma } from '@/lib/prisma';
import { createSession, COOKIE_NAME_EXPORT } from '@/lib/session';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.role === 'pending_owner') {
      return NextResponse.json(
        { error: 'Your claim is under review. You will receive an email once approved by our team.' },
        { status: 403 },
      );
    }

    if (user.role !== 'owner') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const listing = await prisma.listing.findFirst({ where: { userId: user.id } });

    const token = await createSession({
      userId: user.id,
      email: user.email,
      role: 'owner',
      listingId: listing?.id,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME_EXPORT, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Dashboard login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
