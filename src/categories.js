/**
 * Shared category map — the single source for category names, copy and colours.
 * Colours point at the --cat-* tokens in styles/tokens.css.
 *
 *   color / onColor   the category's own colour and the text colour that sits on it
 *                     (bands, buttons, bento tiles)
 *   hoverColor        one shade lighter than `color`, for button hover fills
 *   ink               'dark' or 'cream': which text colour reads on the category colour
 *   accent / onAccent optional override for when the colour is used as an accent
 *                     on the page background. Only Motion needs it: Cinder is the
 *                     dark page background, so it flips to cream in dark mode.
 *   briefName         optional longer name used on the brief band
 *   requirements      the three rows shown on the brief band
 */

// The judging line is the same for every category.
const HOW_ITS_JUDGED = 'Idea, craft and how well it answers the brief.'

function requirements(whatToSubmit, formatAndSpecs) {
  return [
    { label: 'What to submit', text: whatToSubmit },
    { label: 'Format and specs', text: formatAndSpecs },
    { label: "How it's judged", text: HOW_ITS_JUDGED },
  ]
}

export const categories = [
  {
    id: 'poster',
    index: '01',
    name: 'Poster',
    tagline: 'Print-ready or digital poster design, any medium.',
    color: 'var(--cat-poster)', // Inferno
    hoverColor: 'var(--color-inferno-500)', // one shade lighter, for hover
    onColor: 'var(--text-on-accent)',
    ink: 'dark',
    requirements: requirements(
      'One poster, plus a short process note.',
      'PDF or PNG at A3 or 18×24 in, 300 dpi.',
    ),
  },
  {
    id: 'web-app',
    index: '02',
    name: 'Web App',
    tagline: 'Designed interface for a browser-based product.',
    color: 'var(--cat-web-app)', // Ember
    hoverColor: 'var(--color-ember-500)', // one shade lighter, for hover
    onColor: 'var(--text-on-accent)',
    ink: 'dark',
    requirements: requirements(
      'Up to 10 screens, plus an optional prototype link and a process note.',
      'PNG screens at 1440px wide, plus an optional Figma or web prototype link.',
    ),
  },
  {
    id: 'mobile-app',
    index: '03',
    name: 'Mobile App',
    tagline: 'iOS or Android app UI, single screen or full flow.',
    color: 'var(--cat-mobile-app)', // Blaze
    hoverColor: 'var(--color-blaze-500)', // one shade lighter, for hover
    onColor: 'var(--text-on-accent)',
    ink: 'dark',
    requirements: requirements(
      'Up to 10 screens or a flow, plus a process note.',
      'PNG screens at 390×844, plus an optional prototype link.',
    ),
  },
  {
    id: 'illustration',
    index: '04',
    name: 'Illustration',
    tagline: 'Original vector or raster illustration, any subject.',
    color: 'var(--cat-illustration)', // Afterglow
    hoverColor: 'var(--color-afterglow-500)', // one shade lighter, for hover
    onColor: 'var(--text-static-cream)',
    ink: 'cream',
    requirements: requirements(
      'One illustration or a series of up to 5, plus a process note.',
      'PNG or JPG, at least 3000px on the long edge.',
    ),
  },
  {
    id: 'motion',
    index: '05',
    name: 'Motion',
    briefName: 'Motion / Animation',
    tagline: 'Looping or narrative animation, any duration.',
    color: 'var(--cat-motion)', // Cinder
    hoverColor: 'var(--color-cinder-500)', // one shade lighter, for hover
    onColor: 'var(--text-static-cream)',
    ink: 'cream',
    accent: 'var(--text-brand-primary)',
    onAccent: 'var(--background-primary)',
    requirements: requirements('One animation up to 60 seconds, plus a process note.', 'MP4 at 1080p, or GIF.'),
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
 * --category-color, --category-on-color, --category-color-hover, --category-accent, --category-on-accent.
 */
export function categoryVars(category) {
  return {
    '--category-color': category.color,
    '--category-on-color': category.onColor,
    '--category-color-hover': category.hoverColor ?? category.color,
    '--category-accent': category.accent ?? category.color,
    '--category-on-accent': category.onAccent ?? category.onColor,
  }
}
