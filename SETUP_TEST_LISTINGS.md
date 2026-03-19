# Test Listings Feature - Setup Instructions

## ⚠️ IMPORTANT: Database Migration Required

The test listings feature has been coded but **requires a database migration** to work. The migration is currently running in the background and may take a few minutes.

## What's Been Implemented ✅

1. **Database Schema** - Added `isTest` field to Listing model
2. **API Routes** - Filter test listings for public users
3. **Public Pages** - All pages exclude test listings from display
4. **Admin Dashboard** - Toggle button and TEST badge added
5. **CLI Scripts** - Interactive scripts to mark listings as test
6. **Documentation** - Complete guide in `docs/TEST_LISTINGS_FEATURE.md`

## Current Status

### ❌ Not Working Yet (waiting for migration)
The app is currently showing errors because:
- Prisma Client knows about `isTest` field (schema updated)
- Database doesn't have the column yet (migration in progress)
- Code tries to filter by `isTest` → SQL error

### Migration Script Running
```bash
# This is currently running in background:
npx tsx scripts/add-istest-field.ts
```

## Next Steps

### Step 1: Complete the Database Migration ⚠️ **REQUIRED**

**❌ Automatic migration FAILED** due to statement timeout (1,710 listings is a large table).

**✅ Solution: Run SQL via Supabase Dashboard (RECOMMENDED)**

1. Go to https://supabase.com/dashboard
2. Select your project → **SQL Editor**
3. Paste and run this SQL:

```sql
-- Add isTest column
ALTER TABLE "Listing"
ADD COLUMN IF NOT EXISTS "isTest" BOOLEAN NOT NULL DEFAULT false;

-- Create index
CREATE INDEX IF NOT EXISTS "Listing_isTest_idx" ON "Listing"("isTest");
```

4. Verify it worked (should return 1 row):
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'Listing' AND column_name = 'isTest';
```

See **MIGRATION_REQUIRED.md** for detailed instructions.

### Step 2: Restart Dev Server

Once migration completes:
```bash
# Kill current dev server (Ctrl+C or find PID)
pkill -f "next dev"

# Regenerate Prisma Client
npx prisma generate

# Restart dev server
npm run dev
```

### Step 3: Verify It Works

1. Visit http://localhost:3003
2. Check that homepage loads without errors
3. Log in to `/admin`
4. Go to Listings tab
5. You should see a "Visibility" column with "Public" buttons
6. Click one to toggle it to "🧪 Test"
7. Open site in incognito window and verify that listing is hidden

### Step 4: Mark Your Test Listings

Use one of these methods:

**Method 1: Admin Dashboard UI (Easiest)**
1. Login to `/admin`
2. Click "Public" → "🧪 Test" for any listing

**Method 2: Interactive CLI**
```bash
npx tsx scripts/mark-listing-as-test.ts
# Follow prompts to search and toggle
```

**Method 3: Direct CLI (if you know the ID)**
```bash
npx tsx scripts/mark-test-by-id.ts <listing-id> true
```

## Troubleshooting

### Error: "Unknown argument `isTest`"
**Cause:** Database migration hasn't completed yet
**Fix:** Complete Step 1 above, then restart dev server

### Error: "column 'isTest' does not exist"
**Cause:** Migration didn't run successfully
**Fix:** Run SQL migration manually (Option B in Step 1)

### Test listing still visible to public
**Cause:** Caching or not logged out
**Fix:**
- Clear browser cache
- Test in incognito window
- Verify `isTest: true` in database
- Restart dev server

### Can't toggle in admin dashboard
**Cause:** API endpoint error or auth issue
**Fix:**
- Check browser console for errors
- Verify you're logged in as admin
- Check server logs

## Files Modified

- `prisma/schema.prisma` - Added isTest field
- `src/lib/auth-helpers.ts` - New file for admin checks
- `src/app/api/listings/route.ts` - Filter test listings
- `src/app/api/listings/by-slug/route.ts` - Return 404 for test
- `src/app/api/admin/listings/toggle-test/route.ts` - New API endpoint
- `src/app/page.tsx` - Exclude test from homepage
- `src/app/listing/[slug]/page.tsx` - Hide test listings
- `src/app/categories/[slug]/page.tsx` - Filter test
- `src/app/[city]/page.tsx` - Filter test
- `src/app/states/[slug]/page.tsx` - Filter test
- `src/app/admin/page.tsx` - Toggle UI + badge

## Quick Test

Once setup is complete:

```bash
# Mark a listing as test
npx tsx scripts/mark-test-by-id.ts <some-listing-id> true

# Visit that listing's URL in incognito
# Should see 404

# Visit admin dashboard
# Should see listing with TEST badge

# Toggle back to public
npx tsx scripts/mark-test-by-id.ts <some-listing-id> false

# Visit listing URL again
# Should work now
```

## Support

For detailed documentation, see: `docs/TEST_LISTINGS_FEATURE.md`

For implementation details, see the modified files listed above.
