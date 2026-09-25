'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper space-y-6">
            <div className="text-center space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-2 font-body">
                Account Recovery
              </span>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-ink">
                Reset Password
              </h1>
              <p className="text-xs text-ink-2 font-body">
                Enter your registered business account email to receive a password reset link.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold font-body">
                <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
                <span>{error}</span>
              </div>
            )}

            {sent ? (
              <div className="border border-line rounded-sm p-6 bg-wash text-center space-y-3">
                <CheckCircle2 className="h-8 w-8 text-ink mx-auto" />
                <h3 className="font-heading font-semibold text-lg text-ink">Reset email dispatched</h3>
                <p className="text-xs text-ink-2 font-body leading-relaxed">
                  If an account exists for <strong>{email}</strong>, a secure password reset link has been delivered to your inbox.
                </p>
                <div className="pt-2">
                  <Link
                    href="/dashboard/login"
                    className="inline-flex items-center justify-center h-10 px-5 border border-ink text-ink text-xs font-semibold rounded-sm hover:bg-paper"
                  >
                    Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fp-email" className="block text-xs font-medium text-ink mb-1 font-body">
                    Registered account email *
                  </label>
                  <input
                    id="fp-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="installer@example.com"
                    className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Sending instructions...' : 'Send reset link'}
                  </button>
                </div>
              </form>
            )}

            <div className="pt-4 border-t border-line text-center text-xs text-ink-2 font-body">
              <Link href="/dashboard/login" className="text-ink underline">
                Return to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
