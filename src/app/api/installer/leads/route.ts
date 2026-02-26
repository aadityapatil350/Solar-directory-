import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

// PATCH — mark a lead delivery as opened/contacted
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || !session.installerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { leadDeliveryId, status } = await request.json();

  // Verify the delivery belongs to this installer
  const delivery = await prisma.leadDelivery.findFirst({
    where: { id: leadDeliveryId, installerId: session.installerId },
  });

  if (!delivery) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updateData: Record<string, unknown> = { status };
  if (status === 'opened' && !delivery.openedAt) {
    updateData.openedAt = new Date();
    updateData.readAt = new Date();
  }

  const updated = await prisma.leadDelivery.update({
    where: { id: leadDeliveryId },
    data: updateData,
  });

  return NextResponse.json({ success: true, delivery: updated });
}
