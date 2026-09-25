import React from 'react';

interface StickyQuoteBarProps {
  quoteHref?: string;
  callHref?: string | null;
  telHref?: string | null;
  companyName?: string;
  quoteText?: string;
}

export default function StickyQuoteBar({
  quoteHref = '/tools/solar-subsidy-calculator',
  callHref,
  telHref,
  companyName,
  quoteText,
}: StickyQuoteBarProps) {
  const activeCallHref = callHref || telHref;
  const activeQuoteText = quoteText || (companyName ? `Get quote from ${companyName}` : 'Get quotes');
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-line p-3 z-50 md:hidden shadow-float">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {activeCallHref && (
          <a
            href={activeCallHref}
            className="flex-1 inline-flex items-center justify-center h-12 px-4 border-[1.5px] border-ink text-ink font-medium text-sm rounded-sm hover:bg-wash transition-colors"
          >
            Call
          </a>
        )}
        <a
          href={quoteHref}
          className="flex-2 inline-flex items-center justify-center h-12 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors"
        >
          {activeQuoteText}
        </a>
      </div>
    </div>
  );
}
