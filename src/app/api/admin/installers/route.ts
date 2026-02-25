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

  if (user.password !== password) {
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

// POST verify installer
export async function POST(request: Request) {
  try {
    const { success } = await verifyAuth(request);

    if (!success) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { installerId } = body;

    if (!installerId) {
      return NextResponse.json(
        { error: 'Installer ID is required' },
        { status: 400 }
      );
    }

    const installer = await prisma.installer.findUnique({
      where: { id: installerId },
    });

    if (!installer) {
      return NextResponse.json(
        { error: 'Installer not found' },
        { status: 404 }
      );
    }

    await prisma.installer.update({
      where: { id: installerId },
      data: { verified: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Installer verified successfully',
      installer,
    });
  } catch (error) {
    console.error('Error verifying installer:', error);
    return NextResponse.json(
      { error: 'Failed to verify installer' },
      { status: 500 }
    );
  }
}
