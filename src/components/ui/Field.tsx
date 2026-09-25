import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function InputField({ label, error, helperText, id, className = '', ...props }: FieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={inputId} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full h-12 px-3.5 bg-paper border ${
          error ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-ink/40'
        } rounded-sm text-ink text-base focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-colors ${className}`}
        {...props}
      />
      {error ? (
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-ink-2">{helperText}</p>
      ) : null}
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function SelectField({ label, error, children, id, className = '', ...props }: SelectFieldProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={selectId} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full h-12 px-3.5 bg-paper border ${
          error ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-ink/40'
        } rounded-sm text-ink text-base focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-colors ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
