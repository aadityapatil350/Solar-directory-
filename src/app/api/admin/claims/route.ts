import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/verify-admin';

// GET all claim requests
export async function GET(request: Request) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const claims = await prisma.claimRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: {
        select: {
          id: true, name: true, slug: true,
          category: { select: { name: true } },
          location: { select: { city: true, state: true } },
        },
      },
    },
  });

  return NextResponse.json({ claims });
}

// PATCH — approve or reject a claim
export async function PATCH(request: Request) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { claimId, action } = await request.json(); // action: 'approve' | 'reject'
  if (!claimId || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'claimId and action (approve|reject) required' }, { status: 400 });
  }

  const claim = await prisma.claimRequest.findUnique({
    where: { id: claimId },
    include: {
      listing: { include: { category: true, location: true } },
    },
  });
  if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 });

  if (action === 'reject') {
    await prisma.claimRequest.update({ where: { id: claimId }, data: { status: 'rejected' } });
    // Also update user role back if they're still pending
    const user = await prisma.user.findUnique({ where: { email: claim.email } });
    if (user && user.role === 'pending_owner') {
      await prisma.user.update({ where: { id: user.id }, data: { role: 'user' } });
    }
    return NextResponse.json({ success: true, status: 'rejected' });
  }

  // APPROVE: find the user account created during OTP verification, set role to 'owner', link listing
  const user = await prisma.user.findUnique({ where: { email: claim.email } });
  if (!user) {
    return NextResponse.json({ error: 'User account not found. The claimant may not have completed OTP verification.' }, { status: 404 });
  }

  // Upgrade user role to owner
  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'owner' },
  });

  // Link listing to user and mark as verified
  await prisma.listing.update({
    where: { id: claim.listingId },
    data: {
      userId: user.id,
      verified: true,
    },
  });

  // Mark claim approved
  await prisma.claimRequest.update({
    where: { id: claimId },
    data: { status: 'approved' },
  });

  return NextResponse.json({
    success: true,
    status: 'approved',
    ownerEmail: user.email,
    ownerName: user.name,
  });
}
