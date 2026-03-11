import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const BUCKET = 'listing-images';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Find image and verify ownership
    const image = await prisma.listingImage.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const listing = await prisma.listing.findFirst({ where: { userId: session.userId } });
    if (!listing || image.listingId !== listing.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Extract storage path from URL
    // URL format: https://...supabase.co/storage/v1/object/public/listing-images/listings/{id}/filename
    const urlParts = image.url.split(`/storage/v1/object/public/${BUCKET}/`);
    if (urlParts.length === 2) {
      const storagePath = urlParts[1];
      await supabaseAdmin.storage.from(BUCKET).remove([storagePath]);
    }

    await prisma.listingImage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Dashboard image DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
