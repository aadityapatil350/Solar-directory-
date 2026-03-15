import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/verify-admin';
import { sendClaimApprovedEmail } from '@/lib/email';

// GET all claim requests — includes linked user info
export async function GET(request: Request) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const claims = await prisma.claimRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: {
        select: {
          id: true, name: true, slug: true, featured: true,
          userId: true,
          category: { select: { id: true, name: true } },
          location: { select: { id: true, city: true, state: true } },
        },
      },
    },
  });

  // Attach user info for each claim (matched by email)
  const claimsWithUser = await Promise.all(
    claims.map(async (claim: typeof claims[0]) => {
      const user = await prisma.user.findUnique({
        where: { email: claim.email },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });
      return { ...claim, user };
    }),
  );

  return NextResponse.json({ claims: claimsWithUser });
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
    const user = await prisma.user.findUnique({ where: { email: claim.email } });
    if (user && user.role === 'pending_owner') {
      await prisma.user.update({ where: { id: user.id }, data: { role: 'user' } });
    }
    return NextResponse.json({ success: true, status: 'rejected' });
  }

  // APPROVE
  const user = await prisma.user.findUnique({ where: { email: claim.email } });
  if (!user) {
    return NextResponse.json(
      { error: 'User account not found. The claimant may not have completed OTP verification.' },
      { status: 404 },
    );
  }

  await prisma.user.update({ where: { id: user.id }, data: { role: 'owner' } });

  // Unlink this user from ANY previously linked listings before assigning the new one
  // This prevents findFirst() from returning a stale/wrong listing in the dashboard
  await prisma.listing.updateMany({
    where: { userId: user.id, id: { not: claim.listingId } },
    data: { userId: null },
  });

  await prisma.listing.update({
    where: { id: claim.listingId },
    data: { userId: user.id, verified: true },
  });
  await prisma.claimRequest.update({ where: { id: claimId }, data: { status: 'approved' } });

  const updatedListing = await prisma.listing.findUnique({ where: { id: claim.listingId } });
  try {
    await sendClaimApprovedEmail(
      user.email,
      user.name || claim.name,
      claim.listing.name,
      updatedListing?.featured ?? false,
    );
  } catch (emailErr) {
    console.error('Failed to send approval email:', emailErr);
  }

  return NextResponse.json({ success: true, status: 'approved', ownerEmail: user.email, ownerName: user.name });
}

// DELETE — remove a claim, unlink + unverify the listing, and delete the owner user account
export async function DELETE(request: Request) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { claimId } = await request.json();
  if (!claimId) return NextResponse.json({ error: 'claimId required' }, { status: 400 });

  const claim = await prisma.claimRequest.findUnique({ where: { id: claimId } });
  if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 });

  // Find the user linked to this claim by email
  const user = await prisma.user.findUnique({ where: { email: claim.email } });

  // 1. Unlink ALL listings from this user and remove verified status
  await prisma.listing.updateMany({
    where: { userId: user?.id ?? undefined },
    data: { userId: null, verified: false },
  });

  // 2. Delete the claim record first (FK ref to listing)
  await prisma.claimRequest.delete({ where: { id: claimId } });

  // 3. Delete the user and all their dependent records
  if (user) {
    // Delete password reset tokens
    await prisma.passwordResetToken.deleteMany({ where: { email: user.email } });
    // Delete OTP verifications
    await prisma.otpVerification.deleteMany({ where: { email: user.email } });
    // Delete any remaining claim requests for this user
    await prisma.claimRequest.deleteMany({ where: { email: user.email } });
    // Now delete the user
    await prisma.user.delete({ where: { id: user.id } });
  }

  return NextResponse.json({ success: true, deletedUser: user ? user.email : null });
}
