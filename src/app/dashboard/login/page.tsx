'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sun, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function DashboardLoginPage() {
  const router = useRouter();
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

    setSubmitting(true);
    try {
      const res = await fetch('/api/dashboard/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please try again.');
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
          {/* Card */}
          <div className="bg-white rounded-2xl shadow border p-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Listing Owner Login</h1>
                <p className="text-xs text-gray-500">GoSolarIndex Dashboard</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@solarcompany.in"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Your password"
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
                {submitting ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center space-y-2">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/" className="text-orange-600 hover:underline font-medium">
                  Claim your listing
                </Link>
              </p>
              <p className="text-xs text-gray-400">
                Are you an installer?{' '}
                <Link href="/installers/login" className="text-orange-600 hover:underline">
                  Installer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
