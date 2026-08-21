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

/** Validate that a city string is present and non-trivial. */
export function validateLeadCity(raw: string | null | undefined): string | null {
  const city = (raw ?? '').trim();
  if (!city) return 'Please select your city.';
  if (city.length < 2) return 'Please select a valid city.';
  return null;
}
