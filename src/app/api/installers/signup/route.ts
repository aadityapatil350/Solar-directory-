import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      companyName,
      contactPerson,
      email,
      phone,
      address,
      city,
      state,
      category,
      yearsExperience,
      teamSize,
      serviceAreas,
      mnreApproved,
      panAvailable,
      password,
    } = body;

    // Validate required fields
    if (!companyName || !contactPerson || !email || !phone || !address || !city || !state || !category || !password) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate phone
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number (must be 10 digits)' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Generate unique slug from company name
    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      + '-' + Date.now();

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: contactPerson,
        role: 'installer',
        password, // In production, hash with bcrypt
      },
    });

    // Find category and location
    const categoryRecord = await prisma.category.findFirst({
      where: { name: category },
    });

    const locationRecord = await prisma.location.findFirst({
      where: { city, state },
    });

    if (!categoryRecord || !locationRecord) {
      return NextResponse.json(
        { error: 'Category or location not found. Please contact support.' },
        { status: 400 }
      );
    }

    // Create installer profile
    const installer = await prisma.installer.create({
      data: {
        userId: user.id,
        companyName,
        contactPerson,
        phone,
        email,
        address,
        city,
        state,
        category,
        yearsExperience: parseInt(yearsExperience),
        teamSize,
        serviceAreas: JSON.stringify(serviceAreas),
        mnreApproved,
        panAvailable,
        subscriptionType: 'basic',
        paymentStatus: 'pending',
        verified: false, // Requires admin verification
        balance: 0,
      },
    });

    // Create listing for installer
    const listing = await prisma.listing.create({
      data: {
        name: companyName,
        slug,
        description: `${yearsExperience}+ years experience in solar industry. Team size: ${teamSize}. Specializes in: ${serviceAreas.join(', ')}.`,
        phone,
        email,
        website: '',
        address,
        verified: false,
        featured: false,
        rating: 0,
        reviews: 0,
        categoryId: categoryRecord.id,
        locationId: locationRecord.id,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Your account will be reviewed by our team.',
        userId: user.id,
        installerId: installer.id,
        listingId: listing.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating installer:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
