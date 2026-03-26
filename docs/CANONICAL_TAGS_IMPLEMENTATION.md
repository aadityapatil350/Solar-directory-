# Canonical Tags Implementation Summary

**Date:** March 24, 2026
**Status:** ✅ Complete
**Build Status:** ✅ Passing

---

## Overview

Implemented comprehensive canonical tag system for all listing pages to:
1. Fix Google Search Console "Crawled - currently not indexed" issues
2. Prevent duplicate content penalties
3. Consolidate SEO value to primary listings
4. Handle deleted duplicate URLs gracefully

---

## Files Modified

### 1. `src/lib/metadata.ts`
**Changes:**
- Added `canonicalUrl?: string` parameter to `constructMetadata()` function
- Allows override of default canonical URL behavior
- Maintains backward compatibility (defaults to `url` if not provided)

**Code:**
```typescript
export function constructMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.png',
  standalone = false,
  canonicalUrl,  // ← NEW PARAMETER
}: {
  // ... existing params
  canonicalUrl?: string;  // ← NEW TYPE
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    // ...
    alternates: {
      canonical: canonicalUrl || url,  // ← UPDATED LOGIC
    },
    // ...
  };
}
```

---

### 2. `src/app/listing/[slug]/page.tsx`
**Changes:**

#### A. Metadata Generation (Canonical Tags)
```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};

  // Duplicate detection logic
  const baseSlug = slug.replace(/-\d+$/, '');
  const isDuplicate = baseSlug !== slug;
  const canonicalSlug = isDuplicate ? baseSlug : slug;
  const canonicalUrl = `https://www.gosolarindex.in/listing/${canonicalSlug}`;

  return constructMetadata({
    title: `${listing.name} — ${listing.category.name} in ${listing.location.city}`,
    description: `${listing.name} is a ${listing.category.name.toLowerCase()} in ${listing.location.city}, ${listing.location.state}. ${listing.description?.slice(0, 120) || 'Get a free quote today.'}`,
    path: `/listing/${slug}`,
    canonicalUrl: canonicalUrl,  // ← EXPLICIT CANONICAL
  });
}
```

#### B. 404 Handling with Smart Redirects
```typescript
export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    const baseSlug = slug.replace(/-\d+$/, '');
    const isDuplicate = baseSlug !== slug;

    if (isDuplicate) {
      // Try to find primary listing
      const primaryListing = await prisma.listing.findUnique({
        where: { slug: baseSlug },
        select: { slug: true }
      });

      if (primaryListing) {
        // Redirect duplicate to primary
        permanentRedirect(`/listing/${baseSlug}`);
      }
    }

    notFound();
  }

  // ... rest of page
}
```

**Added Imports:**
```typescript
import { notFound, permanentRedirect } from 'next/navigation';
```

---

## How It Works

### Scenario 1: Regular Listing (No Duplicate)
**URL:** `/listing/company-name`
**Action:**
1. Base slug: `company-name`
2. Is duplicate? No
3. Canonical: `https://www.gosolarindex.in/listing/company-name`
4. Result: ✅ Self-referencing canonical

---

### Scenario 2: Duplicate Listing (Exists in DB)
**URL:** `/listing/company-name-2`
**Action:**
1. Base slug: `company-name` (remove `-2`)
2. Is duplicate? Yes
3. Canonical: `https://www.gosolarindex.in/listing/company-name`
4. Result: ✅ Points to primary listing

---

### Scenario 3: Deleted Duplicate (Not in DB, Primary Exists)
**URL:** `/listing/company-name-2`
**Action:**
1. Listing not found
2. Is duplicate pattern? Yes
3. Check if primary exists: Yes
4. Result: ✅ 308 Permanent Redirect → `/listing/company-name`

**HTTP Response:**
```
HTTP/1.1 308 Permanent Redirect
Location: /listing/company-name
```

---

### Scenario 4: Deleted Duplicate (Not in DB, Primary Also Deleted)
**URL:** `/listing/company-name-2`
**Action:**
1. Listing not found
2. Is duplicate pattern? Yes
3. Check if primary exists: No
4. Result: ✅ 404 Not Found

**HTTP Response:**
```
HTTP/1.1 404 Not Found
```

---

## Detection Pattern

**Regex:** `/-\d+$/`

**Matches:**
- `company-name-2` ✓
- `company-name-3` ✓
- `company-name-10` ✓
- `my-business-99` ✓

**Does NOT match:**
- `company-name` ✗ (no suffix)
- `company-2-name` ✗ (number not at end)
- `company-name-abc` ✗ (not numeric)
- `company-name-2-delhi` ✗ (number not at end)

---

## Database Status

**Current State:**
```
Total listings: 1,708
Listings with -\d+ suffix: 0
Unique slugs: 100%
```

**No duplicates currently exist** - all listings have unique slugs.

---

## Google Search Console Issues (Before Fix)

**Problem URLs:**
```
/listing/shashank-solar-sales-service-mysore-3          ✗ Not in DB
/listing/waaree-solar-energy-centre-solar-wavez-solapur-4  ✗ Not in DB
/listing/lee-guard-dehradun-2                           ✗ Not in DB
/listing/sunray-renewables-nashik-solar-products-nashik-nashik-3  ✗ Not in DB
/listing/healthysun-energy-solar-power-solutions-chennai-3  ✗ Not in DB
/listing/bhaskare-solar-energy-solutions-solapur-3      ✗ Not in DB
/listing/shree-raviraj-enterprises-sudarshan-solar-ahmednagar-4  ✗ Not in DB
/listing/shree-sai-solar-dealer-energy-system-solar-panel-solar-plant-wardha-3  ✗ Not in DB
/listing/waaree-energies-bhavnagar                      ✓ Exists (not duplicate)
```

**Status:** "Crawled - currently not indexed"
**Root Cause:** Old duplicate URLs still in Google's index

---

## What Happens Now

### For Deleted URLs
1. **Google crawls** `/listing/company-name-3`
2. **Server responds** with 404 Not Found
3. **Google sees** no content, no canonical
4. **Google's action:** Eventually removes from index

### For Active Listings
1. **Google crawls** `/listing/company-name`
2. **Server responds** with 200 OK + canonical tag
3. **Google sees:** `<link rel="canonical" href="https://www.gosolarindex.in/listing/company-name" />`
4. **Google's action:** Indexes as primary URL

### For Future Duplicates (If Created)
1. **Google crawls** `/listing/company-name-2`
2. **Server responds** with 200 OK + canonical pointing to base
3. **Google sees:** `<link rel="canonical" href="https://www.gosolarindex.in/listing/company-name" />`
4. **Google's action:** Consolidates SEO value to primary

---

## SEO Benefits

### 1. Duplicate Content Prevention
- Search engines see canonical tags
- Understand which URL is the "primary" version
- Don't penalize for duplicate content

### 2. Link Equity Consolidation
- Backlinks to duplicate URLs count toward primary
- PageRank flows to canonical URL
- Stronger overall domain authority

### 3. Crawl Budget Optimization
- Google spends less time on duplicates
- More crawl budget for important pages
- Faster indexing of new content

### 4. User Experience
- Users on old duplicate URLs get redirected
- No broken links for valid duplicates
- Seamless navigation

---

## Testing

### Manual Test (Active Listing)
```bash
curl -I https://gosolarindex.in/listing/b-s-renewable-energy-ranchi
```

**Expected Response:**
```
HTTP/2 200
content-type: text/html
```

**In HTML:**
```html
<link rel="canonical" href="https://www.gosolarindex.in/listing/b-s-renewable-energy-ranchi" />
```

---

### Manual Test (Deleted Duplicate)
```bash
curl -I https://gosolarindex.in/listing/shashank-solar-sales-service-mysore-3
```

**Expected Response:**
```
HTTP/2 404
content-type: text/html
```

---

### Automated Test
```bash
npx tsx verify-canonical.ts
```

**Expected Output:**
```
✓ All listing pages now have canonical tags
Total listings: 1,708
Listings with duplicate pattern: 0
✓ All listings have unique slugs and will use self-referencing canonicals
```

---

## Next Steps

### Immediate (You)
1. ✅ Deploy to production (Vercel)
2. ✅ Verify canonical tags render in live HTML
3. ✅ Request removals in Google Search Console
4. ✅ Monitor indexing status

### Ongoing (System)
- New listings automatically get canonical tags
- Duplicate detection works for future duplicates
- 404s properly handled with redirects when applicable

---

## Rollback Plan

If issues occur, revert these commits:

**Files to revert:**
1. `src/lib/metadata.ts` - Remove `canonicalUrl` parameter
2. `src/app/listing/[slug]/page.tsx` - Remove canonical logic and redirect logic

**Commands:**
```bash
git diff HEAD src/lib/metadata.ts
git diff HEAD src/app/listing/[slug]/page.tsx
git checkout HEAD~1 -- src/lib/metadata.ts src/app/listing/[slug]/page.tsx
```

---

## Related Documentation

- [SEARCH_CONSOLE_CLEANUP.md](./SEARCH_CONSOLE_CLEANUP.md) - Full GSC cleanup guide
- [Google Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

---

**Implementation Status:** ✅ Complete
**Production Ready:** ✅ Yes
**Breaking Changes:** ❌ None
