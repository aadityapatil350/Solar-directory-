/**
 * enrich-contact-data.ts
 * Scrapes phone numbers and emails from business websites
 * Updates existing listings in the database
 *
 * Run: npx tsx scripts/enrich-contact-data.ts
 */

import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// Phone number patterns (Indian format)
const phonePatterns = [
  /(\+91[\s-]?)?[6-9]\d{9}/g,  // +91 9876543210 or 9876543210
  /\d{3}[\s-]?\d{3}[\s-]?\d{4}/g,  // 123-456-7890
  /\d{5}[\s-]?\d{5}/g,  // 12345-67890
  /\d{2,4}[\s-]?\d{4}[\s-]?\d{4}/g,  // 022-1234-5678
];

// Email pattern
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    // Normalize URL
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GoSolarIndexBot/1.0)',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      return '';
    }

    return await response.text();
  } catch (error) {
    console.error(`  ✗ Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return '';
  }
}

function extractContacts(html: string): { phones: string[]; emails: string[] } {
  const $ = cheerio.load(html);

  // Remove script and style tags
  $('script, style').remove();

  // Get text content
  const text = $('body').text();

  const phones: Set<string> = new Set();
  const emails: Set<string> = new Set();

  // Extract phone numbers
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(phone => {
        // Clean phone number
        let cleaned = phone.replace(/[^\d+]/g, '');

        // Remove +91 prefix for consistency
        if (cleaned.startsWith('+91')) {
          cleaned = cleaned.substring(3);
        } else if (cleaned.startsWith('91') && cleaned.length === 12) {
          cleaned = cleaned.substring(2);
        }

        // Validate length (10 digits for Indian mobile)
        if (cleaned.length === 10 && cleaned[0] >= '6') {
          phones.add(cleaned);
        } else if (cleaned.length >= 10 && cleaned.length <= 12) {
          phones.add(cleaned);
        }
      });
    }
  }

  // Extract emails
  const emailMatches = text.match(emailPattern);
  if (emailMatches) {
    emailMatches.forEach(email => {
      const lowerEmail = email.toLowerCase();

      // Filter out common non-business emails and patterns
      const excludePatterns = [
        'example.com',
        'domain.com',
        'sentry.io',
        'google.com',
        'facebook.com',
        'twitter.com',
        'instagram.com',
        'linkedin.com',
        'yourdomain.com',
        'test.com',
        'wixpress.com',
        'weebly.com',
      ];

      const shouldExclude = excludePatterns.some(pattern => lowerEmail.includes(pattern));

      if (!shouldExclude && lowerEmail.includes('.')) {
        emails.add(lowerEmail);
      }
    });
  }

  return {
    phones: Array.from(phones).slice(0, 3), // Keep top 3 phones
    emails: Array.from(emails).slice(0, 3), // Keep top 3 emails
  };
}

async function enrichListing(listing: any): Promise<{ phones?: string; emails?: string } | null> {
  if (!listing.website) {
    console.log(`  ⊘ No website`);
    return null;
  }

  console.log(`  Scraping: ${listing.website}`);

  const html = await fetchWebsiteContent(listing.website);
  if (!html) return null;

  const { phones, emails } = extractContacts(html);

  // Update database if we found new info
  const updates: any = {};

  if (!listing.phone && phones.length > 0) {
    updates.phone = phones[0]; // Use first found phone
    console.log(`    ✓ Found phone: ${phones[0]}`);
  }

  if (!listing.email && emails.length > 0) {
    updates.email = emails[0]; // Use first found email
    console.log(`    ✓ Found email: ${emails[0]}`);
  }

  if (Object.keys(updates).length > 0) {
    await prisma.listing.update({
      where: { id: listing.id },
      data: updates,
    });

    return updates;
  }

  console.log(`    - No new contacts found`);
  return null;
}

async function main() {
  console.log('\n🔍 Starting contact data enrichment...\n');

  // Get all listings with websites but missing phone/email
  const listings = await prisma.listing.findMany({
    where: {
      website: { not: null },
      OR: [
        { phone: null },
        { email: null },
      ],
    },
    select: {
      id: true,
      name: true,
      website: true,
      phone: true,
      email: true,
    },
    take: 100, // Process 100 at a time to avoid long runs
  });

  console.log(`Found ${listings.length} listings to enrich\n`);

  if (listings.length === 0) {
    console.log('✅ All listings with websites already have contact info!\n');
    return;
  }

  let enrichedPhones = 0;
  let enrichedEmails = 0;

  for (let i = 0; i < listings.length; i++) {
    console.log(`[${i + 1}/${listings.length}] ${listings[i].name}`);

    const result = await enrichListing(listings[i]);

    if (result) {
      if (result.phones) enrichedPhones++;
      if (result.emails) enrichedEmails++;
    }

    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✅ Enrichment complete!');
  console.log(`   📞 Added ${enrichedPhones} phone numbers`);
  console.log(`   📧 Added ${enrichedEmails} email addresses\n`);
}

main()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
