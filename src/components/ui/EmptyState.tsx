import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  message: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({ message, actionText, actionHref }: EmptyStateProps) {
  return (
    <div className="py-12 px-4 text-center border border-dashed border-line rounded-md bg-wash/30 max-w-lg mx-auto">
      <p className="text-sm text-ink-2 mb-3 leading-relaxed">{message}</p>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="text-xs font-semibold text-ink underline underline-offset-2 hover:opacity-80"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
