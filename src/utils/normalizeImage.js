// src/utils/normalizeImage.js

/**
 * Converts shortcuts like "/images/Fred.png" into a fully valid absolute URL
 * This is required because <input type="url"> rejects relative paths.
 *
 * Works in:
 *  - Local dev (http://localhost:5175)
 *  - Production (deployed site)
 *  - External full URLs (left untouched)
 */

export function normalizeImage(url) {
  if (!url) return '';

  // If it's already an absolute URL, return it untouched
  try {
    new URL(url);
    return url;
  } catch (e) {
    // Not a full URL → continue
  }

  // Ensure it starts with a slash
  const cleaned = url.startsWith('/') ? url : `/${url}`;

  // Build full valid URL
  const base = window.location.origin;
  return `${base}${cleaned}`;
}
