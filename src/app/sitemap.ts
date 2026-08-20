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
      // Only include listings with at least a phone or an address — otherwise thin.
      where: {
        OR: [
          { phone: { not: null } },
          { address: { not: null } },
        ],
      },
      select: {
        slug: true,
        updatedAt: true,
        featured: true,
        verified: true,
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

  // Static pages
  const staticPages: Array<{ path: string; priority: number }> = [
    { path: '',                    priority: 1.0 },
    { path: '/solar-calculator',   priority: 0.9 },
    { path: '/subsidy-checker',    priority: 0.9 },
    { path: '/categories',         priority: 0.8 },
    { path: '/locations',          priority: 0.8 },
    { path: '/blog',               priority: 0.8 },
    { path: '/pricing',            priority: 0.6 },
    { path: '/about',              priority: 0.5 },
    { path: '/contact',            priority: 0.5 },
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
    // City × service pages — cleaning is the highest-ROI cluster per GSC.
    pages.push({
      url: `${BASE_URL}/${citySlug}/solar-panel-cleaning`,
      lastModified: now,
      priority: TOP_CITIES.has(citySlug) ? 0.9 : 0.7,
    });
  }

  // State pages (all unique states)
  const uniqueStates = Array.from(new Set(locations.map((l) => l.state)));
  for (const state of uniqueStates) {
    const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
    pages.push({
      url: `${BASE_URL}/states/${stateSlug}`,
      lastModified: now,
      priority: 0.7,
    });
  }

  // Listing detail pages — critical for indexing since they drive most search impressions.
  for (const listing of listings) {
    pages.push({
      url: `${BASE_URL}/listing/${listing.slug}`,
      lastModified: listing.updatedAt.toISOString(),
      priority: listing.featured ? 0.9 : listing.verified ? 0.7 : 0.5,
    });
  }

  return pages;
}
