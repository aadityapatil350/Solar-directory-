'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { validateLeadName, validateLeadCity } from '@/lib/lead-validation';

const REQUIREMENTS = [
  { label: '3kW Home', value: '3kW Residential' },
  { label: '5kW Home', value: '5kW Residential' },
  { label: '10kW+', value: '10kW+ Residential' },
  { label: 'Commercial', value: 'Commercial Solar' },
  { label: 'Inverter Only', value: 'Solar Inverter' },
  { label: 'AMC / Maintenance', value: 'AMC & Maintenance' },
];

const BUDGETS = ['< ₹1L', '₹1L – ₹2L', '₹2L – ₹3L', '₹3L – ₹5L', '₹5L+'];

interface LeadFormProps {
  prefill?: { requirement?: string; city?: string };
  onSuccess?: () => void;
  compact?: boolean;
  /** Where the form was submitted from — e.g. "city-page:mumbai", "listing:acme-solar" */
  source?: string;
}

export default function LeadForm({ prefill, onSuccess, compact = false, source }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(prefill?.city || '');
  const [requirement, setRequirement] = useState(prefill?.requirement || '');
  const [budget, setBudget] = useState('');
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

    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError('Enter a valid 10-digit mobile number starting with 6–9.');
      return;
    }

    const cityError = validateLeadCity(city);
    if (cityError) {
      setError(cityError);
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
          city,
          requirement,
          budget,
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
          city,
          requirement: requirement || 'unspecified',
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
        <h3 className="font-heading font-semibold text-lg text-ink mb-1">Enquiry submitted</h3>
        <p className="text-ink-2 text-sm leading-relaxed">
          Up to 3 verified installers in <strong>{city}</strong> will contact you with customized quotes and subsidy guidance. Free service.
        </p>
      </div>
    );
  }

  return (
    <div id="quote" className={`bg-paper border border-line rounded-sm ${compact ? 'p-4' : 'p-5'}`}>
      <div className="mb-4">
        <h2 className="font-heading font-semibold text-lg text-ink">
          Get quotes
        </h2>
        <p className="text-xs text-ink-2 mt-0.5">
          Connect with verified installers serving {city || 'your area'}. Free service.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-wash border border-line rounded-sm p-3 mb-4 text-xs text-ink">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 stroke-[2]" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
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
          <p className="text-[11px] text-ink-2 mt-1">Verified installers will call / WhatsApp you with quotations</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink mb-1">
            Installation Location (City / Town) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Pune, Jaipur, Nagpur, Bengaluru"
            className="w-full h-11 px-3 border border-line rounded-sm bg-paper text-ink placeholder:text-ink-2/50 text-sm focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
          />
          <p className="text-[11px] text-ink-2 mt-1">Enter your city, district or area where solar will be installed</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            What do you need?
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

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Budget
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BUDGETS.map((b) => {
              const active = budget === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(active ? '' : b)}
                  className={`text-xs px-2.5 py-1.5 rounded-sm border transition-colors tabular-nums ${
                    active
                      ? 'border-ink bg-ink text-paper font-medium'
                      : 'border-line text-ink hover:bg-wash'
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-ink select-none">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
            className="w-4 h-4 accent-ink rounded-sm"
          />
          <span>Urgent requirement (plan to install within 30 days)</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-all flex items-center justify-center disabled:opacity-50 mt-2 focus:outline-none focus:ring-2 focus:ring-ink"
        >
          {loading ? 'Submitting…' : 'Get free quotes'}
        </button>

        <p className="text-[11px] text-ink-2 text-center pt-1 leading-normal">
          No charges · Up to 3 verified installers · Privacy respected
        </p>
      </form>
    </div>
  );
}
