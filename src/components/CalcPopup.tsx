'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Zap, Calculator } from 'lucide-react';

const STORAGE_KEY = 'calc_popup_shown';

export default function CalcPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only on first visit
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
          <Zap className="text-orange-500" size={32} />
        </div>

        {/* Headline */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          How much can solar save you?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Use our free solar calculator to estimate savings, system size, and payback period for your home or business.
        </p>

        {/* CTA */}
        <Link
          href="/solar-calculator"
          onClick={dismiss}
          className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <Calculator size={18} />
          Try the Solar Calculator
        </Link>

        <button
          onClick={dismiss}
          className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          No thanks, skip for now
        </button>
      </div>
    </div>
  );
}
