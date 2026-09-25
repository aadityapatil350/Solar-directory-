import React from 'react';

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="border-t border-line divide-y divide-line">
      {items.map((item, idx) => (
        <details key={idx} className="group py-4 text-ink">
          <summary className="font-heading font-semibold text-[17px] cursor-pointer flex items-center justify-between list-none select-none hover:text-ink/80 focus:outline-none">
            <span>{item.q}</span>
            <span className="text-ink-2 font-normal text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform duration-150">
              +
            </span>
          </summary>
          <div className="pt-3 text-[15px] text-ink-2 leading-relaxed max-w-prose">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
