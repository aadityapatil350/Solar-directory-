# Google AdSense Setup - Complete Guide

## Overview

Google AdSense has been integrated into your GoSolarIndex website with your Publisher ID: `ca-pub-3540617055322931`

## What's Been Set Up

### 1. AdSense Script Added to Root Layout ✅

**File:** `src/app/layout.tsx`

```typescript
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-3540617055322931';

<Script
  async
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

This loads the AdSense auto-ads script on all pages.

### 2. Robots.txt Created ✅

**File:** `public/robots.txt`

Allows Google AdSense bot to crawl your site:

```
User-agent: Mediapartners-Google*
Disallow:
```

### 3. Ad Components Created ✅

**Location:** `src/components/AdSense/`

| Component | Purpose | Usage |
|-----------|---------|--------|
| `AdUnit` | Generic ad unit | Custom placements |
| `InFeedAd` | Between listings | `<InFeedAd index={3} />` |
| `SidebarAd` | Desktop sidebar | `<SidebarAd />` |
| `BannerAd` | Top/bottom banners | `<BannerAd />` |

## Next Steps (Required)

### Step 1: Verify Your Site in AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign in with `aadityabiz350@gmail.com`
3. Click "Add site"
4. Enter: `https://gosolarindex.in`
5. Click "Verify"

### Step 2: Get Ad Unit Slots

Once verified, create ad units in AdSense:

1. Go to **Ads** → **Ad units**
2. Click **Create new ad unit**
3. Choose types you want:
   - **Display ads** - For banner placements
   - **In-feed ads** - For between listings
   - **In-article ads** - For blog posts
4. Copy the **Ad slot ID** from the generated code

Example slot IDs look like: `1234567890`

### Step 3: Update Ad Slots in Components

Update the `adSlot` prop in each component with your actual slot IDs:

**File:** `src/components/AdSense/AdUnit.tsx`

```typescript
// Replace these placeholder slots with your actual AdSense slot IDs
const slotMap = {
  'banner-ad': 'YOUR_BANNER_SLOT_ID',
  'sidebar-ad': 'YOUR_SIDEBAR_SLOT_ID',
  'in-feed-ad': 'YOUR_INFEED_SLOT_ID',
};
```

### Step 4: Add Ads to Pages

You can now add ads to any page. Examples:

#### Homepage - Add Banner Ad
**File:** `src/app/page.tsx`

```typescript
import { BannerAd } from '@/components/AdSense';

export default function HomePage() {
  return (
    <>
      <BannerAd /> {/* Add this after hero section */}
      {/* Rest of your content */}
    </>
  );
}
```

#### Listing Page - Add Sidebar Ad
**File:** `src/app/listing/[slug]/page.tsx`

```typescript
import { SidebarAd } from '@/components/AdSense';

export default function ListingPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* Main content */}
      </div>
      <div className="hidden lg:block">
        <SidebarAd />
      </div>
    </div>
  );
}
```

#### Homepage - Add In-Feed Ads
**File:** `src/app/HomeClient.tsx`

```typescript
import { InFeedAd } from '@/components/AdSense';

// In your listings mapping:
{listings.map((listing, index) => (
  <>
    {index > 0 && index % 4 === 0 && <InFeedAd index={index} />}
    <ListingCard key={listing.id} {...listing} />
  </>
))}
```

### Step 5: Wait for Approval

After adding the script:

1. **AdSense will review your site** (1-2 weeks)
2. You'll get an email: "Your site has been approved"
3. Ads will automatically start showing

**What they check:**
- ✅ Site has sufficient content (50+ pages)
- ✅ Site is not under construction
- ✅ Site has organic traffic
- ✅ Site complies with AdSense policies
- ✅ Site has privacy policy and terms

## Important Requirements

### Must-Have Pages

Create these pages (if you haven't):

1. **Privacy Policy** - `/privacy`
   ```
   Required by AdSense
   - What data you collect
   - How you use it
   - Cookies and tracking
   ```

2. **Terms of Service** - `/terms`
   ```
   Required by AdSense
   - User responsibilities
   - Disclaimers
   - Copyright policy
   ```

3. **Contact** - `/contact` (already exists)

### AdSense Compliance

✅ **Do:**
- Place ads in visible areas
- Have sufficient content
- Comply with policies
- Disclose affiliate links

❌ **Don't:**
- Click your own ads
- Encourage others to click
- Place ads near buttons
- Hide ads with CSS
- Use excessive ads per page

## Environment Variables

Add to `.env.local` (optional - already has fallback):

```env
# Google AdSense Publisher ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-3540617055322931
```

## AdSense Dashboard URLs

- **AdSense Home:** https://www.google.com/adsense/
- **Ad Units:** https://www.google.com/adsense/new/u/0/pub-3540617055322931/myads/saved-adunits
- **Site Verification:** https://www.google.com/adsense/new/u/0/pub-3540617055322931/sites
- **Payments:** https://www.google.com/adsense/new/u/0/pub-3540617055322931/payments

## Testing Ads Locally

**Important:** AdSense doesn't show ads on:
- Localhost
- Preview environments
- Before approval

To test after approval:
```bash
# Deploy to production
git push origin main
# Wait for Vercel deploy
# Visit https://gosolarindex.in
```

**Test Mode:**
Add `google_ad_client="ca-test"` to test ads (but they won't earn revenue).

## Revenue Optimization

### Best Practices

1. **Strategic Placement**
   - Above the fold (visible without scrolling)
   - Within content flow
   - Near calls-to-action
   - Sidebar for desktop

2. **Ad Density**
   - Maximum 3 ads per page (recommended)
   - Don't overwhelm users
   - Mobile: 1-2 ads max
   - Desktop: 2-3 ads max

3. **Responsive Design**
   - Ads automatically adjust to screen size
   - Test on mobile, tablet, desktop
   - Use `fullWidthResponsive` prop

### Revenue Expectations

**Factors affecting earnings:**
- Traffic volume
- Geographic location of visitors
- Ad relevance to content
- Click-through rate (CTR)
- Cost per click (CPC)

**Solar industry benchmarks:**
- CPM: $2-10 per 1000 impressions
- CPC: $0.50-2.00 per click
- Good CTR: 1-3%

## Troubleshooting

### Ads Not Showing

**Possible reasons:**
1. Site not yet approved (wait 1-2 weeks)
2. Running on localhost (only works on production)
3. Ad blocker enabled
4. Invalid ad slot ID
5. Script not loaded (check browser console)

**Check:**
```javascript
// Open browser console and run:
console.log(window.adsbygoogle); // Should exist
```

### Console Errors

If you see errors:
```javascript
// "adsbygoogle is not defined"
// Solution: Script hasn't loaded yet (try in production)
```

### Low Revenue

**Solutions:**
- Increase organic traffic (SEO)
- Improve content quality
- Optimize ad placement
- Use A/B testing for positions
- Ensure mobile-friendly ads

## Monitoring

### Google AdSense Dashboard

Check these metrics daily/weekly:
- **Pageviews** - Total ad impressions
- **RPM** - Revenue per 1000 impressions
- **CTR** - Click-through rate
- **CPC** - Cost per click
- **Total Revenue** - Money earned

### Goals

**First month:**
- Get approved ✅
- Show ads on all pages ✅
- Track impressions ✅

**Second month:**
- Optimize placements
- Test different ad formats
- Aim for >1000 daily impressions

**Third month:**
- Scale up
- Target $10-50/day
- Consider premium placements

## Compliance Checklist

Before launch, verify:

- ✅ Privacy policy page exists
- ✅ Terms of service page exists
- ✅ Contact page exists
- ✅ Site has 50+ indexed pages
- ✅ No broken links
- ✅ Mobile-friendly design
- ✅ Fast page load speed
- ✅ HTTPS enabled
- ✅ No copyright violations
- ✅ No adult/violent content
- ✅ Ads placed appropriately
- ✅ Not clicking own ads

## Deployment

Deploy changes to Vercel:

```bash
# Commit changes
git add .
git commit -m "feat: add Google AdSense integration"
git push origin main

# Vercel auto-deploys
# Wait for: https://gosolarindex.in to update
```

## Next Actions

1. [ ] Verify site in Google AdSense dashboard
2. [ ] Create ad units and get slot IDs
3. [ ] Update `adSlot` values in AdUnit.tsx
4. [ ] Create Privacy Policy page at `/privacy`
5. [ ] Create Terms of Service page at `/terms`
6. [ ] Add BannerAd to homepage
7. [ ] Add SidebarAd to listing pages
8. [ ] Add InFeedAd to listings grid (every 4th listing)
9. [ ] Deploy to production
10. [ ] Wait for AdSense approval (1-2 weeks)

## Support

**AdSense Help Center:** https://support.google.com/adsense/

**Common Issues:**
- Account disabled? Review policies
- Low revenue? Check ad placement
- Ads not showing? Verify approval status

---

**Setup Date:** March 20, 2026
**Publisher ID:** ca-pub-3540617055322931
**Status:** Script installed, awaiting verification
