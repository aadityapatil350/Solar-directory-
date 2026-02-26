import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function verifyAuth(request: Request): Promise<{ success: boolean; user?: any }> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false };
  }

  const password = authHeader.substring(7); // Remove 'Bearer ' prefix

  // Look up admin user from database
  const user = await prisma.user.findUnique({
    where: {
      email: 'aadityabiz350@gmail.com',
      role: 'admin',
    },
  });

  if (!user || !user.password) {
    return { success: false };
  }

  // Validate password
  if (!await bcrypt.compare(password, user.password)) {
    return { success: false };
  }

  return { success: true, user };
}

export async function GET(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        location: true,
        leadDeliveries: {
          include: {
            installer: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    // Get stats
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({ where: { status: 'new' } });
    const assignedLeads = await prisma.lead.count({ where: { status: 'assigned' } });
    const contactedLeads = await prisma.lead.count({ where: { status: 'contacted' } });
    const closedLeads = await prisma.lead.count({ where: { status: "closed" } });

    return NextResponse.json({
      leads,
      stats: {
        total: totalLeads,
        new: newLeads,
        assigned: assignedLeads,
        contacted: contactedLeads,
        closed: closedLeads,
      },
      adminUser: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error fetching admin leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { leadId, status, installerId } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Update lead status
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: status,
      },
    });

    // If installerId provided, assign lead to installer
    if (installerId) {
      // Check if lead already delivered to this installer
      const existingDelivery = await prisma.leadDelivery.findFirst({
        where: {
          leadId,
          installerId,
        },
      });

      if (!existingDelivery) {
        // Create lead delivery
        await prisma.leadDelivery.create({
          data: {
            leadId,
            installerId,
            status: 'pending',
            price: 50, // Default price for basic lead (you can adjust)
            paid: false,
          },
        });

        // Update lead status to assigned
        await prisma.lead.update({
          where: { id: leadId },
          data: { status: 'assigned' },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully',
      lead: updatedLead,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    await prisma.lead.delete({
      where: { id: leadId },
    });

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
