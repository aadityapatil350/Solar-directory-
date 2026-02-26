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

    const user = await prisma.user.findUnique({
      where: { email },
      include: { installer: true },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Support both bcrypt hashed and legacy plain-text passwords
    let passwordMatch = false;
    if (user.password.startsWith('$2')) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = user.password === password;
      // Upgrade to bcrypt on successful plain-text login
      if (passwordMatch) {
        const hashed = await bcrypt.hash(password, 10);
        await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
      }
    }

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.role !== 'installer' && user.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const token = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      installerId: user.installer?.id,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        installerId: user.installer?.id,
      },
    });

    response.cookies.set(COOKIE_NAME_EXPORT, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
