import React from 'react';
import Link from 'next/link';

export interface FactRow {
  label: string;
  value: string;
  total?: boolean;
}

export interface FactPanelProps {
  title: string;
  subtitle?: string;
  rows: FactRow[];
  totalRow?: FactRow;
  sources: string | string[];
  calcExplanationUrl?: string;
  className?: string;
}

export default function FactPanel({
  title,
  subtitle,
  rows,
  totalRow,
  sources,
  calcExplanationUrl = '/tools/solar-subsidy-calculator',
  className = '',
}: FactPanelProps) {
  // Normalize sources
  const sourceList = Array.isArray(sources) ? sources : [sources].filter(Boolean);

  if (!sourceList || sourceList.length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`[FactPanel]: Mandatory "sources" prop is missing for "${title}".`);
    }
  }

  const regularRows = rows.filter((r) => !r.total);
  const resolvedTotal = totalRow || rows.find((r) => r.total);

  return (
    <div className={`bg-paper rounded-md border border-line p-5 text-ink shadow-xs ${className}`}>
      {/* Title block with 2px Ink rule underneath */}
      <div className="pb-3 border-b-2 border-ink mb-4">
        <h3 className="font-heading font-bold text-xl leading-snug text-ink">{title}</h3>
        {subtitle && (
          <div className="text-ink-2 text-xs mt-0.5">{subtitle}</div>
        )}
      </div>

      {/* Rows with dotted leaders */}
      <div className="space-y-2.5 text-[15px]">
        {regularRows.map((row, idx) => (
          <div key={idx} className="flex items-baseline justify-between gap-2">
            <span className="text-ink shrink-0">{row.label}</span>
            <span className="flex-1 border-b border-dotted border-ink/20 mx-1 mb-1" />
            <span className="font-medium text-ink tabular-nums text-right shrink-0">{row.value}</span>
          </div>
        ))}

        {/* Total row with 1.5px rule above it */}
        {resolvedTotal && (
          <div className="pt-2.5 mt-3 border-t-[1.5px] border-ink flex items-baseline justify-between gap-2 font-bold text-ink">
            <span className="shrink-0">{resolvedTotal.label}</span>
            <span className="flex-1 border-b border-dotted border-ink/30 mx-1 mb-1" />
            <span className="tabular-nums text-right shrink-0">{resolvedTotal.value}</span>
          </div>
        )}
      </div>

      {/* Mandatory source footer */}
      <div className="mt-4 pt-3 border-t border-line text-xs text-ink-2 leading-relaxed">
        <span>Sources: {sourceList.join(', ')}. </span>
        {calcExplanationUrl && (
          <Link href={calcExplanationUrl} className="text-ink underline underline-offset-2 ml-1">
            How we calculate
          </Link>
        )}
      </div>
    </div>
  );
}
