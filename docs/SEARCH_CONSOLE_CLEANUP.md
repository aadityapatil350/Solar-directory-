# Google Search Console - Indexing Issues Fix

**Status:** `Crawled - currently not indexed`
**Issue:** Google has indexed duplicate/deleted listing URLs that no longer exist
**Date:** March 24, 2026

---

## Problem Analysis

### What Google Found
Google Search Console shows these URLs as "Crawled - currently not indexed":
- `https://gosolarindex.in/listing/shashank-solar-sales-service-mysore-3`
- `https://gosolarindex.in/listing/waaree-solar-energy-centre-solar-wavez-solapur-4`
- `https://gosolarindex.in/listing/lee-guard-dehradun-2`
- And 7 more similar URLs with `-2`, `-3`, `-4` suffixes

### Root Cause
These are **deleted duplicate listings** that:
1. Previously existed in the database with numeric suffixes
2. Were deleted or merged into primary listings
3. Were crawled by Google before deletion
4. Still remain in Google's index

### Verification
✓ **Confirmed:** None of these URLs exist in the database (1,708 listings, 0 duplicates)
✓ **Confirmed:** Sitemap does NOT include individual listing pages
✓ **Confirmed:** Only 1 of 10 URLs exists (`b-s-renewable-energy-ranchi` - not a duplicate)

---

## Solutions Implemented

### 1. Canonical Tags (ALL Listing Pages) ✓

**File:** `src/app/listing/[slug]/page.tsx`
**File:** `src/lib/metadata.ts`

**What it does:**
- All listing pages now have canonical tags
- Regular listings: Self-referencing canonical (`/listing/abc` → canonical: `/listing/abc`)
- Duplicate listings: Points to primary (`/listing/abc-2` → canonical: `/listing/abc`)

**Detection logic:**
```typescript
const baseSlug = slug.replace(/-\d+$/, ''); // Remove -2, -3, etc.
const isDuplicate = baseSlug !== slug;
const canonicalUrl = `https://www.gosolarindex.in/listing/${isDuplicate ? baseSlug : slug}`;
```

**Benefits:**
- Prevents future duplicate content issues
- Consolidates SEO value to primary listings
- Industry standard SEO practice

---

### 2. Smart 404 Handling with Redirects ✓

**File:** `src/app/listing/[slug]/page.tsx`

**What it does:**
When a listing URL is not found:

1. **Check if it's a duplicate pattern** (ends with `-\d+`)
2. **If duplicate:** Try to find the primary listing (base slug)
   - **If primary exists:** 308 Permanent Redirect → `/listing/base-slug`
   - **If primary deleted:** Return 404
3. **If not duplicate:** Return 404

**Example scenarios:**
```
/listing/company-name-2 → Check if /listing/company-name exists
  ✓ Exists: Redirect to /listing/company-name (308)
  ✗ Deleted: Return 404

/listing/invalid-slug → Return 404 immediately
```

**Benefits:**
- Users visiting old duplicate URLs get redirected to primary
- Search engines receive proper HTTP status codes
- 308 tells Google to update its index permanently

---

### 3. Sitemap Optimization ✓

**File:** `src/app/sitemap.ts`

**What it does:**
- Intentionally EXCLUDES individual listing pages
- Includes only: homepage, city pages, category pages, blog posts, static pages

**Why exclude listings?**
- 1,708 listings = massive sitemap
- Risk of "thin content" penalty
- Users find listings through city/category pages anyway

**Benefits:**
- Prevents Google from discovering low-quality duplicate listings
- Focuses crawl budget on high-value pages
- Reduces indexing bloat

---

## Google Search Console Action Items

### Immediate Actions (Do Now)

#### 1. Request URL Removals
Go to: **Google Search Console → Removals → New Request**

Remove these **exact URLs**:
```
https://gosolarindex.in/listing/shashank-solar-sales-service-mysore-3
https://gosolarindex.in/listing/waaree-solar-energy-centre-solar-wavez-solapur-4
https://gosolarindex.in/listing/lee-guard-dehradun-2
https://gosolarindex.in/listing/sunray-renewables-nashik-solar-products-nashik-nashik-3
https://gosolarindex.in/listing/healthysun-energy-solar-power-solutions-chennai-3
https://gosolarindex.in/listing/bhaskare-solar-energy-solutions-solapur-3
https://gosolarindex.in/listing/shree-raviraj-enterprises-sudarshan-solar-ahmednagar-4
https://gosolarindex.in/listing/shree-sai-solar-dealer-energy-system-solar-panel-solar-plant-wardha-3
```

**Note:** URL removals are temporary (6 months). The real fix is the 404 responses.

---

#### 2. Check for More Duplicates
Go to: **Google Search Console → Coverage → Excluded**

Filter by: `Crawled - currently not indexed`

**Look for:** Any URLs matching pattern `/listing/*-\d+` (ending in -2, -3, etc.)

**Export the list:**
1. Click "Export" → Download CSV
2. Share the full list for bulk removal

---

#### 3. Validate Fixes
Go to: **Google Search Console → URL Inspection**

**Test these scenarios:**

1. **Deleted duplicate:**
   - URL: `https://gosolarindex.in/listing/shashank-solar-sales-service-mysore-3`
   - Expected: 404 Not Found
   - Canonical: (none - page doesn't exist)

2. **Active listing:**
   - URL: `https://gosolarindex.in/listing/b-s-renewable-energy-ranchi`
   - Expected: 200 OK
   - Canonical: `https://www.gosolarindex.in/listing/b-s-renewable-energy-ranchi`

3. **Request Indexing** for valid URLs showing canonical tags

---

### Monitor (Next 2-4 Weeks)

#### Week 1-2: Watch for Drops
- **Pages → Excluded** should decrease
- Deleted URLs should show "404 (Not Found)" in coverage report
- "Crawled - currently not indexed" count should drop

#### Week 3-4: Verify Consolidation
- Check that primary listings maintain/improve rankings
- Monitor clicks/impressions in Performance report
- Ensure no new duplicates appear

---

## Prevention Strategy

### How to Avoid Future Duplicates

#### 1. Database-Level Uniqueness
**File:** `prisma/schema.prisma`

```prisma
model Listing {
  slug String @unique // Already enforced
}
```
✓ Already implemented - slugs are unique

#### 2. Slug Generation Logic
When creating new listings, ensure:
- Generate base slug from company name
- Check if slug exists
- **DO NOT** append `-2`, `-3` - instead:
  - Add city suffix: `company-name-mumbai`
  - Add category: `company-name-solar-installer`
  - Add unique ID: `company-name-abc123`

#### 3. Listing Merges
When merging duplicate businesses:
1. Keep the oldest/best-performing listing
2. Delete the duplicate from database
3. **No redirect needed** - canonical tags will handle it

#### 4. Regular Audits
Run this monthly:
```bash
npx tsx scripts/check-duplicates.ts
```

Expected output:
```
Listings with -\d+ suffix: 0
```

---

## Expected Timeline

| Timeframe | What Happens |
|-----------|--------------|
| **Immediate** | Canonical tags live on all pages |
| **24-48 hours** | Google re-crawls deleted URLs, sees 404 |
| **1 week** | URL removal requests processed |
| **2-4 weeks** | Deleted URLs drop from index |
| **4-8 weeks** | Coverage report clears, indexing stabilizes |

---

## Success Metrics

### Before Fix
- **Status:** Crawled - currently not indexed
- **Duplicate URLs in index:** ~10+ known (likely more)
- **Canonical tags:** Missing on all listing pages

### After Fix
- **Status:** Should change to "Excluded (404)" then drop from index
- **Duplicate URLs in index:** 0
- **Canonical tags:** ✓ All 1,708 listing pages
- **Valid listings:** Indexed with proper canonicals

---

## Monitoring Queries

### Check Current Duplicates
```sql
SELECT slug, name
FROM Listing
WHERE slug ~ '-\d+$'
ORDER BY slug;
```
**Expected:** 0 rows

### Check Total Listings
```sql
SELECT COUNT(*) FROM Listing;
```
**Current:** 1,708

---

## Additional Resources

- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: Remove outdated content](https://support.google.com/webmasters/answer/9689846)
- [HTTP Status Codes for SEO](https://moz.com/learn/seo/http-status-codes)

---

## Contact

If issues persist after 4 weeks:
1. Export full "Crawled - currently not indexed" report from GSC
2. Check server logs for crawl errors
3. Verify canonical tags are rendering in HTML source
4. Consider submitting sitemap (even without listings) to refresh Google's understanding

---

**Last Updated:** March 24, 2026
**Implementation Status:** ✓ Complete
**Next Review:** April 24, 2026
