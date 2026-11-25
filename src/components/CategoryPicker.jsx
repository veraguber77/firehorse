import { useRef, useSyncExternalStore } from 'react'
import './CategoryPicker.css'
import { allCategories, categoryVars, getCategory } from '../categories.js'
import gradient from '../assets/picker/gradient.webp'
import Button from './Button.jsx'
import ExtrudeWheel from './ExtrudeWheel.jsx'
import GradientArt from './GradientArt.jsx'

// Same breakpoint as the mobile rules in CategoryPicker.css.
const mobileQuery = window.matchMedia('(max-width: 767px)')
const coarsePointer = window.matchMedia('(pointer: coarse)')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function watchMobile(onChange) {
  mobileQuery.addEventListener('change', onChange)
  return () => mobileQuery.removeEventListener('change', onChange)
}

/**
 * Categories picker — Figma "Categories / Picker" (262:4412 light, 322:10427 dark).
 * The extrude wheel on the left, heading and readout anchored to the right. On mobile the
 * heading and readout stack, and the same wheel rises from the bottom edge.
 * `selected` is a category id or 'all'.
 */
export default function CategoryPicker({ selected, onSelect }) {
  const current = getCategory(selected) ?? allCategories
  const isAll = current.id === allCategories.id
  // Cinder buttons (Motion, All) would vanish on the dark page, so they turn cream there.
  const flipsInDark = current.buttonColor === 'cinder'

  const isMobile = useSyncExternalStore(watchMobile, () => mobileQuery.matches)
  const readout = useRef(null)

  function handleSelect(id) {
    onSelect(id)
    // On phones and tablets the readout can be off-screen while the wheel is being tapped.
    if (!isMobile && !coarsePointer.matches) return
    const { top, bottom } = readout.current.getBoundingClientRect()
    if (top < 0 || bottom > window.innerHeight) {
      readout.current.scrollIntoView({
        block: 'nearest',
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      })
    }
  }

  return (
    <section className="picker" style={categoryVars(current)}>
      <div className="picker__gradient" aria-hidden="true">
        <GradientArt src={gradient} inset={[10.49, 8.52, 10.84, 5.68]} />
      </div>

      <ExtrudeWheel
        selected={current.id}
        onSelect={handleSelect}
        orientation={isMobile ? 'bottom' : 'left'}
      />

      <div className="picker__heading">
        <h1 className="picker__title">
          <span className="picker__title-accent">Five</span> ways in.
        </h1>
        <p className="picker__lede">Pick a category to see its brief.</p>
      </div>

      <div className="picker__rule" aria-hidden="true" />

      <div ref={readout} className="picker__readout" aria-live="polite">
        <h2 className="picker__readout-name">{current.name}</h2>
        <p className="picker__readout-tagline">{current.tagline}</p>
        <Button
          color={current.buttonColor}
          href={isAll ? '#briefs' : `#brief-${current.id}`}
          className={flipsInDark ? 'picker__readout-button picker__readout-button--flip' : 'picker__readout-button'}
        >
          {isAll ? 'See all five briefs' : `See the ${current.name} brief`}
        </Button>
      </div>
    </section>
  )
}
