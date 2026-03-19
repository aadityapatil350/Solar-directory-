# Category Links Fix - March 19, 2026

## Issue
When clicking on category cards on the homepage, users were getting 404 errors.

## Root Cause
The homepage (HomeClient.tsx) was using **incorrect category slugs** that didn't match the actual slugs in the database.

## Category Slug Mapping

### ❌ Wrong Slugs (Before)
```
/categories/residential-solar-installers
/categories/commercial-solar-installers
/categories/industrial-solar (doesn't exist!)
/categories/solar-panel-dealers
/categories/solar-inverter-specialists
/categories/solar-amc-maintenance
```

### ✅ Correct Slugs (After)
```
/categories/residential-installers
/categories/commercial-installers
/categories/solar-dealers
/categories/inverter-specialists
/categories/maintenance-services
```

## Database Categories (Actual)
From the database, we only have **5 categories**:

1. **Residential Solar Installers** → `residential-installers`
2. **Commercial Solar Installers** → `commercial-installers`
3. **Solar Panel Dealers** → `solar-dealers`
4. **Solar Inverter Specialists** → `inverter-specialists`
5. **Solar AMC & Maintenance** → `maintenance-services`

Note: There is **NO "Industrial Solar"** category in the database.

## Changes Made

**File:** `src/app/HomeClient.tsx`

**Before:**
```tsx
{ icon: "🏠", name: "Residential Installers", count: "1,240+", href: "/categories/residential-solar-installers" },
{ icon: "🏢", name: "Commercial Solar", count: "890+", href: "/categories/commercial-solar-installers" },
{ icon: "🏭", name: "Industrial Solar", count: "540+", href: "/categories/industrial-solar" },
{ icon: "🔋", name: "Solar Panel Dealers", count: "620+", href: "/categories/solar-panel-dealers" },
{ icon: "⚡", name: "Solar Inverter Specialists", count: "410+", href: "/categories/solar-inverter-specialists" },
{ icon: "🔧", name: "AMC & Maintenance", count: "380+", href: "/categories/solar-amc-maintenance" },
```

**After:**
```tsx
{ icon: "🏠", name: "Residential Installers", count: "1,240+", href: "/categories/residential-installers" },
{ icon: "🏢", name: "Commercial Solar", count: "890+", href: "/categories/commercial-installers" },
{ icon: "🔋", name: "Solar Panel Dealers", count: "620+", href: "/categories/solar-dealers" },
{ icon: "⚡", name: "Solar Inverter Specialists", count: "410+", href: "/categories/inverter-specialists" },
{ icon: "🔧", name: "AMC & Maintenance", count: "380+", href: "/categories/maintenance-services" },
```

## Deployment
- **Commit:** `14f2fe5`
- **Pushed to:** `origin/main`
- **Status:** Deployed to production

## Testing

Now when users click on any category card on the homepage:
- ✅ Residential Installers → Works
- ✅ Commercial Solar → Works
- ✅ Solar Panel Dealers → Works
- ✅ Solar Inverter Specialists → Works
- ✅ AMC & Maintenance → Works

## Additional Notes

### Removed Industrial Solar
The "Industrial Solar" category was removed because:
1. It doesn't exist in the database
2. Was showing a fake count
3. Would always return 404

### Verified Slugs
Created helper script `scripts/check-categories.ts` to verify all category slugs from database.

### City Links
City links were already correct and didn't need fixing:
- Mumbai → `/mumbai` ✅
- Delhi → `/delhi` ✅
- Bangalore → `/bangalore` ✅
- etc.

## How to Verify Slugs in Future

Run this command:
```bash
npx tsx scripts/check-categories.ts
```

This will show all categories with their actual slugs from the database.

---

**Fixed by:** Claude Sonnet 4.5
**Date:** March 19, 2026
**Commit:** 14f2fe5
