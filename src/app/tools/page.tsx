import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQ from '@/components/ui/FAQ';
import { constructMetadata } from '@/lib/metadata';
import { Calculator, Zap, Sun, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Solar Calculators & Planning Tools for India (2026) | GoSolarIndex',
  description: 'Free, unbiased rooftop solar calculators for Indian homeowners and businesses. Calculate PM Surya Ghar subsidy, monthly electricity bill savings, payback period, and required kW system size.',
  path: '/tools',
  canonicalUrl: 'https://gosolarindex.in/tools',
});

const tools = [
  {
    title: 'Solar Savings & Payback Calculator',
    slug: 'solar-savings-calculator',
    description: 'Enter your monthly electricity bill to calculate annual savings, 25-year lifetime return on investment, and expected payback period under state net-metering slabs.',
    metric: 'Savings & Payback',
    badge: 'Most Popular',
  },
  {
    title: 'Solar System Size & Roof Area Calculator',
    slug: 'solar-system-size-calculator',
    description: 'Determine how many kilowatts (kW) of solar you need based on monthly power units (kWh) consumed and your available shadow-free rooftop square footage.',
    metric: 'Size & Panel Count',
    badge: 'Essential',
  },
  {
    title: 'PM Surya Ghar Subsidy Calculator',
    slug: 'solar-subsidy-calculator',
    description: 'Check exact central subsidy entitlement under PM Surya Ghar Muft Bijli Yojana (up to ₹78,000) and state top-up subsidies across 36 Indian states and UTs.',
    metric: 'Subsidy & Net Cost',
    badge: 'MNRE 2026 Slabs',
  },
];

const faqs = [
  {
    q: 'How accurate are these solar calculators?',
    a: 'Our calculations use empirical data from the Ministry of New and Renewable Energy (MNRE), state electricity distribution tariffs (SERC 2026 orders), and regional solar irradiation averages (NASA POWER / NREL). Real yields vary slightly by tilt angle, roof shading, and seasonal weather patterns.',
  },
  {
    q: 'Are these tools updated for the latest PM Surya Ghar subsidy rates?',
    a: 'Yes. All calculators incorporate the official PM Surya Ghar Muft Bijli Yojana rates: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and higher residential rooftop systems.',
  },
  {
    q: 'Do I have to enter my phone number to use the calculators?',
    a: 'No. All our calculators are completely free and provide instant, interactive results directly in your browser without requiring your phone number or registration.',
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solar Calculators & Tools', href: '/tools' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Calculators &amp; Decision Engines
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              India Rooftop Solar Calculators (2026)
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Plan your rooftop solar transition with exact, data-driven calculators. Calculate required system capacity, subsidy slabs, electricity bill savings, and payback period without dealer bias.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* National Fact Panel */}
        <section>
          <FactPanel
            title="National Solar Economics Benchmark (Residential 3 kW)"
            rows={[
              { label: 'Typical gross system turnkey cost', value: '₹1,80,000 – ₹2,10,000' },
              { label: 'PM Surya Ghar central DBT subsidy', value: '₹78,000' },
              { label: 'Net homeowner investment', value: '₹1,02,000 – ₹1,32,000', total: true },
              { label: 'Average monthly electricity generation', value: '~360 – 400 units (kWh)' },
              { label: 'Estimated annual power bill savings', value: '₹32,000 – ₹42,000 / year' },
              { label: 'Typical payback timeline', value: '3.0 to 4.2 years' },
            ]}
            sources="Ministry of New and Renewable Energy (MNRE), National Portal for Rooftop Solar, state DISCOM retail tariffs 2026."
          />
        </section>

        {/* Tools Cards */}
        <section className="space-y-6">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              Choose a calculation tool
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Select the tool matching your primary planning question.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((t) => (
              <div
                key={t.slug}
                className="border border-line rounded-sm p-6 bg-paper hover:bg-wash transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-2 mb-2 font-body">
                    <span className="font-semibold text-ink">{t.metric}</span>
                    <span className="bg-wash border border-line px-2 py-0.5 rounded-sm">{t.badge}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    <Link href={`/tools/${t.slug}`} className="hover:underline">
                      {t.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-2 mt-3 font-body leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-line">
                  <Link
                    href={`/tools/${t.slug}`}
                    className="inline-flex items-center justify-center w-full h-10 border border-ink text-xs font-semibold text-ink rounded-sm hover:bg-paper transition-colors"
                  >
                    Open calculator
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Engine CTA */}
        <section className="border border-line rounded-sm p-8 bg-wash flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-heading font-semibold text-2xl text-ink">
              Ready to get verified quotes from local installers?
            </h3>
            <p className="text-sm text-ink-2 font-body mt-1.5 leading-relaxed">
              Connect with up to 3 empanelled solar contractors in your city. Compare custom engineering designs, equipment warranties, and turnkey pricing.
            </p>
          </div>
          <Link
            href="/get-quotes"
            className="inline-flex items-center justify-center h-12 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors shrink-0"
          >
            Get 3 free quotes
          </Link>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            Frequently asked questions about solar sizing &amp; calculations
          </h2>
          <FAQ items={faqs} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
