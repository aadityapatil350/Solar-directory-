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
        { error: 'Invalid phone number (must be 10 digits starting with 6-9)' },
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
        password, // TODO: hash with bcrypt before launch
      },
    });

    // Find or create location
    let locationRecord = await prisma.location.findFirst({
      where: { city, state },
    });

    if (!locationRecord) {
      const locationSlug = city.toLowerCase().replace(/\s+/g, '-') + '-' + state.toLowerCase().replace(/\s+/g, '-');
      locationRecord = await prisma.location.create({
        data: { city, state, slug: locationSlug + '-' + Date.now() },
      });
    }

    // Find category record — fallback to first category if not found
    let categoryRecord = await prisma.category.findFirst({
      where: { name: { contains: category, mode: 'insensitive' } },
    });

    if (!categoryRecord) {
      categoryRecord = await prisma.category.findFirst();
    }

    if (!categoryRecord || !locationRecord) {
      // Rollback user creation
      await prisma.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { error: 'Setup error: no categories found. Please contact support.' },
        { status: 500 }
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
        subscriptionType: 'basic',
        paymentStatus: 'pending',
        verified: false,
        balance: 0,
      },
    });

    // Create listing for installer
    const areas = Array.isArray(serviceAreas) ? serviceAreas.join(', ') : (serviceAreas || '');
    const exp = yearsExperience ? `${yearsExperience}+ years experience. ` : '';
    const team = teamSize ? `Team size: ${teamSize}. ` : '';

    await prisma.listing.create({
      data: {
        name: companyName,
        slug,
        description: `${exp}${team}Specializes in: ${areas || category}.`,
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
