import type { Metadata } from 'next';
import Header from '@/components/Header';
import SolarCalculator from '@/components/SolarCalculator';
import { Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solar Calculator — Estimate System Size, Cost & Savings | GoSolarIndex',
  description:
    'Free solar calculator for India. Enter your monthly electricity usage and city to get recommended system size, number of panels, installation cost after PM Surya Ghar subsidy, annual savings, payback period, and net metering earnings.',
  keywords: [
    'solar calculator India',
    'solar panel calculator',
    'solar system size calculator',
    'solar savings calculator',
    'PM Surya Ghar subsidy calculator',
    'solar installation cost India',
    'net metering calculator',
    'solar payback period',
  ],
};

export default function SolarCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Solar Calculator</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Enter your monthly usage and city — get instant estimates for system size,
            cost after subsidy, annual savings, and grid income.
          </p>
        </div>
      </div>

      <SolarCalculator />
    </div>
  );
}
