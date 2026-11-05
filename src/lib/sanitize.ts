import * as cheerio from 'cheerio';

const ALLOWED_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'div', 'b', 'strong', 'i', 'em', 'u', 's', 'strike',
  'code', 'pre', 'blockquote', 'ul', 'ol', 'li',
  'a', 'img', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'hr', 'br', 'sub', 'sup'
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  '*': new Set(['class', 'style', 'title', 'id', 'dir', 'lang']),
  'a': new Set(['href', 'target', 'rel', 'download']),
  'img': new Set(['src', 'alt', 'width', 'height', 'loading']),
  'th': new Set(['colspan', 'rowspan', 'scope']),
  'td': new Set(['colspan', 'rowspan']),
};

const SAFE_URL_PREFIXES = ['http://', 'https://', 'mailto:', 'tel:', '/', '#'];

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return SAFE_URL_PREFIXES.some(prefix => trimmed.startsWith(prefix));
}

/**
 * Sanitizes rich text blog HTML to prevent XSS attacks while preserving formatting.
 */
export function sanitizeBlogHtml(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  const $ = cheerio.load(dirtyHtml, null, false);

  // Remove dangerous tags and their contents
  $('script, iframe, object, embed, form, input, button, textarea, select, base, link, meta, svg, math').remove();

  $('*').each((_, element) => {
    if (element.type !== 'tag') return;

    const tagName = element.tagName.toLowerCase();

    // If tag is not in allowed list, unwrap it (keep text/children, remove tag)
    if (!ALLOWED_TAGS.has(tagName)) {
      $(element).replaceWith($(element).contents());
      return;
    }

    // Filter attributes
    const attribs = element.attribs || {};
    const allowedForTag = ALLOWED_ATTRS[tagName] || new Set();
    const globalAllowed = ALLOWED_ATTRS['*'];

    for (const attrName of Object.keys(attribs)) {
      const lowerAttr = attrName.toLowerCase();

      // Disallow any inline event handler (onclick, onload, onerror, etc.)
      if (lowerAttr.startsWith('on')) {
        $(element).removeAttr(attrName);
        continue;
      }

      // Check if attribute is allowed
      if (!globalAllowed.has(lowerAttr) && !allowedForTag.has(lowerAttr)) {
        $(element).removeAttr(attrName);
        continue;
      }

      // Check URL safety for href and src
      if (lowerAttr === 'href' || lowerAttr === 'src') {
        const value = attribs[attrName];
        if (!isSafeUrl(value)) {
          $(element).removeAttr(attrName);
        }
      }
    }

    // Force secure rel for links opening in new tab
    if (tagName === 'a' && attribs['target'] === '_blank') {
      $(element).attr('rel', 'noopener noreferrer');
    }
  });

  return $.html() || '';
}
