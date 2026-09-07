import { NextResponse } from 'next/server';
import { COOKIE_NAME_EXPORT } from '@/lib/session';

function clearCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME_EXPORT, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearCookie(response);
  return response;
}

// GET — used when navigating directly to the logout URL (e.g. links, browser bar)
export async function GET() {
  const response = NextResponse.redirect(
    new URL('/dashboard/login', process.env.NEXT_PUBLIC_APP_URL || 'https://gosolarindex.in'),
  );
  clearCookie(response);
  return response;
}
