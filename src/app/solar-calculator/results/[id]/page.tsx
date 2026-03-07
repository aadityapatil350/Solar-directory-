import type { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { Sun, IndianRupee, TrendingUp, Leaf, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    monthlyUnits?: string;
    city?: string;
    systemSize?: string;
    netCost?: string;
    annualSavings?: string;
    payback?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const city = params.city || 'India';
  const systemSize = params.systemSize || '3';

  return {
    title: `${systemSize}kW Solar System for ${city} — Savings Calculator | GoSolarIndex`,
    description: `See how a ${systemSize}kW solar system can save you money in ${city}. Get free quotes from verified installers.`,
  };
}

export default async function SolarResultsPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const search = await searchParams;

  const monthlyUnits = Number(search.monthlyUnits) || 200;
  const city = search.city || 'Mumbai';
  const systemSize = Number(search.systemSize) || 3;
  const netCost = Number(search.netCost) || 165000;
  const annualSavings = Number(search.annualSavings) || 33600;
  const payback = Number(search.payback) || 4.9;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sun className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Your Solar Savings Estimate</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            {systemSize}kW system for {city} — Go solar and save ₹{annualSavings.toLocaleString('en-IN')}/year
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* System Details */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Sun className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">System Size</p>
                <p className="text-3xl font-bold text-orange-600">{systemSize} kW</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <IndianRupee className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Net Investment</p>
                <p className="text-3xl font-bold text-green-700">₹{(netCost / 100000).toFixed(1)}L</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Annual Savings</p>
                <p className="text-3xl font-bold text-blue-700">₹{(annualSavings / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{city}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Usage</p>
                  <p className="font-semibold text-gray-900">{monthlyUnits} units</p>
                </div>
                <div>
                  <p className="text-gray-600">Payback Period</p>
                  <p className="font-semibold text-gray-900">{payback.toFixed(1)} years</p>
                </div>
                <div>
                  <p className="text-gray-600">25-Year Savings</p>
                  <p className="font-semibold text-green-600">₹{((annualSavings * 25) / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Exact Quotes from Verified Installers</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Compare prices from 3 verified installers in {city}. No spam, only verified companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${city.toLowerCase()}`}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-orange-600 transition shadow-md"
              >
                Find Installers in {city}
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/solar-calculator"
                className="inline-flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-600 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-orange-50 transition"
              >
                Recalculate
              </Link>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="h-6 w-6" />
              <h2 className="text-xl font-bold">Your Environmental Impact</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-extrabold">{(systemSize * 5 * 365 * 0.78 * 0.82 / 1000).toFixed(1)}T</p>
                <p className="text-green-200 text-sm mt-1">CO₂ avoided/year</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold">{Math.round(systemSize * 5 * 365 * 0.78).toLocaleString('en-IN')}</p>
                <p className="text-green-200 text-sm mt-1">kWh clean energy/year</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold">{Math.round((systemSize * 5 * 365 * 0.78 * 0.82 / 1000) * 25)}</p>
                <p className="text-green-200 text-sm mt-1">trees equivalent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
