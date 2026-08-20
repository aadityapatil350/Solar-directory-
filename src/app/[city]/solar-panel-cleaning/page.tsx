import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Droplets, Sun, ShieldCheck, CheckCircle, Phone, ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ city: string }>;
}

export const revalidate = 3600;

const MIN_LISTINGS_FOR_INDEX = 3;

function slugToSearch(slug: string) {
  return slug.replace(/-/g, ' ');
}

async function findCity(citySlug: string) {
  return prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });
}

async function findCleaningListings(cityId: string) {
  return prisma.listing.findMany({
    where: {
      locationId: cityId,
      OR: [
        { category: { slug: 'maintenance-services' } },
        { name: { contains: 'clean', mode: 'insensitive' } },
        { description: { contains: 'clean', mode: 'insensitive' } },
        { serviceTags: { contains: 'cleaning', mode: 'insensitive' } },
      ],
    },
    include: { category: true, location: true },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { rating: 'desc' }],
    take: 50,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await findCity(citySlug);
  if (!city) return {};
  const listings = await findCleaningListings(city.id);
  const year = new Date().getFullYear();
  const count = listings.length;

  const base = constructMetadata({
    title: `Solar Panel Cleaning Services in ${city.city} (${year}) — ${count} Verified Companies`,
    description: `Compare ${count} verified solar panel cleaning services in ${city.city}, ${city.state}. Professional cleaning, AMC contracts, per-panel and per-kW pricing. Free quotes.`,
    path: `/${citySlug}/solar-panel-cleaning`,
    standalone: true,
  });
  if (count < MIN_LISTINGS_FOR_INDEX) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function CityCleaningPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await findCity(citySlug);
  if (!city) notFound();

  const listings = await findCleaningListings(city.id);
  const year = new Date().getFullYear();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does solar panel cleaning cost in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Solar panel cleaning in ${city.city} typically costs ₹15–₹30 per panel for a one-time clean, or ₹1,500–₹4,000 per kW per year for an annual AMC. Rates depend on system size, roof accessibility, and cleaning frequency (monthly vs quarterly).`,
        },
      },
      {
        '@type': 'Question',
        name: 'How often should solar panels be cleaned?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most Indian rooftops need cleaning every 30–60 days. Dusty regions (Rajasthan, north-west India) and areas near construction need monthly cleaning. Coastal cities need cleaning every 2–3 months due to salt deposition. During monsoon, rain cleans panels naturally but you should inspect for streaks and bird droppings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does dirt on solar panels really affect output?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — dusty panels can lose 15–30% of their power output in Indian conditions. A 5 kW system generating ₹18,000/month of electricity can lose ₹3,000–₹5,000/month worth of generation if not cleaned regularly. Cleaning pays for itself in 1–2 months.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I clean solar panels myself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can, but professional cleaning is safer and more effective. Rooftop work has fall risk, and using tap water or the wrong cleaning agent can leave mineral deposits that reduce panel output. Professionals use deionised water, soft brushes, and proper safety harnesses.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is there an AMC option for solar panel cleaning in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Most solar AMC providers in ${city.city} offer annual contracts covering monthly or quarterly cleaning, panel inspection, wiring checks, and inverter servicing. Typical AMC cost is ₹1,500–₹4,000 per kW per year.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: city.city, item: `https://gosolarindex.in/${citySlug}` },
      { '@type': 'ListItem', position: 3, name: 'Solar Panel Cleaning', item: `https://gosolarindex.in/${citySlug}/solar-panel-cleaning` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
            <span className="text-gray-900 font-medium">Solar Panel Cleaning</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3 text-orange-100 text-sm">
              <Droplets className="h-4 w-4" />
              <span>Solar Panel Cleaning</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Solar Panel Cleaning Services in {city.city} ({year})
            </h1>
            <p className="text-orange-100 text-lg">
              {listings.length > 0
                ? `Compare ${listings.length} verified cleaning & AMC providers in ${city.city}. Free quotes.`
                : `Get free quotes for solar panel cleaning in ${city.city}, ${city.state}.`}
            </p>
          </div>
        </div>
      </section>

      {/* Why clean */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why solar panels in {city.city} need regular cleaning</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <Sun className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">Up to 30% output loss</div>
                <div className="text-sm text-gray-600">Dust, bird droppings and pollution can cut generation by 15–30% in Indian conditions.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Droplets className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">Payback in 1–2 months</div>
                <div className="text-sm text-gray-600">₹15–₹30 per panel cleaning recovers itself quickly through restored generation.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">Warranty protection</div>
                <div className="text-sm text-gray-600">Panel warranties often require documented maintenance. AMC records protect you.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-10 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar panel cleaning cost in {city.city}</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200">
              <thead className="bg-orange-50 text-sm">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Typical price in {city.city}</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                <tr className="border-t"><td className="px-4 py-3">One-time cleaning (per panel)</td><td className="px-4 py-3">₹15–₹30</td><td className="px-4 py-3">Small residential systems</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Monthly cleaning AMC</td><td className="px-4 py-3">₹2,500–₹4,000 / kW / year</td><td className="px-4 py-3">Dusty regions, commercial rooftops</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Quarterly cleaning AMC</td><td className="px-4 py-3">₹1,500–₹2,500 / kW / year</td><td className="px-4 py-3">Most residential (5 kW+)</td></tr>
                <tr className="border-t"><td className="px-4 py-3">Full AMC (clean + inspection + inverter)</td><td className="px-4 py-3">₹3,000–₹6,000 / kW / year</td><td className="px-4 py-3">Systems past warranty</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">Prices vary by rooftop accessibility, cleaning frequency, and whether panels are on a shed vs slope roof.</p>
        </div>
      </section>

      {/* Listings */}
      {listings.length > 0 && (
        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Verified cleaning &amp; AMC providers in {city.city}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead form */}
      <section className="py-12 bg-orange-50 border-t border-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Get free quotes for solar panel cleaning in {city.city}
            </h2>
            <p className="text-gray-600">Compare 2–3 verified cleaning providers. No spam.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <LeadForm
              prefill={{ city: city.city, requirement: 'AMC & Maintenance' }}
              source={`cleaning:${citySlug}`}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Solar panel cleaning FAQs — {city.city}</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  {f.name}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed pl-7">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
