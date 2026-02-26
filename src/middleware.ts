import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

const PROTECTED = ['/installers/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('gsi_session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/installers/login', request.url));
  }

  const session = await verifySession(token);
  if (!session || (session.role !== 'installer' && session.role !== 'admin')) {
    return NextResponse.redirect(new URL('/installers/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/installers/dashboard/:path*'],
};
