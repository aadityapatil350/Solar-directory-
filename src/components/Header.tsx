'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sun, Menu, X, Calculator, ShieldCheck, Building2 } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <Sun className="h-5 w-5 fill-amber-400 text-amber-500" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-950">GoSolarIndex</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/tools/solar-subsidy-calculator"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium flex items-center gap-1.5"
            >
              <Calculator className="h-3.5 w-3.5 text-emerald-600" />
              Subsidy Calculator
            </Link>
            <Link
              href="/categories"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              href="/locations"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium"
            >
              Cities
            </Link>
            <Link
              href="/for-installers"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium flex items-center gap-1"
            >
              <Building2 className="h-3.5 w-3.5 text-zinc-400" />
              For Installers
            </Link>
            <Link
              href="/blog"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium"
            >
              Guides &amp; Blog
            </Link>
            <Link
              href="/pricing"
              className="text-zinc-600 hover:text-zinc-950 transition text-xs sm:text-sm font-medium"
            >
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/for-installers"
              className="text-xs font-medium text-zinc-700 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 px-3 py-2 rounded-lg transition"
            >
              Claim Listing
            </Link>
            <Link
              href="/dashboard/login"
              className="bg-zinc-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-zinc-800 transition shadow-sm"
            >
              Owner Login
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-zinc-600 hover:text-zinc-950 transition"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-zinc-800" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-zinc-200 mt-3 pt-3 space-y-2 pb-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/tools/solar-subsidy-calculator', label: 'Subsidy & Payback Calculator' },
              { href: '/categories', label: 'Categories' },
              { href: '/locations', label: 'Locations' },
              { href: '/for-installers', label: 'For Solar Installers' },
              { href: '/blog', label: 'Guides & Blog' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block text-zinc-700 hover:text-zinc-950 transition text-sm font-medium py-1.5 px-1"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-zinc-100 flex gap-2">
              <Link
                href="/for-installers"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center border border-zinc-200 bg-white text-zinc-800 text-xs font-medium py-2 rounded-lg"
              >
                Claim Listing
              </Link>
              <Link
                href="/dashboard/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center bg-zinc-900 text-white text-xs font-medium py-2 rounded-lg"
              >
                Owner Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
