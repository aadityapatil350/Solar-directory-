import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import LeadForm from '@/components/LeadForm';
import ServicesSection from '@/components/ServicesSection';
import PhotoGalleryModal from '@/components/PhotoGalleryModal';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import {
  Phone, Mail, Globe, MapPin, Star, ShieldCheck,
  ChevronRight, Zap,
  CheckCircle, Building2, Users,
  MessageCircle, TrendingUp,
} from 'lucide-react';
import Script from 'next/script';

export const revalidate = 3600;    // ISR — revalidate every hour
export const dynamicParams = true; // serve new slugs on-demand

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function toWhatsApp(phone: string | null, companyName: string, categoryName: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  const withCC = digits.length === 10 ? `91${digits}` : digits.startsWith('91') ? digits : `91${digits}`;
  const text = encodeURIComponent(
    `Hi ${companyName}, I found your listing on GoSolarIndex and would like to enquire about your ${categoryName} services.`,
  );
  return `https://wa.me/${withCC}?text=${text}`;
}

function toYouTubeEmbed(url: string | null): string | null {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  if (url.includes('/embed/')) return url;
  return null;
}

function toGoogleMapsEmbed(address: string | null, name: string, city: string, state: string): string {
  const query = encodeURIComponent(`${address || name} ${city} ${state} India`);
  return `https://maps.google.com/maps?q=${query}&output=embed&z=15`;
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
          images: {
            orderBy: { order: 'asc' },
            take: 10,
          },
        },
      });

      // TODO: Uncomment after running database migration (see MIGRATION_REQUIRED.md)
      // Hide test listings from public (they'll only be accessible to admins via direct access)
      // if (listing && listing.isTest) {
      //   return null;
      // }

      if (listing) {
        prisma.listing.update({
          where: { id: listing.id },
          data: { views: { increment: 1 } },
        }).catch(() => {});
      }
      return listing;
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  },
  ['listing-detail'],
  { revalidate: 300, tags: ['listings'] }
);

const getRelated = unstable_cache(
  async (categoryId: string, locationId: string, excludeId: string) => {
    try {
      const listings = await prisma.listing.findMany({
        where: { categoryId, locationId, id: { not: excludeId } },
        orderBy: [{ featured: 'desc' }, { verified: 'desc' }],
        take: 4,
        select: {
          id: true,
          name: true,
          slug: true,
          phone: true,
          rating: true,
          reviews: true,
          featured: true,
        },
      });
      return listings;
    } catch (error) {
      console.error('Error fetching related listings:', error);
      return [];
    }
  },
  ['related-listings'],
  { revalidate: 600, tags: ['listings'] }
);

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};
  return constructMetadata({
    title: `${listing.name} — ${listing.category.name} in ${listing.location.city}`,
    description: `${listing.name} is a ${listing.category.name.toLowerCase()} in ${listing.location.city}, ${listing.location.state}. ${listing.description?.slice(0, 120) || 'Get a free quote today.'}`,
    path: `/listing/${slug}`,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();

  const related = await getRelated(listing.categoryId, listing.locationId, listing.id);
  const whatsappUrl = toWhatsApp(listing.phone, listing.name, listing.category?.name);
  const mapSrc = toGoogleMapsEmbed(listing.address, listing.name, listing.location.city, listing.location.state);
  const initials = getInitials(listing.name);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listingImages: { id: string; url: string }[] = (listing as any).images ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const youtubeEmbedUrl = toYouTubeEmbed((listing as any).youtubeUrl ?? null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let serviceTags: string[] = [];
  try {
    const raw = (listing as any).serviceTags;
    if (raw) {
      const parsed = JSON.parse(raw);
      serviceTags = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.tags) ? parsed.tags : []);
    }
  } catch { /* ignore */ }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const installationsCount = (listing as any).installationsCount;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yearsExperience = (listing as any).yearsExperience;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const capacityMw = (listing as any).capacityMw;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const citiesCount = (listing as any).citiesCount;

  const listedYear = new Date(listing.createdAt).getFullYear();

  const siteUrl = 'https://www.gosolarindex.in';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description || undefined,
    url: listing.website || `${siteUrl}/listing/${listing.slug}`,
    telephone: listing.phone || undefined,
    email: listing.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address || undefined,
      addressLocality: listing.location.city,
      addressRegion: listing.location.state,
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
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    areaServed: listing.location.state,
    serviceType: listing.category.name,
    hasMap: `https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: listing.category.name, item: `${siteUrl}/categories/${listing.category.slug ?? ''}` },
      { '@type': 'ListItem', position: 3, name: listing.name, item: `${siteUrl}/listing/${listing.slug}` },
    ],
  };

  // Show only first 12 services initially
  const visibleServices = serviceTags.slice(0, 12);
  const hiddenServices = serviceTags.slice(12);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Script id="lb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="bc-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/categories/${listing.category.slug ?? ''}`} className="hover:text-orange-500 transition">
              {listing.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate max-w-48">{listing.name}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-5">
            {/* Avatar - 72x72, rounded-2xl */}
            <div className="w-18 h-18 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white shrink-0 border border-white/30">
              {initials}
            </div>

            {/* Center block - flex-1 */}
            <div className="flex-1 min-w-0">
              {/* Business name */}
              <h1 className="text-2xl font-medium text-white mb-2">{listing.name}</h1>

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {listing.featured && (
                  <span className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-300/40 text-yellow-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-300" /> Featured
                  </span>
                )}
                {listing.verified && (
                  <span className="flex items-center gap-1 bg-green-400/20 border border-green-300/40 text-green-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </span>
                )}
                <span className="flex items-center gap-1 bg-blue-400/20 border border-blue-300/40 text-blue-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" /> MNRE Certified
                </span>
              </div>

              {/* Subtitle row */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/85">
                <span>{listing.category.name}</span>
                <span>·</span>
                <span>{listing.location.city}</span>
                {listing.rating != null && listing.reviews > 0 && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                      {listing.rating} ({listing.reviews} reviews)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right block - stacked buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="flex items-center justify-center gap-2 bg-white text-orange-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/15 text-white font-bold text-sm px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/25 transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-6 pt-3 border-t border-white/12 bg-black/12 -mx-4 px-4 sm:mx-0 sm:px-8 py-2.5 rounded-b-lg">
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Responds within 24 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Accepts UPI, Cash, Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                <span>Listed since {listedYear}</span>
              </div>
              {yearsExperience && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>{yearsExperience} years experience</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── LEFT COLUMN (Main Content) ── */}
            <div className="flex-1 space-y-6">

              {/* Section 1 — About */}
              {listing.description && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-3">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    <h2>About</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{listing.description}</p>
                </div>
              )}

              {/* Section 2 — At a Glance */}
              {(installationsCount || yearsExperience || capacityMw || citiesCount) && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <h2>At a Glance</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {installationsCount && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{installationsCount}+</div>
                        <div className="text-xs text-gray-600 mt-0.5">Total Installations</div>
                      </div>
                    )}
                    {yearsExperience && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{yearsExperience}</div>
                        <div className="text-xs text-gray-600 mt-0.5">Years Experience</div>
                      </div>
                    )}
                    {capacityMw && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{capacityMw} MW</div>
                        <div className="text-xs text-gray-600 mt-0.5">Capacity Installed</div>
                      </div>
                    )}
                    {citiesCount && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{citiesCount}+</div>
                        <div className="text-xs text-gray-600 mt-0.5">Cities Serviceable</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 3 — Services Offered */}
              {serviceTags.length > 0 && (
                <ServicesSection services={serviceTags} />
              )}

              {/* Section 4 — Contact */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-4">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <h2>Contact</h2>
                </div>

                {/* CTA buttons row */}
                <div className="flex gap-2 mb-4">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-3 rounded-lg transition"
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  )}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm px-4 py-3 rounded-lg transition"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  )}
                </div>

                {/* Secondary actions */}
                <div className="flex gap-2 mb-4">
                  {listing.email && (
                    <a
                      href={`mailto:${listing.email}`}
                      className="flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  )}
                  <button className="flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition">
                    <Zap className="h-3.5 w-3.5" />
                    Get Quote
                  </button>
                </div>

                {/* Contact details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.address && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Address</div>
                        <div className="text-xs font-medium text-gray-900 leading-relaxed">{listing.address}</div>
                      </div>
                    </div>
                  )}
                  {listing.phone && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <Phone className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Phone</div>
                        <a href={`tel:${listing.phone}`} className="text-xs font-medium text-orange-600 hover:underline">{listing.phone}</a>
                      </div>
                    </div>
                  )}
                  {listing.email && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <Mail className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Email</div>
                        <a href={`mailto:${listing.email}`} className="text-xs font-medium text-gray-900 hover:text-orange-600 break-all">{listing.email}</a>
                      </div>
                    </div>
                  )}
                  {listing.website && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <Globe className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Website</div>
                        <a
                          href={listing.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-orange-600 hover:underline break-all"
                        >
                          {listing.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Claim this listing button */}
                {!listing.userId && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/claim/${listing.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition group"
                    >
                      <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">Own this business?</div>
                        <div className="text-xs text-gray-500">Claim your listing and manage it</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Section 5 — Photos */}
              {listingImages.length > 0 && (
                <PhotoGalleryModal photos={listingImages} listingName={listing.name} />
              )}


              {/* Section 6 — Location / Map */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <h2>Location</h2>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
                <iframe
                  title={`${listing.name} location map`}
                  src={mapSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="w-full lg:w-[340px] space-y-4 lg:sticky lg:top-4 lg:self-start">

              {/* Sidebar Card 1 — Lead Form */}
              <LeadForm
                prefill={{
                  requirement: listing.category.name,
                  city: listing.location?.city,
                }}
              />

              {/* Sidebar Card 2 — Business Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-[11px] font-medium text-gray-500 tracking-wider mb-3">BUSINESS DETAILS</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900 text-right">{listing.category.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">City</span>
                    <Link href={`/${listing.location.city.toLowerCase()}`} className="font-medium text-orange-600 hover:underline">
                      {listing.location.city}
                    </Link>
                  </div>
                  {listing.reviews > 0 && (
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-medium text-gray-900">
                        <Star className="h-3 w-3 inline fill-orange-400 text-orange-400" /> {listing.rating}/5 ({listing.reviews})
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Premium Partner
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Card 3 — More Installers */}
              {related.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-medium text-gray-500 tracking-wider mb-3">
                    MORE {listing.category.name.toUpperCase()} IN {listing.location.city.toUpperCase()}
                  </h3>
                  <div className="space-y-2">
                    {related.map((r: typeof related[0]) => (
                      <Link
                        key={r.id}
                        href={`/listing/${r.slug}`}
                        className="bg-white border border-gray-200 rounded-xl p-3 flex gap-3 hover:border-orange-300 hover:shadow-sm transition"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600 shrink-0">
                          {getInitials(r.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium text-gray-900 truncate">{r.name}</div>
                          <div className="text-[11px] text-gray-500">
                            {r.reviews > 0 && (
                              <>
                                <Star className="h-2.5 w-2.5 inline fill-orange-400 text-orange-400" /> {r.rating} ({r.reviews})
                              </>
                            )}
                            {r.phone && <> · {r.phone}</>}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <Link
                      href={`/${listing.location.city.toLowerCase()}`}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View all solar companies in {listing.location.city} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      {listing.phone && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-50 md:hidden">
          <a
            href={`tel:${listing.phone}`}
            className="flex-[2] flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-4 py-3 rounded-lg transition"
          >
            <Phone className="h-4 w-4" />
            Call {listing.name.split(' ')[0]}
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-4 py-3 rounded-lg transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  );
}
