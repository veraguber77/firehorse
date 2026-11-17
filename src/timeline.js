/**
 * Shared competition timeline — the single source for the four stages.
 * Used by the Timeline page and the homepage timeline teaser.
 *
 *   name       stage name, sentence case (pages uppercase or capitalise it in CSS)
 *   listDate   short date for the intro step list
 *   date       date line on the stage band
 *   title      stage band headline
 *   body       stage band copy
 *   cta        optional button on the stage band
 *   color      the stage's colour: band background and homepage marker
 *   listColor  underline colour in the intro step list (Figma runs these in reverse)
 *   ink        'dark' or 'cream': which text colour reads on `color`
 */
export const stages = [
  {
    id: 'open',
    name: 'Submissions open',
    listDate: 'Oct 1, 2026',
    date: 'October 1, 2026',
    title: 'Start making',
    body: 'The competition opens to designers worldwide. Create an account, choose a category, read its brief and start making.',
    cta: { label: 'Create your account', href: '#create-account' },
    color: 'var(--color-inferno-600)',
    listColor: 'var(--color-afterglow-600)',
    ink: 'dark',
  },
  {
    id: 'deadline',
    name: 'Entry deadline',
    listDate: 'Nov 14, 2026',
    date: 'November 14, 2026',
    title: 'Last day to enter',
    body: 'Upload your final files by 11:59 PM PT, with a short note on your process and any AI tools you used. After the deadline, entries are locked and handed to the judges.',
    cta: { label: 'Submit an Entry', href: '#submit' },
    color: 'var(--color-ember-600)',
    listColor: 'var(--color-blaze-600)',
    ink: 'dark',
  },
  {
    id: 'judging',
    name: 'Judging period',
    listDate: 'November 14 - 28, 2026',
    date: 'November 14 - 28',
    title: 'The judges review',
    body: 'A panel of volunteer senior designers reviews every entry in all five categories, looking at the idea, the craft and how well it answers the brief. AI use is neither rewarded nor penalized.',
    color: 'var(--color-blaze-600)',
    listColor: 'var(--color-ember-600)',
    ink: 'dark',
  },
  {
    id: 'winners',
    name: 'Winners announced',
    listDate: 'December 5, 2026',
    date: 'December 5th',
    title: 'Winners revealed',
    body: 'Winners in each category get $1,000 and a featured page on the Firehorse site until the next zodiac year, plus a feature on our social channels. Every entrant gets their results by email.',
    color: 'var(--color-afterglow-600)',
    listColor: 'var(--color-inferno-600)',
    ink: 'cream',
  },
]
