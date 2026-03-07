# Improving Phone Number & Email Data Quality

## Current Situation

Your listings are scraped from **Google Places API**, which:
- ✅ Provides business names, addresses, ratings accurately
- ⚠️ Sometimes doesn't provide phone numbers (privacy/not listed)
- ❌ Never provides email addresses (not available in Places API)

## Analysis of Current Data

From `scripts/listings-output.csv`:
- ~70% of listings have phone numbers from Google Places
- ~30% are missing phone numbers
- **0% have email addresses** (Google Places API doesn't provide emails)

---

## Solution 1: Enhanced Google Places Scraping (Quick Win)

### What to do:
The current scraper already uses `getPlaceDetails()` with these fields:
```typescript
const fields = 'name,formatted_phone_number,international_phone_number,website,formatted_address,rating,user_ratings_total,business_status';
```

This is already optimized. Google Places simply doesn't have all phone numbers.

### Action Items:
1. ✅ Already implemented correctly
2. Consider adding more cities to increase volume of listings with good data
3. Filter out listings without phone numbers during seeding (optional)

---

## Solution 2: Web Scraping from Business Websites (Medium Effort)

Many listings have websites. We can scrape phone/email from their websites.

### Create new script: `scripts/enrich-contact-data.ts`

```typescript
/**
 * enrich-contact-data.ts
 * Scrapes phone numbers and emails from business websites
 * Updates existing listings in the database
 */

import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// Phone number patterns (Indian format)
const phonePatterns = [
  /(\+91[\s-]?)?[6-9]\d{9}/g,  // +91 9876543210 or 9876543210
  /\d{3}[\s-]?\d{3}[\s-]?\d{4}/g,  // 123-456-7890
  /\d{5}[\s-]?\d{5}/g,  // 12345-67890
];

// Email pattern
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GoSolarIndexBot/1.0)',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return '';
  }
}

function extractContacts(html: string): { phones: string[]; emails: string[] } {
  const $ = cheerio.load(html);

  // Get text content from contact/about pages
  const text = $('body').text();

  const phones: Set<string> = new Set();
  const emails: Set<string> = new Set();

  // Extract phone numbers
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(phone => {
        const cleaned = phone.replace(/[^\d+]/g, '');
        if (cleaned.length >= 10) {
          phones.add(cleaned);
        }
      });
    }
  }

  // Extract emails
  const emailMatches = text.match(emailPattern);
  if (emailMatches) {
    emailMatches.forEach(email => {
      // Filter out common non-business emails
      if (!email.includes('example.com') &&
          !email.includes('domain.com') &&
          !email.includes('sentry.io')) {
        emails.add(email.toLowerCase());
      }
    });
  }

  return {
    phones: Array.from(phones),
    emails: Array.from(emails),
  };
}

async function enrichListing(listing: any) {
  if (!listing.website) {
    console.log(`  ⊘ ${listing.name} — No website`);
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
  }

  if (!listing.email && emails.length > 0) {
    updates.email = emails[0]; // Use first found email
  }

  if (Object.keys(updates).length > 0) {
    await prisma.listing.update({
      where: { id: listing.id },
      data: updates,
    });

    console.log(`    ✓ Updated: ${updates.phone || ''} ${updates.email || ''}`);
    return updates;
  }

  console.log(`    - No new contacts found`);
  return null;
}

async function main() {
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
  });

  console.log(`\nFound ${listings.length} listings to enrich\n`);

  let enriched = 0;

  for (let i = 0; i < listings.length; i++) {
    console.log(`[${i + 1}/${listings.length}] ${listings[i].name}`);

    const result = await enrichListing(listings[i]);
    if (result) enriched++;

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✅ Done! Enriched ${enriched} listings`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Install dependencies:
```bash
npm install cheerio
npm install -D @types/cheerio
```

### Run the enrichment:
```bash
npx tsx scripts/enrich-contact-data.ts
```

---

## Solution 3: Manual Verification System (Best Quality)

Create an installer verification form where businesses can claim their listing and provide correct contact details.

### Add to schema:
```prisma
model ListingClaimRequest {
  id          String   @id @default(cuid())
  listingId   String
  claimedBy   String   // Name of person claiming
  phone       String   // Verified phone
  email       String   // Verified email
  website     String?
  proofUrl    String?  // Link to business document/website
  status      String   @default("pending") // pending/approved/rejected
  createdAt   DateTime @default(now())

  @@index([listingId])
  @@index([status])
}
```

### Create claim form page: `/listing/[slug]/claim`

Benefits:
- ✅ 100% accurate contact info (verified by business owner)
- ✅ Builds relationship with installers
- ✅ Can convert them to paid subscribers
- ✅ Improves trust and data quality

---

## Solution 4: Third-Party Data Enrichment APIs

### Option A: Clearbit / Hunter.io
- Input: Company name + website → Get email
- Cost: ~$99/month for 1000 lookups
- Accuracy: ~70%

### Option B: PhoneValidation APIs
- Input: Phone number → Verify if valid/active
- Cost: ~$0.01 per lookup
- Use: Filter out invalid numbers before showing

---

## Recommended Implementation Plan

### Phase 1 (This Week) - FREE
1. ✅ Keep current Google Places scraper as-is
2. ✅ Create `enrich-contact-data.ts` script to scrape websites
3. ✅ Run enrichment weekly to update missing data
4. ✅ Add validation: Only show WhatsApp button if phone exists

**Result:** +20-30% more phone numbers, some emails

### Phase 2 (Next Week) - FREE
1. Create "Claim Your Listing" feature
2. Add verification workflow in admin dashboard
3. Email businesses asking them to claim listings
4. Offer free listing for verified businesses

**Result:** +50% phone numbers, +40% emails over 3 months

### Phase 3 (Optional) - PAID
1. Integrate Hunter.io for email enrichment ($99/month)
2. Add phone validation API ($50/month)

**Result:** +80% contact completeness

---

## Quick Fixes You Can Do Right Now

### 1. Hide WhatsApp button for listings without phone

**Edit:** `src/components/ListingCard.tsx`

```typescript
{/* Only show WhatsApp button if phone exists */}
{listing.phone && whatsappUrl && (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => {
      e.preventDefault();
      handleWhatsAppClick();
      window.open(whatsappUrl, '_blank');
    }}
    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm w-full justify-center"
  >
    <MessageCircle className="h-4 w-4" />
    Chat on WhatsApp
  </a>
)}

{/* Show alternate CTA for listings without phone */}
{!listing.phone && listing.website && (
  <a
    href={listing.website}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm w-full justify-center"
  >
    <Globe className="h-4 w-4" />
    Visit Website
  </a>
)}
```

### 2. Filter listings by contact data quality

**Edit:** `src/app/HomeClient.tsx`

Add filter option:
```typescript
const [showOnlyContactable, setShowOnlyContactable] = useState(false);

// In filtering logic:
let filtered = listings;
if (showOnlyContactable) {
  filtered = filtered.filter(l => l.phone || l.email);
}
```

### 3. Show data quality badge

Add to `ListingCard.tsx`:
```typescript
{listing.phone && listing.email && (
  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
    <CheckCircle className="h-3 w-3" />
    Verified Contact
  </span>
)}
```

---

## Expected Results

| Solution | Time | Cost | Phone Improvement | Email Improvement |
|----------|------|------|-------------------|-------------------|
| Current | - | Free | 70% | 0% |
| + Website Scraping | 2 hours | Free | 85% | 30% |
| + Claim System | 1 day | Free | 95% | 80% (3 months) |
| + Data APIs | 1 day | $150/mo | 98% | 90% |

---

## Next Steps

1. **Immediate:** Implement "hide WhatsApp if no phone" fix
2. **This week:** Build and run website enrichment script
3. **Next week:** Create listing claim workflow
4. **Ongoing:** Email businesses to claim/verify listings

Would you like me to implement any of these solutions?
