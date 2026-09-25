'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LeadForm from '@/components/LeadForm';
import FAQ from '@/components/ui/FAQ';

export default function SolarSystemSizeCalculatorPage() {
  const [calcMode, setCalcMode] = useState<'units' | 'roof'>('units');
  const [units, setUnits] = useState<number>(360);
  const [roofSqFt, setRoofSqFt] = useState<number>(350);

  // Sizing formula:
  // 1 kW solar generates ~120 units/month in India and requires ~80-100 sq ft shadow-free
  let calculatedKw = 3;
  if (calcMode === 'units') {
    calculatedKw = Math.max(1, Math.min(25, Math.round((units / 120) * 10) / 10));
  } else {
    calculatedKw = Math.max(1, Math.min(25, Math.round((roofSqFt / 90) * 10) / 10));
  }

  const roundedKw = Math.max(1, Math.min(25, Math.round(calculatedKw)));
  const panelsCount = Math.ceil((roundedKw * 1000) / 540);
  const requiredRoof = roundedKw * 85;
  const estimatedMonthlyUnits = roundedKw * 120;
  const eligibleSubsidy = roundedKw === 1 ? 30000 : roundedKw === 2 ? 60000 : 78000;

  const faqs = [
    {
      q: 'How many solar panels do I need for a 3 kW system?',
      a: 'With modern high-wattage 540W to 550W mono PERC or TOPCon bifacial modules, a 3 kW solar array requires only 6 solar panels.',
    },
    {
      q: 'How much shadow-free rooftop space is required per kW of solar?',
      a: 'In India, each 1 kW of rooftop solar capacity requires approximately 80 to 100 square feet (7.5 to 9.5 square meters) of unobstructed, shadow-free roof area facing south or south-west.',
    },
    {
      q: 'Can solar panels be installed on a metal sheet or tiled roof?',
      a: 'Yes. Installers use specialized anodized aluminium clamping brackets for trapezoidal metal sheets and standing seams without puncturing the roof. For tiled roofs, stainless steel tile roof hooks are mounted underneath the tiles.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools/solar-subsidy-calculator' },
              { label: 'System Size Calculator' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-2">
            Solar System Sizing Calculator: Determine Required kW for Your Roof
          </h1>
          <p className="text-base text-ink-2 max-w-2xl font-body">
            Calculate the exact rooftop solar capacity, number of panels, and required shadow-free square footage based on your consumption or roof area.
          </p>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Calculator Card */}
            <div className="border border-line rounded-sm p-6 bg-paper">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* Left: Inputs */}
                <div className="space-y-4 font-body">
                  <h2 className="font-heading font-semibold text-lg text-ink">
                    1. Choose calculation method
                  </h2>

                  {/* Toggle Mode */}
                  <div className="flex border border-line rounded-sm p-1 bg-wash">
                    <button
                      type="button"
                      onClick={() => setCalcMode('units')}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                        calcMode === 'units' ? 'bg-paper text-ink shadow-xs' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      By Monthly Units (kWh)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcMode('roof')}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                        calcMode === 'roof' ? 'bg-paper text-ink shadow-xs' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      By Rooftop Space (sq ft)
                    </button>
                  </div>

                  {calcMode === 'units' ? (
                    <div>
                      <label className="block text-xs font-medium text-ink mb-1">
                        Average Monthly Units Consumed (kWh)
                      </label>
                      <input
                        type="number"
                        min={50}
                        max={5000}
                        step={10}
                        value={units}
                        onChange={(e) => setUnits(Number(e.target.value))}
                        className="w-full h-11 px-3 border border-line rounded-sm bg-paper text-ink text-sm tabular-nums focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                      />
                      <div className="flex gap-1.5 mt-2">
                        {[150, 300, 450, 600].map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setUnits(u)}
                            className={`text-xs px-2 py-1 rounded-sm border transition-colors ${
                              units === u ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:bg-wash'
                            }`}
                          >
                            {u} units
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-medium text-ink mb-1">
                        Available Shadow-Free Rooftop Area (Sq Ft)
                      </label>
                      <input
                        type="number"
                        min={50}
                        max={10000}
                        step={50}
                        value={roofSqFt}
                        onChange={(e) => setRoofSqFt(Number(e.target.value))}
                        className="w-full h-11 px-3 border border-line rounded-sm bg-paper text-ink text-sm tabular-nums focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                      />
                      <div className="flex gap-1.5 mt-2">
                        {[200, 350, 500, 1000].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRoofSqFt(r)}
                            className={`text-xs px-2 py-1 rounded-sm border transition-colors ${
                              roofSqFt === r ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:bg-wash'
                            }`}
                          >
                            {r} sq ft
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-wash border border-line rounded-sm text-xs text-ink-2 space-y-1">
                    <div><strong>Tip:</strong> 1 BHK typically consumes ~150 units/month (1 kW).</div>
                    <div><strong>3 BHK:</strong> Consumes ~350–450 units/month (3 kW).</div>
                  </div>
                </div>

                {/* Right: Results in --sun-wash box */}
                <div className="bg-sun-wash border border-sun/40 rounded-sm p-6 space-y-4">
                  <div>
                    <span className="text-xs text-ink-2 uppercase tracking-wide font-medium">Optimal System Sizing</span>
                    <div className="font-heading font-bold text-4xl text-ink mt-0.5 tabular-nums">
                      {roundedKw} kW
                    </div>
                    <p className="text-xs text-ink-2 mt-1">Generates ~{estimatedMonthlyUnits} units / month</p>
                  </div>

                  <div className="border-t border-ink/10 pt-3 space-y-2 text-xs font-body">
                    <div className="flex justify-between items-baseline">
                      <span className="text-ink-2">Total panels required:</span>
                      <strong className="text-ink font-heading text-base tabular-nums">{panelsCount} panels (540W)</strong>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-ink-2">Shadow-free roof space:</span>
                      <strong className="text-ink tabular-nums">~{requiredRoof} sq ft</strong>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-ink-2">PM Surya Ghar central subsidy:</span>
                      <strong className="text-ink font-bold tabular-nums">₹{eligibleSubsidy.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#quote"
                      className="block text-center w-full py-2.5 bg-ink text-paper font-medium text-xs rounded-sm hover:bg-ink/90 transition-colors"
                    >
                      Get 3 quotes for {roundedKw} kW
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* How this is calculated */}
            <section className="space-y-3 font-body text-xs text-ink-2 leading-relaxed">
              <h2 className="font-heading font-semibold text-lg text-ink">
                How this is calculated
              </h2>
              <p>
                Calculations are based on 540W to 550W Tier-1 ALMM monocrystalline modules (dimensions ~2.27m x 1.13m = ~27 sq ft per panel). Accounting for spacing between rows to avoid self-shading, approximately 85 to 100 sq ft is required per 1 kW of installed rooftop solar.
              </p>
            </section>

            {/* FAQs */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
                Frequently asked questions
              </h2>
              <FAQ items={faqs} />
            </section>

          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
            <LeadForm prefill={{ requirement: `${roundedKw}kW Residential` }} source="tools:size-calculator" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
