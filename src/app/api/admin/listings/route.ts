import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function verifyAuth(request: Request): Promise<{ success: boolean; user?: any }> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false };
  }

  const password = authHeader.substring(7);

  const user = await prisma.user.findUnique({
    where: {
      email: 'aadityabiz350@gmail.com',
      role: 'admin',
    },
  });

  if (!user || !user.password) {
    return { success: false };
  }

  if (user.password !== password) {
    return { success: false };
  }

  return { success: true, user };
}

// GET all listings
export async function GET(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const listings = await prisma.listing.findMany({
      include: {
        category: true,
        location: true,
      },
      orderBy: [
        { featured: 'desc' },
        { verified: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 100,
    });

    const stats = {
      totalListings: listings.length,
      featuredListings: listings.filter((l) => l.featured).length,
      verifiedListings: listings.filter((l) => l.verified).length,
    };

    return NextResponse.json({
      listings,
      stats,
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST create new listing
export async function POST(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, phone, email, website, address, categoryId, locationId, verified, featured } = body;

    if (!name || !phone || !categoryId || !locationId) {
      return NextResponse.json(
        { error: 'Name, phone, category, and location are required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') + '-' + Date.now();

    const listing = await prisma.listing.create({
      data: {
        name: name.trim(),
        slug,
        description: description?.trim(),
        phone: phone.trim(),
        email: email?.trim(),
        website: website?.trim(),
        address: address?.trim(),
        verified: verified || false,
        featured: featured || false,
        rating: 0,
        reviews: 0,
        categoryId,
        locationId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Listing created successfully',
        listing,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { success } = await verifyAuth(request);

    if (!success) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');

    if (!listingId) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    await prisma.listing.delete({
      where: { id: listingId },
    });

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500 }
    );
  }
}

// PATCH update listing (toggle featured)
export async function PATCH(request: Request) {
  try {
    const { success, user } = await verifyAuth(request);

    if (!success || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const body = await request.json();
    const { id } = searchParams;
    const { featured, verified, rating, reviews } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};

    if (typeof featured === 'boolean') {
      updateData.featured = featured;
    }

    if (typeof verified === 'boolean') {
      updateData.verified = verified;
    }

    if (rating !== undefined) {
      updateData.rating = parseFloat(rating);
    }

    if (reviews !== undefined) {
      updateData.reviews = parseInt(reviews);
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}
