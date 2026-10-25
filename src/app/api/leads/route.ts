import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/email';
import { validateLeadName, validateLeadCity, validateLeadPhone, validateMonthlyBill } from '@/lib/lead-validation';

// How many verified installers to notify per lead
const MAX_INSTALLERS_PER_LEAD = 3;

// Check if it's Monday midnight IST (5:30 AM UTC) to reset weekly counters
async function resetWeeklyEnquiryCountsIfNeeded() {
  const now = new Date();
  const day = now.getUTCDay(); // 0-6 (0 = Sunday, 1 = Monday)
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  // Monday = day 1, at or after 00:00 UTC (which is 5:30 AM IST)
  const isMondayMorning = day === 1 && (hours * 60 + minutes) >= 30;

  if (isMondayMorning) {
    // Reset all installer enquiry counts
    await prisma.installer.updateMany({
      where: { enquiryCountResetAt: { lt: now } },
      data: {
        enquiryCount: 0,
        enquiryCountResetAt: now,
      },
    });

    console.log(`Reset weekly enquiry counts at ${new Date(now).toISOString()}`);
  }
}

async function distributeLeadToInstallers(leadId: string, locationId: string | null) {
  try {
    // Check and reset weekly counters if needed
    await resetWeeklyEnquiryCountsIfNeeded();

    // Find verified installers in the same location
    let installers = locationId
      ? await prisma.installer.findMany({
          where: {
            verified: true,
            user: {
              listings: {
                some: { locationId },
              },
            },
          },
          orderBy: { subscriptionType: 'desc' }, // premium first
          take: MAX_INSTALLERS_PER_LEAD,
        })
      : [];

    // If not enough city-level installers, top up with any verified installers
    if (installers.length < MAX_INSTALLERS_PER_LEAD) {
      const existingIds = installers.map((i: typeof installers[0]) => i.id);
      const extra = await prisma.installer.findMany({
        where: {
          verified: true,
          id: { notIn: existingIds },
        },
        orderBy: { subscriptionType: 'desc' },
        take: MAX_INSTALLERS_PER_LEAD - installers.length,
      });
      installers = [...installers, ...extra];
    }

    if (installers.length === 0) return;

    // Increment enquiry count for each installer and reset the weekly counter
    await prisma.installer.updateMany({
      where: { id: { in: installers.map((i: typeof installers[0]) => i.id) } },
      data: {
        enquiryCount: { increment: 1 },
        enquiryCountResetAt: null, // Clear the reset timestamp
      },
    });

    // Create LeadDelivery records for each installer
    await prisma.leadDelivery.createMany({
      data: installers.map((installer: typeof installers[0]) => ({
        leadId,
        installerId: installer.id,
        status: 'pending',
        paid: false,
      })),
      skipDuplicates: true,
    });

    // Update lead status to 'assigned'
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: 'assigned' },
    });
  } catch (err) {
    // Non-fatal — lead is still saved even if distribution fails
    console.error('Lead distribution error:', err);
  }
}

async function notifyFeaturedOwners(
  lead: { name: string; phone: string; email: string | null; requirement: string | null; budget: string | null; monthlyBill?: string | null; city: string },
  locationId: string | null,
) {
  try {
    if (!locationId) return;

    // Find featured listings in this city that have a linked owner
    const featuredListings = await prisma.listing.findMany({
      where: {
        locationId,
        featured: true,
        userId: { not: null },
      },
      include: {
        location: true,
        user: { select: { email: true, name: true } },
      },
    });

    for (const listing of featuredListings) {
      if (!listing.user?.email) continue;
      await sendLeadNotificationEmail(
        listing.user.email,
        listing.user.name || listing.name,
        {
          ...lead,
          city: lead.city || listing.location.city,
          monthlyBill: lead.monthlyBill,
        },
      ).catch((err) => console.error('Lead notification email failed:', err));
    }
  } catch (err) {
    console.error('notifyFeaturedOwners error:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      requirement,
      locationId: rawLocationId,
      city,
      monthlyBill,
      propertyType,
      budget,
      urgency,
      source,
    } = body;

    const isContactForm = source === 'contact-page' || String(requirement || '').startsWith('[Contact Form]');

    const nameError = validateLeadName(name);
    if (nameError) {
      return NextResponse.json({ error: nameError }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    if (!isContactForm) {
      const phoneError = validateLeadPhone(phone);
      if (phoneError) {
        return NextResponse.json({ error: phoneError }, { status: 400 });
      }
    }

    // Location is mandatory for all quote enquiries
    const rawCity = (city ?? '').trim();
    if (!isContactForm) {
      const cityError = validateLeadCity(rawCity);
      if (cityError) {
        return NextResponse.json({ error: cityError }, { status: 400 });
      }
    }

    // Monthly light bill is mandatory for quote enquiries to ensure lead qualification for channel partners (e.g. SolarSquare)
    const effectiveMonthlyBill = (monthlyBill ?? budget ?? '').trim();
    if (!isContactForm) {
      const billError = validateMonthlyBill(effectiveMonthlyBill);
      if (billError) {
        return NextResponse.json({ error: billError }, { status: 400 });
      }
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Resolve or auto-create location record so locationId is never lost
    let locationId = rawLocationId || null;
    const cleanCityName = rawCity || (isContactForm ? 'Support Enquiry' : '');

    if (!locationId && cleanCityName && !isContactForm) {
      // 1. Try finding exact/case-insensitive match
      let location = await prisma.location.findFirst({
        where: { city: { equals: cleanCityName, mode: 'insensitive' } },
      });

      // 2. Try slug match
      if (!location) {
        const citySlug = cleanCityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        location = await prisma.location.findFirst({
          where: {
            OR: [
              { slug: { equals: citySlug } },
              { slug: { startsWith: `${citySlug}-` } },
            ],
          },
        });
      }

      // 3. If not found in default list, auto-create a Location entry so lead is linked and serviceable
      if (!location && cleanCityName.length >= 2) {
        try {
          const baseSlug = cleanCityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          let uniqueSlug = baseSlug;
          const existing = await prisma.location.findUnique({ where: { slug: uniqueSlug } });
          if (existing) {
            uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
          }
          location = await prisma.location.create({
            data: {
              city: cleanCityName,
              state: 'India',
              slug: uniqueSlug,
            },
          });
        } catch (locErr) {
          console.error('Location auto-creation failed:', locErr);
        }
      }

      locationId = location?.id || null;
    }

    // Build structured qualification text with all details for solar channel partners & installers
    const qualificationParts: string[] = [];
    if (source) qualificationParts.push(`[${String(source).slice(0, 40)}]`);
    if (requirement?.trim()) qualificationParts.push(requirement.trim());
    if (effectiveMonthlyBill) qualificationParts.push(`Light Bill: ${effectiveMonthlyBill}`);
    if (propertyType?.trim()) qualificationParts.push(`Property: ${propertyType.trim()}`);
    if (cleanCityName) qualificationParts.push(`City: ${cleanCityName}`);

    const requirementText = qualificationParts.join(' | ');

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        city: cleanCityName || null,
        monthlyBill: effectiveMonthlyBill || null,
        requirement: requirementText,
        locationId: locationId || null,
        budget: effectiveMonthlyBill || null,
        urgency: urgency || 'normal',
      },
    });

    // Distribute lead to verified installers (async, non-blocking)
    distributeLeadToInstallers(lead.id, locationId);

    // Notify featured listing owners in the same city (async, non-blocking)
    notifyFeaturedOwners(
      {
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        requirement: lead.requirement,
        budget: lead.budget,
        monthlyBill: lead.monthlyBill,
        city: cleanCityName,
      },
      locationId,
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Qualified quotes from verified channel partners will be sent shortly.',
        lead: { id: lead.id, name: lead.name, phone: lead.phone, city: lead.city, monthlyBill: lead.monthlyBill },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to submit request. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const leads = await prisma.lead.findMany({
      where,
      include: { location: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
