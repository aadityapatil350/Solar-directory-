'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sun, Menu, X, Calculator } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sun className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">GoSolarIndex</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Home
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Categories
            </Link>
            <Link href="/locations" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Locations
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              About
            </Link>
            <Link href="/solar-calculator" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium flex items-center gap-1">
              <Calculator className="h-3.5 w-3.5" />
              Calculator
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Contact
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Pricing
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/installers/signup"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-medium"
            >
              List Your Business
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t mt-4 pt-4 space-y-3 pb-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/categories', label: 'Categories' },
              { href: '/locations', label: 'Locations' },
              { href: '/about', label: 'About' },
              { href: '/solar-calculator', label: 'Calculator' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
              { href: '/pricing', label: 'Pricing' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-orange-500 transition font-medium"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/installers/signup"
              onClick={() => setMobileOpen(false)}
              className="block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-center font-medium mt-2"
            >
              List Your Business
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
