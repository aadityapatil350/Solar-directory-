import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith('/dashboard');
  const isInstallerDashboard = pathname.startsWith('/installers/dashboard');

  if (!isDashboard && !isInstallerDashboard) return NextResponse.next();

  const token = request.cookies.get('gsi_session')?.value;

  if (isDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
    const session = await verifySession(token);
    if (!session || session.role !== 'owner') {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
  }

  if (isInstallerDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL('/installers/login', request.url));
    }
    const session = await verifySession(token);
    if (!session || (session.role !== 'installer' && session.role !== 'admin')) {
      return NextResponse.redirect(new URL('/installers/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/installers/dashboard/:path*', '/dashboard/:path*'],
};
