/**
 * Shared category map — the single source for category names, copy and colours.
 * Colours point at the --cat-* tokens in styles/tokens.css.
 *
 *   color / onColor   the category's own colour and the text colour that sits on it
 *                     (bands, buttons, bento tiles)
 *   accent / onAccent optional override for when the colour is used as an accent
 *                     on the page background. Only Motion needs it: Cinder is the
 *                     dark page background, so it flips to cream in dark mode.
 */
export const categories = [
  {
    id: 'poster',
    index: '01',
    name: 'Poster',
    tagline: 'Single-sheet design for print or screen.',
    color: 'var(--cat-poster)', // Inferno
    onColor: 'var(--text-on-accent)',
  },
  {
    id: 'web-app',
    index: '02',
    name: 'Web App',
    tagline: 'Designed interface for a browser-based product.',
    color: 'var(--cat-web-app)', // Ember
    onColor: 'var(--text-on-accent)',
  },
  {
    id: 'mobile-app',
    index: '03',
    name: 'Mobile App',
    tagline: 'Designed interface for a phone-based product.',
    color: 'var(--cat-mobile-app)', // Blaze
    onColor: 'var(--text-on-accent)',
  },
  {
    id: 'illustration',
    index: '04',
    name: 'Illustration',
    tagline: 'Original image-making in any medium.',
    color: 'var(--cat-illustration)', // Afterglow
    onColor: 'var(--text-static-cream)',
  },
  {
    id: 'motion',
    index: '05',
    name: 'Motion',
    tagline: 'Design that moves: animation, titles or motion graphics.',
    color: 'var(--cat-motion)', // Cinder
    onColor: 'var(--text-static-cream)',
    accent: 'var(--text-brand-primary)',
    onAccent: 'var(--background-primary)',
  },
]

/** The "All" selection: not a category, but it shares the same shape. */
export const allCategories = {
  id: 'all',
  name: 'All five',
  tagline: 'Every category brief, stacked below.',
  color: 'var(--accent-primary)',
  onColor: 'var(--text-on-accent)',
}

export function getCategory(id) {
  return id === allCategories.id ? allCategories : categories.find((category) => category.id === id)
}

/**
 * CSS custom properties for a category, for use in a `style` prop:
 * --category-color, --category-on-color, --category-accent, --category-on-accent.
 */
export function categoryVars(category) {
  return {
    '--category-color': category.color,
    '--category-on-color': category.onColor,
    '--category-accent': category.accent ?? category.color,
    '--category-on-accent': category.onAccent ?? category.onColor,
  }
}
