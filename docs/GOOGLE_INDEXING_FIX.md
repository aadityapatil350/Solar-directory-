# Google Search Console Indexing Issues - Fix Guide

## Current Issues (From Google Search Console)

| Issue | Count | Status |
|-------|-------|--------|
| Redirect error | 4 pages | Critical |
| Not found (404) | 3 pages | Critical |
| Discovered - currently not indexed | 1,121 pages | Medium Priority |
| Crawled - currently not indexed | 20 pages | High Priority |

**Total Unindexed:** 1,148 pages out of your site

---

## Issue 1: Redirect Errors (4 Pages) 🔴

### What This Means
Google found redirect chains or redirect loops that prevent indexing.

### Common Causes in Your Site
1. **HTTP → HTTPS redirects not configured properly**
2. **Trailing slash redirects (e.g., `/about` → `/about/`)**
3. **Old URLs redirecting to non-existent pages**
4. **Redirect loops**

### How to Fix

#### Step 1: Check Vercel Redirects
Add to `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/listing/:slug/",
      "destination": "/listing/:slug",
      "permanent": true
    },
    {
      "source": "/:path*/",
      "destination": "/:path*",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "index, follow"
        }
      ]
    }
  ]
}
```

#### Step 2: Identify Specific Pages
1. Go to Google Search Console → Pages → Redirect error
2. Click "View examples"
3. Note down the exact URLs
4. Fix each redirect

---

## Issue 2: 404 Errors (3 Pages) 🔴

### What This Means
Google is trying to crawl URLs that don't exist on your site.

### Common Causes
1. **Deleted listings** (old URLs in sitemap)
2. **Typos in internal links**
3. **Old URLs from previous site structure**
4. **Incorrect canonical URLs**

### How to Fix

#### Step 1: Find the 404 Pages
```bash
# Check Google Search Console for the exact URLs
# Common culprits:
- /listing/old-company-name
- /category/old-slug
- /city/old-city-name
```

#### Step 2: Options to Fix
1. **If page should exist:** Create the page or fix the slug
2. **If page was deleted:** Add 410 Gone status or 301 redirect
3. **If it's a typo:** Fix internal links

#### Step 3: Remove from Sitemap
Update `src/app/sitemap.ts` to exclude deleted pages.

---

## Issue 3: Discovered - Currently Not Indexed (1,121 Pages) 🟡

### What This Means
Google found these URLs but hasn't crawled them yet. This is the **biggest issue** affecting your rankings.

### Why This Happens
1. **Low site authority** (new site)
2. **Crawl budget exhausted**
3. **Duplicate content** (before your deduplication fix)
4. **Low-quality pages**
5. **Slow server response**
6. **Too many pages at once**

### How to Fix

#### Solution 1: Submit Priority Pages to Google
Create `priority-urls.txt` with your most important pages:
```
https://gosolarindex.in/
https://gosolarindex.in/mumbai
https://gosolarindex.in/delhi
https://gosolarindex.in/bangalore
https://gosolarindex.in/solar-calculator
https://gosolarindex.in/subsidy-checker
https://gosolarindex.in/blog
```

Then manually request indexing in GSC for each.

#### Solution 2: Improve Internal Linking
- Add "Popular Cities" section to footer (links to top 20 cities)
- Add "Featured Categories" to homepage
- Create category hub pages with links to all listings
- Add breadcrumbs with schema markup (already done ✓)

#### Solution 3: Add Priority Hints to Sitemap
Update `src/app/sitemap.ts` with better priorities:
```typescript
// Priority Guide:
// 1.0 = Homepage
// 0.9 = Tools (calculator, subsidy)
// 0.8 = Top cities (Mumbai, Delhi, Bangalore)
// 0.7 = Other cities, blog posts
// 0.6 = Categories
// 0.5 = Individual listings
```

#### Solution 4: Create XML Sitemap Index
Split your sitemap into multiple files:
- `sitemap-listings.xml` (for listing pages)
- `sitemap-cities.xml` (for city pages)
- `sitemap-blog.xml` (for blog posts)
- `sitemap-static.xml` (for static pages)

#### Solution 5: Add lastmod Dates
Ensure all sitemap entries have proper `lastmod` dates so Google knows what's fresh.

#### Solution 6: Increase Crawl Rate
1. Go to Google Search Console → Settings → Crawl Rate
2. Set to "Limit maximum crawl rate" and increase it
3. Ensure your server can handle the load

---

## Issue 4: Crawled - Currently Not Indexed (20 Pages) 🟠

### What This Means
Google crawled these pages but decided NOT to index them. This is **serious** - it means Google thinks these pages are low quality.

### Common Reasons
1. **Duplicate content** (same company in multiple categories - you fixed this!)
2. **Thin content** (pages with very little text)
3. **Low-quality content**
4. **Canonical pointing to different URL**
5. **Noindex tag accidentally set**

### How to Fix

#### Step 1: Identify the Pages
Go to GSC → Pages → Crawled - currently not indexed → View examples

#### Step 2: Check for Noindex Tags
```bash
# Check if any pages have noindex
curl -I https://gosolarindex.in/some-page | grep -i "x-robots-tag"
```

#### Step 3: Improve Content Quality
For listing pages with thin content:
- Add more description text
- Add FAQs specific to that company
- Add customer reviews section
- Add service area map
- Add pricing information

#### Step 4: Add Unique Content
Ensure each page has:
- At least 300 words of unique content
- Proper headings (H1, H2, H3)
- Schema markup (LocalBusiness - already done ✓)
- Images with alt text
- Internal links to related pages

---

## Immediate Action Plan (Next 24 Hours)

### Priority 1: Fix Redirect Errors (Critical) ⚠️
1. Check GSC for exact URLs with redirect errors
2. Add proper redirects to `vercel.json`
3. Test each redirect manually
4. Request re-indexing in GSC

### Priority 2: Fix 404 Errors (Critical) ⚠️
1. Identify the 3 URLs returning 404
2. Either create the pages or add 301 redirects
3. Remove from sitemap if deleted
4. Request re-indexing

### Priority 3: Submit Top 50 Pages (High) 🎯
1. Create list of top 50 most important URLs
2. Use GSC "Request Indexing" for each
3. Limit: 10 requests per day (do it over 5 days)

### Priority 4: Improve Site Speed (High) ⚡
1. Run Lighthouse audit
2. Optimize images
3. Add caching headers
4. Enable Vercel Edge caching

---

## Long-Term Strategy (Next 30 Days)

### Week 1: Technical SEO
- ✅ Fix redirects and 404s
- ✅ Submit priority pages
- ✅ Improve site speed
- ✅ Add structured data (already done)

### Week 2: Content Quality
- Add more content to thin pages
- Create city-specific content (not just listings)
- Add blog posts targeting local keywords
- Add FAQ sections to city pages

### Week 3: Link Building
- Get backlinks from local directories
- Submit to solar industry directories
- Get listed on government sites (MNRE)
- Add social media profiles

### Week 4: Monitor & Iterate
- Check GSC daily for indexing progress
- Re-submit unindexed pages
- Fix any new issues
- Track ranking improvements

---

## Tools to Use

### Google Search Console Actions
1. **Request Indexing** - For priority pages (limit: 10/day)
2. **URL Inspection** - Check if page is indexable
3. **Coverage Report** - Track indexing status
4. **Performance Report** - See which pages get traffic

### Sitemap Submission
1. Submit `sitemap.xml` to GSC (already done ✓)
2. Submit individual sitemaps if you split them
3. Check for sitemap errors weekly

### Testing Tools
1. **Google Rich Results Test** - Check schema markup
2. **PageSpeed Insights** - Check speed and Core Web Vitals
3. **Mobile-Friendly Test** - Ensure mobile compatibility
4. **Ahrefs/SEMrush** - Check backlinks and keywords

---

## Expected Timeline

| Week | Expected Indexed Pages | Notes |
|------|------------------------|-------|
| Week 0 (Now) | ~100 pages | Before fixes |
| Week 1 | ~300 pages | After fixing critical issues |
| Week 2 | ~600 pages | After content improvements |
| Week 3 | ~900 pages | As Google discovers quality |
| Week 4 | ~1,100+ pages | Most pages indexed |

**Note:** This assumes:
- All technical issues fixed
- Quality content on all pages
- No duplicate content
- Good site speed
- Some backlinks

---

## Red Flags to Avoid

❌ **Don't:**
- Use "noindex" tags unless intentional
- Have duplicate content
- Create doorway pages
- Use hidden text or links
- Stuff keywords unnaturally
- Have slow page load times (>3 seconds)
- Have broken internal links
- Block Googlebot in robots.txt

✅ **Do:**
- Use canonical URLs correctly
- Have unique content per page
- Have good internal linking
- Use proper heading structure
- Optimize images (compress, add alt text)
- Add schema markup (already done ✓)
- Keep site speed fast
- Build quality backlinks

---

## Monitoring Checklist

### Daily (First Week)
- [ ] Check GSC for new errors
- [ ] Submit 10 priority pages for indexing
- [ ] Monitor server response times

### Weekly
- [ ] Review Coverage Report in GSC
- [ ] Check for new 404s or redirects
- [ ] Analyze Performance Report
- [ ] Update sitemap if needed

### Monthly
- [ ] Full site audit
- [ ] Content quality review
- [ ] Backlink analysis
- [ ] Competitor analysis

---

## Quick Wins (Do These First) 🚀

1. **Add Internal Links to Footer**
   - Top 20 cities
   - All categories
   - Important tools (calculator, subsidy)

2. **Create Category Hub Pages**
   - `/categories/residential-installers` with list of all cities
   - `/categories/commercial-installers` with list of all cities
   - etc.

3. **Add "Popular Searches" Section**
   - "Solar in Mumbai"
   - "Best solar installer Delhi"
   - "Solar panel price Bangalore"

4. **Improve Meta Descriptions**
   - Ensure every page has unique meta description
   - Include target keywords
   - Keep under 160 characters

5. **Add FAQ Schema to More Pages**
   - City pages
   - Category pages
   - Listing pages

---

## Success Metrics

Track these in Google Search Console:

1. **Indexed Pages** - Goal: >1,000 pages in 30 days
2. **Impressions** - Goal: 10,000+/month
3. **Clicks** - Goal: 500+/month
4. **Average Position** - Goal: <20 for target keywords
5. **CTR** - Goal: >3%

---

## Need Help?

If indexing doesn't improve after 2 weeks:
1. Check for manual actions in GSC
2. Verify Vercel deployment is working
3. Check for server errors (5xx)
4. Consider hiring SEO consultant
5. Submit to Google for review

---

**Last Updated:** March 2026
**Next Review:** Check weekly for first month
