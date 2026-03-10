'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { BadgeIndianRupee, CheckCircle, XCircle, AlertCircle, MapPin, Building2, IndianRupee, Zap } from 'lucide-react';

// State subsidies (in addition to central subsidy)
const STATE_SUBSIDIES: Record<string, number> = {
  'Gujarat': 40000,
  'Maharashtra': 15000,
  'Rajasthan': 15000,
  'Karnataka': 10000,
  'Tamil Nadu': 10000,
  'Kerala': 12000,
  'Andhra Pradesh': 8000,
  'Telangana': 8000,
  'Punjab': 10000,
  'Haryana': 10000,
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Puducherry', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh',
];

function calcCentralSubsidy(kw: number): number {
  if (kw <= 0) return 0;
  if (kw <= 2) return kw * 30000;
  if (kw <= 3) return 2 * 30000 + (kw - 2) * 18000;
  return 2 * 30000 + 1 * 18000;
}

function estimateSystemSize(monthlyBill: number): { kw: number; label: string } {
  if (monthlyBill < 500) return { kw: 1, label: '1-2 kW' };
  if (monthlyBill < 1000) return { kw: 2, label: '2-3 kW' };
  if (monthlyBill < 1500) return { kw: 3, label: '3 kW' };
  if (monthlyBill < 2500) return { kw: 4, label: '3-4 kW' };
  return { kw: 5, label: '4-5 kW' };
}

export default function SubsidyCheckerPage() {
  const [state, setState] = useState('Maharashtra');
  const [propertyType, setPropertyType] = useState<'owned' | 'flat' | 'rented'>('owned');
  const [monthlyBill, setMonthlyBill] = useState(1000);
  const [existingSolar, setExistingSolar] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const eligibility = useMemo(() => {
    if (propertyType === 'rented') {
      return {
        eligible: false,
        reason: 'PM Surya Ghar Yojana is only available for owned properties. Renters are not eligible.',
        central: 0,
        state: 0,
        total: 0,
        systemSize: { kw: 0, label: '' },
      };
    }

    if (existingSolar) {
      return {
        eligible: false,
        reason: 'Subsidy is not available if you already have a solar system installed.',
        central: 0,
        state: 0,
        total: 0,
        systemSize: { kw: 0, label: '' },
      };
    }

    const systemSize = estimateSystemSize(monthlyBill);
    const centralSubsidy = calcCentralSubsidy(systemSize.kw);
    const stateSubsidy = STATE_SUBSIDIES[state] || 0;
    const totalSubsidy = centralSubsidy + stateSubsidy;

    return {
      eligible: true,
      reason: 'You are likely eligible for PM Surya Ghar Yojana!',
      central: centralSubsidy,
      state: stateSubsidy,
      total: totalSubsidy,
      systemSize,
    };
  }, [state, propertyType, monthlyBill, existingSolar]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BadgeIndianRupee className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">PM Surya Ghar Subsidy Checker</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Check your eligibility for central and state solar subsidies — get up to ₹78,000 in government support
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Your Eligibility</h2>

              <div className="space-y-6">
                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    Your State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['owned', 'flat', 'rented'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`py-2.5 rounded-lg text-sm font-medium transition ${
                          propertyType === type
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type === 'owned' ? 'Owned House' : type === 'flat' ? 'Owned Flat' : 'Rented'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Bill */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    Monthly Electricity Bill
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      min={0}
                      max={10000}
                      step={100}
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={50}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full mt-2 accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹0</span>
                    <span>₹5,000</span>
                  </div>
                </div>

                {/* Existing Solar */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={existingSolar}
                      onChange={(e) => setExistingSolar(e.target.checked)}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">I already have solar panels</p>
                      <p className="text-xs text-gray-500">Subsidy is only for new installations</p>
                    </div>
                  </label>
                </div>

                <button
                  onClick={() => setShowResults(true)}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
                >
                  Check Eligibility
                </button>
              </div>
            </div>

            {/* Results */}
            {showResults && (
              <div className="space-y-6">
                {/* Eligibility Status */}
                <div className={`rounded-2xl p-8 shadow-sm border ${
                  eligibility.eligible
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    {eligibility.eligible ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                    <h3 className={`text-2xl font-bold ${
                      eligibility.eligible ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {eligibility.eligible ? 'Likely Eligible!' : 'Not Eligible'}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    eligibility.eligible ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {eligibility.reason}
                  </p>
                </div>

                {eligibility.eligible && (
                  <>
                    {/* Subsidy Breakdown */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Your Subsidy Breakdown</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Recommended System Size</span>
                          <span className="font-bold text-gray-900">{eligibility.systemSize.label}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-t">
                          <span className="text-gray-600">PM Surya Ghar (Central)</span>
                          <span className="font-bold text-green-600">₹{eligibility.central.toLocaleString('en-IN')}</span>
                        </div>
                        {eligibility.state > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">{state} State Subsidy</span>
                            <span className="font-bold text-green-600">₹{eligibility.state.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-3 border-t-2 border-dashed">
                          <span className="font-bold text-gray-900 text-lg">Total Subsidy</span>
                          <span className="font-extrabold text-orange-600 text-2xl">
                            ₹{eligibility.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-blue-900 mb-2">How to Claim Your Subsidy</h4>
                          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>Choose an empanelled installer from GoSolarIndex</li>
                            <li>Apply on pmsuryaghar.gov.in with your DISCOM consumer number</li>
                            <li>Get approval and install your system</li>
                            <li>Submit documents and receive subsidy in your bank account</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                      <h4 className="font-bold text-gray-900 mb-3">Find Empanelled Installers in {state}</h4>
                      <Link
                        href="/locations"
                        className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
                      >
                        <MapPin className="h-4 w-4" />
                        Browse Installers
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About PM Surya Ghar Muft Bijli Yojana</h3>
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <p>
                The PM Surya Ghar Muft Bijli Yojana (Rooftop Solar Scheme) offers central government subsidies to make solar power accessible for Indian households.
              </p>
              <p>
                <strong>Subsidy Structure:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>₹30,000 per kW for systems up to 2 kW</li>
                <li>₹18,000 per kW for the 3rd kW (2-3 kW systems)</li>
                <li>Maximum subsidy: ₹78,000 for a 3 kW system</li>
              </ul>
              <p>
                Many states offer additional subsidies. Check with your local electricity board (DISCOM) for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
