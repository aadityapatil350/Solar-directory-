import Link from 'next/link';
import Header from '@/components/Header';
import { Check, X, Zap, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Free & Premium Plans | GoSolarIndex',
  description: 'List your solar business on GoSolarIndex. Start free or go Premium for ₹999/month. Get featured placement, verified badge, and unlimited leads.',
};

const FREE_FEATURES = [
  { text: 'Basic listing on directory', included: true },
  { text: 'Appear in search results', included: true },
  { text: 'Show phone & address', included: true },
  { text: 'Up to 3 leads/month', included: true },
  { text: 'Standard placement', included: true },
  { text: 'Featured listing badge', included: false },
  { text: 'Verified business badge', included: false },
  { text: 'Priority placement in search', included: false },
  { text: 'Unlimited leads', included: false },
  { text: 'Homepage featured strip', included: false },
];

const PREMIUM_FEATURES = [
  { text: 'Everything in Free', included: true },
  { text: 'Featured listing badge ⭐', included: true },
  { text: 'Verified business badge ✓', included: true },
  { text: 'Priority placement in search', included: true },
  { text: 'Unlimited leads/month', included: true },
  { text: 'Homepage featured strip', included: true },
  { text: 'Appear at top of city pages', included: true },
  { text: 'WhatsApp lead notifications', included: true },
  { text: 'Analytics dashboard', included: true },
  { text: 'Dedicated support', included: true },
];

const FAQ = [
  {
    q: 'Is the Free plan really free?',
    a: 'Yes, 100% free forever. Your business gets listed and you receive up to 3 leads per month at no cost.',
  },
  {
    q: 'What is the Premium plan price?',
    a: 'Premium is ₹999/month (billed monthly) or ₹8,999/year (save 25%). No hidden charges.',
  },
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: 'Yes. Upgrade to Premium anytime. You can cancel anytime and will retain Premium benefits until the billing period ends.',
  },
  {
    q: 'How does the Verified badge help?',
    a: 'Verified businesses get 3x more enquiries. Customers trust businesses with the blue verified checkmark more.',
  },
  {
    q: 'How do leads work?',
    a: 'When a customer submits a quote request on the website, it is auto-assigned to matching installers in their city. Free plan gets up to 3 leads/month; Premium gets unlimited.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'UPI, credit/debit card, net banking, and all major wallets via Razorpay.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b py-14 px-4 text-center">
        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Simple Pricing
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Grow Your Solar Business
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Start free. Upgrade when you need more leads and visibility. No contracts.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow border border-gray-200 flex flex-col">
            <div className="p-8 border-b">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Free</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-gray-900">₹0</span>
              </div>
              <p className="text-gray-500 text-sm">Forever free · No credit card needed</p>
            </div>

            <div className="p-8 flex-1">
              <ul className="space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 shrink-0" />
                    )}
                    <span className={f.included ? 'text-gray-700' : 'text-gray-400'}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0">
              <Link
                href="/installers/signup"
                className="block w-full text-center border-2 border-orange-500 text-orange-600 font-semibold py-3 rounded-xl hover:bg-orange-50 transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-orange-500 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                Most Popular
              </span>
            </div>

            <div className="p-8 border-b border-orange-400">
              <p className="text-sm font-semibold text-orange-100 uppercase tracking-wide mb-2">Premium</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-white">₹999</span>
                <span className="text-orange-200 text-sm mb-2">/month</span>
              </div>
              <p className="text-orange-100 text-sm">or ₹8,999/year · Save 25%</p>
            </div>

            <div className="p-8 flex-1">
              <ul className="space-y-3">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-white shrink-0" />
                    <span className="text-white">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0">
              <Link
                href="/installers/signup"
                className="flex items-center justify-center gap-2 w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition shadow-md"
              >
                <Zap className="h-4 w-4" />
                Start Premium
              </Link>
              <p className="text-orange-100 text-xs text-center mt-3">
                Cancel anytime · No lock-in
              </p>
            </div>
          </div>

        </div>

        {/* Trust strip */}
        <div className="mt-10 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-6">
          <span>✅ 180+ verified businesses</span>
          <span>✅ 52 cities covered</span>
          <span>✅ Secure payments via Razorpay</span>
          <span>✅ GST invoice provided</span>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Full Feature Comparison</h2>
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Feature</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Free</th>
                <th className="text-center py-4 px-4 font-semibold text-orange-600">Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Directory listing', true, true],
                ['Phone & address visible', true, true],
                ['Appear in search', true, true],
                ['Leads per month', '3', 'Unlimited'],
                ['Featured badge ⭐', false, true],
                ['Verified badge ✓', false, true],
                ['Priority search ranking', false, true],
                ['Homepage featured strip', false, true],
                ['Top of city pages', false, true],
                ['WhatsApp notifications', false, true],
                ['Analytics', false, true],
                ['Support', 'Community', 'Dedicated'],
              ].map(([feature, free, premium]) => (
                <tr key={String(feature)} className="border-b last:border-0 hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-gray-700">{feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof free === 'boolean' ? (
                      free ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-gray-600">{free}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof premium === 'boolean' ? (
                      premium ? <Check className="h-4 w-4 text-orange-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                    ) : (
                      <span className="font-semibold text-orange-600">{premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="bg-white rounded-xl border p-6">
              <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
              <p className="text-gray-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-orange-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to get more leads?</h2>
        <p className="text-orange-100 mb-8 max-w-md mx-auto">
          Join 180+ solar businesses already listed on GoSolarIndex.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/installers/signup"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition shadow-md"
          >
            List for Free
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Talk to Us
          </Link>
        </div>
      </section>

      {/* Footer stub */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © 2025 GoSolarIndex · <Link href="/privacy" className="hover:text-white">Privacy</Link> · <Link href="/terms" className="hover:text-white">Terms</Link>
      </footer>
    </div>
  );
}
