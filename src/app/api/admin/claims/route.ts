import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/verify-admin';
import bcrypt from 'bcryptjs';

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
    return NextResponse.json({ success: true, status: 'rejected' });
  }

  // APPROVE: create user + installer, link listing
  // Check if user with this email already exists
  let user = await prisma.user.findUnique({ where: { email: claim.email } });

  if (!user) {
    // Create a user account with a temp password = phone number (they can change later)
    const hashedPassword = await bcrypt.hash(claim.phone, 12);
    user = await prisma.user.create({
      data: {
        name: claim.name,
        email: claim.email,
        password: hashedPassword,
        role: 'installer',
      },
    });
  }

  // Check if installer profile already exists for this user
  let installer = await prisma.installer.findUnique({ where: { userId: user.id } });
  if (!installer) {
    installer = await prisma.installer.create({
      data: {
        userId: user.id,
        companyName: claim.listing.name,
        contactPerson: claim.name,
        email: claim.email,
        phone: claim.phone,
        verified: true, // approved by admin
        subscriptionType: 'basic',
        paymentStatus: 'pending',
      },
    });
  }

  // Link listing to this user
  await prisma.listing.update({
    where: { id: claim.listingId },
    data: { userId: user.id },
  });

  // Mark claim approved
  await prisma.claimRequest.update({
    where: { id: claimId },
    data: { status: 'approved', installerId: installer.id },
  });

  return NextResponse.json({
    success: true,
    status: 'approved',
    installerEmail: user.email,
    tempPassword: claim.phone, // admin sees this to share with installer
  });
}
