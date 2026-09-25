import React from 'react';

export interface StepItem {
  title: string;
  description: string;
}

export default function Steps({ steps }: { steps: StepItem[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full border border-ink text-ink font-semibold flex items-center justify-center text-sm shrink-0 mt-0.5">
            {idx + 1}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-semibold text-base text-ink">{step.title}</h4>
            <p className="text-sm text-ink-2 mt-1 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
