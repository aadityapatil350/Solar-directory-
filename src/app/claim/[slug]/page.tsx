'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sun, MapPin, Building2, CheckCircle, AlertCircle, Eye, EyeOff, Mail, Clock } from 'lucide-react';

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

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  async function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing!.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmittedEmail(data.email);
        setStep(2);
        setResendCooldown(300); // 5 minute cooldown
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOtpError('');

    if (!otp || otp.length !== 6) {
      setOtpError('Please enter the 6-digit OTP.');
      return;
    }

    setOtpSubmitting(true);
    try {
      const res = await fetch('/api/claim/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail, otp, listingId: listing!.id }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'pending') {
        setStep(3);
      } else {
        setOtpError(data.error || 'Verification failed. Please try again.');
      }
    } catch {
      setOtpError('Network error. Please try again.');
    } finally {
      setOtpSubmitting(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setResending(true);
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing!.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      if (res.ok) {
        setResendCooldown(300);
        setOtpError('');
      } else {
        const data = await res.json();
        setOtpError(data.error || 'Failed to resend OTP.');
      }
    } catch {
      setOtpError('Network error. Please try again.');
    } finally {
      setResending(false);
    }
  }

  if (loadingListing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
        </div>
      </div>
    );
  }

  if (notFoundState || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing not found</h1>
          <p className="text-gray-500 mb-6">This listing does not exist or may have been removed.</p>
          <Link href="/" className="text-orange-600 hover:underline">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (listing.userId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Already Claimed</h1>
          <p className="text-gray-500 mb-6">This listing has already been claimed by its owner.</p>
          <Link href={`/listing/${slug}`} className="text-orange-600 hover:underline">View Listing</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Listing preview */}
        <div className="bg-white rounded-2xl shadow border p-6 mb-6">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-3">You are claiming</p>
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-xl shrink-0">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{listing.name}</h2>
              <p className="text-gray-500 text-sm">{listing.category.name}</p>
              <div className="flex items-center gap-1 mt-1 text-gray-400 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                {listing.location.city}, {listing.location.state}
              </div>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex items-center gap-2 text-sm font-medium ${step === 1 ? 'text-orange-600' : 'text-green-600'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${step === 1 ? 'bg-orange-500' : 'bg-green-500'}`}>
              {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
            </div>
            Your Details
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 text-sm font-medium ${step === 2 ? 'text-orange-600' : 'text-gray-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            Verify Email
          </div>
        </div>

        {/* Step 1: Claim form */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow border p-8">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-5 w-5 text-orange-500" />
              <h1 className="text-xl font-bold text-gray-900">Claim This Listing</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Create your owner account to manage this listing. We&apos;ll send an OTP to verify your email.
            </p>

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="rajesh@solarcompany.in"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
              >
                {submitting ? 'Sending OTP...' : 'Continue — Send OTP'}
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Already have an account?{' '}
              <Link href="/dashboard/login" className="text-orange-600 hover:underline">Login here</Link>
            </p>
          </div>
        )}

        {/* Step 2: OTP verification */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow border p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Verify Your Email</h1>
                <p className="text-sm text-gray-500">OTP sent to {submittedEmail}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              We&apos;ve sent a 6-digit verification code to <strong>{submittedEmail}</strong>.
              Enter it below to complete your claim. The code expires in 15 minutes.
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {otpError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {otpError}
                </div>
              )}

              <button
                type="submit"
                disabled={otpSubmitting}
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
              >
                {otpSubmitting ? 'Verifying...' : 'Verify & Claim Listing'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || resending}
                className="text-sm text-orange-600 hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {resending
                  ? 'Resending...'
                  : resendCooldown > 0
                  ? `Resend OTP in ${Math.floor(resendCooldown / 60)}:${String(resendCooldown % 60).padStart(2, '0')}`
                  : 'Resend OTP'}
              </button>
            </div>

            <button
              onClick={() => { setStep(1); setOtp(''); setOtpError(''); }}
              className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700 text-center"
            >
              ← Change email / details
            </button>
          </div>
        )}

        {/* Step 3: Claim submitted — under review */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow border p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted!</h1>
            <p className="text-gray-600 mb-4">
              Your claim for <strong>{listing?.name}</strong> is now under review.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-6 text-left space-y-2">
              <p className="font-semibold">What happens next?</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Our team will verify your claim within <strong>24–48 hours</strong></li>
                <li>You&apos;ll receive an email at <strong>{submittedEmail}</strong> once approved</li>
                <li>After approval, log in to your dashboard to manage your listing</li>
              </ul>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              This review ensures only genuine business owners can manage listings — keeping GoSolarIndex trustworthy for customers.
            </p>
            <Link
              href={`/listing/${slug}`}
              className="inline-block text-orange-600 font-semibold hover:underline text-sm"
            >
              ← Back to listing
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
