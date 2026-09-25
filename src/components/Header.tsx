'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sun, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo: Sun-coloured mark with wordmark in Ink */}
        <Link href="/" className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-sun stroke-[2.2]" />
          <span className="font-heading font-bold text-xl tracking-tight text-ink">
            GoSolarIndex
          </span>
        </Link>

        {/* Desktop 5-section nav */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink">
          <Link
            href="/blog"
            className="hover:text-ink/80 transition-colors"
          >
            Learn
          </Link>
          <Link
            href="/tools/solar-subsidy-calculator"
            className="hover:text-ink/80 transition-colors"
          >
            Plan
          </Link>
          <Link
            href="/locations"
            className="hover:text-ink/80 transition-colors"
          >
            Find
          </Link>
          <Link
            href="/for-installers"
            className="hover:text-ink/80 transition-colors"
          >
            For installers
          </Link>
        </nav>

        {/* Primary CTA: The one Sun button on the header */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/tools/solar-subsidy-calculator"
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
          <Link
            href="/tools/solar-subsidy-calculator"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-ink py-1.5"
          >
            Plan (Subsidy &amp; Payback Calculator)
          </Link>
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
              href="/tools/solar-subsidy-calculator"
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
