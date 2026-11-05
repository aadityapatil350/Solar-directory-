import { NextRequest, NextResponse } from 'next/server';
import { verifySession, COOKIE_NAME_EXPORT } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Enforce non-www canonical domain
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = hostname.replace('www.', '');
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  const token = request.cookies.get(COOKIE_NAME_EXPORT)?.value;

  // ── 1. Admin API Protection ──
  if (pathname.startsWith('/api/admin')) {
    if (pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySession(token);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  }

  // ── 2. Admin Blogs Protection (/admin/blogs and subpages) ──
  if (pathname.startsWith('/admin/blogs')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    const session = await verifySession(token);
    if (!session || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  }

  // ── 3. Dashboard Auth Protection ──
  if (pathname.startsWith('/dashboard')) {
    if (
      pathname === '/dashboard/login' ||
      pathname === '/dashboard/forgot-password' ||
      pathname === '/dashboard/reset-password'
    ) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }

    const session = await verifySession(token);
    if (!session || (session.role !== 'owner' && session.role !== 'admin')) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)',
  ],
};
