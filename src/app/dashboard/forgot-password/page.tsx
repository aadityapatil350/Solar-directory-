'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sun, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/dashboard/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow border p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Forgot Password</h1>
                <p className="text-xs text-gray-500">GoSolarIndex — Owner Dashboard</p>
              </div>
            </div>

            {sent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Check your email</h2>
                <p className="text-sm text-gray-500 mb-6">
                  If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link. It expires in 30 minutes.
                </p>
                <Link
                  href="/dashboard/login"
                  className="text-orange-600 hover:underline text-sm font-medium"
                >
                  Back to login
                </Link>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-5">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@solarcompany.in"
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
                    {submitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>

                <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                  <Link
                    href="/dashboard/login"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
