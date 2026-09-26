import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Zap,
  Building2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  PlusCircle,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Solar Installers & EPC Contractors: List Your Business & Get Verified Leads | GoSolarIndex',
  description:
    'Join India’s premier rooftop solar directory. List or claim your business profile, get verified with DISCOM & PM Surya Ghar accreditation, receive direct homeowner inquiries, and grow your turnkey installations.',
  alternates: {
    canonical: 'https://gosolarindex.in/for-installers',
  },
};

export default function ForInstallersPage() {
  const benefits = [
    {
      title: 'High-Intent Homeowner Inquiries',
      description:
        'Connect directly with pre-screened homeowners who have calculated their PM Surya Ghar subsidy and system size in your territory.',
      icon: Zap,
    },
    {
      title: 'Verified Installer & EPC Badge',
      description:
        'Differentiate your company with the Verified Partner badge to build immediate confidence with residential and commercial buyers.',
      icon: ShieldCheck,
    },
    {
      title: 'Direct WhatsApp & Phone Leads',
      description:
        'Receive direct calls and WhatsApp leads straight to your sales team with zero intermediate commission.',
      icon: PhoneCall,
    },
    {
      title: 'Top Search Prominence in Your City',
      description:
        'Gain premium visibility across city directory hubs, solar category rankings, and brand-authorized dealer listings.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-wash flex flex-col justify-between font-body text-ink">
      <div>
        <Header />

        <div className="max-w-content mx-auto px-4 sm:px-6 pt-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'For Installers' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-paper border-b border-line py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sun-wash border border-line text-xs font-semibold text-ink mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sun" />
              Empanelled Installer &amp; EPC Portal
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-ink mb-4">
              Grow Your Solar EPC Business with Verified Homeowner Inquiries
            </h1>
            <p className="text-base sm:text-lg text-ink-2 max-w-2xl mx-auto leading-relaxed mb-10">
              Over 1,700+ solar installers across India are listed on GoSolarIndex. Whether your company is already in our
              directory or you want to register a new profile, we help you connect directly with customers.
            </p>

            {/* Dual CTA cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {/* Option 1: List New Business */}
              <div className="bg-wash border border-line rounded-sm p-6 flex flex-col justify-between hover:border-ink transition">
                <div>
                  <div className="w-10 h-10 rounded-sm bg-sun-wash border border-line flex items-center justify-center mb-3">
                    <PlusCircle className="w-5 h-5 text-sun" />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-ink mb-1">
                    New Installer Registration
                  </h2>
                  <p className="text-xs text-ink-2 leading-relaxed mb-4">
                    Not listed on GoSolarIndex yet? Submit your company profile, services, and coverage in 2 minutes.
                  </p>
                </div>
                <Link
                  href="/for-installers/register"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition"
                >
                  List Your Business Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Option 2: Search & Claim */}
              <div className="bg-wash border border-line rounded-sm p-6 flex flex-col justify-between hover:border-ink transition">
                <div>
                  <div className="w-10 h-10 rounded-sm bg-paper border border-line flex items-center justify-center mb-3">
                    <Search className="w-5 h-5 text-ink" />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-ink mb-1">
                    Claim Existing Profile
                  </h2>
                  <p className="text-xs text-ink-2 leading-relaxed mb-4">
                    Already listed in our directory? Search your city to locate your listing, verify ownership, and get dashboard access.
                  </p>
                </div>
                <Link
                  href="/locations"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-paper border border-line text-ink font-semibold text-sm rounded-sm hover:bg-wash transition"
                >
                  Search &amp; Claim Listing
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink tracking-tight">
              Why Top Indian Solar Installers Choose GoSolarIndex
            </h2>
            <p className="text-sm text-ink-2 mt-2">
              Turn online search impressions into commissioned rooftop solar installations across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-paper rounded-sm border border-line p-6 sm:p-8 hover:border-ink transition"
                >
                  <div className="w-10 h-10 rounded-sm bg-wash border border-line flex items-center justify-center text-ink mb-4">
                    <Icon className="w-5 h-5 text-sun" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-ink mb-2">{b.title}</h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Claim / Registration 3-Step Process */}
        <section className="bg-paper border-y border-line py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
                How It Works: From Submission to Live Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-sm bg-ink text-paper font-bold font-heading text-lg flex items-center justify-center mx-auto">
                  1
                </div>
                <h3 className="font-bold font-heading text-ink text-base">Submit or Find Profile</h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  Register your business details online or locate your existing directory entry by browsing your city.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-sm bg-ink text-paper font-bold font-heading text-lg flex items-center justify-center mx-auto">
                  2
                </div>
                <h3 className="font-bold font-heading text-ink text-base">Admin Verification</h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  Our verification desk reviews your empanelment, phone number, and service areas to award the Verified badge.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-sm bg-sun text-ink font-bold font-heading text-lg flex items-center justify-center mx-auto">
                  3
                </div>
                <h3 className="font-bold font-heading text-ink text-base">Receive Leads &amp; Edit Profile</h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  Log in to your dashboard to upload project photos, view leads, and receive direct inquiries on WhatsApp.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/for-installers/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sun text-ink font-semibold text-sm px-8 py-3.5 rounded-sm hover:brightness-95 transition"
              >
                Register Your Solar Business
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-paper border border-line text-ink font-semibold text-sm px-8 py-3.5 rounded-sm hover:bg-wash transition"
              >
                View Premium Partner Plans
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
