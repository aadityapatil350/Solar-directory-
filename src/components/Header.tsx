'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sun, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-sun stroke-[2.2]" />
          <span className="font-heading font-bold text-xl tracking-tight text-ink">
            GoSolarIndex
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink">
          <Link href="/blog" className="hover:text-ink/80 transition-colors">
            Learn
          </Link>

          {/* Tools dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-ink/80 transition-colors focus:outline-none">
              Tools
              <svg
                className="h-3.5 w-3.5 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel — CSS-only via group-hover */}
            <div className="absolute left-0 top-full mt-2 w-64 bg-paper border border-line rounded-md shadow-float opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-1.5 space-y-0.5">
                <Link
                  href="/tools/solar-subsidy-calculator"
                  className="flex items-start gap-3 px-3 py-2.5 rounded-sm hover:bg-wash transition-colors"
                >
                  <span className="mt-0.5 text-sun font-semibold">₹</span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">Subsidy Calculator</span>
                    <span className="block text-xs text-ink/60 mt-0.5">Check PM Surya Ghar subsidy</span>
                  </span>
                </Link>
                <Link
                  href="/tools/solar-savings-calculator"
                  className="flex items-start gap-3 px-3 py-2.5 rounded-sm hover:bg-wash transition-colors"
                >
                  <span className="mt-0.5 text-sun">⚡</span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">Savings Calculator</span>
                    <span className="block text-xs text-ink/60 mt-0.5">Estimate monthly bill savings</span>
                  </span>
                </Link>
                <Link
                  href="/tools/solar-system-size-calculator"
                  className="flex items-start gap-3 px-3 py-2.5 rounded-sm hover:bg-wash transition-colors"
                >
                  <span className="mt-0.5 text-sun">☀</span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">System Size Calculator</span>
                    <span className="block text-xs text-ink/60 mt-0.5">Find the right kW for your home</span>
                  </span>
                </Link>
                <div className="border-t border-line my-1" />
                <Link
                  href="/tools"
                  className="flex items-center px-3 py-2 rounded-sm hover:bg-wash transition-colors text-sm font-semibold text-sun"
                >
                  View all tools →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/locations" className="hover:text-ink/80 transition-colors">
            Find
          </Link>
          <Link href="/for-installers" className="hover:text-ink/80 transition-colors">
            For installers
          </Link>
        </nav>

        {/* Primary CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/get-quotes"
            className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
          >
            Get quotes
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-line bg-paper px-4 py-4 space-y-3">
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-ink py-1.5"
          >
            Learn (Guides &amp; Articles)
          </Link>

          {/* Tools sub-section */}
          <div className="py-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/40 mb-2">Tools</p>
            <div className="space-y-0.5 pl-1">
              <Link
                href="/tools/solar-subsidy-calculator"
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-ink py-1.5"
              >
                Subsidy Calculator
              </Link>
              <Link
                href="/tools/solar-savings-calculator"
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-ink py-1.5"
              >
                Savings Calculator
              </Link>
              <Link
                href="/tools/solar-system-size-calculator"
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-ink py-1.5"
              >
                System Size Calculator
              </Link>
              <Link
                href="/tools"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold text-sun py-1.5"
              >
                View all tools →
              </Link>
            </div>
          </div>

          <Link
            href="/locations"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-ink py-1.5"
          >
            Find (Browse by City)
          </Link>
          <Link
            href="/categories"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-ink py-1.5"
          >
            Categories
          </Link>
          <Link
            href="/for-installers"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-ink py-1.5"
          >
            For installers (Claim or register)
          </Link>
          <div className="pt-2">
            <Link
              href="/get-quotes"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center h-12 bg-sun text-ink font-semibold text-base rounded-sm hover:brightness-95 transition-colors"
            >
              Get quotes
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
