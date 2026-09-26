'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Building2, MapPin, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Listing {
  id: string;
  name: string;
  category: { name: string };
  location: { city: string; state: string };
  address: string | null;
  phone: string | null;
  userId: string | null;
}

export default function ClaimListingPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loadingListing, setLoadingListing] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  // Step 1 form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Step 2 OTP state
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/listings/by-slug?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.listing) setListing(data.listing);
        else setNotFoundState(true);
      })
      .catch(() => setNotFoundState(true))
      .finally(() => setLoadingListing(false));
  }, [slug]);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  async function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing?.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }
      setSubmittedEmail(form.email);
      setStep(2);
      setResendCooldown(60);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOtpError('');
    if (otp.length !== 6) {
      setOtpError('Please enter the complete 6-digit verification code.');
      return;
    }

    setOtpSubmitting(true);
    try {
      const res = await fetch('/api/claim/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: submittedEmail,
          otp,
          listingId: listing?.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpError(data.error || 'Verification failed. Please check the code.');
        return;
      }
      setStep(3);
    } catch {
      setOtpError('Network error. Please try again.');
    } finally {
      setOtpSubmitting(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setOtpError('');
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing?.id,
          name: form.name,
          email: submittedEmail,
          phone: form.phone,
          password: form.password,
        }),
      });
      if (res.ok) {
        setResendCooldown(60);
      } else {
        const d = await res.json();
        setOtpError(d.error || 'Failed to resend OTP.');
      }
    } catch {
      setOtpError('Network error resending OTP.');
    } finally {
      setResending(false);
    }
  }

  if (loadingListing) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
        <Header />
        <div className="text-center py-32 text-sm text-ink-2 font-body">
          Loading listing records...
        </div>
        <Footer />
      </div>
    );
  }

  if (notFoundState || !listing) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-sun mx-auto" />
          <h1 className="font-heading font-bold text-2xl text-ink">Listing Not Found</h1>
          <p className="text-sm text-ink-2 font-body">
            This business listing does not exist in our directory yet or may have been updated.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/for-installers/register"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition"
            >
              List Your Business Now →
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-paper border border-line text-ink font-semibold text-sm rounded-sm hover:bg-wash transition"
            >
              Search by City
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (listing.userId) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-4">
          <CheckCircle2 className="h-10 w-10 text-sun mx-auto" />
          <h1 className="font-heading font-bold text-2xl text-ink">Already Claimed</h1>
          <p className="text-sm text-ink-2 font-body">
            This business listing has already been claimed and verified by its registered owner.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/login"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition"
            >
              Log in to Installer Dashboard →
            </Link>
            <Link
              href={`/listing/${slug}`}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-paper border border-line text-ink font-semibold text-sm rounded-sm hover:bg-wash transition"
            >
              View Public Listing
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: listing.name, href: `/listing/${slug}` },
              { label: 'Claim Listing', href: `/claim/${slug}` },
            ]}
          />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Listing preview banner */}
        <div className="border border-line rounded-sm p-5 bg-wash flex items-start gap-4">
          <Building2 className="h-5 w-5 text-ink shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-2 font-body">
              Claiming Business Profile
            </span>
            <h2 className="font-heading font-bold text-lg text-ink">{listing.name}</h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-ink-2 font-body">
              <span>{listing.category.name}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {listing.location.city}, {listing.location.state}
              </span>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-4 text-xs font-body border-b border-line pb-4">
          <span className={step === 1 ? 'font-bold text-ink' : 'text-ink-2'}>
            1. Business details
          </span>
          <span className="text-ink-2">→</span>
          <span className={step === 2 ? 'font-bold text-ink' : 'text-ink-2'}>
            2. Email verification
          </span>
          <span className="text-ink-2">→</span>
          <span className={step === 3 ? 'font-bold text-ink' : 'text-ink-2'}>
            3. Review &amp; Activation
          </span>
        </div>

        {/* Step 1: Claim form */}
        {step === 1 && (
          <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper space-y-6">
            <div>
              <h1 className="font-heading font-bold text-2xl text-ink">
                Owner Details &amp; Registration
              </h1>
              <p className="text-xs text-ink-2 font-body mt-1">
                Create your verified owner account. We will send a secure verification code to validate ownership.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold font-body">
                <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1 font-body">
                  Your full name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Suresh Deshmukh"
                  className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1 font-body">
                    Official business email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1 font-body">
                    Mobile number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1 font-body">
                    Password (min. 8 characters) *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Create password"
                      className="w-full h-11 pl-3.5 pr-10 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-2 hover:text-ink p-1"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1 font-body">
                    Confirm password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Dispatching verification code...' : 'Continue — Send verification OTP'}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-line text-center text-xs text-ink-2 font-body">
              Already have an owner account?{' '}
              <Link href="/dashboard/login" className="text-ink underline font-medium">
                Log in here
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: OTP verification */}
        {step === 2 && (
          <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper space-y-6">
            <div>
              <h1 className="font-heading font-bold text-2xl text-ink">
                Verify Your Email
              </h1>
              <p className="text-xs text-ink-2 font-body mt-1">
                We have dispatched a 6-digit OTP code to <strong>{submittedEmail}</strong>. Valid for 15 minutes.
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1 font-body">
                  6-Digit verification code *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full h-12 border border-line rounded-sm text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:border-ink font-body bg-paper text-ink"
                />
              </div>

              {otpError && (
                <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold font-body">
                  <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={otpSubmitting}
                  className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
                >
                  {otpSubmitting ? 'Verifying...' : 'Verify & Claim Profile'}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between pt-4 border-t border-line text-xs font-body">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || resending}
                className="text-ink underline hover:text-ink/80 disabled:text-ink-2 disabled:no-underline"
              >
                {resending
                  ? 'Resending...'
                  : resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : 'Resend code'}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(''); setOtpError(''); }}
                className="text-ink-2 hover:text-ink underline"
              >
                Change details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="border border-line rounded-sm p-8 bg-paper text-center space-y-4">
            <CheckCircle2 className="h-10 w-10 text-ink mx-auto" />
            <h1 className="font-heading font-bold text-2xl text-ink">
              Claim submitted for review
            </h1>
            <p className="text-sm text-ink-2 font-body max-w-md mx-auto leading-relaxed">
              Your claim for <strong>{listing?.name}</strong> has been logged. Our verification team validates registrations within 24 to 48 hours to preserve directory integrity.
            </p>
            <div className="pt-3">
              <Link
                href={`/listing/${slug}`}
                className="inline-flex items-center justify-center h-10 px-5 border border-ink text-ink text-xs font-semibold rounded-sm hover:bg-wash"
              >
                Return to listing profile
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
