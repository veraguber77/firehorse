import './ArrowIcon.css'

/**
 * Arrow drawn to match the label's capitals, for use in place of "→" / "↓". Those characters
 * aren't in the brand fonts, so they came from another font: thin, and off the capitals.
 *
 *   <Button ...>View Categories<ArrowIcon direction="down" /></Button>
 *   <span>Learn more<ArrowIcon /></span>
 *
 * Put it straight after the text, without a space: it brings its own word space. Sized in em,
 * it sits on the baseline and is exactly as tall as the capitals (Neue Haas Grotesk Text,
 * capitals 0.75em tall as rendered), with the stroke of the bold weight. It takes the text colour.
 */
const SHAPES = {
  right: { width: 11, d: 'M0 5.25H9.2M5.59 1.25l4 4-4 4' },
  down: { width: 10, d: 'M5 0V9.4M1 5.09l4 4 4-4' },
}

export default function ArrowIcon({ direction = 'right', className }) {
  const { width, d } = SHAPES[direction] ?? SHAPES.right
  return (
    <svg
      className={['arrow-icon', className].filter(Boolean).join(' ')}
      width={`${width / 14}em`}
      height="0.75em"
      viewBox={`0 0.5 ${width} 10.5`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  )
}
