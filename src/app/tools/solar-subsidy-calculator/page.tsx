import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SolarSubsidyCalculator from '@/components/SolarSubsidyCalculator';
import Link from 'next/link';
import { ShieldCheck, IndianRupee, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PM Surya Ghar Solar Subsidy & Payback Calculator (2026) | GoSolarIndex',
  description:
    'Free online solar subsidy calculator for India. Calculate exact PM Surya Ghar DBT central subsidy (up to ₹78,000), state DISCOM incentives, net investment, annual savings, and payback period.',
  keywords: [
    'PM Surya Ghar subsidy calculator',
    'solar subsidy calculator India',
    'install solar panels cost',
    'solar payback period calculator',
    'rooftop solar calculator',
    'DCR panel subsidy India',
    'DISCOM net metering subsidy',
  ],
  alternates: {
    canonical: 'https://gosolarindex.in/tools/solar-subsidy-calculator',
  },
};

export default function SolarSubsidyCalculatorPage() {
  const faqList = [
    {
      q: 'How much subsidy is available under PM Surya Ghar Muft Bijli Yojana in 2026?',
      a: 'Under the PM Surya Ghar Muft Bijli Yojana, residential rooftop solar systems receive ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a fixed cap of ₹78,000 for systems 3 kW and higher. The subsidy is transferred directly via DBT to your Aadhaar-linked bank account within 30 days of meter installation.',
    },
    {
      q: 'What are DCR (Domestic Content Requirement) panels?',
      a: 'To qualify for the central PM Surya Ghar subsidy, the solar panels must be manufactured in India using domestically produced solar cells and modules (DCR compliant) from the MNRE ALMM (Approved List of Models and Manufacturers).',
    },
    {
      q: 'How is the recommended solar system size calculated?',
      a: 'The recommended system size is determined by your average monthly electricity consumption. A 1 kW solar system in India generates approximately 120 units (kWh) per month. For a monthly bill of ₹3,500 (~400 units), a 3 to 4 kW system provides near 100% bill offset.',
    },
    {
      q: 'What is the simple payback period for rooftop solar in India?',
      a: 'With current central and state subsidies, residential rooftop solar systems in India achieve full financial payback within 3 to 4.5 years. With panel lifespans exceeding 25 years, homeowners enjoy over 20 years of essentially free electricity.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://gosolarindex.in/tools/solar-subsidy-calculator' },
      { '@type': 'ListItem', position: 3, name: 'Solar Subsidy Calculator', item: 'https://gosolarindex.in/tools/solar-subsidy-calculator' },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div>
        <Header />

        {/* Minimal Hero - Vercel Design Standard */}
        <section className="bg-white border-b border-zinc-200/80 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-medium mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified MNRE Direct Benefit Transfer (DBT) Rates
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-3">
              PM Surya Ghar Solar Subsidy Calculator
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Calculate your exact Central Government subsidy, state top-ups, system sizing in kW,
              and payback timeline before signing with any installer.
            </p>
          </div>
        </section>

        {/* Interactive Calculator Component */}
        <main className="container mx-auto px-4 py-8">
          <SolarSubsidyCalculator />

          {/* Educational Content & Comparison Table to Prevent Thin Content */}
          <section className="max-w-5xl mx-auto mt-12 space-y-8">
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-4">
                PM Surya Ghar Muft Bijli Yojana: Subsidy Slabs 2026
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/80">
                      <th className="py-3 px-4 font-semibold text-zinc-900">System Capacity</th>
                      <th className="py-3 px-4 font-semibold text-zinc-900">Central DBT Subsidy</th>
                      <th className="py-3 px-4 font-semibold text-zinc-900">Typical Gross Cost</th>
                      <th className="py-3 px-4 font-semibold text-zinc-900">Net Cost to Homeowner</th>
                      <th className="py-3 px-4 font-semibold text-zinc-900">Monthly Generation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr className="hover:bg-zinc-50/50">
                      <td className="py-3 px-4 font-medium text-zinc-900">1 kW System</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹30,000</td>
                      <td className="py-3 px-4 text-zinc-600">~₹65,000</td>
                      <td className="py-3 px-4 font-semibold text-zinc-950">~₹35,000</td>
                      <td className="py-3 px-4 text-zinc-600">~120 Units</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50">
                      <td className="py-3 px-4 font-medium text-zinc-900">2 kW System</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹60,000</td>
                      <td className="py-3 px-4 text-zinc-600">~₹1,30,000</td>
                      <td className="py-3 px-4 font-semibold text-zinc-950">~₹70,000</td>
                      <td className="py-3 px-4 text-zinc-600">~240 Units</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50 bg-emerald-50/30">
                      <td className="py-3 px-4 font-medium text-zinc-900">3 kW System (Most Popular)</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹78,000 (Max Cap)</td>
                      <td className="py-3 px-4 text-zinc-600">~₹1,95,000</td>
                      <td className="py-3 px-4 font-semibold text-zinc-950">~₹1,17,000</td>
                      <td className="py-3 px-4 text-zinc-600">~360 Units</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50">
                      <td className="py-3 px-4 font-medium text-zinc-900">4 kW System</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹78,000 (Max Cap)</td>
                      <td className="py-3 px-4 text-zinc-600">~₹2,60,000</td>
                      <td className="py-3 px-4 font-semibold text-zinc-950">~₹1,82,000</td>
                      <td className="py-3 px-4 text-zinc-600">~480 Units</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50">
                      <td className="py-3 px-4 font-medium text-zinc-900">5 kW System</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹78,000 (Max Cap)</td>
                      <td className="py-3 px-4 text-zinc-600">~₹3,25,000</td>
                      <td className="py-3 px-4 font-semibold text-zinc-950">~₹2,47,000</td>
                      <td className="py-3 px-4 text-zinc-600">~600 Units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                * Note: Central financial assistance is capped at ₹78,000 for residential connections. Additional state subsidies (such as UP UPNEDA top-up or Delhi GBI) are credited separately by the state renewable energy agencies.
              </p>
            </div>

            {/* Step-by-Step PM Surya Ghar Workflow */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-6">
                How to Claim Your PM Surya Ghar Subsidy (4 Steps)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-base">Register Online</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Register on the National Portal (pmsuryaghar.gov.in) with your electricity consumer number, mobile number, and email.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-base">DISCOM Feasibility</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Wait for technical feasibility approval from your regional DISCOM. Once approved, choose an empanelled installer.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-base">DCR Installation</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Installer mounts ALMM-approved DCR panels and inverter. Bi-directional net meter is installed and inspected by DISCOM.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    4
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-base">Direct DBT Credit</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Commissioning certificate is submitted with your bank account details. Subsidy is released directly to your account within 30 days.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-zinc-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqList.map((item, index) => (
                  <div key={index} className="border-b border-zinc-100 pb-5 last:border-b-0 last:pb-0">
                    <h3 className="text-base font-semibold text-zinc-900 mb-2">{item.q}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
