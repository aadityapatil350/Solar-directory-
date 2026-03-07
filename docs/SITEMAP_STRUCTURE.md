# Sitemap Structure - GoSolarIndex

**Last Updated:** March 7, 2026  
**Sitemap URL:** https://gosolarindex.in/sitemap.xml

---

## All Pages Included in Sitemap

### 1. Static Pages (13 pages)

| Page | URL | Priority | Change Frequency |
|------|-----|----------|------------------|
| Homepage | `/` | 1.0 | Daily |
| Solar Calculator | `/solar-calculator` | 0.9 | Monthly |
| Subsidy Checker | `/subsidy-checker` | 0.9 | Monthly |
| Categories Index | `/categories` | 0.8 | Weekly |
| Locations Index | `/locations` | 0.8 | Weekly |
| Blog Index | `/blog` | 0.8 | Daily |
| Installer Signup | `/installers/signup` | 0.7 | Monthly |
| Pricing | `/pricing` | 0.6 | Monthly |
| About | `/about` | 0.5 | Monthly |
| Contact | `/contact` | 0.5 | Monthly |
| Installer Login | `/installers/login` | 0.3 | Yearly |

---

## 2. Dynamic Pages

### City Pages (78 cities)
**URL Pattern:** `/{city-slug}`

**Top 10 Metro Cities** (Priority 0.9):
- Mumbai (`/mumbai`)
- Delhi (`/delhi`)
- Bangalore (`/bangalore`)
- Pune (`/pune`)
- Hyderabad (`/hyderabad`)
- Chennai (`/chennai`)
- Kolkata (`/kolkata`)
- Ahmedabad (`/ahmedabad`)
- Jaipur (`/jaipur`)
- Lucknow (`/lucknow`)

**Other Cities** (Priority 0.7):
- All other 68 cities with lower traffic but still important

**Change Frequency:** Weekly

---

### State Pages (20 states)
**URL Pattern:** `/states/{state-slug}`

**All States** (Priority 0.7):
- Gujarat (`/states/gujarat`)
- Maharashtra (`/states/maharashtra`)
- Karnataka (`/states/karnataka`)
- Rajasthan (`/states/rajasthan`)
- Tamil Nadu (`/states/tamil-nadu`)
- Delhi (`/states/delhi`)
- West Bengal (`/states/west-bengal`)
- Uttar Pradesh (`/states/uttar-pradesh`)
- Bihar (`/states/bihar`)
- Madhya Pradesh (`/states/madhya-pradesh`)
- ...and 10 more states

**Change Frequency:** Weekly

---

### Category Pages (5 categories)
**URL Pattern:** `/categories/{category-slug}`

**All Categories** (Priority 0.6):
- Residential Installers (`/categories/residential-installers`)
- Commercial Installers (`/categories/commercial-installers`)
- Solar Panel Dealers (`/categories/solar-dealers`)
- Inverter Specialists (`/categories/inverter-specialists`)
- AMC & Maintenance (`/categories/maintenance-services`)

**Change Frequency:** Monthly

---

### Blog Posts (~85 posts)
**URL Pattern:** `/blog/{post-slug}`

**All Blog Posts** (Priority 0.7):
- Recent SEO-optimized articles
- State-specific subsidy guides
- Product buying guides
- Installation guides
- Policy updates

**Change Frequency:** Monthly

---

### Listing Pages (~89 listings)
**URL Pattern:** `/listing/{listing-slug}`

**Priority Tiers:**
- **0.7** - Verified + Featured listings (highest quality)
- **0.6** - Verified OR Featured listings (good quality)
- **0.5** - Standard listings (basic quality)

**Change Frequency:** Weekly

---

## Priority Strategy

### Priority Levels Explained:

| Priority | Meaning | Pages |
|----------|---------|-------|
| 1.0 | Critical - Homepage only | 1 page |
| 0.9 | Very High - Tools + Top Cities | 12 pages |
| 0.8 | High - Directory hubs | 3 pages |
| 0.7 | Medium-High - Content pages | ~120 pages |
| 0.6 | Medium - Category pages, good listings | ~10 pages |
| 0.5 | Standard - Basic content | ~70 pages |
| 0.3 | Low - Login/utility pages | 1 page |

---

## Change Frequency Strategy

| Frequency | Type | Reasoning |
|-----------|------|-----------|
| **Daily** | Homepage, Blog index | New listings, new posts |
| **Weekly** | Cities, States, Listings | Listing updates, reviews |
| **Monthly** | Tools, Static pages, Blog posts | Content updates |
| **Yearly** | Login pages | Rarely change |

---

## SEO Benefits

### ✅ What This Sitemap Does:

1. **Comprehensive Coverage** - All 200+ pages indexed
2. **Smart Prioritization** - Google knows what's most important
3. **Fresh Content Signals** - lastModified dates for each page
4. **Crawl Efficiency** - changeFrequency helps Google allocate crawl budget
5. **Geographic Coverage** - Cities + States for local SEO
6. **Quality Signals** - Higher priority for verified/featured listings

### 📊 Expected Indexing:

| Timeframe | Expected Indexed Pages | Notes |
|-----------|------------------------|-------|
| Week 1 | ~50 pages | Critical + high priority |
| Week 2 | ~100 pages | After manual GSC submissions |
| Week 3 | ~150 pages | As Google discovers links |
| Week 4 | ~200+ pages | Full site indexed |

---

## Google Search Console Actions

### 1. Verify Sitemap Submission
- URL: https://gosolarindex.in/sitemap.xml
- Status: Should show "Success" in GSC
- Last Read: Check timestamp

### 2. Monitor Coverage
- GSC → Pages → Sitemaps tab
- Check "Discovered URLs" count
- Check "Indexed URLs" count

### 3. Manual Submissions
Use `scripts/priority-urls.txt` to submit top 44 URLs manually:
- Submit 10 URLs per day via URL Inspection tool
- Start with Priority 1.0, then 0.9, then 0.8, etc.

---

## Technical Details

### Sitemap File:
- **Location:** `src/app/sitemap.ts`
- **Type:** Dynamic (generated at build time)
- **Format:** XML (Next.js MetadataRoute.Sitemap)
- **Max URLs:** 5,000 listings + unlimited static/dynamic pages

### Generation:
- Queries database for latest data
- Includes actual `updatedAt` timestamps
- Filters blog posts by `published: true`
- Deduplicates states from locations

---

## Maintenance

### When to Update:

1. **Add New Pages** - Update `sitemap.ts` to include new route patterns
2. **Change Priorities** - Adjust based on traffic analytics
3. **New Content Types** - Add new sections (e.g., reviews, forums)

### Automatic Updates:

The sitemap automatically reflects:
- ✅ New listings added to database
- ✅ New blog posts published
- ✅ New cities/states in database
- ✅ Updated timestamps on all content

No manual intervention needed for data changes!

---

**Generated by:** GoSolarIndex SEO Team  
**Sitemap Format:** Next.js 16 App Router Dynamic Sitemap  
**Validation:** https://www.xml-sitemaps.com/validate-xml-sitemap.html
