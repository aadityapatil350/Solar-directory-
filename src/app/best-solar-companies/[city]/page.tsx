import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { whatsappUrl, telUrl } from '@/lib/phone';
import { Star, ShieldCheck, Award, Phone, MessageCircle, ChevronRight, MapPin, TrendingUp, CheckCircle } from 'lucide-react';

interface Props {
  params: Promise<{ city: string }>;
}

export const revalidate = 3600;

const MIN_LISTINGS_FOR_INDEX = 5;

function slugToSearch(slug: string) {
  return slug.replace(/-/g, ' ');
}

async function findCity(citySlug: string) {
  return prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });
}

async function findTopCompanies(cityId: string) {
  return prisma.listing.findMany({
    where: { locationId: cityId },
    include: { category: true, location: true },
    orderBy: [
      { featured: 'desc' },
      { verified: 'desc' },
      { rating: 'desc' },
      { reviews: 'desc' },
    ],
    take: 15,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await findCity(citySlug);
  if (!city) return {};
  const listings = await findTopCompanies(city.id);
  const year = new Date().getFullYear();
  const count = Math.min(listings.length, 10);

  const base = constructMetadata({
    title: `Best Solar Companies in ${city.city} (${year}) — Top ${count} Verified`,
    description: `Compare the top ${count} verified solar installers, panel dealers and AMC providers in ${city.city}, ${city.state}. Real Google ratings, contact info, free quotes.`,
    path: `/best-solar-companies/${citySlug}`,
    standalone: true,
  });
  if (listings.length < MIN_LISTINGS_FOR_INDEX) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function BestSolarCompaniesInCity({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await findCity(citySlug);
  if (!city) notFound();

  const all = await findTopCompanies(city.id);
  if (all.length === 0) notFound();

  const topCount = Math.min(all.length, 10);
  const top = all.slice(0, topCount);
  const year = new Date().getFullYear();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: top.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LocalBusiness',
        name: l.name,
        url: `https://gosolarindex.in/listing/${l.slug}`,
        telephone: l.phone || undefined,
        address: {
          '@type': 'PostalAddress',
          streetAddress: l.address || undefined,
          addressLocality: l.location.city,
          addressRegion: l.location.state,
          addressCountry: 'IN',
        },
        aggregateRating: l.reviews > 0 && l.rating ? {
          '@type': 'AggregateRating',
          ratingValue: l.rating,
          reviewCount: l.reviews,
          bestRating: 5,
        } : undefined,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: city.city, item: `https://gosolarindex.in/${citySlug}` },
      { '@type': 'ListItem', position: 3, name: `Best Solar Companies in ${city.city}`, item: `https://gosolarindex.in/best-solar-companies/${citySlug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600 flex items-center gap-2">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${citySlug}`} className="hover:text-orange-600">{city.city}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium">Best Solar Companies</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3 text-orange-100 text-sm">
              <Award className="h-4 w-4" />
              <span>Verified &amp; Ranked</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Best Solar Companies in {city.city} ({year})
            </h1>
            <p className="text-orange-100 text-lg mb-6">
              Top {topCount} verified installers ranked by Google reviews, verification status and customer response.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-100">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> All verified</span>
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4" /> Real Google reviews</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4" /> Free quotes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick answer / trust */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  How we rank the best solar companies in {city.city}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Every company on this list is a verified {city.city} solar installer. We rank them by: (1) verification status, (2) real Google review ratings, (3) number of reviews, and (4) response speed to enquiries.
                  We do <strong>not</strong> accept payment for higher ranking — but sponsored / featured slots are clearly marked when present.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top listings — numbered */}
      <section className="py-10 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Top {topCount} solar companies in {city.city}
          </h2>
          <div className="space-y-4">
            {top.map((l, i) => {
              const wa = whatsappUrl(l.phone, `Hi ${l.name}, I found you on GoSolarIndex. I'd like a solar quote for my home.`);
              const tel = telUrl(l.phone);
              const badge = i === 0 ? '#1 · Top pick' : `#${i + 1}`;
              return (
                <div key={l.id} className={`bg-white rounded-xl border-2 ${l.featured ? 'border-orange-300' : 'border-gray-200'} p-5 hover:shadow-md transition`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${i === 0 ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link href={`/listing/${l.slug}`} className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                          {l.name}
                        </Link>
                        {l.verified && (
                          <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> Verified
                          </span>
                        )}
                        {l.featured && (
                          <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                            Sponsored
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{badge}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{l.category.name}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.location.city}</span>
                        {l.rating && l.reviews > 0 && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-amber-700 font-medium">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {l.rating.toFixed(1)} ({l.reviews} reviews)
                            </span>
                          </>
                        )}
                      </div>
                      {l.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{l.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {tel && (
                          <a href={tel} className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition">
                            <Phone className="h-3.5 w-3.5" /> Call
                          </a>
                        )}
                        {wa && (
                          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition">
                            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                          </a>
                        )}
                        <Link href={`/listing/${l.slug}`} className="inline-flex items-center gap-1.5 border border-gray-300 hover:border-orange-400 hover:text-orange-600 text-gray-700 text-sm font-semibold px-3 py-2 rounded-lg transition">
                          View profile →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured upgrade CTA — targets business owners searching their own listing */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 text-center">
            <div className="text-sm font-semibold text-orange-600 mb-1">Are you a solar business in {city.city}?</div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Get featured on this page
            </h2>
            <p className="text-sm text-gray-700 mb-4 max-w-lg mx-auto">
              Move to the top slot, add photos and videos, and receive verified customer enquiries from {city.city}. Featured listings get 5–10× more calls.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pricing" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition">
                See Featured plans →
              </Link>
              <Link href="/installers/signup" className="bg-white hover:bg-orange-50 text-orange-600 font-semibold px-5 py-2.5 rounded-lg border-2 border-orange-300 transition">
                Claim your listing (free)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form — homeowner side */}
      <section className="py-12 bg-orange-50 border-t border-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Not sure which one to pick?
            </h2>
            <p className="text-gray-600">Get 2–3 free quotes from top-ranked solar installers in {city.city}.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <LeadForm
              prefill={{ city: city.city }}
              source={`best-companies:${citySlug}`}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
