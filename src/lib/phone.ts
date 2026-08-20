/**
 * Indian phone number normalization.
 * Strips whitespace/separators, removes country prefix and any leading 0,
 * validates 10-digit Indian numbers, and flags mobiles (start with 6-9).
 */
export interface NormalizedPhone {
  /** E.164-formatted phone string (e.g. "+919876543210") or null when invalid */
  e164: string | null;
  /** true when the 10-digit number starts with 6/7/8/9 (Indian mobile) */
  isMobile: boolean;
  /** digits-only 10-digit local number, or null when invalid */
  local: string | null;
}

export function normalizeIndianPhone(raw: string | null | undefined): NormalizedPhone {
  if (!raw) return { e164: null, isMobile: false, local: null };

  let digits = String(raw).replace(/[\s\-().+]/g, '');
  if (!/^\d+$/.test(digits)) return { e164: null, isMobile: false, local: null };

  if (digits.startsWith('91') && digits.length > 10) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');

  if (digits.length !== 10) return { e164: null, isMobile: false, local: null };

  const isMobile = /^[6-9]/.test(digits);
  return { e164: `+91${digits}`, isMobile, local: digits };
}

/** Build a wa.me URL for a valid mobile number, else null. */
export function whatsappUrl(raw: string | null | undefined, message?: string): string | null {
  const { e164, isMobile } = normalizeIndianPhone(raw);
  if (!e164 || !isMobile) return null;
  const digits = e164.replace('+', '');
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
}

/** Build a tel: URI for a valid phone, else null. */
export function telUrl(raw: string | null | undefined): string | null {
  const { e164 } = normalizeIndianPhone(raw);
  return e164 ? `tel:${e164}` : null;
}
