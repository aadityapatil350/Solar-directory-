import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import { Zap, ShieldCheck, TrendingUp, MapPin, Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'About GoSolarIndex — India\'s Solar Directory',
  description: 'GoSolarIndex is India\'s largest solar installer directory with 3900+ verified listings across 78 cities. Connecting homeowners with trusted solar professionals.',
  path: '/about',
});

export default async function AboutPage() {
  const [totalListings, totalCities, totalVerified, avgRating] = await Promise.all([
    prisma.listing.count(),
    prisma.location.count(),
    prisma.listing.count({ where: { verified: true } }),
    prisma.listing.aggregate({ _avg: { rating: true } }),
  ]);

  const avg = avgRating._avg.rating ? avgRating._avg.rating.toFixed(1) : '4.8';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About GoSolarIndex</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            India's largest solar business directory — connecting homeowners and businesses with verified solar professionals.
          </p>
        </div>
      </section>

      {/* Live stats */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500">{totalListings.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 mt-1">Verified Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">{totalCities}+</div>
              <div className="text-sm text-gray-600 mt-1">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">{totalVerified.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 mt-1">Verified Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">{avg}</div>
              <div className="text-sm text-gray-600 mt-1">Avg Google Rating</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">

          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              GoSolarIndex is India's most comprehensive directory for finding reliable solar installers,
              dealers, and service providers. With <strong>{totalListings.toLocaleString()}+ verified listings</strong> across <strong>{totalCities} cities</strong> — including full coverage of Maharashtra, Gujarat, Karnataka, Tamil Nadu, and more — we make it easy for Indian homeowners and businesses to find trusted solar professionals near them.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why GoSolarIndex?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <ShieldCheck className="h-8 w-8 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Real Verified Listings</h3>
                  <p className="text-gray-600">All {totalListings.toLocaleString()}+ listings are sourced from Google Maps with real addresses, phone numbers, ratings and reviews. No fake entries.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="h-8 w-8 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Deep Local Coverage</h3>
                  <p className="text-gray-600">We cover {totalCities} cities across India — including all major Maharashtra cities like Mumbai, Pune, Nagpur, Nashik, Aurangabad, Thane, Solapur, Kolhapur and 22 more.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="h-8 w-8 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">All Solar Services</h3>
                  <p className="text-gray-600">Residential installers, commercial EPC companies, solar panel dealers, inverter specialists, and AMC & maintenance providers — all in one place.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Star className="h-8 w-8 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Real Google Ratings</h3>
                  <p className="text-gray-600">Every listing shows real Google ratings and review counts. Average rating across our directory: {avg}/5 — so you always know who the best companies are.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <TrendingUp className="h-8 w-8 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Free for Homeowners</h3>
                  <p className="text-gray-600">Searching and finding solar companies is completely free. Submit a lead and get contacted by multiple verified installers in your city.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Maharashtra Coverage</h2>
            <p className="text-gray-600 mb-4">GoSolarIndex has the deepest solar directory coverage in Maharashtra — 30 cities with verified listings:</p>
            <div className="flex flex-wrap gap-2">
              {['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Thane','Navi Mumbai','Solapur','Kolhapur','Amravati','Sangli','Satara','Latur','Nanded','Jalgaon','Akola','Dhule','Ahmednagar','Chandrapur','Parbhani','Ichalkaranji','Bhiwandi','Kalyan','Vasai','Ratnagiri','Wardha','Beed','Osmanabad','Hingoli','Buldhana'].map(city => (
                <Link key={city} href={`/${city.toLowerCase().replace(/\s+/g,'-')}`}
                  className="text-sm bg-orange-50 text-orange-700 hover:bg-orange-100 px-3 py-1.5 rounded-lg font-medium transition">
                  {city}
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-2 text-gray-600">
              <p>Email: <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">hello@gosolarindex.in</a></p>
              <p>WhatsApp: <a href="https://wa.me/919373238164" className="text-orange-600 hover:underline">+91 93732 38164</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
