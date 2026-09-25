import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  let baseStyles = 'inline-flex items-center justify-center font-medium transition-colors text-[16px] leading-tight select-none focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2';

  let variantStyles = '';
  if (variant === 'primary') {
    // One Sun button per screen rule
    variantStyles = 'bg-sun text-ink font-semibold h-12 px-6 rounded-sm hover:brightness-95 active:brightness-90';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-paper border-[1.5px] border-ink text-ink h-12 px-6 rounded-sm hover:bg-wash';
  } else if (variant === 'link') {
    variantStyles = 'bg-transparent text-ink underline underline-offset-[3px] decoration-1 hover:text-ink/80 p-0 h-auto font-normal';
  }

  const combined = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
