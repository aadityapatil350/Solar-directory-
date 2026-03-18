import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import { isAdmin } from '@/lib/auth-helpers'; // TODO: Uncomment after migration

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const listing = await prisma.listing.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      phone: true,
      address: true,
      // isTest: true, // TODO: Uncomment after migration
      category: { select: { name: true } },
      location: { select: { city: true, state: true } },
    },
  });

  if (!listing) return NextResponse.json({ listing: null }, { status: 404 });

  // TODO: Uncomment after running database migration
  // Hide test listings from non-admin users
  // const userIsAdmin = await isAdmin();
  // if (listing.isTest && !userIsAdmin) {
  //   return NextResponse.json({ listing: null }, { status: 404 });
  // }

  return NextResponse.json({ listing });
}
