/**
 * Name & Text Validation & Normalization Utility
 * Provides Unicode-aware SFW validation for Recipient Name, Sender Name, City, and Relationship.
 */

const PROFANITY_PATTERNS = [
  /\bfuck\b/i,
  /\bshit\b/i,
  /\bporn\b/i,
  /\bxxx\b/i,
  /\bsex\b/i,
  /\bpenis\b/i,
  /\bvagina\b/i,
  /\bcunt\b/i,
  /\bbitch\b/i,
  /\basshole\b/i,
  /\bnigger\b/i,
  /\bfaggot\b/i,
  /\bchutiya\b/i,
  /\bgand\b/i,
  /\bmadarchod\b/i,
  /\bbehenchod\b/i,
  /\bbhosdike\b/i,
  /\bharami\b/i,
  /\blund\b/i,
];

/**
 * Normalizes input: trims whitespace and collapses multiple spaces into a single space.
 * Example: "   Priya     Patil   " -> "Priya Patil"
 */
export function normalizeNameText(val: string): string {
  if (!val) return "";
  return val.replace(/\s+/g, " ").trim();
}

export interface ValidationResult {
  valid: boolean;
  normalized: string;
  error?: string;
}

export function validateName(
  input: string,
  opts: { fieldName?: string; minLen?: number; maxLen?: number } = {}
): ValidationResult {
  const minLen = opts.minLen ?? 2;
  const maxLen = opts.maxLen ?? 50;
  const normalized = normalizeNameText(input);

  if (!normalized) {
    return { valid: false, normalized: "", error: "Please enter a valid name." };
  }

  if (normalized.length < minLen || normalized.length > maxLen) {
    return { valid: false, normalized, error: `Please enter a valid name.` };
  }

  // Reject URLs
  if (/(https?:\/\/|www\.|[a-z0-9-]+\.(com|org|net|io|co|in|app))/i.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid name." };
  }

  // Reject HTML tags or script protocols
  if (/<[^>]*>|javascript:|data:|vbscript:|onload=|onerror=/i.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid name." };
  }

  // Reject numbers
  if (/[0-9]/.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid name." };
  }

  // Reject excessive repeated characters (4+ identical characters in a row)
  if (/(.)\1{3,}/.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid name." };
  }

  // Unicode letter validation: allow letters (including Indian script & international), spaces, hyphens, apostrophes
  const nameRegex = /^[\p{L}\p{M}\s'-]+$/u;
  if (!nameRegex.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid name." };
  }

  // Profanity / SFW check
  for (const pattern of PROFANITY_PATTERNS) {
    if (pattern.test(normalized)) {
      return { valid: false, normalized, error: "Please enter a valid name." };
    }
  }

  return { valid: true, normalized };
}

export function validateCityText(input: string): ValidationResult {
  const normalized = normalizeNameText(input);
  if (!normalized) {
    return { valid: false, normalized: "", error: "Please enter a valid city." };
  }
  if (normalized.length < 2 || normalized.length > 60) {
    return { valid: false, normalized, error: "Please enter a valid city." };
  }
  if (/(https?:\/\/|www\.|<[^>]*>|javascript:|[0-9])/i.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid city." };
  }
  if (/(.)\1{3,}/.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid city." };
  }
  for (const pattern of PROFANITY_PATTERNS) {
    if (pattern.test(normalized)) {
      return { valid: false, normalized, error: "Please enter a valid city." };
    }
  }
  return { valid: true, normalized };
}

export function validateRelationshipText(input: string): ValidationResult {
  const normalized = normalizeNameText(input);
  if (!normalized) {
    return { valid: false, normalized: "", error: "Please enter a valid relationship." };
  }
  if (normalized.length < 2 || normalized.length > 30) {
    return { valid: false, normalized, error: "Please enter a valid relationship." };
  }
  if (/(https?:\/\/|www\.|<[^>]*>|javascript:|[0-9])/i.test(normalized)) {
    return { valid: false, normalized, error: "Please enter a valid relationship." };
  }
  for (const pattern of PROFANITY_PATTERNS) {
    if (pattern.test(normalized)) {
      return { valid: false, normalized, error: "Please enter a valid relationship." };
    }
  }
  return { valid: true, normalized };
}
