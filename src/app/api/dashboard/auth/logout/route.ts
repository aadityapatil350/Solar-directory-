import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('gsi_session');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Dashboard logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
