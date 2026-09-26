import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateCleanListingSlug } from '@/lib/slugs';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      password,
      locationId,
      categoryId,
      website,
      address,
      description,
      yearsExperience,
      capacityMw,
      installationsCount,
      serviceTags,
    } = body;

    // Basic validation
    if (!companyName?.trim()) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }
    if (!contactPerson?.trim()) {
      return NextResponse.json({ error: 'Contact person name is required' }, { status: 400 });
    }
    if (!email?.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }
    if (!phone?.trim() || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'A valid 10-digit phone number is required' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    if (!locationId) {
      return NextResponse.json({ error: 'City / Location is required' }, { status: 400 });
    }
    if (!categoryId) {
      return NextResponse.json({ error: 'Primary category is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanCompany = companyName.trim();

    // Check if location exists
    const location = await prisma.location.findUnique({
      where: { id: locationId },
      select: { id: true, city: true, state: true },
    });
    if (!location) {
      return NextResponse.json({ error: 'Selected location is invalid' }, { status: 400 });
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true },
    });
    if (!category) {
      return NextResponse.json({ error: 'Selected category is invalid' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingUser && (existingUser.role === 'owner' || existingUser.role === 'admin')) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in at /dashboard/login.' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create or update user account as pending_owner
    let userRecord;
    if (existingUser) {
      userRecord = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: contactPerson.trim(),
          password: hashedPassword,
          role: 'pending_owner',
        },
      });
    } else {
      userRecord = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: contactPerson.trim(),
          password: hashedPassword,
          role: 'pending_owner',
        },
      });
    }

    // Generate unique slug
    const baseSlug = generateCleanListingSlug(cleanCompany, location.city);
    let finalSlug = baseSlug;
    let count = 1;
    while (await prisma.listing.findUnique({ where: { slug: finalSlug }, select: { id: true } })) {
      count++;
      finalSlug = `${baseSlug}-${count}`;
    }

    // Parse service tags if provided
    let tagsJson: string | null = null;
    if (Array.isArray(serviceTags) && serviceTags.length > 0) {
      tagsJson = JSON.stringify({ tags: serviceTags, categoryIds: [categoryId] });
    } else if (typeof serviceTags === 'string' && serviceTags.trim()) {
      const parsedTags = serviceTags.split(',').map((s: string) => s.trim()).filter(Boolean);
      tagsJson = JSON.stringify({ tags: parsedTags, categoryIds: [categoryId] });
    }

    // Create listing in unverified state (awaiting admin approval)
    const newListing = await prisma.listing.create({
      data: {
        name: cleanCompany,
        slug: finalSlug,
        description: description?.trim() || null,
        phone: cleanPhone,
        email: cleanEmail,
        website: website?.trim() || null,
        address: address?.trim() || `${location.city}, ${location.state}, India`,
        verified: false,
        featured: false,
        rating: 5.0,
        reviews: 0,
        categoryId: category.id,
        locationId: location.id,
        userId: userRecord.id, // linked to user
        serviceTags: tagsJson,
        yearsExperience: yearsExperience ? parseInt(yearsExperience, 10) : null,
        capacityMw: capacityMw ? parseFloat(capacityMw) : null,
        installationsCount: installationsCount ? parseInt(installationsCount, 10) : null,
      },
    });

    // Create a pending ClaimRequest so admin immediately sees it in the Claims approval queue
    await prisma.claimRequest.create({
      data: {
        listingId: newListing.id,
        name: contactPerson.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        message: description?.trim()
          ? `[New Business Registration]\n${description.trim()}`
          : '[New Business Registration] Submitted via online registration portal.',
        status: 'pending',
      },
    });

    try {
      revalidateTag('listings', 'max');
    } catch {
      // cache revalidation optional
    }

    return NextResponse.json({
      success: true,
      message: 'Business listing submitted successfully! Pending admin approval.',
      listing: {
        id: newListing.id,
        name: newListing.name,
        slug: newListing.slug,
      },
    });
  } catch (error) {
    console.error('Error registering installer business:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while submitting your listing. Please try again.' },
      { status: 500 }
    );
  }
}
