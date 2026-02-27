'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sun, Zap, MapPin, TrendingUp, Leaf, ChevronRight, IndianRupee, Info,
} from 'lucide-react';

// Peak sun hours per city (hours/day, from solar irradiance data)
const CITY_DATA: Record<string, { peakHours: number }> = {
  Ahmedabad:     { peakHours: 5.8 },
  Bangalore:     { peakHours: 5.0 },
  Bhopal:        { peakHours: 5.2 },
  Chandigarh:    { peakHours: 4.8 },
  Chennai:       { peakHours: 5.5 },
  Coimbatore:    { peakHours: 5.5 },
  Delhi:         { peakHours: 5.0 },
  Hyderabad:     { peakHours: 5.5 },
  Indore:        { peakHours: 5.2 },
  Jaipur:        { peakHours: 5.8 },
  Kochi:         { peakHours: 4.5 },
  Kolkata:       { peakHours: 4.5 },
  Lucknow:       { peakHours: 4.8 },
  Mumbai:        { peakHours: 5.0 },
  Nagpur:        { peakHours: 5.5 },
  Patna:         { peakHours: 4.8 },
  Pune:          { peakHours: 5.0 },
  Surat:         { peakHours: 5.5 },
  Vadodara:      { peakHours: 5.5 },
  Visakhapatnam: { peakHours: 5.5 },
};

const PANEL_WATT       = 400;    // 400W per panel
const SYSTEM_EFF       = 0.78;   // 78% system efficiency (inverter + temperature + wiring losses)
const COST_PER_KW      = 55000;  // ₹55,000 per kW all-inclusive installed cost
const ELECTRICITY_RATE = 7;      // ₹7 per unit (avg Indian tariff)
const FEED_IN_RATE     = 3;      // ₹3 per unit (net metering)
const CO2_PER_KWH      = 0.82;   // kg CO₂ per kWh (Indian grid emission factor)

function calcSubsidy(kw: number): number {
  // PM Surya Ghar Yojana: ₹30,000/kW up to 3kW, ₹18,000/kW for 3–10kW
  if (kw <= 0) return 0;
  if (kw <= 3) return kw * 30000;
  return 3 * 30000 + Math.min(kw - 3, 7) * 18000;
}

function calcMetrics(kw: number, peakHours: number, monthlyUnits: number) {
  const panels          = Math.max(1, Math.round((kw * 1000) / PANEL_WATT));
  const actualKW        = (panels * PANEL_WATT) / 1000;
  const grossCost       = actualKW * COST_PER_KW;
  const subsidy         = calcSubsidy(actualKW);
  const netCost         = grossCost - subsidy;
  const annualProd      = actualKW * peakHours * 365 * SYSTEM_EFF;
  const annualDemand    = monthlyUnits * 12;
  const annualSavings   = Math.min(annualProd, annualDemand) * ELECTRICITY_RATE;
  const excess          = Math.max(0, annualProd - annualDemand);
  const gridIncome      = excess * FEED_IN_RATE;
  const payback         = netCost / Math.max(1, annualSavings + gridIncome);
  const co2             = annualProd * CO2_PER_KWH;
  return { panels, actualKW, grossCost, subsidy, netCost, annualProd, annualSavings, excess, gridIncome, payback, co2 };
}

function fmt(n: number): string {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(1)}Cr`;
  if (n >= 1_00_000)  return `₹${(n / 1_00_000).toFixed(1)}L`;
  if (n >= 1_000)     return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${Math.round(n)}`;
}

export default function SolarCalculator() {
  const [monthlyUnits, setMonthlyUnits] = useState(200);
  const [city, setCity]                 = useState('Mumbai');
  const [buffer, setBuffer]             = useState(false);
  const [sliderKW, setSliderKW]         = useState(3);

  const peakHours = CITY_DATA[city]?.peakHours ?? 5.0;

  // Recommended system based on inputs
  const rec = useMemo(() => {
    const effectiveUnits = buffer ? monthlyUnits * 1.2 : monthlyUnits;
    const dailyKWh       = effectiveUnits / 30;
    const requiredKW     = dailyKWh / (peakHours * SYSTEM_EFF);
    return calcMetrics(requiredKW, peakHours, monthlyUnits);
  }, [monthlyUnits, city, buffer, peakHours]);

  // Slider system
  const slide = useMemo(
    () => calcMetrics(sliderKW, peakHours, monthlyUnits),
    [sliderKW, city, monthlyUnits, peakHours]
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ── INPUTS + RECOMMENDATION ──────────────────── */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left: inputs */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 space-y-7">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              Your Energy Profile
            </h2>

            {/* Monthly units slider */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-gray-700">Monthly Consumption</label>
                <div className="text-right">
                  <span className="text-2xl font-bold text-orange-500">{monthlyUnits}</span>
                  <span className="text-gray-500 text-sm ml-1">units/mo</span>
                </div>
              </div>
              <input
                type="range" min={50} max={2000} step={10}
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50 units</span>
                <span className="text-orange-500 font-medium">
                  ≈ {fmt(monthlyUnits * ELECTRICITY_RATE)}/month bill
                </span>
                <span>2000 units</span>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 text-orange-500 mr-1" />
                Your City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              >
                {Object.keys(CITY_DATA).sort().map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Solar peak hours in {city}:
                <span className="font-semibold text-orange-500">{peakHours} hrs/day</span>
              </p>
            </div>

            {/* 20% buffer toggle */}
            <div
              className={`flex items-center justify-between rounded-xl p-4 cursor-pointer transition-colors ${buffer ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50 border border-gray-200'}`}
              onClick={() => setBuffer(!buffer)}
            >
              <div>
                <p className="font-semibold text-gray-800 text-sm">Add 20% Future Buffer</p>
                <p className="text-xs text-gray-500 mt-0.5">For EVs, ACs, or growing usage</p>
              </div>
              <div className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${buffer ? 'bg-orange-500' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${buffer ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
          </div>

          {/* Right: recommendation */}
          <div className="space-y-4">
            {/* System size banner */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Recommended System
                </h3>
                {buffer && (
                  <span className="bg-white/20 text-xs px-2.5 py-1 rounded-full">+20% buffer</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-orange-200 text-xs uppercase tracking-wide mb-1">System Size</p>
                  <p className="text-4xl font-extrabold">{rec.actualKW.toFixed(1)}</p>
                  <p className="text-orange-200 text-sm">kilowatts</p>
                </div>
                <div>
                  <p className="text-orange-200 text-xs uppercase tracking-wide mb-1">Solar Panels</p>
                  <p className="text-4xl font-extrabold">{rec.panels}</p>
                  <p className="text-orange-200 text-sm">× 400W each</p>
                </div>
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-orange-500" />
                Investment Breakdown
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross cost</span>
                  <span className="font-medium text-gray-800">{fmt(rec.grossCost)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>PM Surya Ghar subsidy</span>
                  <span className="font-semibold">− {fmt(rec.subsidy)}</span>
                </div>
                <div className="border-t border-dashed pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">Net investment</span>
                  <span className="text-2xl font-extrabold text-orange-600">{fmt(rec.netCost)}</span>
                </div>
              </div>
            </div>

            {/* Savings + payback */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <TrendingUp className="h-4 w-4 text-green-600 mb-2" />
                <p className="text-xs text-gray-500">Annual Savings</p>
                <p className="text-xl font-bold text-green-700">{fmt(rec.annualSavings)}</p>
                {rec.gridIncome > 0 && (
                  <p className="text-xs text-green-500 mt-0.5">+ {fmt(rec.gridIncome)} grid</p>
                )}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <Sun className="h-4 w-4 text-blue-500 mb-2" />
                <p className="text-xs text-gray-500">Payback Period</p>
                <p className="text-xl font-bold text-blue-700">{rec.payback.toFixed(1)} yrs</p>
                <p className="text-xs text-blue-400 mt-0.5">then pure profit</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SYSTEM SIZE EXPLORER (SLIDER) ────────────── */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">Explore Different System Sizes</h2>
            <p className="text-gray-500 text-sm mt-1">
              Drag the slider to see how investment and returns change for any system size.
            </p>
          </div>

          {/* Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <label className="text-sm font-medium text-gray-600">System Size</label>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold text-orange-500">{sliderKW}</span>
                <span className="text-gray-400">kW</span>
                <span className="text-gray-400 text-sm">({slide.panels} panels)</span>
              </div>
            </div>
            <input
              type="range" min={1} max={20} step={0.5}
              value={sliderKW}
              onChange={(e) => setSliderKW(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1 kW · Small flat</span>
              <span>5 kW · Home</span>
              <span>10 kW · Large home</span>
              <span>20 kW · Office / Villa</span>
            </div>
          </div>

          {/* 4 metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Gross Cost</p>
              <p className="text-2xl font-bold text-orange-600">{fmt(slide.grossCost)}</p>
              <p className="text-xs text-gray-400 mt-1">{slide.panels} × 400W panels</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">After Subsidy</p>
              <p className="text-2xl font-bold text-green-700">{fmt(slide.netCost)}</p>
              <p className="text-xs text-green-500 mt-1">− {fmt(slide.subsidy)} subsidy</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Annual Savings</p>
              <p className="text-2xl font-bold text-blue-700">{fmt(slide.annualSavings)}</p>
              {slide.gridIncome > 0 && (
                <p className="text-xs text-blue-500 mt-1">+ {fmt(slide.gridIncome)} grid</p>
              )}
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Payback Period</p>
              <p className="text-2xl font-bold text-purple-700">{slide.payback.toFixed(1)} yrs</p>
              <p className="text-xs text-gray-400 mt-1">ROI after that</p>
            </div>
          </div>

          {/* Grid income callout */}
          {slide.excess > 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  You&apos;ll export{' '}
                  <span className="text-yellow-700">{Math.round(slide.excess).toLocaleString('en-IN')} units/year</span>{' '}
                  back to the grid
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Earning ~{' '}
                  <span className="text-green-700 font-semibold">{fmt(slide.gridIncome)}/year</span>{' '}
                  via net metering @ ₹{FEED_IN_RATE}/unit
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-500">
                This system size will cover your full consumption. Increase it above{' '}
                <span className="font-medium text-gray-700">
                  {Math.ceil((monthlyUnits * 12) / (peakHours * SYSTEM_EFF * 365) * 10) / 10} kW
                </span>{' '}
                to start exporting and earning from the grid.
              </p>
            </div>
          )}
        </div>

        {/* ── 25-YEAR RETURNS SUMMARY ───────────────────── */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">25-Year Returns on Your System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[5, 10, 25].map((years) => {
              const totalSaved = (rec.annualSavings + rec.gridIncome) * years;
              const netProfit  = totalSaved - rec.netCost;
              return (
                <div key={years} className="border border-gray-200 rounded-xl p-5 text-center">
                  <p className="text-4xl font-extrabold text-gray-800 mb-1">{years}</p>
                  <p className="text-gray-400 text-sm mb-4">years</p>
                  <p className="text-sm text-gray-500">Total savings</p>
                  <p className="text-2xl font-bold text-green-600">{fmt(totalSaved)}</p>
                  <p className={`text-sm font-semibold mt-2 ${netProfit >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                    {netProfit >= 0 ? `+${fmt(netProfit)} net profit` : `${fmt(Math.abs(netProfit))} to go`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ENVIRONMENTAL IMPACT ──────────────────────── */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="h-6 w-6" />
            <h2 className="text-xl font-bold">Your Environmental Impact</h2>
            <span className="text-green-200 text-sm">per year</span>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-extrabold">{(rec.co2 / 1000).toFixed(1)}T</p>
              <p className="text-green-200 text-sm mt-1">CO₂ avoided</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold">{Math.round(rec.annualProd).toLocaleString('en-IN')}</p>
              <p className="text-green-200 text-sm mt-1">kWh clean energy</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold">{Math.round((rec.co2 / 1000) * 25)}</p>
              <p className="text-green-200 text-sm mt-1">trees equivalent</p>
            </div>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Go Solar in {city}?</h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            Get free quotes from verified solar installers. Compare prices, check reviews, and make the switch today.
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
              href="/installers/signup"
              className="inline-flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-600 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-orange-50 transition"
            >
              List Your Business
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            * Estimates based on ₹{COST_PER_KW.toLocaleString('en-IN')}/kW installed cost, ₹{ELECTRICITY_RATE}/unit tariff, {peakHours} peak sun hours in {city}. Actual figures may vary.
          </p>
        </div>

      </div>
    </div>
  );
}
