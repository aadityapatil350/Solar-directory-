# Test Listings Feature

## Overview

The Test Listings feature allows you to mark certain listings as "test" so they are **hidden from public users** but **visible to admins**. This is useful for:

- Testing new features on production without affecting real users
- Creating demo listings for screenshots/marketing
- Testing the complete user flow with fake data

## How It Works

### For Public Users
- Test listings **do NOT appear** in:
  - Homepage listings
  - Search results
  - Category pages
  - City/state pages
  - Direct listing page access (returns 404)

### For Admin Users
- Test listings **ARE visible** when logged in as admin
- Can see a `TEST` badge on listings in the admin dashboard
- Can toggle test status on/off with one click
- Can view test listing pages directly

## Usage

### Method 1: Admin Dashboard (Easiest)

1. Log in to `/admin` with your admin account
2. Go to the **Listings** tab
3. Find the listing you want to mark as test
4. Click the **"Public"** button in the **Visibility** column
5. It will turn purple and say **"🧪 Test"**
6. The listing is now hidden from public view

To make it public again, just click the button again.

### Method 2: Command Line Script (Interactive)

```bash
npx tsx scripts/mark-listing-as-test.ts
```

This will:
- Let you search for listings by name
- Show you a list of matching listings
- Let you select one to toggle test status
- Confirm the change

### Method 3: Direct ID Script (Fast)

If you know the listing ID:

```bash
# Mark as test
npx tsx scripts/mark-test-by-id.ts <listing-id> true

# Make public
npx tsx scripts/mark-test-by-id.ts <listing-id> false
```

Example:
```bash
npx tsx scripts/mark-test-by-id.ts cmm8vqp3i00c9k1movx6zkbvd true
```

### Method 4: API Endpoint (Programmatic)

**POST** `/api/admin/listings/toggle-test`

Headers:
```json
{
  "Authorization": "Bearer <your-admin-token>",
  "Content-Type": "application/json"
}
```

Body:
```json
{
  "listingId": "cmm8vqp3i00c9k1movx6zkbvd",
  "isTest": true
}
```

Response:
```json
{
  "success": true,
  "listing": {
    "id": "cmm8vqp3i00c9k1movx6zkbvd",
    "name": "Test Solar Company",
    "isTest": true,
    "slug": "test-solar-company-mumbai"
  },
  "message": "Listing marked as test"
}
```

**GET** `/api/admin/listings/toggle-test` - Get all test listings

## Technical Details

### Database Schema

Added to `Listing` model:
```prisma
isTest Boolean @default(false)  // Test/fake listing, hidden from public

@@index([isTest])  // For fast filtering
```

### Modified Files

1. **Schema**: `prisma/schema.prisma` - Added `isTest` field
2. **API Routes**:
   - `/api/listings/route.ts` - Filter out test listings for non-admins
   - `/api/listings/by-slug/route.ts` - Return 404 for test listings
   - `/api/admin/listings/toggle-test/route.ts` - New admin endpoint

3. **Pages** (all exclude `isTest: false` in queries):
   - `src/app/page.tsx` - Homepage
   - `src/app/listing/[slug]/page.tsx` - Listing detail
   - `src/app/categories/[slug]/page.tsx` - Category pages
   - `src/app/[city]/page.tsx` - City pages
   - `src/app/states/[slug]/page.tsx` - State pages

4. **Admin Dashboard**:
   - `src/app/admin/page.tsx` - Added toggle button and TEST badge

5. **Helper**: `src/lib/auth-helpers.ts` - Check if user is admin

### Auth Flow

```typescript
// Check if user is admin
const userIsAdmin = await isAdmin();

// If not admin, exclude test listings
if (!userIsAdmin) {
  where.isTest = false;
}
```

## FAQ

**Q: Will test listings affect my stats/counts?**
A: No. All public-facing stats exclude `isTest: false`.

**Q: Can I access a test listing URL directly?**
A: Only if you're logged in as admin. Public users get 404.

**Q: How do I find my admin token?**
A: Check your browser cookies for `token` after logging in to `/admin`.

**Q: Can installers see test listings?**
A: No. Only users with `role: 'admin'` can see them.

**Q: Will test listings appear in sitemap.xml?**
A: No (if sitemap generator excludes `isTest: true`). You may need to update your sitemap generation script.

## Migration

The database migration was applied via:
```sql
ALTER TABLE "Listing" ADD COLUMN "isTest" BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX "Listing_isTest_idx" ON "Listing"("isTest");
```

All existing listings default to `isTest: false` (public).

## Best Practices

1. **Mark clearly**: Use obvious test names like "TEST - Solar Company"
2. **Clean up**: Remove test listings before major launches
3. **Don't overuse**: Keep number of test listings minimal to avoid confusion
4. **Monitor**: Check the admin dashboard regularly to see which listings are marked as test

## Troubleshooting

**Test listing still visible to public?**
- Clear Next.js cache: `rm -rf .next && npm run build`
- Check if listing actually has `isTest: true` in database
- Verify you're not logged in as admin (logout and test in incognito)

**Can't toggle test status in admin?**
- Check browser console for errors
- Verify admin token is valid (re-login)
- Check server logs for API errors

**Migration didn't run?**
- Run manually: `npx tsx scripts/add-istest-field.ts`
- Or via SQL: Connect to Supabase and run the ALTER TABLE command above
