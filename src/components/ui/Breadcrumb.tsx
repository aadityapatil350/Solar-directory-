import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-2 py-3 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-ink-2/50">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-ink underline underline-offset-2 hover:opacity-80"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink font-medium truncate max-w-xs">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
