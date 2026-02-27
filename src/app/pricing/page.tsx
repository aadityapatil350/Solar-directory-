import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import { CheckCircle, Zap, Star, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing — List Your Solar Business on GoSolarIndex',
  description:
    "Affordable plans to list your solar installation business on India's fastest-growing solar directory. Get leads from homeowners and businesses in your city.",
  path: '/pricing',
});

const plans = [
  {
    name: 'Basic',
    planKey: null,
    price: '₹0',
    period: 'Free forever',
    description: 'Get started with a free listing and appear in search results.',
    icon: Zap,
    color: 'gray',
    cta: 'Sign Up Free',
    href: '/installers/signup',
    features: [
      'Business listing on GoSolarIndex',
      'Appear in city & category pages',
      'Contact form for customer enquiries',
      'Basic profile (name, phone, address)',
      'Up to 5 cities covered',
    ],
    notIncluded: [
      'Featured placement at top',
      'Verified badge',
      'Direct lead notifications',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Featured',
    planKey: 'featured',
    price: '₹999',
    period: 'per month',
    description: 'Stand out with featured placement and get more leads.',
    icon: Star,
    color: 'orange',
    cta: 'Get Started — ₹999/mo',
    href: null,
    badge: 'Most Popular',
    features: [
      'Everything in Basic',
      'Featured badge & top placement',
      'Verified company badge',
      'Direct lead notifications (up to 20/month)',
      'Cover all cities in your state',
      'Priority customer support',
      'Website & social links',
    ],
    notIncluded: [
      'Unlimited leads',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Premium',
    planKey: 'premium',
    price: '₹2,499',
    period: 'per month',
    description: 'Maximum visibility across India with unlimited lead access.',
    icon: ShieldCheck,
    color: 'green',
    cta: 'Get Premium — ₹2,499/mo',
    href: null,
    features: [
      'Everything in Featured',
      'Unlimited direct leads',
      'Pan-India coverage',
      'Dedicated account manager',
      'Analytics & lead conversion tracking',
      'Priority listing in Google results',
      'WhatsApp lead notifications',
      'Monthly performance report',
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    q: 'How quickly will my listing appear after signup?',
    a: 'Your basic listing appears within 24 hours after account verification. Featured and Premium listings are reviewed and activated within 1 business day.',
  },
  {
    q: 'What is a "direct lead"?',
    a: 'A direct lead is a verified customer enquiry sent directly to your email/WhatsApp — including their name, phone, city, and solar requirement. You pay only for leads delivered to you.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, you can change your plan at any time from your installer dashboard. Upgrades take effect immediately; downgrades apply at the end of your billing cycle.',
  },
  {
    q: 'Is there a contract or lock-in?',
    a: 'No contract, no lock-in. All paid plans are month-to-month. Cancel anytime.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, credit/debit cards, net banking, and bank transfer (NEFT/RTGS) for annual plans.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Grow your solar business with qualified leads from homeowners and businesses across India.
            Start free — upgrade when you're ready.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isPopular = plan.name === 'Featured';
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-md p-8 flex flex-col ${
                    isPopular ? 'ring-2 ring-orange-500 scale-105' : ''
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}

                  <div className="mb-6">
                    <div
                      className={`inline-flex p-3 rounded-xl mb-4 ${
                        plan.color === 'orange'
                          ? 'bg-orange-100'
                          : plan.color === 'green'
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          plan.color === 'orange'
                            ? 'text-orange-600'
                            : plan.color === 'green'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                    <div className="mt-2">
                      <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 text-sm ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-400 line-through">
                        <CheckCircle className="h-4 w-4 text-gray-300 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {plan.planKey ? (
                    <Link
                      href="/contact"
                      className="w-full text-center py-3 rounded-xl font-semibold transition bg-orange-500 text-white hover:bg-orange-600 block"
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <Link
                      href={plan.href!}
                      className="w-full text-center py-3 rounded-xl font-semibold transition border-2 border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600 block"
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead pricing note */}
      <section className="bg-orange-50 border-y border-orange-100 py-10">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Pay-Per-Lead Option</h2>
          <p className="text-gray-600 mb-4">
            Don't want a monthly plan? Purchase leads individually at{' '}
            <strong>₹75–₹150 per verified lead</strong> depending on your city and project size.
            No subscription required.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Contact Us for Lead Packages
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Solar Business?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join hundreds of solar companies already getting leads from GoSolarIndex. Sign up free and upgrade anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/installers/signup"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Sign Up Free
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
