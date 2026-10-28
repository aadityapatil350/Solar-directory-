/**
 * Validate a lead-form name. Rejects short-form, gibberish, and obvious spam.
 * Returns null on valid; error message on invalid.
 */
export function validateLeadName(raw: string | null | undefined): string | null {
  const name = (raw ?? '').trim();

  if (!name) return 'Please enter your full name.';
  if (name.length < 3) return 'Name must be at least 3 letters.';
  if (name.length > 80) return 'Name is too long.';

  // Only letters, spaces, dots, apostrophes, hyphens
  if (!/^[A-Za-z][A-Za-z .'\-]*$/.test(name)) {
    return 'Name can only contain letters, spaces, dots, apostrophes and hyphens.';
  }

  // No digits (implicitly handled by regex above, kept for clarity in error)
  if (/\d/.test(name)) return 'Name cannot contain numbers.';

  // Reject common test/junk values
  const junk = new Set([
    'test', 'testing', 'asdf', 'asdfgh', 'qwerty', 'admin', 'user',
    'abc', 'abcd', 'xyz', 'xxx', 'aaa', 'sample', 'demo', 'lorem',
    'dummy', 'na', 'nil', 'null', 'none', 'anonymous', 'anon',
  ]);
  const lower = name.toLowerCase();
  if (junk.has(lower.replace(/\s+/g, ''))) {
    return 'Please enter your real name.';
  }

  // At least one word must be 3+ chars (rejects "R K", "A B" as sole name)
  const words = name.split(/\s+/).filter(Boolean);
  const hasRealWord = words.some((w) => w.replace(/[.'\-]/g, '').length >= 3);
  if (!hasRealWord) {
    return 'Please enter your full name (not just initials).';
  }

  // Reject 3+ identical characters in a row (aaaa, xxx)
  if (/([A-Za-z])\1{2,}/i.test(name)) {
    return 'Please enter a valid name.';
  }

  // Reject a single word that has no vowels (likely gibberish, e.g. "xyz", "kdrt")
  if (words.length === 1 && !/[aeiou]/i.test(words[0])) {
    return 'Please enter a valid name.';
  }

  return null;
}

/** Validate that a city/location string is present, non-trivial, and not junk. */
export function validateLeadCity(raw: string | null | undefined): string | null {
  const city = (raw ?? '').trim();
  if (!city) return 'Please enter your location (city or town).';
  if (city.length < 2) return 'Please enter a valid city or location (at least 2 letters).';

  const junk = new Set([
    'test', 'testing', 'asdf', 'asdfgh', 'qwerty', 'na', 'none', 'null',
    'nil', 'xxx', 'abc', 'abcd', 'sample', 'demo', 'city', 'location', 'india',
  ]);
  const lower = city.toLowerCase().replace(/[\s.-]/g, '');
  if (junk.has(lower)) {
    return 'Please enter your real city or town name.';
  }

  // Must contain letters
  if (!/[A-Za-z]/.test(city)) {
    return 'City or location name must contain letters.';
  }

  // Reject 4+ identical characters in a row (e.g. "aaaaa", "zzzzz")
  if (/([A-Za-z])\1{3,}/i.test(city)) {
    return 'Please enter a valid city or location name.';
  }

  return null;
}

/** Validate Indian mobile number strictly to filter out spam and dummy leads. */
export function validateLeadPhone(raw: string | null | undefined): string | null {
  const phone = (raw ?? '').trim().replace(/\s+/g, '');
  if (!phone) return 'Please enter your 10-digit mobile number.';

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return 'Enter a valid 10-digit mobile number.';
  }

  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return 'Mobile number must start with 6, 7, 8, or 9.';
  }

  // Reject all identical digits (e.g. 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(cleanPhone)) {
    return 'Please enter a genuine 10-digit mobile number.';
  }

  // Reject common fake test sequences
  const fakeSequences = new Set([
    '9876543210', '9876543211', '9876543212',
    '9123456780', '9123456789', '9000000000',
    '9898989898', '9988776655', '9876598765',
    '8989898989', '7878787878', '6767676767'
  ]);
  if (fakeSequences.has(cleanPhone)) {
    return 'Please enter your actual active mobile number.';
  }

  return null;
}

/** Validate that the user provided their monthly electricity bill (light bill) */
export function validateMonthlyBill(raw: string | null | undefined): string | null {
  const bill = (raw ?? '').trim();
  if (!bill) return 'Please select your average monthly electricity bill (light bill).';
  return null;
}

/**
 * Validate Indian postal PIN code (strictly 6 digits, 100000 to 999999).
 * Rejects non-digits, wrong length, and common dummy numbers.
 */
export function validateLeadPincode(raw: string | null | undefined): string | null {
  const pin = (raw ?? '').trim().replace(/\s+/g, '');
  if (!pin) return 'Please enter your 6-digit postal PIN code.';

  const cleanPin = pin.replace(/\D/g, '');
  if (cleanPin.length !== 6) {
    return 'PIN code must be exactly 6 digits.';
  }

  if (!/^[1-9]\d{5}$/.test(cleanPin)) {
    return 'Please enter a valid 6-digit Indian PIN code.';
  }

  // Reject all identical digits (e.g. 111111, 999999)
  if (/^(\d)\1{5}$/.test(cleanPin)) {
    return 'Please enter a genuine 6-digit PIN code.';
  }

  // Reject common fake sequences
  const fakeSequences = new Set([
    '123456', '654321', '121212', '987654', '100000', '900000'
  ]);
  if (fakeSequences.has(cleanPin)) {
    return 'Please enter your actual 6-digit PIN code.';
  }

  return null;
}
