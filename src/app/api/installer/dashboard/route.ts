import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();

  if (!session || !session.installerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const installer = await prisma.installer.findUnique({
    where: { id: session.installerId },
    include: {
      user: { select: { name: true, email: true } },
      leadDeliveries: {
        include: {
          lead: {
            include: { location: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  });

  if (!installer) {
    return NextResponse.json({ error: 'Installer not found' }, { status: 404 });
  }

  const listing = await prisma.listing.findFirst({
    where: { userId: session.userId },
    include: { category: true, location: true },
  });

  const totalLeads = installer.leadDeliveries.length;
  const newLeads = installer.leadDeliveries.filter((ld) => ld.status === 'pending').length;
  const openedLeads = installer.leadDeliveries.filter((ld) => ld.status !== 'pending').length;

  return NextResponse.json({
    installer: {
      id: installer.id,
      companyName: installer.companyName,
      contactPerson: installer.contactPerson,
      email: installer.email,
      phone: installer.phone,
      city: installer.city,
      state: installer.state,
      verified: installer.verified,
      subscriptionType: installer.subscriptionType,
      subscriptionEnd: installer.subscriptionEnd,
      paymentStatus: installer.paymentStatus,
      balance: installer.balance,
    },
    listing,
    leadDeliveries: installer.leadDeliveries,
    stats: { totalLeads, newLeads, openedLeads },
  });
}
