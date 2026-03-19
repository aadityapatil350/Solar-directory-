# Quick Start: Test Listings Feature

## 🚨 Do This First (2 minutes)

### 1. Run SQL Migration in Supabase

Go to: https://supabase.com/dashboard → Your Project → SQL Editor

Paste and click **Run**:
```sql
ALTER TABLE "Listing"
ADD COLUMN IF NOT EXISTS "isTest" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS "Listing_isTest_idx" ON "Listing"("isTest");
```

✅ Should complete in ~5 seconds

### 2. Restart Dev Server

```bash
pkill -f "next dev"
npx prisma generate
npm run dev
```

✅ Site should load without errors now

## 🎯 How to Use

### Admin Dashboard (Easiest)

1. Go to http://localhost:3003/admin
2. Login with admin credentials
3. Click **Listings** tab
4. Find any listing
5. Click the **"Public"** button in Visibility column
6. It turns purple → **"🧪 Test"**
7. That listing is now hidden from public users!

### Command Line

```bash
# Interactive mode
npx tsx scripts/mark-listing-as-test.ts

# Direct mode (if you know the ID)
npx tsx scripts/mark-test-by-id.ts <listing-id> true   # Mark as test
npx tsx scripts/mark-test-by-id.ts <listing-id> false  # Make public
```

## 🧪 Test It

1. Mark a listing as test in admin dashboard
2. Copy the listing slug (e.g., "solar-company-mumbai")
3. Open incognito window
4. Visit: http://localhost:3003/listing/solar-company-mumbai
5. Should see **404** ✅
6. Login as admin, visit same URL
7. Should see the listing ✅

## ✅ What Works Now

- ✅ Public users **cannot see** test listings anywhere
- ✅ Test listings return **404** on direct access
- ✅ Test listings **excluded** from:
  - Homepage
  - Search results
  - Category pages
  - City pages
  - Sitemap
  - Stats/counts
- ✅ Admins can **see and manage** all test listings
- ✅ One-click toggle in admin dashboard
- ✅ CLI scripts for bulk operations

## 📚 Full Documentation

- **Quick Setup**: MIGRATION_REQUIRED.md
- **Feature Guide**: docs/TEST_LISTINGS_FEATURE.md
- **Troubleshooting**: SETUP_TEST_LISTINGS.md

## 🆘 Troubleshooting

**Still seeing errors?**
→ Did you run the SQL migration? Check Supabase SQL Editor

**Toggle button not working?**
→ Check browser console, you might need to re-login

**Test listing still visible?**
→ Make sure you're testing in incognito (not logged in as admin)

**Can't find admin dashboard?**
→ Go to http://localhost:3003/admin

That's it! The feature is ready to use once you run that SQL migration. 🎉
