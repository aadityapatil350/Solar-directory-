import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/verify-admin';

// GET all installers
export async function GET(request: Request) {
  try {
    const session = await verifyAdmin(request);
    if (!session) {
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
      verifiedInstallers: installers.filter((i: typeof installers[0]) => i.verified).length,
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
