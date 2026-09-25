'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new reset link.');
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/dashboard/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        setDone(true);
        setTimeout(() => router.push('/dashboard/login'), 2500);
      } else {
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-line rounded-sm p-6 bg-wash text-center space-y-3">
        <CheckCircle2 className="h-8 w-8 text-ink mx-auto" />
        <h3 className="font-heading font-semibold text-lg text-ink">Password updated successfully</h3>
        <p className="text-xs text-ink-2 font-body">
          Redirecting you to the installer login page...
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard/login"
            className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95"
          >
            Sign in now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold font-body">
          <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="rp-pwd" className="block text-xs font-medium text-ink mb-1 font-body">
          New password (min. 8 characters) *
        </label>
        <div className="relative">
          <input
            id="rp-pwd"
            type={showPassword ? 'text' : 'password'}
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter new password"
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
        <label htmlFor="rp-confirm" className="block text-xs font-medium text-ink mb-1 font-body">
          Confirm new password *
        </label>
        <input
          id="rp-confirm"
          type={showPassword ? 'text' : 'password'}
          required
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          placeholder="Repeat new password"
          className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting || !token}
          className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Updating password...' : 'Update password'}
        </button>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper space-y-6">
            <div className="text-center space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-2 font-body">
                Account Security
              </span>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-ink">
                Set New Password
              </h1>
              <p className="text-xs text-ink-2 font-body">
                Choose a strong password with at least 8 characters.
              </p>
            </div>

            <Suspense fallback={<div className="text-center py-6 text-xs text-ink-2">Loading reset form...</div>}>
              <ResetPasswordForm />
            </Suspense>

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
