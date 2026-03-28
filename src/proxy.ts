import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // PRIORITY 1: Enforce non-www canonical domain (gosolarindex.in)
  // If request comes from www.gosolarindex.in, redirect to gosolarindex.in
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = hostname.replace('www.', '');
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Handle redirects for old URLs to prevent 404s in GSC
  // Redirect /locations/{slug} to /{city-name}
  if (pathname.startsWith('/locations/')) {
    const slug = pathname.replace('/locations/', '');
    // Extract city name from slug (e.g., "salem-tamil-nadu" -> "salem")
    const cityName = slug.split('-').slice(0, -2).join('-') || slug.split('-')[0];
    return NextResponse.redirect(new URL(`/${cityName}`, request.url), 301);
  }

  // REMOVED: Don't redirect listing pages - they need to work!
  // if (pathname.startsWith('/listing/')) {
  //   return NextResponse.redirect(new URL('/', request.url), 301);
  // }

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
  // Allow both 'owner' and 'admin' roles to access dashboard
  if (!session || (session.role !== 'owner' && session.role !== 'admin')) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg (icons)
     * - public assets (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)',
  ],
};
