import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import LeadForm from '@/components/LeadForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Phone, Mail, Globe, MapPin, Star, ShieldCheck,
  ChevronRight, MessageCircle, Clock, Award, Zap,
  CheckCircle, Building2, Users, Wrench,
} from 'lucide-react';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

// ─── Services mapped from category name ───────────────────────────────────────
const CATEGORY_SERVICES: Record<string, string[]> = {
  'Residential Installers': [
    'Rooftop Solar Installation',
    'Grid-Tied Solar Systems',
    'Off-Grid & Hybrid Systems',
    'Net Metering Setup',
    'PM Surya Ghar Subsidy Assistance',
    'Solar Financing & EMI Options',
    'Rooftop Assessment & Site Survey',
    'Solar Performance Monitoring',
  ],
  'Commercial Installers': [
    'Commercial & Industrial Solar',
    'Large-Scale Ground Mount Systems',
    'Power Purchase Agreements (PPA)',
    'Solar Energy Audits',
    'MNRE Approval Assistance',
    'EPC Turnkey Projects',
    'Open Access Solar',
    'Carbon Credit Advisory',
  ],
  'Solar Panel Dealers': [
    'Monocrystalline Solar Panels',
    'Polycrystalline Solar Panels',
    'Bifacial Solar Panels',
    'Panel Brand Consultation',
    'Bulk Supply for Installers',
    'Warranty & After-Sale Support',
    'Panel Performance Testing',
    'Import & Domestic Panels',
  ],
  'Inverter Specialists': [
    'Solar Inverter Installation',
    'String Inverter Supply & Service',
    'Micro-Inverter Systems',
    'Hybrid Inverter Setup',
    'MPPT Charge Controllers',
    'Inverter Repair & Replacement',
    'Battery Storage Integration',
    'Remote Monitoring Setup',
  ],
  'AMC & Maintenance': [
    'Annual Maintenance Contracts',
    'Solar Panel Cleaning',
    'Performance & Yield Monitoring',
    'Fault Detection & Repair',
    'Inverter Servicing',
    'String & Module Testing',
    'Warranty Claim Support',
    'System Efficiency Audits',
  ],
};

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
  // Ensure it has country code 91
  const withCC = digits.length === 10 ? `91${digits}` : digits.startsWith('91') ? digits : `91${digits}`;
  const text = encodeURIComponent(
    `Hi ${companyName}, I found your listing on GoSolarIndex and would like to enquire about your ${categoryName} services.`,
  );
  return `https://wa.me/${withCC}?text=${text}`;
}

function toGoogleMapsEmbed(address: string | null, name: string, city: string, state: string): string {
  const query = encodeURIComponent(`${address || name} ${city} ${state} India`);
  return `https://maps.google.com/maps?q=${query}&output=embed&z=15`;
}

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getListing(slug: string) {
  return prisma.listing.findUnique({
    where: { slug },
    include: { category: true, location: true },
  });
}

async function getRelated(categoryId: string, locationId: string, excludeId: string) {
  return prisma.listing.findMany({
    where: { categoryId, locationId, id: { not: excludeId } },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }],
    take: 3,
    include: { category: true, location: true },
  });
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};
  return constructMetadata({
    title: `${listing.name} — ${listing.category.name} in ${listing.location.city}`,
    description: `${listing.name} is a ${listing.verified ? 'verified ' : ''}${listing.category.name.toLowerCase()} in ${listing.location.city}, ${listing.location.state}. ${listing.description?.slice(0, 120) || 'Get a free quote today.'}`,
    path: `/listing/${slug}`,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();

  const related = await getRelated(listing.categoryId, listing.locationId, listing.id);
  const services = CATEGORY_SERVICES[listing.category.name] ?? [];
  const whatsappUrl = toWhatsApp(listing.phone, listing.name, listing.category.name);
  const mapSrc = toGoogleMapsEmbed(listing.address, listing.name, listing.location.city, listing.location.state);
  const initials = getInitials(listing.name);

  const siteUrl = 'https://gosolarindex.in';

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

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Initials avatar */}
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white shrink-0 border border-white/30">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{listing.name}</h1>
                {listing.verified && (
                  <span className="flex items-center gap-1 bg-green-400/20 border border-green-300/40 text-green-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                )}
                {listing.featured && (
                  <span className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-300/40 text-yellow-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-300" /> Featured
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-orange-100 text-sm">
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  {listing.category.name}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {listing.location.city}, {listing.location.state}
                </span>
                {listing.rating != null && listing.reviews > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                    {listing.rating} ({listing.reviews} reviews)
                  </span>
                )}
              </div>
            </div>
            {/* Quick CTA in hero */}
            {listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="shrink-0 bg-white text-orange-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Left Column ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* About */}
              {listing.description && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-orange-500" />
                    About {listing.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{listing.description}</p>
                </div>
              )}

              {/* Services */}
              {services.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-orange-500" />
                    Services Offered
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {services.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-orange-500" />
                  Contact Information
                </h2>
                <div className="space-y-3">
                  {listing.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-gray-800">{listing.address}</p>
                        <p className="text-gray-500 text-sm">{listing.location.city}, {listing.location.state}</p>
                      </div>
                    </div>
                  )}
                  {listing.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                      <a href={`tel:${listing.phone}`} className="text-gray-800 hover:text-orange-500 transition font-medium">
                        {listing.phone}
                      </a>
                    </div>
                  )}
                  {listing.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                      <a href={`mailto:${listing.email}`} className="text-gray-800 hover:text-orange-500 transition">
                        {listing.email}
                      </a>
                    </div>
                  )}
                  {listing.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-400 shrink-0" />
                      <a
                        href={listing.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 transition"
                      >
                        {listing.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-gray-100">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                  )}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  )}
                  {listing.email && (
                    <a
                      href={`mailto:${listing.email}`}
                      className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                      <Mail className="h-4 w-4" /> Email
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                      <Globe className="h-4 w-4" /> Website
                    </a>
                  )}
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="px-6 pt-5 pb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <h2 className="text-lg font-bold text-gray-900">Location</h2>
                </div>
                <iframe
                  title={`${listing.name} location map`}
                  src={mapSrc}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-100">
                  <p className="text-sm text-gray-500">{listing.location.city}, {listing.location.state}</p>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right Sidebar ── */}
            <div className="space-y-5">

              {/* Quick Info Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Business Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Category</span>
                    <span className="font-medium text-gray-800 text-right max-w-[140px]">{listing.category.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> City</span>
                    <Link href={`/${listing.location.city.toLowerCase()}`} className="font-medium text-orange-600 hover:underline">
                      {listing.location.city}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> State</span>
                    <span className="font-medium text-gray-800">{listing.location.state}</span>
                  </div>
                  {listing.reviews > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> Rating</span>
                      <span className="font-medium text-gray-800">{listing.rating} / 5 ({listing.reviews})</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Response</span>
                    <span className="font-medium text-gray-800">Within 24 hrs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Accepts</span>
                    <span className="font-medium text-gray-800">UPI, Cash, Bank</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  {listing.verified && (
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200">
                      <ShieldCheck className="h-3 w-3" /> Verified Business
                    </span>
                  )}
                  {listing.featured && (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                      <Award className="h-3 w-3" /> Premium Partner
                    </span>
                  )}
                  <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                    <CheckCircle className="h-3 w-3" /> Listed on GoSolarIndex
                  </span>
                </div>
              </div>

              {/* Lead Form */}
              <LeadForm
                prefill={{
                  requirement: listing.category.name,
                  city: listing.location?.city,
                }}
              />
            </div>
          </div>

          {/* ── Related Companies ── */}
          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                More {listing.category.name} in {listing.location.city}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/listing/${r.slug}`}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        {getInitials(r.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-orange-600 transition-colors truncate">
                          {r.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {r.verified && <ShieldCheck className="h-3.5 w-3.5 text-green-500" />}
                          {r.featured && <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-400" />}
                          {r.reviews > 0 && (
                            <span className="text-xs text-gray-500">{r.rating} ★ ({r.reviews})</span>
                          )}
                        </div>
                        {r.phone && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <Phone className="h-3 w-3" /> {r.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href={`/${listing.location.city.toLowerCase()}`}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  View all solar companies in {listing.location.city} →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
