import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import Link from 'next/link';
import { DISCOMS_DATA } from '@/lib/discomData';

export const revalidate = 86400; // 24h ISR

export const metadata: Metadata = constructMetadata({
  title: 'India Solar DISCOM Directory & Net Metering Rules (2026)',
  description: 'Complete directory of Indian electricity distribution companies (DISCOMs), net metering regulations, sanctioned load limits, and PM Surya Ghar application portals.',
  path: '/discom',
  canonicalUrl: 'https://gosolarindex.in/discom',
});

export default function DiscomIndexPage() {
  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Electricity Utilities (DISCOMs)', href: '/discom' },
            ]}
          />
        </div>
      </div>

      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight">
            India Electricity Utilities &amp; Solar Net Metering (DISCOMs)
          </h1>
          <p className="text-base sm:text-lg text-ink-2 mt-3 max-w-3xl font-body leading-relaxed">
            Every rooftop solar installation in India connects to a local electricity distribution company (DISCOM). Explore net metering regulations, SERC orders, technical feasibility limits, and application portals for your utility.
          </p>
        </div>
      </header>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* National Benchmark FactPanel */}
        <section>
          <FactPanel
            title="National DISCOM Solar Benchmark & Regulations (2026)"
            rows={[
              { label: 'Total active state DISCOMs in India', value: '70+ utilities' },
              { label: 'Standard residential net metering limit', value: 'Up to 100% sanctioned load' },
              { label: 'National portal integration', value: 'pmsuryaghar.gov.in (Mandatory)' },
              { label: 'Average net meter approval timeline', value: '14 – 25 working days' },
              { label: 'Typical annual solar banking settlement', value: 'March 31 / Financial Year-End', total: true },
            ]}
            sources="Ministry of Power, Forum of Regulators (FoR), State Electricity Regulatory Commissions (SERCs)."
          />
        </section>

        {/* Utilities List */}
        <section>
          <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
            Major state electricity distribution utilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISCOMS_DATA.map((discom) => (
              <div
                key={discom.slug}
                className="border border-line rounded-sm p-6 bg-paper hover:bg-wash transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-2 mb-1.5 font-body">
                    <span>{discom.state}</span>
                    <span className="font-semibold text-ink">{discom.approvalTimeline}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    <Link href={`/discom/${discom.slug}`} className="hover:underline">
                      {discom.shortName}
                    </Link>
                  </h3>
                  <p className="text-xs text-ink-2 mt-1 font-body">{discom.name}</p>
                  <p className="text-sm text-ink-2 mt-3 line-clamp-2 font-body leading-relaxed">
                    {discom.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-ink-2 font-body">
                    Metering: <strong className="text-ink font-semibold">{discom.meteringType.split(' ')[0]}</strong>
                  </span>
                  <Link
                    href={`/discom/${discom.slug}`}
                    className="inline-flex items-center justify-center h-9 px-4 border border-line text-xs font-medium text-ink rounded-sm hover:bg-paper transition-colors"
                  >
                    View rules &amp; tariffs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
