import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ShieldCheck, MapPin, Wrench, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'About GoSolarIndex — India\'s Public Solar Register & Directory',
  description: 'GoSolarIndex is an independent register and lead-generation portal for Indian rooftop solar. Learn how we verify installers, calculate net metering payback, and maintain public data accuracy.',
  path: '/about',
  canonicalUrl: 'https://gosolarindex.in/about',
});

export default async function AboutPage() {
  const [totalListings, totalCities, totalVerified] = await Promise.all([
    prisma.listing.count(),
    prisma.location.count(),
    prisma.listing.count({ where: { verified: true } }),
  ]);

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About GoSolarIndex', href: '/about' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Independent Solar Information Register
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              About GoSolarIndex
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              GoSolarIndex is India's most comprehensive independent directory and planning portal for rooftop solar. We bridge the information gap between Indian property owners, verified EPC installers, and state electricity distribution utilities.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* National Stats FactPanel */}
        <section>
          <FactPanel
            title="GoSolarIndex Operational Register (2026)"
            rows={[
              { label: 'Total active solar service listings', value: `${totalListings.toLocaleString('en-IN')}+ companies` },
              { label: 'Registered Indian cities & districts', value: `${totalCities} cities` },
              { label: 'Owner-verified businesses', value: `${totalVerified.toLocaleString('en-IN')}+ verified` },
              { label: 'Supported central & state schemes', value: 'PM Surya Ghar, PM-KUSUM, UPNEDA, Soura' },
              { label: 'Regulatory reference foundation', value: 'SERC net-metering orders 2026', total: true },
            ]}
            sources="GoSolarIndex business database, PM Surya Ghar national portal, and state electricity regulatory commissions."
          />
        </section>

        {/* Mission & Principles */}
        <section className="space-y-6">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            Our mission: Calm, transparent numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-ink-2 font-body leading-relaxed">
            <p>
              Buying rooftop solar in India has historically been complicated by aggressive sales pitches, confusing subsidy promises, and dealer-biased payback calculators. Homeowners are often left wondering whether their roof qualifies for PM Surya Ghar, what their DISCOM will allow under net-metering, and whether an installer is legitimately empanelled.
            </p>
            <p>
              GoSolarIndex was built to look and act like a trusted public register. We do not sell hardware or recommend one installer over another based on kickbacks. Instead, we publish real DISCOM rules, verified manufacturer warranties, unpadded price benchmarks, and factual customer reviews.
            </p>
          </div>
        </section>

        {/* How We Vet Listings */}
        <section className="border-t border-line pt-10 space-y-6">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            How listings are managed &amp; verified
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-line rounded-sm p-6 bg-paper space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-ink shrink-0" />
                <h3 className="font-heading font-semibold text-lg text-ink">Public Registry</h3>
              </div>
              <p className="text-sm text-ink-2 font-body leading-relaxed">
                Initial directory records are curated from public commercial registrations, GST databases, and Google Maps business profiles to provide comprehensive local coverage.
              </p>
            </div>

            <div className="border border-line rounded-sm p-6 bg-paper space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-ink shrink-0" />
                <h3 className="font-heading font-semibold text-lg text-ink">Owner Verification</h3>
              </div>
              <p className="text-sm text-ink-2 font-body leading-relaxed">
                Businesses marked with the <strong>Owner verified</strong> badge have claimed their profile, verified ownership via OTP and documentation, and directly maintain their service specs.
              </p>
            </div>

            <div className="border border-line rounded-sm p-6 bg-paper space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-ink shrink-0" />
                <h3 className="font-heading font-semibold text-lg text-ink">First-Party Reviews</h3>
              </div>
              <p className="text-sm text-ink-2 font-body leading-relaxed">
                We collect first-party customer reviews requiring phone verification and installation date records, subjecting every submission to manual moderation before publication.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="border border-line rounded-sm p-8 bg-wash flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-heading font-semibold text-2xl text-ink">
              Are you a solar installer or EPC contractor?
            </h3>
            <p className="text-sm text-ink-2 font-body mt-1">
              Claim your business listing for free to update your coverage, upload past project details, and connect with local enquiries.
            </p>
          </div>
          <Link
            href="/for-installers"
            className="inline-flex items-center justify-center h-12 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors shrink-0"
          >
            Claim or list business
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
