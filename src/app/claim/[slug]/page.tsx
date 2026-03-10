'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Sun, MapPin, Building2, CheckCircle, AlertCircle } from 'lucide-react';

interface Listing {
  id: string;
  name: string;
  category: { name: string };
  location: { city: string; state: string };
  address: string | null;
  phone: string | null;
}

export default function ClaimListingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loadingListing, setLoadingListing] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/listings/by-slug?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.listing) setListing(data.listing);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingListing(false));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.phone) {
      setError('Name, email and phone are required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing!.id, ...form }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
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

  if (notFound || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing not found</h1>
          <p className="text-gray-500 mb-6">This listing does not exist or may have been removed.</p>
          <Link href="/" className="text-orange-600 hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="bg-white rounded-2xl shadow p-10">
            <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Claim Request Submitted!</h1>
            <p className="text-gray-500 mb-6">
              We&apos;ve received your claim for <strong>{listing.name}</strong>. Our team will verify your details and respond within 24–48 hours.
            </p>
            <p className="text-sm text-gray-400 mb-6">Check your email at <strong>{form.email}</strong> for updates.</p>
            <Link href="/" className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-medium text-sm">
              Back to Home
            </Link>
          </div>
        </div>
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

        {/* Form */}
        <div className="bg-white rounded-2xl shadow border p-8">
          <div className="flex items-center gap-2 mb-1">
            <Sun className="h-5 w-5 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-900">Claim This Listing</h1>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Fill in your details below. Our team will verify and approve your claim within 24–48 hours. Once approved, you can manage this listing from your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Full Name *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us why you're the owner of this listing — any verification details..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
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
              {submitting ? 'Submitting...' : 'Submit Claim Request'}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Already have an account?{' '}
            <Link href="/installers/login" className="text-orange-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
