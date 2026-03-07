import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check, Star, Zap, Crown } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing Plans — List Your Solar Business on GoSolarIndex',
  description: 'Choose the perfect plan for your solar business. Get more leads with Featured or Premium listings. Starting from Free. Compare plans and features.',
  path: '/pricing',
});

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      icon: Star,
      color: 'gray',
      features: [
        'Basic business listing',
        'Company name & address',
        'Phone number display',
        'Listed in search results',
        'Category & location tags',
        'Basic profile page',
      ],
      limitations: [
        'No priority placement',
        'No verified badge',
        'No lead notifications',
        'Limited visibility',
      ],
      cta: 'Get Started Free',
      href: '/installers/signup',
      popular: false,
    },
    {
      name: 'Featured',
      price: '₹2,999',
      period: '/month',
      icon: Zap,
      color: 'orange',
      features: [
        'Everything in Free, plus:',
        'Priority placement in search',
        'Verified badge on listing',
        'WhatsApp CTA button',
        'Email lead notifications',
        'Featured in category pages',
        'Enhanced profile visibility',
        'Logo & images display',
        'Customer review section',
        'Monthly performance report',
      ],
      limitations: [],
      cta: 'Start Featured Plan',
      href: '/installers/signup',
      popular: true,
    },
    {
      name: 'Premium',
      price: '₹5,999',
      period: '/month',
      icon: Crown,
      color: 'blue',
      features: [
        'Everything in Featured, plus:',
        'Top of city page placement',
        'Sponsored label & highlighting',
        'Analytics dashboard access',
        'ALL leads from your city',
        'First in search results',
        'Premium support (24/7)',
        'Custom profile URL',
        'Social media integration',
        'Competitor analysis tools',
        'Priority customer support',
      ],
      limitations: [],
      cta: 'Go Premium',
      href: '/installers/signup',
      popular: false,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan to grow your solar business. Get more leads, build trust, and dominate your local market.
          </p>
          <p className="text-sm text-gray-500">
            All plans include GST. Cancel anytime. No hidden fees.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all hover:shadow-2xl hover:scale-105 ${
                    isPopular
                      ? 'border-orange-500 ring-4 ring-orange-100'
                      : 'border-gray-200'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-xl mb-4 ${
                        plan.color === 'orange'
                          ? 'bg-orange-100'
                          : plan.color === 'blue'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          plan.color === 'orange'
                            ? 'text-orange-600'
                            : plan.color === 'blue'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={plan.href}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                        isPopular
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.cta}
                    </Link>

                    {/* Features */}
                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Limitations (if any) */}
                    {plan.limitations.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 font-semibold mb-3">
                          Limitations:
                        </p>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-500"
                            >
                              <span className="text-gray-400">•</span>
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How do I upgrade or downgrade my plan?',
                  a: 'You can upgrade or downgrade anytime from your installer dashboard. Changes take effect immediately, and billing is prorated.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit/debit cards, UPI, net banking, and wallets via Razorpay. All transactions are secure and encrypted.',
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes, you can cancel your subscription anytime. There are no long-term contracts. Your listing will remain active until the end of your billing period.',
                },
                {
                  q: 'How many leads will I get?',
                  a: 'Lead volume depends on your city, competition, and plan. Featured listings typically get 3-5x more leads than free listings. Premium listings get ALL leads from your city.',
                },
                {
                  q: 'Is there a setup fee?',
                  a: 'No setup fees. You only pay the monthly subscription. The first month starts when you activate your plan.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 7-day money-back guarantee on Featured and Premium plans. If you\'re not satisfied, contact us at hello@gosolarindex.in for a full refund.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Solar Business?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of verified solar installers getting quality leads every day.
            </p>
            <Link
              href="/installers/signup"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
