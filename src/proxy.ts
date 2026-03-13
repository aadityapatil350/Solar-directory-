import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/dashboard')) return NextResponse.next();

  // Public dashboard pages (no auth required)
  if (pathname === '/dashboard/login') return NextResponse.next();
  if (pathname === '/dashboard/forgot-password') return NextResponse.next();
  if (pathname === '/dashboard/reset-password') return NextResponse.next();

  const token = request.cookies.get('gsi_session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  const session = await verifySession(token);
  if (!session || session.role !== 'owner') {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
