'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function DashboardLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = '/dashboard';
        return;
      } else {
        setError(data.error || 'Login failed. Please verify your credentials.');
      }
    } catch {
      setError('Network connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function setLoading(v: boolean) {
    setSubmitting(v);
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper space-y-6">
            <div className="text-center space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-2 font-body">
                Partner Portal
              </span>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-ink">
                Installer Login
              </h1>
              <p className="text-xs text-ink-2 font-body">
                Access your verified business profile, project gallery, and customer enquiries.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold font-body">
                <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-medium text-ink mb-1 font-body">
                  Account email address *
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="installer@example.com"
                  className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="login-pwd" className="text-xs font-medium text-ink font-body">
                    Password *
                  </label>
                  <Link
                    href="/dashboard/forgot-password"
                    className="text-xs text-ink underline hover:text-ink/80 font-body"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-pwd"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-3.5 pr-10 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-2 hover:text-ink p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Authenticating...' : 'Sign in to Dashboard'}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-line text-center text-xs text-ink-2 font-body space-y-1.5">
              <p>
                Haven't claimed your business yet?{' '}
                <Link href="/for-installers" className="text-ink underline font-medium">
                  Claim business
                </Link>
              </p>
              <p>
                <Link href="/" className="text-ink underline">
                  Back to GoSolarIndex
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
