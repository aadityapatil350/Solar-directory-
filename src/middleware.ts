import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Enforce non-www canonical domain
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = hostname.replace('www.', '');
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Dashboard auth protection
  if (!pathname.startsWith('/dashboard')) return NextResponse.next();
  if (pathname === '/dashboard/login') return NextResponse.next();
  if (pathname === '/dashboard/forgot-password') return NextResponse.next();
  if (pathname === '/dashboard/reset-password') return NextResponse.next();

  const token = request.cookies.get('gsi_session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  const session = await verifySession(token);
  if (!session || (session.role !== 'owner' && session.role !== 'admin')) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)',
  ],
};
