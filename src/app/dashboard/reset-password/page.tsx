'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sun, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

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
      setError('Password must be at least 8 characters.');
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
        setTimeout(() => router.push('/dashboard/login'), 3000);
      } else {
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
          <Sun className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Set New Password</h1>
          <p className="text-xs text-gray-500">GoSolarIndex — Owner Dashboard</p>
        </div>
      </div>

      {done ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Password updated!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your password has been reset successfully. Redirecting to login...
          </p>
          <Link href="/dashboard/login" className="text-orange-600 hover:underline text-sm font-medium">
            Go to login
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-5">Enter your new password below.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="At least 8 characters"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="Repeat your new password"
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
              disabled={submitting || !token}
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
            >
              {submitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<div className="bg-white rounded-2xl shadow border p-8 text-center text-gray-400">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
