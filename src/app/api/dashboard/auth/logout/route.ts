import { NextResponse } from 'next/server';
import { COOKIE_NAME_EXPORT } from '@/lib/session';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME_EXPORT, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
