import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Zap,
  Building2,
  Users,
  Search,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Solar Installers & EPC Contractors: Claim Listing & Get Verified Leads | GoSolarIndex',
  description:
    'Join India’s premier rooftop solar directory. Claim your business profile, get verified with MNRE accreditation, receive high-intent homeowner solar inquiries, and close turnkey projects.',
  alternates: {
    canonical: 'https://gosolarindex.in/for-installers',
  },
};

export default function ForInstallersPage() {
  const benefits = [
    {
      title: 'High-Intent Homeowner Enquiries',
      description:
        'Connect directly with pre-screened homeowners who have already calculated their PM Surya Ghar subsidy and system size in your city.',
      icon: Zap,
    },
    {
      title: 'Verified MNRE Provider Badge',
      description:
        'Differentiate your business with the Verified & MNRE-compliant badge to build immediate credibility with residential and commercial buyers.',
      icon: ShieldCheck,
    },
    {
      title: 'Direct WhatsApp & Phone Inquiries',
      description:
        'Receive direct calls and WhatsApp leads straight to your sales team with zero intermediate commission.',
      icon: PhoneCall,
    },
    {
      title: 'City & State Search Prominence',
      description:
        'Gain top placement across dynamic city directory hubs, category rankings, and brand-authorized dealer listings.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      <div>
        <Header />

        {/* Hero Section */}
        <section className="bg-white border-b border-zinc-200/80 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Empanelled Installer & EPC Portal
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              Grow Your Solar EPC Business with Verified Homeowner Leads
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Over 1,700+ solar installers across India are listed on GoSolarIndex. Claim your company profile, update service tags, and receive verified PM Surya Ghar inquiries in your service territory.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/locations"
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-7 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                Find & Claim Your Business Profile
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-medium text-sm px-7 py-3.5 rounded-xl transition"
              >
                View Installer Plans
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Why Top Indian Solar Installers Choose GoSolarIndex
            </h2>
            <p className="text-sm text-zinc-500 mt-2">
              Turn online search impressions into commissioned rooftop solar installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 hover:shadow-sm transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-2">{b.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Claim Verification Process */}
        <section className="bg-white border-y border-zinc-200/80 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                How to Claim & Verify Your Business in 3 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white font-bold text-lg flex items-center justify-center mx-auto">
                  1
                </div>
                <h3 className="font-bold text-zinc-900 text-base">Search Your Business</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Browse by your city or search your business name in our 1,700+ directory to locate your listing page.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white font-bold text-lg flex items-center justify-center mx-auto">
                  2
                </div>
                <h3 className="font-bold text-zinc-900 text-base">OTP Verification</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Click &apos;Claim Listing&apos; and verify ownership with your registered business email or mobile OTP in 60 seconds.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center mx-auto">
                  3
                </div>
                <h3 className="font-bold text-zinc-900 text-base">Receive Leads & Edit</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Upload project photos, display DISCOM certifications, and manage all incoming customer quote requests directly.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition shadow-sm"
              >
                Browse Cities to Find Your Listing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
