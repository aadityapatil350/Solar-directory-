import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const BUCKET = 'listing-images';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await prisma.listing.findFirst({ where: { userId: session.userId } });
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const images = await prisma.listingImage.findMany({
      where: { listingId: listing.id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Dashboard images GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await prisma.listing.findFirst({ where: { userId: session.userId } });
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const count = await prisma.listingImage.count({ where: { listingId: listing.id } });
    // Free plan: no photos allowed
    if (!listing.featured && count >= 1) {
      return NextResponse.json(
        { error: 'Photo uploads are a Featured plan feature. Upgrade to Featured (₹999/month) to add up to 5 photos.' },
        { status: 400 },
      );
    }
    // Featured plan: max 5 photos
    if (listing.featured && count >= 5) {
      return NextResponse.json(
        { error: 'Maximum 5 photos allowed. Delete an existing photo to upload a new one.' },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, and WebP images are allowed' },
        { status: 400 },
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be under 5MB' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `listings/${listing.id}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, arrayBuffer, { contentType: file.type });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    const { data: publicData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
    const url = publicData.publicUrl;

    const image = await prisma.listingImage.create({
      data: {
        listingId: listing.id,
        url,
        order: count,
      },
    });

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    console.error('Dashboard images POST error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
