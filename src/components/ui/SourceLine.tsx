import React from 'react';
import Link from 'next/link';

interface SourceLineProps {
  sources: string[];
  lastChecked?: string;
  explanationUrl?: string;
  className?: string;
}

export function SourceLine({
  sources,
  lastChecked,
  explanationUrl,
  className = '',
}: SourceLineProps) {
  return (
    <div className={`text-xs text-ink-2 leading-relaxed ${className}`}>
      <span>Sources: {sources.join(', ')}. </span>
      {lastChecked && <span>Checked {lastChecked}. </span>}
      {explanationUrl && (
        <Link href={explanationUrl} className="text-ink underline underline-offset-2 ml-0.5">
          How we calculate
        </Link>
      )}
    </div>
  );
}

interface AuthorBoxProps {
  authorName?: string;
  reviewedDate?: string;
  sourcesCount?: number;
}

export function AuthorBox({
  authorName = 'GoSolarIndex Technical Research Team',
  reviewedDate = '25 Sep 2026',
  sourcesCount,
}: AuthorBoxProps) {
  return (
    <div className="py-3 px-4 bg-wash rounded-md border border-line text-xs text-ink-2 flex flex-wrap items-center justify-between gap-2">
      <div>
        <span>Reviewed by </span>
        <span className="font-medium text-ink">{authorName}</span>
      </div>
      <div>
        <span>Last reviewed: </span>
        <span className="font-medium text-ink">{reviewedDate}</span>
        {sourcesCount != null && (
          <span className="ml-2 font-normal text-ink-2">({sourcesCount} official sources cited)</span>
        )}
      </div>
    </div>
  );
}
