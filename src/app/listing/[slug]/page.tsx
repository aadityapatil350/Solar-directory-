import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import StickyQuoteBar from '@/components/ui/StickyQuoteBar';
import ListingRow from '@/components/ui/ListingRow';
import FAQ from '@/components/ui/FAQ';
import { prisma } from '@/lib/prisma';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { CheckCircle, MapPin, Phone, Mail, Globe, Star } from 'lucide-react';
import { whatsappUrl as buildWhatsappUrl, telUrl, normalizeIndianPhone } from '@/lib/phone';
import { getStateSolarConfig } from '@/lib/solarConfig';

export const revalidate = 3600;    // ISR — revalidate every hour
export const dynamicParams = true; // serve new slugs on-demand

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toWhatsApp(phone: string | null, companyName: string, categoryName: string): string | null {
  return buildWhatsappUrl(
    phone,
    `Hi ${companyName}, I found your listing on GoSolarIndex and would like to enquire about your ${categoryName} services.`,
  );
}

function toGoogleMapsEmbed(address: string | null, name: string, city: string, state: string): string {
  const query = encodeURIComponent(`${address || name} ${city} ${state} India`);
  return `https://maps.google.com/maps?q=${query}&output=embed&z=15`;
}

// Parse service tags JSON
function parseServiceTags(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.tags) ? parsed.tags : [];
    return arr.filter((t: unknown): t is string => typeof t === 'string' && t.trim().length > 0);
  } catch {
    return [];
  }
}

// Substantive, per-listing description
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateListingDescription(listing: any, peerStats?: { count: number; avgRating: number | null }): string {
  const city: string = listing.location.city;
  const state: string = listing.location.state;
  const catName: string = listing.category.name;
  const cat = catName.toLowerCase();
  const isMaintenance = /maintenance|amc|cleaning/i.test(catName);
  const s: string[] = [];

  s.push(`${listing.name} is a ${listing.verified ? 'verified ' : ''}${cat} operating in ${city}, ${state}.`);

  if (listing.address) {
    s.push(`The office is located at ${listing.address}.`);
  }

  const rating = listing.rating as number | null;
  if (listing.reviews > 0 && rating) {
    const tier = rating >= 4.5 ? 'an excellent' : rating >= 4 ? 'a strong' : rating >= 3 ? 'a mixed' : 'a';
    s.push(`The company holds ${tier} ${rating.toFixed(1)}/5 rating across ${listing.reviews} Google review${listing.reviews === 1 ? '' : 's'}.`);
  } else {
    s.push(`This listing has not recorded public Google reviews yet.`);
  }

  if (peerStats && peerStats.count > 0) {
    if (peerStats.avgRating != null && rating) {
      const cmp = rating > peerStats.avgRating ? 'above' : rating < peerStats.avgRating ? 'below' : 'in line with';
      s.push(`This is one of ${peerStats.count} verified ${cat} listed in ${city}, rated ${cmp} the local average of ${peerStats.avgRating.toFixed(1)}/5.`);
    } else {
      s.push(`This is one of ${peerStats.count} verified ${cat} listed in ${city} on GoSolarIndex.`);
    }
  }

  const tags = parseServiceTags(listing.serviceTags).slice(0, 6);
  if (tags.length) {
    s.push(`Core capabilities include ${tags.join(', ')}.`);
  }

  const stats: string[] = [];
  if (listing.yearsExperience) stats.push(`${listing.yearsExperience} years of operational experience`);
  if (listing.installationsCount) stats.push(`${listing.installationsCount}+ completed installations`);
  if (listing.capacityMw) stats.push(`${listing.capacityMw} MW total capacity commissioned`);
  if (listing.citiesCount) stats.push(`service coverage across ${listing.citiesCount}+ cities`);
  if (stats.length) s.push(`Self-reported milestones: ${stats.join(', ')}.`);

  const channels = [
    listing.phone ? 'phone' : null,
    listing.email ? 'email' : null,
    listing.website ? 'official website' : null,
  ].filter(Boolean) as string[];
  const work = isMaintenance
    ? 'solar panel maintenance and cleaning'
    : 'rooftop solar installation, net metering, and subsidy documentation';
  s.push(
    channels.length
      ? `Homeowners and commercial facilities in ${city} can connect via ${channels.join(', ')} for quotes on ${work}.`
      : `Contact ${listing.name} directly for inquiries on ${work} in ${city}.`,
  );

  return s.join(' ');
}

// ─── Data fetching with caching ────────────────────────────────────────────────

const getListing = unstable_cache(
  async (slug: string) => {
    try {
      const listing = await prisma.listing.findUnique({
        where: { slug },
        include: {
          category: true,
          location: true,
        },
      });
      return listing;
    } catch (e) {
      console.error(`Database error fetching listing ${slug}:`, e);
      return null;
    }
  },
  ['listing-detail-v2'],
  { revalidate: 3600, tags: ['listings'] }
);

const getRelated = unstable_cache(
  async (categoryId: string, locationId: string, currentId: string) => {
    try {
      return await prisma.listing.findMany({
        where: {
          categoryId,
          locationId,
          id: { not: currentId },
        },
        include: {
          category: true,
          location: true,
        },
        take: 3,
        orderBy: [{ verified: 'desc' }, { rating: 'desc' }],
      });
    } catch {
      return [];
    }
  },
  ['listing-related-v2'],
  { revalidate: 3600 }
);

const getCategoryLocationStats = unstable_cache(
  async (categoryId: string, locationId: string, excludeId: string) => {
    try {
      const [count, aggregate] = await Promise.all([
        prisma.listing.count({
          where: { categoryId, locationId },
        }),
        prisma.listing.aggregate({
          where: {
            categoryId,
            locationId,
            id: { not: excludeId },
            rating: { not: null },
          },
          _avg: { rating: true },
        }),
      ]);
      return {
        count,
        avgRating: aggregate._avg.rating ?? null,
      };
    } catch {
      return undefined;
    }
  },
  ['listing-peer-stats-v2'],
  { revalidate: 3600 }
);

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return { title: 'Listing Not Found | GoSolarIndex' };
  }

  const canonicalUrl = `https://gosolarindex.in/listing/${slug}`;
  const isThinContent =
    !listing.description &&
    !listing.userId &&
    !listing.phone &&
    !listing.address &&
    (listing.reviews ?? 0) === 0;

  return constructMetadata({
    title: `${listing.name}, ${listing.location.city} — Reviews, Phone, Services | GoSolarIndex`,
    description: `Verified details, phone number, services, and PM Surya Ghar subsidy eligibility for ${listing.name} in ${listing.location.city}.`,
    path: `/listing/${slug}`,
    canonicalUrl: canonicalUrl,
    noindex: isThinContent,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    const baseSlug = slug.replace(/-\d{1,2}$/, '');
    if (baseSlug !== slug) {
      const primaryListing = await prisma.listing.findUnique({
        where: { slug: baseSlug },
        select: { slug: true }
      });
      if (primaryListing) {
        permanentRedirect(`/listing/${baseSlug}`);
      }
    }
    notFound();
  }

  const related = await getRelated(listing.categoryId, listing.locationId, listing.id);
  const peerStats = (!listing.userId && !listing.featured)
    ? await getCategoryLocationStats(listing.categoryId, listing.locationId, listing.id)
    : undefined;

  const whatsappUrl = toWhatsApp(listing.phone, listing.name, listing.category?.name);
  const phoneNormalized = normalizeIndianPhone(listing.phone);
  const telHref = telUrl(listing.phone);
  const mapSrc = toGoogleMapsEmbed(listing.address, listing.name, listing.location.city, listing.location.state);
  const serviceTags = parseServiceTags((listing as { serviceTags?: string | null }).serviceTags);

  const cityName = listing.location.city;
  const stateName = listing.location.state;
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
  const stateConfig = getStateSolarConfig(stateName);

  // Business-specific FAQs
  const businessFaqs = [
    {
      q: `Where is ${listing.name} located in ${cityName}?`,
      a: listing.address
        ? `${listing.name} is located at ${listing.address}, ${cityName}, ${stateName}. See the embedded map for precise location.`
        : `${listing.name} serves ${cityName} and surrounding areas across ${stateName}. Contact their office for exact regional coverage.`,
    },
    {
      q: `Does ${listing.name} assist with PM Surya Ghar subsidy paperwork?`,
      a: `Most registered installers in ${stateName} handle PM Surya Ghar portal submission and net metering liaison with ${stateConfig.discoms[0] || 'the local DISCOM'}. For residential systems, the central subsidy is up to ₹78,000 for 3 kW.`,
    },
    {
      q: `How do I contact ${listing.name} for a site visit?`,
      a: listing.phone
        ? `You can call ${phoneNormalized.e164 || listing.phone} or send an enquiry via the form on this page to request a roof inspection and pricing quote.`
        : `Submit your details through the quote form on this page to request a callback from their technical team.`,
    },
    {
      q: `What warranty coverage applies to solar installations in ${cityName}?`,
      a: `Standard MNRE ALMM solar panels carry a 10–12 year product warranty and 25-year performance output guarantee (80%+). Reputed inverters include a 5–10 year manufacturer warranty. Always verify workmanship warranty in the written contract.`,
    },
  ];

  // Schema.org structured data
  const siteUrl = 'https://gosolarindex.in';
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description || undefined,
    url: listing.website || `${siteUrl}/listing/${listing.slug}`,
    telephone: phoneNormalized.e164 || undefined,
    email: listing.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address || undefined,
      addressLocality: cityName,
      addressRegion: stateName,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates' },
    aggregateRating: listing.reviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: listing.rating,
      reviewCount: listing.reviews,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    areaServed: stateName,
    serviceType: listing.category.name,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: stateName, item: `${siteUrl}/states/${stateSlug}` },
      { '@type': 'ListItem', position: 3, name: cityName, item: `${siteUrl}/${citySlug}` },
      { '@type': 'ListItem', position: 4, name: listing.name, item: `${siteUrl}/listing/${listing.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: businessFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: stateName, href: `/states/${stateSlug}` },
              { label: cityName, href: `/${citySlug}` },
              { label: listing.name },
            ]}
          />
        </div>
      </div>

      {/* ── HEADER / HERO (White, left aligned, big Ink headline) ── */}
      <section className="border-b border-line bg-paper py-8">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 max-w-3xl">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight">
                {listing.name}
              </h1>

              <p className="text-base text-ink-2 mt-2 leading-relaxed font-body">
                {listing.description || `${listing.category.name} serving ${cityName}, ${stateName}.`}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-ink font-body">
                {listing.verified ? (
                  <span className="font-semibold flex items-center gap-1 text-ink">
                    <CheckCircle className="h-3.5 w-3.5 stroke-[2.5]" />
                    Owner verified
                  </span>
                ) : (
                  <span className="text-ink-2">Listed from public register</span>
                )}

                {listing.rating != null && listing.reviews > 0 && (
                  <span className="text-ink-2">
                    · ★ <strong className="text-ink font-semibold">{listing.rating.toFixed(1)}</strong> ({listing.reviews} Google review{listing.reviews === 1 ? '' : 's'})
                  </span>
                )}

                <span>· {cityName}, {stateName}</span>
              </div>
            </div>

            {/* Action row (Call, WhatsApp, Website, plus ONE Sun "Get quote") */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {telHref && (
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center h-11 px-5 border-[1.5px] border-ink text-ink font-medium text-sm rounded-sm hover:bg-wash transition-colors"
                >
                  Call
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-5 border-[1.5px] border-ink text-ink font-medium text-sm rounded-sm hover:bg-wash transition-colors"
                >
                  WhatsApp
                </a>
              )}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-5 border border-line text-ink font-medium text-sm rounded-sm hover:bg-wash transition-colors"
                >
                  Website
                </a>
              )}
              <a
                href="#quote"
                className="inline-flex items-center justify-center h-11 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Get quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN MAIN CONTENT ── */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── LEFT COLUMN (Details, FactPanel, Services, Reviews, Map, Related) ── */}
          <div className="lg:col-span-8 space-y-10">

            {/* Overview / Description */}
            <section className="bg-wash border border-line rounded-sm p-6">
              <h2 className="font-heading font-semibold text-lg text-ink mb-2">
                About {listing.name}
              </h2>
              <p className="text-[15px] text-ink-2 leading-relaxed font-body">
                {generateListingDescription(listing, peerStats)}
              </p>
            </section>

            {/* Fact Panel: City Solar Context */}
            <section>
              <FactPanel
                title={`Solar in ${cityName}: tariffs and subsidy benchmark`}
                rows={[
                  { label: 'Primary DISCOM utility', value: stateConfig.discoms[0] || 'State Distribution Utility' },
                  { label: 'PM Surya Ghar central subsidy (3 kW)', value: '₹78,000' },
                  { label: 'Estimated 3 kW gross system cost', value: '₹1,95,000' },
                  { label: 'Net homeowner investment', value: '₹1,17,000', total: true },
                  { label: 'Estimated monthly generation', value: '~360 units' },
                  { label: 'Estimated payback period', value: '3.2 years' },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE), PM Surya Ghar National Portal, state electricity regulatory commission tariffs 2026."
              />
            </section>

            {/* Services Offered */}
            {serviceTags.length > 0 && (
              <section>
                <h2 className="font-heading font-semibold text-xl text-ink mb-3">
                  Services offered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-wash border border-line text-ink px-3 py-1.5 rounded-sm font-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-xl text-ink mb-3">
                Customer reviews
              </h2>

              {listing.rating != null && listing.reviews > 0 ? (
                <div className="border border-line rounded-sm p-5 bg-paper flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-2xl text-ink">
                        {listing.rating.toFixed(1)}
                      </span>
                      <div className="flex items-center text-sun">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${s <= Math.round(listing.rating ?? 0) ? 'fill-current' : 'text-line'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-ink-2 font-body">
                        ({listing.reviews} verified Google review{listing.reviews === 1 ? '' : 's'})
                      </span>
                    </div>
                    <p className="text-xs text-ink-2 mt-1 font-body">
                      Ratings sourced from public Google Maps profile for {listing.name} in {cityName}.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${cityName}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 px-4 border border-line text-ink text-xs font-medium rounded-sm hover:bg-wash transition-colors shrink-0"
                  >
                    Read on Google Maps
                  </a>
                </div>
              ) : (
                <div className="border border-dashed border-line rounded-sm p-6 text-center bg-wash">
                  <p className="text-sm font-medium text-ink">Be the first to review {listing.name}</p>
                  <p className="text-xs text-ink-2 mt-1 max-w-md mx-auto">
                    Have you installed solar with this company? Request a review link or verify your installation invoice.
                  </p>
                </div>
              )}
            </section>

            {/* Location & Map */}
            <section className="border-t border-line pt-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading font-semibold text-xl text-ink">
                  Location
                </h2>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${cityName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-ink underline hover:text-ink/80 font-body"
                >
                  Open in Google Maps
                </a>
              </div>

              {listing.address && (
                <p className="text-sm text-ink-2 mb-3 flex items-start gap-1.5 font-body">
                  <MapPin className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                  <span>{listing.address}</span>
                </p>
              )}

              <div className="border border-line rounded-sm overflow-hidden h-[300px] bg-wash">
                <iframe
                  title={`${listing.name} map`}
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>

            {/* Other Installers in City (3 rows) */}
            {related.length > 0 && (
              <section className="border-t border-line pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-semibold text-xl text-ink">
                    Other installers in {cityName}
                  </h2>
                  <Link
                    href={`/${citySlug}`}
                    className="text-xs text-ink underline hover:text-ink/80 font-body"
                  >
                    All {cityName} installers
                  </Link>
                </div>

                <div className="border-t border-line">
                  {related.map((r) => (
                    <ListingRow
                      key={r.id}
                      listing={{
                        name: r.name,
                        slug: r.slug,
                        city: r.location.city,
                        state: r.location.state,
                        category: r.category.name,
                        rating: r.rating,
                        reviews: r.reviews,
                        phone: r.phone,
                        website: r.website,
                        verified: r.verified,
                        featured: r.featured,
                        description: r.description,
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Business FAQs */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-xl text-ink mb-4">
                Frequently asked questions
              </h2>
              <FAQ items={businessFaqs} />
            </section>

          </div>

          {/* ── RIGHT COLUMN (Quote Form, Business Details, Claim) ── */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* Lead Form Box */}
            <LeadForm
              prefill={{
                requirement: listing.category.name,
                city: cityName,
              }}
              source={`listing:${listing.slug}`}
            />

            {/* Business Details Register Box */}
            <div className="border border-line rounded-sm p-5 bg-paper space-y-3 font-body text-xs">
              <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                Company record
              </h3>

              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-ink-2">Category</span>
                <span className="text-ink font-medium text-right">{listing.category.name}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-ink-2">City</span>
                <Link href={`/${citySlug}`} className="text-ink font-medium underline">
                  {cityName}
                </Link>
              </div>

              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-ink-2">State</span>
                <Link href={`/states/${stateSlug}`} className="text-ink font-medium underline">
                  {stateName}
                </Link>
              </div>

              {telHref && (
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-2">Phone</span>
                  <a href={telHref} className="text-ink font-medium underline tabular-nums">
                    {phoneNormalized.e164 || listing.phone}
                  </a>
                </div>
              )}

              {listing.email && (
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-2">Email</span>
                  <a href={`mailto:${listing.email}`} className="text-ink font-medium underline break-all">
                    {listing.email}
                  </a>
                </div>
              )}

              {listing.website && (
                <div className="flex justify-between py-1">
                  <span className="text-ink-2">Website</span>
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium underline break-all"
                  >
                    {listing.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>

            {/* Claim Listing Box */}
            {!listing.userId && (
              <div className="border border-line rounded-sm p-5 bg-wash font-body">
                <h3 className="font-heading font-semibold text-sm text-ink mb-1">
                  Are you the owner of {listing.name}?
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed mb-3">
                  Claim this public record to update your contact details, service area, and receive verified homeowner inquiries.
                </p>
                <Link
                  href={`/for-installers?claim=${listing.slug}`}
                  className="inline-flex items-center justify-center w-full h-10 border border-ink text-ink font-medium text-xs rounded-sm hover:bg-paper transition-colors"
                >
                  Claim listing free
                </Link>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />

      {/* Mobile Sticky Quote Bar */}
      <StickyQuoteBar
        telHref={telHref}
        companyName={listing.name.split(' ')[0]}
        quoteHref="#quote"
      />
    </div>
  );
}
