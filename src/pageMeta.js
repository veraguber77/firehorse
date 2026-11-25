/**
 * Titles and descriptions for search results, browser tabs and link previews, one per page.
 * Plain data with no imports: the app uses it (App.jsx) and so does the build, which writes
 * an HTML file per page with these in its <head> (vite-plugin-site.js).
 * Ids match src/routes.js. The home entry is also what index.html falls back to.
 */
export const pageMeta = {
  home: {
    path: '/',
    title: 'Firehorse — 2026 design competition',
    description:
      'Firehorse is an open design competition across five categories. Free to enter, judged by senior designers. Submissions close November 14, 2026.',
  },
  categories: {
    path: '/categories',
    title: 'Categories — Firehorse',
    description:
      'Five ways in: Poster, Web App, Mobile App, Illustration and Motion. What to submit, the format and how each category is judged.',
  },
  timeline: {
    path: '/timeline',
    title: 'Timeline — Firehorse',
    description:
      'Firehorse runs in four stages: submissions open, entry deadline, judging and the winners’ reveal. See the dates for each one.',
  },
  faq: {
    path: '/faq',
    title: 'FAQ — Firehorse',
    description:
      'Who can enter, whether AI is allowed, the key dates, the categories, judging and prizes: everything people ask us about Firehorse.',
  },
}

export const notFoundMeta = {
  path: null,
  title: 'Page not found — Firehorse',
  description: 'This page doesn’t exist, or it has moved.',
}
