import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check, X, Star, Zap, BadgeCheck, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing — Free & Featured Plans | GoSolarIndex',
  description: 'Claim your solar business listing for free on GoSolarIndex. Upgrade to Featured for ₹999/month to get priority placement, up to 5 photos, leads & more.',
  path: '/pricing',
});

const FREE_FEATURES = [
  { text: 'Claim & verify your listing', included: true },
  { text: 'Edit all business details', included: true },
  { text: 'Admin-verified badge on listing', included: true },
  { text: 'Basic enquiry visibility', included: true },
  { text: 'Photo uploads', included: false },
  { text: 'YouTube "Show Your Work" video', included: false },
  { text: 'Priority placement in search', included: false },
  { text: 'Featured badge on listing card', included: false },
  { text: 'Appear on Homepage Featured strip', included: false },
  { text: 'Lead notifications (email)', included: false },
  { text: 'Full analytics dashboard', included: false },
];

const FEATURED_FEATURES = [
  { text: 'Everything in Free', included: true },
  { text: 'Upload up to 5 photos', included: true },
  { text: 'YouTube "Show Your Work" video', included: true },
  { text: 'Priority placement in search', included: true },
  { text: 'Featured badge on listing card', included: true },
  { text: 'Appear on Homepage Featured strip', included: true },
  { text: 'Lead notifications (email)', included: true },
  { text: 'Full analytics dashboard (views, clicks)', included: true },
  { text: 'Full contact details in leads tab', included: true },
  { text: 'Dedicated support', included: true },
];

const FAQS = [
  {
    q: 'Is claiming my listing really free?',
    a: 'Yes, 100% free. Submit your claim, verify your email with OTP, and our team will review and approve it — usually within 24–48 hours. Once approved, you get a Verified badge and full dashboard access at no cost.',
  },
  {
    q: 'Why does the claim need admin approval?',
    a: 'To keep GoSolarIndex trustworthy, we manually verify that claims come from genuine business owners. This protects your listing from being claimed by competitors and ensures customers always see accurate, owner-managed information.',
  },
  {
    q: 'How long does approval take?',
    a: 'Most claims are reviewed within 24–48 hours. You will receive an email notification as soon as your claim is approved.',
  },
  {
    q: 'How do I claim my listing?',
    a: 'Find your business on GoSolarIndex, click "Claim this listing", fill in your details, and verify your email with a 6-digit OTP. Your claim then goes to our team for review — takes under 2 minutes to submit.',
  },
  {
    q: 'What is the Featured plan price?',
    a: 'Featured is ₹999/month. No annual commitment, cancel anytime.',
  },
  {
    q: 'What is the "Show Your Work" YouTube feature?',
    a: 'Featured plan members can add a YouTube video link to their listing page. Customers can watch real installation videos directly on your profile — builds massive trust.',
  },
  {
    q: 'How does priority placement work?',
    a: 'Featured listings appear at the top of city and category search results, above free listings. You get significantly more profile views.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'UPI, credit/debit card, net banking, and all major wallets via Razorpay.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="bg-white border-b py-14 px-4 text-center">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Simple Pricing — 2 Plans Only
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Claim Free. Grow with Featured.
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Get your solar business admin-verified for free. Upgrade to Featured when you want more leads and visibility.
          </p>
        </section>

        {/* Admin approval notice */}
        <section className="max-w-2xl mx-auto px-4 pt-10">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4 flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800">Claims are admin-reviewed (24–48 hrs)</p>
              <p className="text-sm text-blue-700 mt-0.5">
                After submitting your OTP-verified claim, our team reviews it to ensure only genuine business owners
                get access. You receive an email once approved.
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col">
              <div className="p-8 border-b">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Free</p>
                </div>
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
                  href="/"
                  className="block w-full text-center border-2 border-orange-500 text-orange-600 font-semibold py-3 rounded-xl hover:bg-orange-50 transition"
                >
                  Find & Claim Your Listing
                </Link>
              </div>
            </div>

            {/* Featured Plan */}
            <div className="bg-orange-500 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                  Most Popular
                </span>
              </div>

              <div className="p-8 border-b border-orange-400">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-orange-100 uppercase tracking-wide">Featured</p>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-bold text-white">₹999</span>
                  <span className="text-orange-200 text-sm mb-2">/month</span>
                </div>
                <p className="text-orange-100 text-sm">Cancel anytime · No lock-in</p>
              </div>

              <div className="p-8 flex-1">
                <ul className="space-y-3">
                  {FEATURED_FEATURES.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-white shrink-0" />
                      <span className="text-white">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition shadow-md"
                >
                  <Zap className="h-4 w-4" />
                  Upgrade to Featured
                </Link>
                <p className="text-orange-100 text-xs text-center mt-3">
                  Claim must be approved first
                </p>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-green-500" /> 180+ verified businesses</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-green-500" /> 52 cities covered</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-green-500" /> Secure payments via Razorpay</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-green-500" /> GST invoice provided</span>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How Claiming Works</h2>
          <div className="grid sm:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Find Your Listing', desc: 'Search GoSolarIndex for your business name or browse your city.' },
              { step: '2', title: 'Submit Claim', desc: 'Fill in your details and verify your email with a 6-digit OTP. Takes under 2 minutes.' },
              { step: '3', title: 'Admin Review', desc: 'Our team reviews your claim within 24–48 hours and sends an approval email.' },
              { step: '4', title: 'Manage & Grow', desc: 'Log in to your dashboard, edit details, view leads, and optionally upgrade to Featured.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl border p-5 text-center">
                <div className="w-10 h-10 bg-orange-500 text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto px-4 pb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((item) => (
              <div key={item.q} className="bg-white rounded-xl border p-6">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-orange-500 py-14 px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Is your business listed?</h2>
          <p className="text-orange-100 mb-8 max-w-md mx-auto">
            Claim it for free. Our team verifies and approves within 24–48 hours — then you&apos;re in full control.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition shadow-md"
            >
              Claim Your Listing Free
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Talk to Us
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
