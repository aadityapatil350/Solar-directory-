import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import FAQ from '@/components/ui/FAQ';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Installer Plans & Pricing — Free & Featured | GoSolarIndex',
  description: 'Claim your solar business listing for free on GoSolarIndex. Upgrade to Featured for priority city placement, customer photo uploads, and direct lead notifications.',
  path: '/pricing',
  canonicalUrl: 'https://gosolarindex.in/pricing',
});

const FREE_FEATURES = [
  { text: 'Claim & verify business listing', included: true },
  { text: 'Update contact info, address & website', included: true },
  { text: 'Owner verified check badge on profile', included: true },
  { text: 'Public review submission collection', included: true },
  { text: 'Dedicated photo gallery uploads', included: false },
  { text: 'Priority placement on city directory page', included: false },
  { text: 'Featured indicator with gold sun border', included: false },
  { text: 'Direct homeowner lead routing alerts', included: false },
  { text: 'Homepage featured directory strip', included: false },
];

const FEATURED_FEATURES = [
  { text: 'Claim & verify business listing', included: true },
  { text: 'Update contact info, address & website', included: true },
  { text: 'Owner verified check badge on profile', included: true },
  { text: 'Public review submission collection', included: true },
  { text: 'Dedicated photo gallery uploads (up to 5)', included: true },
  { text: 'Priority top-of-page placement in your city', included: true },
  { text: 'Featured left border and highlighted badge', included: true },
  { text: 'Direct homeowner lead routing alerts', included: true },
  { text: 'Homepage featured directory strip eligibility', included: true },
];

const FAQS = [
  {
    q: 'Is claiming my business listing really free?',
    a: 'Yes, 100% free. Find your business, submit your claim with mobile/email OTP verification, and our team will approve it within 24 to 48 hours. Once approved, your profile receives the "Owner verified" badge with direct call and WhatsApp buttons at zero charge.',
  },
  {
    q: 'Why does claim verification require admin approval?',
    a: 'To protect your business from being falsely claimed or edited by competitors, our verification team validates each claim against public business registrations and telephone records before granting dashboard access.',
  },
  {
    q: 'What is the Featured Partner plan pricing?',
    a: 'Featured placement costs ₹999 per month with no lock-in contract. You can upgrade or cancel at any time directly through your installer dashboard.',
  },
  {
    q: 'How does lead routing work for Featured installers?',
    a: 'When a homeowner in your city submits a quote request through our quote engine or city calculator, the lead is distributed instantly to up to 3 verified installers in that area.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'For Installers', href: '/for-installers' },
              { label: 'Listing Plans & Pricing', href: '/pricing' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Installer Partnership Plans
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              Listing Plans &amp; Partner Membership
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Every authentic solar EPC installer and contractor in India is entitled to a free verified listing. Upgrade to Featured for priority city visibility and direct lead notifications.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        <section>
          <FactPanel
            title="Installer Membership Benchmark"
            rows={[
              { label: 'Free listing tier cost', value: '₹0 (Free Forever)' },
              { label: 'Featured partner plan', value: '₹999 / month' },
              { label: 'Lead allocation per homeowner request', value: 'Maximum 3 verified contractors' },
              { label: 'Claim review turnaround', value: '24 – 48 working hours', total: true },
            ]}
            sources="GoSolarIndex business verification guidelines and partner agreement terms."
          />
        </section>

        {/* Pricing Comparison Grid */}
        <section className="space-y-6">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              Compare plans
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Select the plan that matches your business growth targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Free Plan */}
            <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase text-ink-2 font-body">Basic Registration</span>
                <h3 className="font-heading font-bold text-2xl text-ink mt-1">Free Verified Listing</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading font-bold text-4xl text-ink">₹0</span>
                  <span className="text-sm text-ink-2 font-body">forever</span>
                </div>
                <p className="text-xs text-ink-2 font-body mt-2 leading-relaxed">
                  Ideal for genuine contractors wanting to maintain their official business record and receive direct phone/WhatsApp calls.
                </p>
              </div>

              <div className="pt-4 border-t border-line space-y-3">
                <span className="text-xs font-semibold uppercase text-ink font-body">Included features:</span>
                <ul className="space-y-2.5">
                  {FREE_FEATURES.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-body">
                      {f.included ? (
                        <Check className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-line shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? 'text-ink' : 'text-ink-2/60 line-through'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-line">
                <Link
                  href="/for-installers"
                  className="inline-flex items-center justify-center w-full h-11 border border-ink text-ink font-semibold text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  Claim or List Free Listing →
                </Link>
              </div>
            </div>

            {/* Featured Plan */}
            <div className="border-2 border-ink rounded-sm p-6 sm:p-8 bg-wash space-y-6 relative">
              <div className="absolute -top-3 right-6 bg-sun text-ink font-semibold text-[11px] px-3 py-0.5 rounded-sm uppercase tracking-wider font-body">
                Recommended
              </div>

              <div>
                <span className="text-xs font-semibold uppercase text-ink font-body">Growth &amp; High Intent Leads</span>
                <h3 className="font-heading font-bold text-2xl text-ink mt-1">Featured Partner</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading font-bold text-4xl text-ink">₹999</span>
                  <span className="text-sm text-ink-2 font-body">/ month</span>
                </div>
                <p className="text-xs text-ink-2 font-body mt-2 leading-relaxed">
                  Priority placement at the very top of your city directory with verified project galleries and direct consumer quote delivery.
                </p>
              </div>

              <div className="pt-4 border-t border-line space-y-3">
                <span className="text-xs font-semibold uppercase text-ink font-body">Everything in Free, plus:</span>
                <ul className="space-y-2.5">
                  {FEATURED_FEATURES.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-body">
                      <Check className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                      <span className="text-ink font-medium">
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-line">
                <Link
                  href="/dashboard/login"
                  className="inline-flex items-center justify-center w-full h-11 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Log In to Upgrade Profile →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-ink-2 font-body">
            Already claimed or verified your business profile?{' '}
            <Link href="/dashboard/login" className="font-bold text-sun underline underline-offset-2 hover:brightness-95">
              Log in to your Installer Dashboard →
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            Frequently asked questions about installer plans
          </h2>
          <FAQ items={FAQS} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
