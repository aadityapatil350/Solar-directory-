import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

async function verifyAuth(request: Request) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  const user = await prisma.user.findUnique({
    where: { email: 'aadityabiz350@gmail.com', role: 'admin' },
  });
  if (!user?.password) return false;
  return bcrypt.compare(auth.substring(7), user.password);
}

// GET /api/admin/installers/suggest?locationId=xxx&leadId=yyy
// Returns all installers in the same city, flagging which already got this lead
export async function GET(request: Request) {
  const ok = await verifyAuth(request);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get('locationId');
  const leadId     = searchParams.get('leadId');

  if (!locationId) {
    return NextResponse.json({ error: 'locationId required' }, { status: 400 });
  }

  // Find the location to get city name
  const location = await prisma.location.findUnique({ where: { id: locationId } });
  if (!location) {
    return NextResponse.json({ installers: [], city: null });
  }

  // Find all locations in the same city (there might be just one slug but be safe)
  const sameCityLocationIds = await prisma.location.findMany({
    where: { city: { equals: location.city, mode: 'insensitive' } },
    select: { id: true },
  }).then((locs) => locs.map((l) => l.id));

  // Find installers with a listing in any of those locations
  const installers = await prisma.installer.findMany({
    where: {
      user: {
        listings: {
          some: { locationId: { in: sameCityLocationIds } },
        },
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          listings: {
            where: { locationId: { in: sameCityLocationIds } },
            select: { name: true, category: { select: { name: true } } },
            take: 1,
          },
        },
      },
    },
    orderBy: [{ verified: 'desc' }, { subscriptionType: 'desc' }],
  });

  // Find out which installers already received this lead
  const existingDeliveries = leadId
    ? await prisma.leadDelivery.findMany({
        where: { leadId },
        select: { installerId: true },
      })
    : [];
  const alreadySentIds = new Set(existingDeliveries.map((d) => d.installerId));

  const result = installers.map((inst) => ({
    id:             inst.id,
    companyName:    inst.companyName,
    contactPerson:  inst.contactPerson,
    phone:          inst.phone,
    email:          inst.email,
    verified:       inst.verified,
    subscriptionType: inst.subscriptionType,
    listingName:    inst.user.listings[0]?.name ?? null,
    category:       inst.user.listings[0]?.category?.name ?? null,
    alreadySent:    alreadySentIds.has(inst.id),
  }));

  return NextResponse.json({ installers: result, city: location.city, total: result.length });
}
