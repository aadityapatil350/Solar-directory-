# ⚠️ MANUAL DATABASE MIGRATION REQUIRED

## Issue

The automatic migration failed due to **statement timeout**. Your Supabase database has 1,710 listings and the ALTER TABLE command timed out.

The error:
```
ERROR: canceling statement due to statement timeout
```

## Solution: Run Migration via Supabase Dashboard

You need to run the SQL migration manually through the Supabase SQL Editor (which has longer timeouts).

### Step 1: Go to Supabase Dashboard

1. Open https://supabase.com/dashboard
2. Select your project: `gosolarindex`
3. Click on **SQL Editor** in the left sidebar

### Step 2: Run This SQL

Copy and paste this SQL into the editor and click **Run**:

```sql
-- Add isTest column to Listing table
ALTER TABLE "Listing"
ADD COLUMN IF NOT EXISTS "isTest" BOOLEAN NOT NULL DEFAULT false;

-- Create index for performance
CREATE INDEX IF NOT EXISTS "Listing_isTest_idx" ON "Listing"("isTest");

-- Verify it worked
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'Listing'
  AND column_name = 'isTest';
```

### Step 3: Verify Success

You should see output like:
```
column_name | data_type | column_default | is_nullable
------------|-----------|----------------|-------------
isTest      | boolean   | false          | NO
```

### Step 4: Restart Your Dev Server

Once the SQL completes successfully:

```bash
# Kill the current dev server
pkill -f "next dev"

# Regenerate Prisma Client
npx prisma generate

# Restart dev server
npm run dev
```

### Step 5: Test It

1. Visit http://localhost:3003 (or whatever port)
2. Homepage should load without errors
3. Go to `/admin` and login
4. Click on **Listings** tab
5. You should see a new **"Visibility"** column
6. Click a "Public" button - it should turn purple "🧪 Test"

## Alternative: Increase Timeout (Advanced)

If you want to try the script again with a longer timeout:

1. Go to Supabase Dashboard → Project Settings → Database
2. Look for connection pooling settings
3. Increase statement timeout if available
4. Try running the script again:
   ```bash
   npx tsx scripts/add-istest-field.ts
   ```

## What Happens If I Don't Run This?

Your app will show errors like:
- `Unknown argument 'isTest'`
- `column "isTest" does not exist`
- Pages won't load properly

The feature is **fully coded** but won't work until the database column exists.

## After Migration Completes

Everything will work:
- Public users won't see test listings
- Admins can toggle test status in dashboard
- CLI scripts will work
- All pages will load correctly

## Need Help?

The migration is simple - just one column and one index. It should take less than 5 seconds in Supabase SQL Editor.

If you're stuck, you can:
1. Check Supabase docs: https://supabase.com/docs/guides/database/migrations
2. Or temporarily comment out the `isTest` filters in the code until you can run the migration

## Files to Temporarily Disable (If Needed)

If you need the site working NOW and will run migration later, you can comment out the isTest filters:

**Quick Fix (temporary):**
```bash
# Revert the code changes temporarily
git diff HEAD -- src/app/page.tsx src/app/listing/
# Then manually remove `, isTest: false` from where clauses
```

But the **proper solution is to run the SQL migration** above. It's quick and safe!
