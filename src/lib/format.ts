/**
 * Indian Number & Currency Formatting Utilities
 * Standard: en-IN (e.g. ₹1,20,000, 1,712)
 */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumberIN(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatLakh(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(1).replace(/\.0$/, '')} lakh`;
  }
  return formatINR(amount);
}
