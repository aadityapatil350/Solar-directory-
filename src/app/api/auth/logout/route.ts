import { COOKIE_NAME_EXPORT } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME_EXPORT, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  return response;
}
