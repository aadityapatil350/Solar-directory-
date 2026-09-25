import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const BASE_URL = 'https://gosolarindex.in';

// City slugs that get bumped priority (top metros)
const TOP_CITIES = new Set([
  'mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad',
  'chennai', 'kolkata', 'ahmedabad', 'jaipur', 'lucknow',
]);

// A city with fewer than this many listings is a thin page — exclude from sitemap.
const MIN_LISTINGS_PER_CITY = 3;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, locations, blogPosts, listings, cityCounts] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.location.findMany({ select: { city: true, state: true, updatedAt: true } }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.listing.findMany({
      select: {
        slug: true,
        updatedAt: true,
        featured: true,
        verified: true,
        phone: true,
        address: true,
        reviews: true,
        description: true,
        userId: true,
        location: { select: { city: true } },
      },
    }),
    prisma.listing.groupBy({
      by: ['locationId'],
      _count: true,
    }),
  ]);

  const now = new Date().toISOString();
  const pages: MetadataRoute.Sitemap = [];

  // Static & Core Authority Hubs
  const staticPages: Array<{ path: string; priority: number }> = [
    { path: '',                                              priority: 1.0 },
    // Tools & Leads
    { path: '/get-quotes',                                   priority: 0.95 },
    { path: '/tools/solar-subsidy-calculator',               priority: 0.95 },
    { path: '/tools/solar-savings-calculator',               priority: 0.95 },
    { path: '/tools/solar-system-size-calculator',           priority: 0.95 },
    // Subsidy Hubs
    { path: '/subsidy',                                      priority: 0.9 },
    { path: '/subsidy/pm-surya-ghar',                        priority: 0.95 },
    { path: '/subsidy/pm-kusum',                             priority: 0.9 },
    // Price Hubs
    { path: '/price',                                        priority: 0.95 },
    { path: '/price/1kw',                                    priority: 0.85 },
    { path: '/price/2kw',                                    priority: 0.85 },
    { path: '/price/3kw',                                    priority: 0.9 },
    { path: '/price/5kw',                                    priority: 0.85 },
    { path: '/price/10kw',                                   priority: 0.85 },
    // Brands & Comparisons
    { path: '/brands',                                       priority: 0.9 },
    { path: '/compare/waaree-vs-vikram',                     priority: 0.85 },
    { path: '/compare/waaree-vs-tata',                       priority: 0.85 },
    { path: '/compare/tata-vs-adani',                        priority: 0.85 },
    { path: '/compare/waaree-vs-adani',                      priority: 0.85 },
    { path: '/compare/monocrystalline-vs-polycrystalline',   priority: 0.85 },
    { path: '/compare/on-grid-vs-off-grid-vs-hybrid',        priority: 0.85 },
    // DISCOM Hubs
    { path: '/discom',                                       priority: 0.9 },
    { path: '/discom/msedcl',                                priority: 0.85 },
    { path: '/discom/bescom',                                priority: 0.85 },
    { path: '/discom/tangedco',                              priority: 0.85 },
    { path: '/discom/pvvnl',                                 priority: 0.85 },
    { path: '/discom/dgvcl',                                 priority: 0.85 },
    { path: '/discom/bses-rajdhani',                         priority: 0.85 },
    { path: '/discom/tsspdcl',                               priority: 0.85 },
    { path: '/discom/kseb',                                  priority: 0.85 },
    // Guides & Directory
    { path: '/for-installers',                               priority: 0.85 },
    { path: '/guides/topcon-vs-mono-perc-solar-panels-india', priority: 0.8 },
    { path: '/guides/best-solar-panel-cleaning-kits-india',  priority: 0.8 },
    { path: '/guides/best-portable-solar-generators-india',  priority: 0.8 },
    { path: '/categories',                                   priority: 0.8 },
    { path: '/locations',                                    priority: 0.8 },
    { path: '/blog',                                         priority: 0.8 },
    { path: '/pricing',                                      priority: 0.6 },
    { path: '/about',                                        priority: 0.5 },
    { path: '/contact',                                      priority: 0.5 },
  ];

  for (const p of staticPages) {
    pages.push({ url: `${BASE_URL}${p.path}`, lastModified: now, priority: p.priority });
  }

  // Blog posts — real updatedAt
  for (const post of blogPosts) {
    pages.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt.toISOString(),
      priority: 0.7,
    });
  }

  // Category pages
  for (const category of categories) {
    pages.push({
      url: `${BASE_URL}/categories/${category.slug}`,
      lastModified: category.updatedAt.toISOString(),
      priority: 0.6,
    });
  }

  // City listing counts — used to exclude thin/empty city pages
  const locationIdToCount: Record<string, number> = {};
  for (const row of cityCounts) {
    locationIdToCount[row.locationId] = row._count;
  }
  const locationsWithId = await prisma.location.findMany({
    select: { id: true, city: true, state: true, updatedAt: true },
  });

  const includedCitySlugs = new Set<string>();
  for (const loc of locationsWithId) {
    const count = locationIdToCount[loc.id] ?? 0;
    if (count < MIN_LISTINGS_PER_CITY) continue;
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    if (includedCitySlugs.has(citySlug)) continue;
    includedCitySlugs.add(citySlug);

    pages.push({
      url: `${BASE_URL}/${citySlug}`,
      lastModified: loc.updatedAt.toISOString(),
      priority: TOP_CITIES.has(citySlug) ? 0.9 : 0.7,
    });

    // City × service pages
    pages.push({
      url: `${BASE_URL}/${citySlug}/solar-panel-cleaning`,
      lastModified: now,
      priority: TOP_CITIES.has(citySlug) ? 0.85 : 0.65,
    });
  }

  // State pages (all unique states)
  const uniqueStates = Array.from(new Set(locations.map((l) => l.state)));
  for (const state of uniqueStates) {
    const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
    pages.push({
      url: `${BASE_URL}/states/${stateSlug}`,
      lastModified: now,
      priority: 0.8,
    });
  }

  // Listing detail pages
  const allListingSlugs = new Set(listings.map((l) => l.slug));
  for (const listing of listings) {
    const isThin =
      !listing.description &&
      !listing.userId &&
      !listing.phone &&
      !listing.address &&
      (listing.reviews ?? 0) === 0;
    if (isThin) continue;

    const baseSlug = listing.slug.replace(/-\d{1,2}$/, '');
    if (baseSlug !== listing.slug && allListingSlugs.has(baseSlug)) continue;

    pages.push({
      url: `${BASE_URL}/listing/${listing.slug}`,
      lastModified: listing.updatedAt.toISOString(),
      priority: listing.featured ? 0.85 : listing.verified ? 0.75 : 0.6,
    });
  }

  return pages;
}
