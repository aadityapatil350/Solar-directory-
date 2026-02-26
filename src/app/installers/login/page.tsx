'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Sun, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectTo = searchParams.get('from') || '/installers/dashboard';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
                <Sun className="h-9 w-9 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Installer Login</h1>
              <p className="text-gray-500 text-sm mt-1">Access your GoSolarIndex dashboard</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Link href="/installers/forgot-password" className="text-xs text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="Your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/installers/signup" className="text-orange-600 font-medium hover:underline">
                Register your business
              </Link>
            </div>
          </div>

          {/* Info box */}
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-gray-700">
            <p className="font-medium text-orange-800 mb-1">First time here?</p>
            <p>
              After signing up, your account is reviewed within 24 hours. Once approved you can log in
              and start receiving leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
