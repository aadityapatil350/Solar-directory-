import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import DataTable from '@/components/ui/DataTable';
import Steps from '@/components/ui/Steps';
import FAQ from '@/components/ui/FAQ';
import ListingRow from '@/components/ui/ListingRow';
import { getDiscomBySlug, getAllDiscomSlugs } from '@/lib/discomData';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const revalidate = 86400; // 24h ISR
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDiscomSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const discom = getDiscomBySlug(slug);
  if (!discom) return {};

  return constructMetadata({
    title: `${discom.shortName} Solar Net Metering Rules, Portal & Tariffs (2026)`,
    description: `Complete solar guide for ${discom.name} (${discom.shortName}) in ${discom.state}. Sanctioned load limits, application steps, tariff slabs, and empanelled installers.`,
    path: `/discom/${slug}`,
    canonicalUrl: `https://gosolarindex.in/discom/${slug}`,
  });
}

export default async function DiscomDetailPage({ params }: Props) {
  const { slug } = await params;
  const discom = getDiscomBySlug(slug);
  if (!discom) notFound();

  // Fetch verified installers in this DISCOM's state
  const listings = await prisma.listing.findMany({
    where: {
      location: {
        state: { equals: discom.state, mode: 'insensitive' },
      },
    },
    include: {
      category: true,
      location: true,
    },
    orderBy: [
      { featured: 'desc' },
      { verified: 'desc' },
      { rating: 'desc' },
    ],
    take: 5,
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: 'DISCOMs', item: 'https://gosolarindex.in/discom' },
      { '@type': 'ListItem', position: 3, name: discom.shortName, item: `https://gosolarindex.in/discom/${discom.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: discom.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'DISCOMs', href: '/discom' },
              { label: discom.shortName, href: `/discom/${discom.slug}` },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
                State Electricity Distribution Utility · {discom.state}
              </span>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
                {discom.name} ({discom.shortName})
              </h1>
              <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
                {discom.overview}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={discom.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors"
              >
                <span>Open official portal</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Fact Panel */}
        <section>
          <FactPanel
            title={`${discom.shortName} Solar Net Metering Specifications`}
            rows={[
              { label: 'Service jurisdiction', value: discom.coverageArea },
              { label: 'Regulatory SERC order', value: discom.sercOrderRef },
              { label: 'Sanctioned load rooftop cap', value: discom.sanctionedLoadLimit },
              { label: 'Eligible metering model', value: discom.meteringType },
              { label: 'Distribution transformer (DT) loading limit', value: discom.technicalFeasibilityLimit },
              { label: 'Typical net meter approval timeline', value: discom.approvalTimeline, total: true },
            ]}
            sources={`State Electricity Regulatory Commission (SERC), ${discom.shortName} official solar guidelines, National PM Surya Ghar Portal.`}
          />
        </section>

        {/* Residential Electricity Tariffs */}
        <section className="space-y-4">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              {discom.shortName} residential electricity tariffs
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Higher consumption tiers face steep rates, accelerating solar return on investment.
            </p>
          </div>

          <DataTable
            columns={[
              { label: 'Monthly consumption slab', key: 'range' },
              { label: 'Grid tariff rate (excl. duty/cess)', key: 'ratePerUnit' },
            ]}
            rows={discom.tariffSlabs}
          />
        </section>

        {/* Net Metering Process Steps */}
        <section className="space-y-4">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              How to get rooftop solar connected with {discom.shortName}
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Follow this step-by-step workflow for seamless net meter installation and subsidy disbursement.
            </p>
          </div>

          <Steps
            steps={discom.netMeteringSteps.map((step, idx) => ({
              number: idx + 1,
              title: `Step ${idx + 1}`,
              description: step,
            }))}
          />
        </section>

        {/* Verified Solar Installers in this DISCOM's State */}
        {listings.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-2xl text-ink">
                  Solar installers operating under {discom.shortName} ({discom.state})
                </h2>
                <p className="text-sm text-ink-2 font-body mt-1">
                  Empanelled EPC contractors familiar with {discom.shortName} net-metering procedures.
                </p>
              </div>
              <Link
                href={`/states/${discom.stateSlug}`}
                className="text-xs text-ink underline hover:text-ink/80 font-body shrink-0"
              >
                All {discom.state} installers
              </Link>
            </div>

            <div className="pt-4 space-y-3">
              {listings.map((item) => (
                <ListingRow key={item.id} listing={item} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            Frequently asked questions: {discom.shortName} solar
          </h2>
          <FAQ items={discom.faqs} />
        </section>

        {/* Related Links */}
        <section className="pt-6 border-t border-line">
          <h3 className="font-heading font-semibold text-lg text-ink mb-3">
            Explore related solar guides &amp; tools
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-body">
            <Link href={`/states/${discom.stateSlug}`} className="text-ink underline hover:text-ink/80">
              {discom.state} State Solar Guide
            </Link>
            <Link href="/subsidy/pm-surya-ghar" className="text-ink underline hover:text-ink/80">
              PM Surya Ghar Subsidy Slabs
            </Link>
            <Link href="/tools/solar-savings-calculator" className="text-ink underline hover:text-ink/80">
              Solar Savings Calculator
            </Link>
            <Link href="/price/3kw" className="text-ink underline hover:text-ink/80">
              3 kW Solar System Price
            </Link>
            <Link href="/discom" className="text-ink underline hover:text-ink/80">
              All Indian DISCOMs
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
