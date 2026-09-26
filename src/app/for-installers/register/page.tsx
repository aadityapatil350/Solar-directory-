'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {
  Building2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  Mail,
  Globe,
  Award,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Location {
  id: string;
  city: string;
  state: string;
}

export default function RegisterInstallerPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    categoryId: '',
    locationId: '',
    website: '',
    address: '',
    description: '',
    yearsExperience: '',
    capacityMw: '',
    installationsCount: '',
    services: [] as string[],
  });

  const [customTagInput, setCustomTagInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedListing, setSubmittedListing] = useState<{ id: string; name: string; slug: string } | null>(null);

  // Fetch categories and locations on mount
  useEffect(() => {
    async function loadMeta() {
      try {
        const [catsRes, locsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/locations'),
        ]);
        if (catsRes.ok) setCategories(await catsRes.json());
        if (locsRes.ok) setLocations(await locsRes.json());
      } catch (err) {
        console.error('Failed to load categories/locations:', err);
      } finally {
        setLoadingMeta(false);
      }
    }
    loadMeta();
  }, []);

  const commonServices = [
    'Residential Rooftop Solar',
    'Commercial & Industrial Solar',
    'Turnkey EPC',
    'PM Surya Ghar Subsidy Support',
    'Net Metering & DISCOM Liaison',
    'Solar Panel Cleaning',
    'Annual Maintenance (AMC)',
    'Battery & Hybrid Systems',
  ];

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleAddCustomTag = () => {
    if (!customTagInput.trim()) return;
    if (!form.services.includes(customTagInput.trim())) {
      setForm((prev) => ({ ...prev, services: [...prev.services, customTagInput.trim()] }));
    }
    setCustomTagInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!form.categoryId) {
      setError('Please select a primary category for your business.');
      return;
    }

    if (!form.locationId) {
      setError('Please select your primary operational city / location.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/installers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.companyName,
          contactPerson: form.contactPerson,
          email: form.email,
          phone: form.phone,
          password: form.password,
          locationId: form.locationId,
          categoryId: form.categoryId,
          website: form.website || undefined,
          address: form.address || undefined,
          description: form.description || undefined,
          yearsExperience: form.yearsExperience || undefined,
          capacityMw: form.capacityMw || undefined,
          installationsCount: form.installationsCount || undefined,
          serviceTags: form.services,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit business details');
      }

      setSubmittedListing(data.listing);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-wash flex flex-col justify-between font-body text-ink">
      <div>
        <Header />

        <div className="max-w-content mx-auto px-4 sm:px-6 pt-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'For Installers', href: '/for-installers' },
              { label: 'List Your Business' },
            ]}
          />
        </div>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {submittedListing ? (
            /* Success confirmation screen */
            <div className="bg-paper border border-line rounded-sm p-8 sm:p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-sun-wash border border-sun/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-sun" />
              </div>
              <span className="inline-block text-xs uppercase tracking-wider font-bold bg-sun-wash text-ink px-3 py-1 rounded-sm mb-3">
                Submission Under Verification
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-ink mb-3">
                {submittedListing.name} is Submitted!
              </h1>
              <p className="text-sm sm:text-base text-ink-2 max-w-xl mx-auto mb-8 leading-relaxed">
                Your company profile has been submitted to the GoSolarIndex verification team. Our verification desk
                reviews empanelment credentials, phone numbers, and operational coverage within 24 hours.
              </p>

              <div className="bg-wash border border-line rounded-sm p-6 text-left mb-8 max-w-lg mx-auto space-y-4">
                <h3 className="font-heading font-bold text-sm text-ink flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sun" />
                  What happens next?
                </h3>
                <ul className="text-xs sm:text-sm text-ink-2 space-y-2 list-disc pl-5">
                  <li>
                    <strong className="text-ink">Admin Review &amp; Activation:</strong> Our verification team will review
                    your submission and activate your public listing.
                  </li>
                  <li>
                    <strong className="text-ink">Dashboard Access:</strong> Once approved, you can immediately log in with your
                    email <span className="font-semibold text-ink">({form.email})</span> and password at{' '}
                    <Link href="/dashboard/login" className="text-sun font-semibold underline underline-offset-2">
                      gosolarindex.in/dashboard/login
                    </Link>.
                  </li>
                  <li>
                    <strong className="text-ink">Leads &amp; Photos:</strong> Upload completed solar project photos, link your DISCOM
                    certifications, and receive direct homeowner quote requests.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/listing/${submittedListing.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition"
                >
                  Preview Your Listing Profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-paper border border-line text-ink font-semibold text-sm rounded-sm hover:bg-wash transition"
                >
                  Go to Installer Login
                </Link>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <div className="bg-paper border border-line rounded-sm p-6 sm:p-10 shadow-sm">
              <div className="mb-8 border-b border-line pb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sun-wash border border-line text-xs font-semibold text-ink mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-sun" />
                  Solar EPC &amp; Installer Directory Onboarding
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-ink tracking-tight mb-2">
                  List Your Solar Business on GoSolarIndex
                </h1>
                <p className="text-sm text-ink-2 leading-relaxed">
                  Join India’s premier rooftop solar directory. Once submitted, your profile is reviewed by our team and
                  connected to your dashboard to receive direct customer inquiries.
                </p>
                <p className="text-xs text-ink-2 mt-2">
                  Already listed in our directory?{' '}
                  <Link href="/locations" className="text-sun font-semibold underline underline-offset-2">
                    Search and claim your existing listing here →
                  </Link>
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                  <div>
                    <p className="font-semibold">Unable to submit listing</p>
                    <p className="text-xs text-red-600 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Business Info */}
                <div>
                  <h2 className="font-heading font-bold text-base text-ink mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sun" />
                    1. Company Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Company / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arkahub / Blues Renewables Pvt Ltd"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Primary Business Category *
                      </label>
                      <select
                        required
                        value={form.categoryId}
                        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-ink"
                      >
                        <option value="">Select category...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Headquarters / Primary City *
                      </label>
                      <select
                        required
                        value={form.locationId}
                        onChange={(e) => setForm({ ...form, locationId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-ink"
                      >
                        <option value="">Select city...</option>
                        {locations.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.city}, {l.state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Company Website URL
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-ink-2 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          placeholder="https://yourcompany.com"
                          value={form.website}
                          onChange={(e) => setForm({ ...form, website: e.target.value })}
                          className="w-full pl-9 pr-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Registered Office Address
                      </label>
                      <input
                        type="text"
                        placeholder="Suite, Street, Industrial Area, City, PIN"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Company Overview &amp; Specialization
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief overview of your solar installation services, team background, brands used, or empanelment details..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Experience & Metrics */}
                <div className="border-t border-line pt-6">
                  <h2 className="font-heading font-bold text-base text-ink mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-sun" />
                    2. Track Record &amp; Metrics (Optional)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        placeholder="e.g. 5"
                        value={form.yearsExperience}
                        onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Total Capacity (MW)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="e.g. 3.5"
                        value={form.capacityMw}
                        onChange={(e) => setForm({ ...form, capacityMw: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Completed Projects
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="e.g. 150"
                        value={form.installationsCount}
                        onChange={(e) => setForm({ ...form, installationsCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  {/* Services pills */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                      Services &amp; Specializations (Click to select)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {commonServices.map((svc) => {
                        const selected = form.services.includes(svc);
                        return (
                          <button
                            type="button"
                            key={svc}
                            onClick={() => toggleService(svc)}
                            className={`text-xs px-3 py-1.5 rounded-sm border transition font-medium ${
                              selected
                                ? 'bg-sun text-ink border-sun font-bold'
                                : 'bg-paper text-ink border-line hover:bg-wash'
                            }`}
                          >
                            {selected ? '✓ ' : '+ '}
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add another service (e.g. Waaree Authorised Dealer)"
                        value={customTagInput}
                        onChange={(e) => setCustomTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomTag();
                          }
                        }}
                        className="flex-1 px-3 py-1.5 bg-paper border border-line rounded-sm text-xs text-ink focus:outline-none focus:border-ink"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomTag}
                        className="px-3 py-1.5 bg-wash border border-line text-xs font-semibold text-ink rounded-sm hover:bg-line/20"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Contact & Auth */}
                <div className="border-t border-line pt-6">
                  <h2 className="font-heading font-bold text-base text-ink mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sun" />
                    3. Contact Person &amp; Dashboard Login Setup
                  </h2>
                  <p className="text-xs text-ink-2 mb-4">
                    This password will be used to log in to your installer dashboard at{' '}
                    <span className="font-semibold text-ink">gosolarindex.in/dashboard/login</span> once your business is
                    verified by admin.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Harsh Kumar"
                        value={form.contactPerson}
                        onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Official Business Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-ink-2 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. harsh@arkahub.in"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full pl-9 pr-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Phone / WhatsApp (Customer Enquiry Line) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-ink-2 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98976 57983"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-9 pr-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Create Dashboard Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Min 6 characters"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-2 hover:text-ink"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                        Confirm Password *
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-ink-2 text-center sm:text-left">
                    By submitting, you agree to our{' '}
                    <Link href="/terms" className="underline underline-offset-2 hover:text-ink">
                      Terms of Service
                    </Link>{' '}
                    and directory listing guidelines.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting || loadingMeta}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-sun text-ink font-heading font-bold text-sm rounded-sm hover:brightness-95 transition disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                        Submitting Business Details…
                      </>
                    ) : (
                      <>
                        Submit Business for Verification
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
