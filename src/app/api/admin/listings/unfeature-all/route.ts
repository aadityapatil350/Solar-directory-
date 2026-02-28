import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function verifyAuth(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;

  const password = authHeader.substring(7);
  const user = await prisma.user.findUnique({
    where: { email: 'aadityabiz350@gmail.com', role: 'admin' },
  });

  if (!user?.password) return false;
  return bcrypt.compare(password, user.password);
}

// POST /api/admin/listings/unfeature-all — set featured=false on all listings
export async function POST(request: Request) {
  try {
    const ok = await verifyAuth(request);
    if (!ok) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await prisma.listing.updateMany({
      where: { featured: true },
      data: { featured: false },
    });

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `Removed featured status from ${result.count} listing${result.count !== 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Error unfeaturing all listings:', error);
    return NextResponse.json({ error: 'Failed to unfeature listings' }, { status: 500 });
  }
}
