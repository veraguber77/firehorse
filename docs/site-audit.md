# Site audit

November 25, 2026. Production build of this branch (started from commit 1621a5b). Pages: `/`, `/categories` (Poster, Web App, Mobile App, Illustration, Motion, All), `/timeline`, `/faq`, 404. Main has changed since (fire graphic, hero gradients, horse): numbers over that artwork may differ now.

**Pass** = checked, fine. **Fixed** = was wrong, changed here. **Fail** = still wrong, needs a decision. **Not run** = not checked.

## Decisions for you

1. Contrast fails (table below). Recommendation: start with the body-size text (grey labels, FAQ names, home statement text, dark picker one-liner).
2. Adobe Fonts hold back mobile loading. Loading their stylesheet without blocking gave 95 instead of 88 on mobile `/` in a trial (first paint 0.9s instead of 2.2s), but text shows in a similar Arial for a moment first. Recommendation: do it.
3. Site address is unknown (none on GitHub, no Vercel config). Set `VITE_SITE_URL` in the host's build settings; canonical, og:url and the sitemap then appear.
4. The 1200 x 630 social image doesn't exist. Put it in `public/` and set `VITE_SOCIAL_IMAGE=/social.png`.
5. Favicon: a crop of the horse mark from the logo. Please approve. It's a small bitmap inside the SVG; a vector logo would be sharper.
6. 404 page: new, not in Figma (FAQ header layout and gradient, two-tone title, two buttons). Please approve.
7. Page titles and descriptions are new copy in `src/pageMeta.js`. Please check.
8. Placeholder links below need real targets. On `/faq`, the footer's About link jumps to the FAQ topic "About".

## Accessibility

| Check | Result |
| --- | --- |
| axe, 44 runs (every page and selection, both themes, 1280 and 390, drawer open) | Only contrast fails. Run before the focus-ring, font and preload changes; final rerun not finished |
| One h1 per page, heading order, unique ids | Pass |
| header, nav, main, footer landmarks | Pass |
| Skip link first in the tab order, moves focus to main | Fixed (added) |
| Page change: focus to main, title read out, start at top | Fixed (added) |
| Links to a #section on load | Fixed (they jumped back to the top) |
| Timeline current step after a jump | Fixed (position based, shared with the FAQ). Tested at 390 and 1280 in Chrome, Firefox, WebKit |
| Every control reachable by keyboard, no traps | Pass at 1280 |
| Focus ring 3:1 on the colour bands | Fixed. Buttons were 1.0 to 2.5 on Inferno, Ember, Blaze, Afterglow; now in the band's ink. ALL's ring moved onto its disc |
| Wheel: radio group, arrow keys, Home/End, Enter/Space, live readout | Pass (arrows move focus, Enter or Space selects) |
| Drawer: focus, Esc, return of focus, name | Pass |
| Reduced motion | Pass by reading the CSS and JS: every transition has a rule for it |
| 200% browser zoom (1280) | Pass: no sideways scroll, no text past the edge |
| Text-only 200% at 1280 | Fail: brief titles run off the right |
| Text-only 200% at 390 | Fail: some long words, the milestone labels and a footer link run off the right; `/faq` scrolls sideways 43px. Suggest allowing these to wrap |
| Screen readers, real iOS Safari, real Android | Not run |

### Contrast fails

Measured on rendered pixels at 1280 and 390. Body text needs 4.5, large text 3. Nothing here was changed.

| Where | Theme | Ratio | Suggested fix |
| --- | --- | --- | --- |
| `/categories` >= 1280, picker one-liner over the orange art (every selection) | Dark | 1.56 to 2.88 where it crosses the art (median 7.8 to 11) | Move the art, or wrap the line as below 1280 |
| `/categories` "Five", Web App / Mobile App | Light | 2.01 / 2.40 | Ember 700 is 3.09, Blaze 700 3.63 |
| `/` hero "2026" | Light | 1.89 at the worst | Ember 700 is 3.09 |
| `/` "Enter with a", 14px Ember | Light | 2.01 | Ember 800 is 5.05 |
| `/` reel "Web App" | Light | 2.01 | Ember 700, or Cinder on an Ember band |
| `/` "This year, Firehorse invites..." | Both | 2.15 | Cinder text (Cinder on Ember is 9.03) |
| `/` "Take control of the horse..." | Both | 2.15 | Cinder text |
| `/` "Your turn." and 2086 on Blaze | Both | 2.56 | Cinder text is 7.58 |
| `/` statement text, neutral-300 on Afterglow | Light | 3.40 | Kindling 100 is 5.32 |
| `/` grey labels "Open categories", "Timeline — step 1 of 4" (neutral-500) | Light | 3.66 | neutral-600 is 7.72 |
| `/` grey questions, 17px at 390 | Light | 3.66 (passes at 1280, where it's large) | neutral-600 |
| `/faq` "Firehorse", 12px Inferno | Light | 3.29 | Inferno 700 is 4.89 |
| Footer copyright, 12px neutral-500 | Light | 3.91 | neutral-600 is 8.24 |
| Footer column titles, 17px Inferno at 390 | Light | 3.29 (passes at 1280, where it's large) | Inferno 700 |
| `/timeline` Winners body, 85% cream on Afterglow | Both | 4.33 | 90% is 4.65 |
| `/timeline` inactive steps, 55% cream on Afterglow | Both | 2.73 | 65% is 3.21 |
| Inactive chips at 390, 55% Cinder | Light | 4.38 `/timeline`, 4.45 `/faq` | 60% (5.19 on Kindling 300) |
| Wheel labels #8a8a93 at 390 (15px) | Light | 3.34 (passes at 1280; Dark is 5.88) | Cinder 400 is 5.20 |

## Performance

Lighthouse, median of 3, `vite preview`. LCP is the largest item on screen, CLS how much the page jumps.

| Page | Mobile perf | Mobile LCP | Desktop perf | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 88 | 3.6s | 99 | 96 | 100 | 100 |
| `/categories` | 88 | 3.6s | 99 | 96 | 100 | 100 |
| `/timeline` | 87 | 3.7s | 99 | 96 (100 desktop) | 100 | 100 |
| `/faq` | 91 | 3.2s | 99 | 96 | 100 | 100 |
| 404 | 86 | 3.8s | 99 | 100 | 100 | 66 (noindex, on purpose) |

CLS 0.000 everywhere on mobile. Desktop scores are from just before the last small change. Mobile perf (target 90) and LCP (target 2.5s) **fail** except perf on `/faq`: see decision 2. Accessibility points are lost to contrast only.

- Fixed: CLS on mobile `/` was 0.83 earlier in this pass. Arial fallbacks now match each brand font's width.
- Fixed: logos 66-70 KB PNG to 11-12 KB WebP (PNGs kept as sources).
- Fixed: gradients below the first screen load later; first-screen art is preloaded; Bowlby One is hosted here.
- Adobe kit, only changeable in Adobe Fonts: `font-display` is `auto` (suggest `swap`); unused neue-haas-grotesk-display, Avant Garde 300 and all italics. Unused faces aren't downloaded.
- Fonts in Firefox: harmless glyph warnings from Google's own Bowlby One file.
- JavaScript 317 KB (100 KB gzipped), mostly React and the router; the pages are a small part, so code splitting was left out.
- Unreferenced files are all sources (gradient SVGs, logo PNGs): kept.
- Baseline Lighthouse on the starting commit: not run.

## Search and sharing

Fixed (added): title, description, Open Graph and Twitter tags per page (written into an HTML file per page at build), robots.txt, sitemap.xml once the address is set, noindex 404, icons, manifest, theme-color that follows the chosen theme. `lang` was fine.

## Quality

- Console: no errors or warnings in Chrome and WebKit; Firefox only the font warnings above.
- Behaviour test (navigation, focus, 404, deep links, sticky bars, drawer, theme, wheel taps, sideways scroll) at 1280 and 390: Chrome passes on the final build; Firefox and WebKit passed on an earlier build (before the focus-ring, font and preload changes), final rerun not finished.
- Back button: Firefox doesn't return to the old scroll position. Chrome and WebKit do.
- HTML validation: passes after giving the drawer's links their own name. Not rerun after that.
- Theme: saved choice survives a reload (tested); the system theme is used on first visit.
- `vercel.json`: no catch-all rewrite. Each page has its own file, so unknown addresses get a real 404. Assets cached for a year, HTML revalidated. Not tested on Vercel. A new page needs an entry in `src/pageMeta.js` as well as `src/routes.js`.
- Pixel comparison with the starting commit (1280 and 390, both themes, every page and selection): only the logos (sharper), anti-aliasing on the home horse's edge and the 404 page differ.
- Responsive size list on the final build: not run. Sideways scroll was checked at 1280 and 390.

**Placeholder links:** `#submit` (nav, home hero, footer, brief bands, Timeline), `#create-account` (Timeline), `#prizes`, `#judges`, `#about`, `#past-winners`, `#press`, `#instagram`, `#linkedin` (footer). There are no external links yet, so no `rel` to check.

**TODOs:** `ai-assistant`: both "Start a chat" buttons (`Faq.jsx`) and "Ask Firehorse" (`Home.jsx`). `motion`: the step cycle and the category reel (`Home.jsx`).
