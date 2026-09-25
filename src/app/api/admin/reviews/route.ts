import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function verifyAuth(request: Request): Promise<{ success: boolean; user?: any }> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false };
  }
  const password = authHeader.substring(7);
  const user = await prisma.user.findUnique({
    where: { email: 'adityabiz350@gmail.com', role: 'admin' },
  });
  if (!user || !user.password) return { success: false };
  if (!await bcrypt.compare(password, user.password)) return { success: false };
  return { success: true, user };
}

export async function GET(request: NextRequest) {
  try {
    const { success } = await verifyAuth(request);
    if (!success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    const reviews = await prisma.review.findMany({
      where: status ? { status } : undefined,
      include: {
        listing: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Admin reviews GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { success } = await verifyAuth(request);
    if (!success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (error) {
    console.error('Admin reviews PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}
