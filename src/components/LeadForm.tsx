'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Zap, MapPin } from 'lucide-react';
import {
  validateLeadName,
  validateLeadCity,
  validateLeadPhone,
  validateLeadPincode,
  validateMonthlyBill,
} from '@/lib/lead-validation';

const LIGHT_BILLS = [
  { label: '₹1,500 – ₹3,000', value: '₹1,500 – ₹3,000', hint: '2–3 kW (₹78k subsidy)' },
  { label: '₹3,000 – ₹5,000', value: '₹3,000 – ₹5,000', hint: '3–5 kW' },
  { label: '₹5,000 – ₹8,000', value: '₹5,000 – ₹8,000', hint: '5–7 kW' },
  { label: '₹8,000+', value: '₹8,000+', hint: '8kW+ / Heavy Load' },
  { label: '< ₹1,500', value: '< ₹1,500', hint: 'Low Load' },
];

const PROPERTY_TYPES = [
  { label: 'Independent House / Villa', value: 'Independent House' },
  { label: 'Row House / Bungalow', value: 'Row House' },
  { label: 'Apartment (Top Floor / Roof)', value: 'Apartment Top Floor' },
  { label: 'Commercial / Factory', value: 'Commercial' },
];

const REQUIREMENTS = [
  { label: '3kW Home', value: '3kW Residential' },
  { label: '5kW Home', value: '5kW Residential' },
  { label: '10kW+', value: '10kW+ Residential' },
  { label: 'Commercial', value: 'Commercial Solar' },
  { label: 'Inverter Only', value: 'Solar Inverter' },
  { label: 'AMC / Service', value: 'AMC & Maintenance' },
];

const QUICK_CITIES = ['Pune', 'Mumbai', 'Thane', 'Nagpur', 'Nashik', 'Bengaluru', 'Jaipur', 'Ahmedabad', 'Lucknow'];

interface LeadFormProps {
  prefill?: {
    requirement?: string;
    city?: string;
    pincode?: string;
    monthlyBill?: string;
    propertyType?: string;
  };
  onSuccess?: () => void;
  compact?: boolean;
  /** Where the form was submitted from — e.g. "city-page:mumbai", "listing:acme-solar" */
  source?: string;
}

export default function LeadForm({ prefill, onSuccess, compact = false, source }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(prefill?.city || '');
  const [pincode, setPincode] = useState(prefill?.pincode || '');
  const [monthlyBill, setMonthlyBill] = useState(prefill?.monthlyBill || '');
  const [propertyType, setPropertyType] = useState(prefill?.propertyType || 'Independent House');
  const [requirement, setRequirement] = useState(prefill?.requirement || '3kW Residential');
  const [urgent, setUrgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const nameError = validateLeadName(name);
    if (nameError) {
      setError(nameError);
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const phoneError = validateLeadPhone(cleanPhone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    const cityError = validateLeadCity(city);
    if (cityError) {
      setError(cityError);
      return;
    }

    const cleanPincode = pincode.replace(/\D/g, '').slice(0, 6);
    const pinError = validateLeadPincode(cleanPincode);
    if (pinError) {
      setError(pinError);
      return;
    }

    const billError = validateMonthlyBill(monthlyBill);
    if (billError) {
      setError(billError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          city: city.trim(),
          pincode: cleanPincode,
          monthlyBill: monthlyBill.trim(),
          propertyType: propertyType.trim(),
          requirement,
          urgency: urgent ? 'urgent' : 'normal',
          source,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      // Fire GA4 conversion event
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
          currency: 'INR',
          value: 100,
          source: source || 'unknown',
          city: city.trim(),
          pincode: cleanPincode,
          requirement: requirement || 'unspecified',
          monthly_bill: monthlyBill,
        });
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-paper border border-line rounded-sm p-6 text-center">
        <div className="w-12 h-12 bg-wash rounded-full flex items-center justify-center mx-auto mb-3 text-ink">
          <CheckCircle2 className="h-6 w-6 stroke-[2]" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-ink mb-1">Pre-Qualification Confirmed</h3>
        <p className="text-ink-2 text-sm leading-relaxed mb-3">
          Your solar enquiry for <strong>{city} ({pincode.replace(/\D/g, '').slice(0, 6)})</strong> (Monthly Bill: {monthlyBill}) has been received.
        </p>
        <p className="text-xs text-ink-2 bg-wash p-3 rounded-sm border border-line">
          Channel partner engineers (including SolarSquare & verified local installers) will contact you on WhatsApp / Phone with customized proposal and PM Surya Ghar (₹78,000) subsidy assistance.
        </p>
      </div>
    );
  }

  return (
    <div id="quote" className={`bg-paper border border-line rounded-sm ${compact ? 'p-4' : 'p-5'}`}>
      <div className="mb-4">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-sun-wash text-ink text-[11px] font-bold tracking-wide uppercase mb-2">
          <Zap className="h-3 w-3 fill-sun text-ink" />
          SolarSquare &amp; Verified Partners
        </div>
        <h2 className="font-heading font-semibold text-lg text-ink">
          Get Pre-Qualified Solar Quotes
        </h2>
        <p className="text-xs text-ink-2 mt-0.5">
          Connect with top channel partners &amp; verified installers in {city || 'your area'}. Free site survey &amp; subsidy calculation.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-wash border border-red-200 text-red-700 rounded-sm p-3 mb-4 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 stroke-[2] text-red-600" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-ink mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full h-11 px-3 border border-line rounded-sm bg-paper text-ink placeholder:text-ink-2/50 text-sm focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-semibold text-ink mb-1">
            Mobile Number (WhatsApp) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2 font-medium text-sm select-none">
              +91
            </span>
            <input
              type="tel"
              required
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="98765 43210"
              className="w-full h-11 pl-11 pr-3 border border-line rounded-sm bg-paper text-ink placeholder:text-ink-2/50 text-sm focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink tabular-nums"
            />
          </div>
          <p className="text-[11px] text-ink-2 mt-1">Quotation and subsidy estimate will be shared via WhatsApp</p>
        </div>

        {/* Mandatory City & PIN Code */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7">
            <label className="block text-xs font-semibold text-ink mb-1">
              Installation City / Town <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Pune, PCMC, Thane..."
                className="w-full h-11 pl-8 pr-3 border border-line rounded-sm bg-paper text-ink placeholder:text-ink-2/50 text-sm focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
              />
              <MapPin className="h-4 w-4 text-ink-2 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-ink mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              inputMode="numeric"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6-digit PIN"
              className="w-full h-11 px-3 border border-line rounded-sm bg-paper text-ink placeholder:text-ink-2/50 text-sm focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink tabular-nums"
            />
          </div>
        </div>

        {/* Quick city selectors */}
        <div className="flex flex-wrap items-center gap-1.5 -mt-1">
          <span className="text-[11px] text-ink-2">Popular:</span>
          {QUICK_CITIES.slice(0, 5).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                city.toLowerCase() === c.toLowerCase()
                  ? 'border-ink bg-ink text-paper font-medium'
                  : 'border-line text-ink-2 hover:text-ink hover:bg-wash'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Mandatory Monthly Electricity Bill / Light Bill */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-ink">
              Average Monthly Light Bill (Electricity Bill) <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-ink-2 uppercase tracking-wide">For Subsidy Fit</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LIGHT_BILLS.map((b) => {
              const active = monthlyBill === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setMonthlyBill(b.value)}
                  className={`text-left p-2.5 rounded-sm border transition-all text-xs ${
                    active
                      ? 'border-ink bg-ink text-paper font-semibold shadow-sm'
                      : 'border-line text-ink hover:bg-wash'
                  }`}
                >
                  <div className="font-semibold">{b.label}</div>
                  <div className={`text-[10px] mt-0.5 ${active ? 'text-paper/80' : 'text-ink-2'}`}>
                    {b.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rooftop / Property Type (SolarSquare Qualification) */}
        <div>
          <label className="block text-xs font-semibold text-ink mb-1.5">
            Property / Rooftop Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PROPERTY_TYPES.map((p) => {
              const active = propertyType === p.value;
              return (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPropertyType(p.value)}
                  className={`text-xs px-2.5 py-1.5 rounded-sm border transition-colors ${
                    active
                      ? 'border-ink bg-ink text-paper font-medium'
                      : 'border-line text-ink hover:bg-wash'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* System Requirement */}
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            System Size / Need
          </label>
          <div className="flex flex-wrap gap-1.5">
            {REQUIREMENTS.map((r) => {
              const active = requirement === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRequirement(active ? '' : r.value)}
                  className={`text-xs px-2.5 py-1.5 rounded-sm border transition-colors ${
                    active
                      ? 'border-ink bg-ink text-paper font-medium'
                      : 'border-line text-ink hover:bg-wash'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Urgency */}
        <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-ink select-none">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
            className="w-4 h-4 accent-ink rounded-sm"
          />
          <span>Urgent (Plan to install within 30 days for priority site survey)</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-all flex items-center justify-center disabled:opacity-50 mt-2 focus:outline-none focus:ring-2 focus:ring-ink"
        >
          {loading ? 'Validating enquiry…' : 'Get Verified Quotes & Subsidy'}
        </button>

        <p className="text-[11px] text-ink-2 text-center pt-1 leading-normal">
          No charges · SolarSquare &amp; verified channel partners · Free site survey
        </p>
      </form>
    </div>
  );
}
