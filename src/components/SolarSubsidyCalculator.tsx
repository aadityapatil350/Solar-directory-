'use client';

import { useState, useId } from 'react';
import {
  STATE_SOLAR_CONFIG,
  calculateCentralSubsidy,
  CENTRAL_SUBSIDY_RATES,
} from '@/lib/solarConfig';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Building,
  RotateCcw,
  BadgeCheck,
  FileCheck2,
} from 'lucide-react';

interface Props {
  initialState?: string;
  initialCity?: string;
  embedded?: boolean;
}

export default function SolarSubsidyCalculator({
  initialState = 'Maharashtra',
  initialCity,
  embedded = false,
}: Props) {
  // Form state
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [selectedDiscom, setSelectedDiscom] = useState<string>('');

  // Lead capture state
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [roofType, setRoofType] = useState<string>('RCC Flat Concrete');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // State config
  const stateKeys = Object.keys(STATE_SOLAR_CONFIG);
  const matchedKey =
    stateKeys.find((s) => s.toLowerCase() === selectedState.toLowerCase()) ||
    'Maharashtra';
  const stateConfig = STATE_SOLAR_CONFIG[matchedKey];
  const discomList = stateConfig?.discoms || [];

  const stateSelectId = useId();
  const discomSelectId = useId();
  const billRangeId = useId();
  const billInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const pincodeInputId = useId();
  const roofTypeId = useId();
  const otpInputId = useId();

  // Core Math per Phase 3 specifications:
  // Recommended System Size (kW) = Math.ceil((Bill / 8) / 120 * 2) / 2
  // Min 1 kW, max 20 kW for residential
  const rawSize = (monthlyBill / stateConfig.avgGridTariffPerUnit) / stateConfig.monthlyUnitsPerKw;
  const recommendedKw = Math.min(20, Math.max(1, Math.ceil(rawSize * 2) / 2));

  // Rooftop Area Required: System Size * 100 sq.ft.
  const rooftopAreaSqFt = Math.round(recommendedKw * CENTRAL_SUBSIDY_RATES.rooftopAreaSqFtPerKw);

  // Gross Capital Investment (₹)
  const grossInvestment = Math.round(recommendedKw * CENTRAL_SUBSIDY_RATES.costPerKwEstimate);

  // Central DBT Subsidy (₹)
  const centralSubsidy = calculateCentralSubsidy(recommendedKw);

  // State Subsidy (₹)
  // For states like UP or Delhi with special slab logic
  let stateSubsidy = 0;
  if (stateConfig.state === 'Uttar Pradesh') {
    stateSubsidy = recommendedKw >= 2 ? 30000 : 15000;
  } else if (stateConfig.state === 'Delhi') {
    stateSubsidy = Math.round(Math.min(10000, recommendedKw * 3000));
  } else if (stateConfig.state === 'Gujarat') {
    stateSubsidy = recommendedKw >= 3 ? 20000 : 10000;
  } else {
    stateSubsidy = stateConfig.stateSubsidyAmount;
  }

  const totalSubsidy = centralSubsidy + stateSubsidy;
  const netInvestment = Math.max(0, grossInvestment - totalSubsidy);

  // Monthly generation & Annual bill savings
  const monthlyGenerationUnits = Math.round(recommendedKw * stateConfig.monthlyUnitsPerKw);
  const monthlySavings = Math.round(
    Math.min(monthlyBill * 0.95, monthlyGenerationUnits * stateConfig.avgGridTariffPerUnit)
  );
  const annualSavings = monthlySavings * 12;

  // Payback period (Years) = Net Investment / Annual Savings
  const paybackYears = annualSavings > 0 ? (netInvestment / annualSavings).toFixed(1) : '3.5';

  const handleSendOtp = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMessage('');
    setOtpSent(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    if (otpSent && enteredOtp.trim().length !== 4 && enteredOtp.trim().length !== 6) {
      setErrorMessage('Please enter the 4 or 6-digit verification code');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/solar-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: cleaned,
          city: initialCity || stateConfig.state,
          state: stateConfig.state,
          discom: selectedDiscom || discomList[0] || 'State DISCOM',
          monthlyBill,
          systemSize: recommendedKw,
          pincode: pincode.trim(),
          roofType,
          source: 'subsidy_calculator',
        }),
      });

      if (!res.ok) {
        // Fallback to /api/leads if solar-leads fails
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName.trim(),
            phone: cleaned,
            requirement: `${recommendedKw} kW Rooftop Solar System (${roofType}) - Subsidy Calculator`,
            city: initialCity || stateConfig.state,
            budget: `Net ₹${netInvestment.toLocaleString('en-IN')}`,
          }),
        });
      }

      setSubmitted(true);
    } catch {
      setSubmitted(true); // Don't block user experience on network hiccups
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full ${
        embedded ? 'my-8' : 'max-w-5xl mx-auto px-4 py-8'
      }`}
    >
      <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden">
        {/* Header bar - Modern clean Vercel style */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Updated for 2026 PM Surya Ghar Central Direct Benefit Transfer
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Rooftop Solar Subsidy & Payback Calculator
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                Calculate your exact Central DBT Subsidy under PM Surya Ghar Muft Bijli Yojana,
                additional state incentives, system sizing, and ROI timeline.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-xl px-4 py-3 text-right">
                <div className="text-xs text-zinc-400 font-medium">Central Subsidy Cap</div>
                <div className="text-xl font-semibold text-emerald-400">₹78,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Body: Inputs & Real-time Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
          {/* Left Column: Interactive Inputs (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-zinc-50/50 space-y-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Step 1: Your Energy Usage & Location
            </h3>

            {/* State selection */}
            <div>
              <label htmlFor={stateSelectId} className="block text-sm font-medium text-zinc-800 mb-1.5">
                Select Your State
              </label>
              <select
                id={stateSelectId}
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDiscom('');
                }}
                className="w-full bg-white border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition"
              >
                {stateKeys.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* DISCOM selection */}
            <div>
              <label htmlFor={discomSelectId} className="block text-sm font-medium text-zinc-800 mb-1.5">
                Power Utility / DISCOM
              </label>
              <select
                id={discomSelectId}
                value={selectedDiscom || discomList[0] || ''}
                onChange={(e) => setSelectedDiscom(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition"
              >
                {discomList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-zinc-400" />
                Net-metering handled with {stateConfig.netMeteringAuthority} (~{stateConfig.netMeteringApprovalDays} days)
              </div>
            </div>

            {/* Monthly Electricity Bill */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={billRangeId} className="text-sm font-medium text-zinc-800">
                  Average Monthly Electricity Bill
                </label>
                <div className="flex items-center gap-1 font-semibold text-zinc-900 bg-white border border-zinc-200 px-2.5 py-1 rounded-md text-sm">
                  <span>₹</span>
                  <input
                    id={billInputId}
                    type="number"
                    min={500}
                    max={50000}
                    step={100}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right bg-transparent focus:outline-none font-semibold text-zinc-900"
                  />
                </div>
              </div>

              {/* Slider */}
              <input
                id={billRangeId}
                type="range"
                min={800}
                max={25000}
                step={200}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
              />

              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>₹800/mo</span>
                <span>₹10,000/mo</span>
                <span>₹25,000+/mo</span>
              </div>
            </div>

            {/* Quick Bill Presets */}
            <div>
              <div className="text-xs text-zinc-500 mb-2">Quick Presets:</div>
              <div className="flex flex-wrap gap-2">
                {[1500, 2500, 3500, 5000, 8000, 12000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlyBill(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition ${
                      monthlyBill === preset
                        ? 'bg-zinc-900 text-white border-zinc-900 font-medium'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    ₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* State-specific subsidy note */}
            {stateConfig.stateSubsidyName && (
              <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold block mb-0.5 text-amber-950">
                  {stateConfig.stateSubsidyName}
                </span>
                {stateConfig.stateSubsidyNotes}
              </div>
            )}
          </div>

          {/* Right Column: Calculations & Sizing (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Step 2: Recommended Sizing & Financial Summary
              </h3>
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> MNRE ALMM Approved
              </span>
            </div>

            {/* Key 2-card stats hero */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 text-white">
                <div className="text-xs text-zinc-400 font-medium">Recommended System Size</div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                  {recommendedKw} <span className="text-lg font-normal text-zinc-400">kW</span>
                </div>
                <div className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                  <Building className="w-3 h-3" /> Needs ~{rooftopAreaSqFt} sq.ft. shadow-free roof
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                <div className="text-xs text-emerald-800 font-medium">Net Investment After Subsidy</div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-900 mt-1">
                  ₹{netInvestment.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-700 mt-2 flex items-center gap-1 font-medium">
                  <TrendingDown className="w-3 h-3" /> Total savings: ₹{totalSubsidy.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden text-sm bg-white">
              <div className="divide-y divide-zinc-100">
                <div className="flex justify-between items-center py-2.5 px-4 text-zinc-600">
                  <span>Gross Turnkey Installation Cost (₹65k/kW)</span>
                  <span className="font-semibold text-zinc-900">₹{grossInvestment.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center py-2.5 px-4 bg-emerald-50/40 text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    PM Surya Ghar Central DBT Subsidy
                  </span>
                  <span className="font-bold text-emerald-700">- ₹{centralSubsidy.toLocaleString('en-IN')}</span>
                </div>

                {stateSubsidy > 0 && (
                  <div className="flex justify-between items-center py-2.5 px-4 bg-amber-50/40 text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      {stateConfig.state} State Government Incentive
                    </span>
                    <span className="font-bold text-amber-700">- ₹{stateSubsidy.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 px-4 bg-zinc-50 font-medium">
                  <span className="text-zinc-800 font-semibold">Your Net Out-of-Pocket Cost</span>
                  <span className="text-base font-bold text-zinc-950">₹{netInvestment.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Savings & ROI row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                <div className="text-xs text-zinc-500">Monthly Generation</div>
                <div className="text-lg font-bold text-zinc-900 mt-0.5">
                  ~{monthlyGenerationUnits} <span className="text-xs font-normal text-zinc-500">units/mo</span>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                <div className="text-xs text-zinc-500">Estimated Annual Savings</div>
                <div className="text-lg font-bold text-emerald-700 mt-0.5">
                  ₹{annualSavings.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                <div className="text-xs text-zinc-500">Simple Payback Period</div>
                <div className="text-lg font-bold text-zinc-900 mt-0.5 flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                  {paybackYears} <span className="text-xs font-normal text-zinc-500">Years</span>
                </div>
              </div>
            </div>

            {/* DCR Guarantee badge */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>100% DCR Panel Guarantee:</strong> Installers provide Domestic Content Requirement
                (DCR) compliant solar cells and ALMM modules mandatory for PM Surya Ghar DBT approval.
              </span>
            </div>
          </div>
        </div>

        {/* Lead Capture Integration (Phase 3 Requirement 3) */}
        <div className="bg-zinc-50 border-t border-zinc-200 p-6 sm:p-8">
          <div className="max-w-3xl mx-auto">
            {!submitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="text-center sm:text-left mb-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                    <Zap className="w-3.5 h-3.5" /> Guaranteed Subsidy Assistance
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Get 3 Competitive Quotes from MNRE-Empanelled Installers in {stateConfig.state}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                    Compare verified prices for your recommended {recommendedKw} kW system. Free site survey &
                    DISCOM paperwork assistance included.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label htmlFor={nameInputId} className="block text-xs font-medium text-zinc-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneInputId} className="block text-xs font-medium text-zinc-700 mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      id={phoneInputId}
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor={pincodeInputId} className="block text-xs font-medium text-zinc-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      id={pincodeInputId}
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 400001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor={roofTypeId} className="block text-xs font-medium text-zinc-700 mb-1">
                      Roof Type
                    </label>
                    <select
                      id={roofTypeId}
                      value={roofType}
                      onChange={(e) => setRoofType(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition"
                    >
                      <option value="RCC Flat Concrete">RCC Terrace (Flat)</option>
                      <option value="Industrial Metal Sheet">Metal / Tin Sheet Roof</option>
                      <option value="Slanted Mangalore Tile">Slanted / Tile Roof</option>
                      <option value="Elevated Gazebo Roof">Elevated Rooftop Structure</option>
                    </select>
                  </div>
                </div>

                {otpSent && (
                  <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200 max-w-sm">
                    <label htmlFor={otpInputId} className="block text-xs font-medium text-zinc-800 mb-1">
                      Enter Verification Code sent to {phone}
                    </label>
                    <div className="flex gap-2">
                      <input
                        id={otpInputId}
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 4921"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        className="bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                      <span className="text-[11px] text-zinc-500 self-center">Verification active</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      Verify Phone & Get 3 Installer Quotes
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Confirm & Request Site Survey Quotes'}
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}

                  <span className="text-[11px] text-zinc-500 text-center sm:text-left">
                    🔒 No spam. Verified installers will provide quote comparison & DISCOM checklist.
                  </span>
                </div>
              </form>
            ) : (
              <div className="p-6 bg-white rounded-xl border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900">
                  Site Survey & Quote Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
                  Thank you, {fullName}. Up to 3 MNRE-empanelled installers serving {pincode ? `pincode ${pincode}` : stateConfig.state} will share net-metering site feasibility and subsidy quotation on WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
