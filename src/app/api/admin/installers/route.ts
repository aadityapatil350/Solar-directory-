import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function verifyAuth(request: Request): Promise<{ success: boolean; user?: any }> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false };
  }

  const password = authHeader.substring(7);

  const user = await prisma.user.findUnique({
    where: {
      email: 'aadityabiz350@gmail.com',
      role: 'admin',
    },
  });

  if (!user || !user.password) {
    return { success: false };
  }

  if (!await bcrypt.compare(password, user.password)) {
    return { success: false };
  }

  return { success: true, user };
}

// GET all installers
export async function GET(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const installers = await prisma.installer.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });

    const stats = {
      totalInstallers: installers.length,
      verifiedInstallers: installers.filter((i) => i.verified).length,
    };

    return NextResponse.json({
      installers,
      stats,
    });
  } catch (error) {
    console.error('Error fetching installers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch installers' },
      { status: 500 }
    );
  }
}
