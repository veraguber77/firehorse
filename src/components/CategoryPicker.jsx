import './CategoryPicker.css'
import { allCategories, categoryVars, getCategory } from '../categories.js'
import gradient from '../assets/picker/gradient.webp'
import Button from './Button.jsx'
import ExtrudeWheel from './ExtrudeWheel.jsx'
import GradientArt from './GradientArt.jsx'

/**
 * Categories picker — Figma "Categories / Picker" (262:4412 light, 322:10427 dark).
 * The extrude wheel on the left, heading and readout anchored to the right.
 * `selected` is a category id or 'all'. Desktop layout; below 768px the wheel is only scaled.
 */
export default function CategoryPicker({ selected, onSelect }) {
  const current = getCategory(selected) ?? allCategories
  const isAll = current.id === allCategories.id
  // Cinder buttons (Motion, All) would vanish on the dark page, so they turn cream there.
  const flipsInDark = current.buttonColor === 'cinder'

  return (
    <section className="picker" style={categoryVars(current)}>
      <div className="picker__gradient" aria-hidden="true">
        <GradientArt src={gradient} inset={[10.49, 8.52, 10.84, 5.68]} />
      </div>

      <ExtrudeWheel selected={current.id} onSelect={onSelect} />

      <div className="picker__heading">
        <h1 className="picker__title">
          <span className="picker__title-accent">Five</span> ways in.
        </h1>
        <p className="picker__lede">Pick a category to see its brief.</p>
      </div>

      <div className="picker__rule" aria-hidden="true" />

      <div className="picker__readout" aria-live="polite">
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
