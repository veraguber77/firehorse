import './CategoryPicker.css'
import { allCategories, categories, categoryVars, getCategory } from '../categories.js'
import gradient from '../assets/picker/gradient.svg'
import ringForLight from '../assets/picker/wheel-ring-light.svg'
import ringForDark from '../assets/picker/wheel-ring-dark.svg'
import hubDiscForLight from '../assets/picker/hub-disc-light.svg'
import hubDiscForDark from '../assets/picker/hub-disc-dark.svg'
import innerDiscForLight from '../assets/picker/inner-disc-light.svg'
import innerDiscForDark from '../assets/picker/inner-disc-dark.svg'

// Spokes sit 20° apart. The pointer is the horizontal line through the hub,
// and with no rotation the second spoke (Web App) rests on it, as in Figma.
const SPOKE_STEP = 20
const REST_INDEX = 1
const spokeAngle = (index) => (index - REST_INDEX) * SPOKE_STEP

/**
 * Categories picker wheel — Figma "Categories / Picker" (262:4412 light, 322:10427 dark).
 * `selected` is a category id or 'all'. Desktop layout only for now.
 */
export default function CategoryPicker({ selected, onSelect }) {
  const current = getCategory(selected) ?? allCategories
  const isAll = current.id === allCategories.id
  const selectedIndex = categories.findIndex((category) => category.id === current.id)
  const wheelRotation = isAll ? 0 : -spokeAngle(selectedIndex)

  return (
    <section className="picker" style={categoryVars(current)}>
      <div className="picker__gradient" aria-hidden="true">
        <img src={gradient} alt="" />
      </div>
      <img className="picker__ring theme-light-only" src={ringForLight} width="1120" height="1120" alt="" />
      <img className="picker__ring theme-dark-only" src={ringForDark} width="1120" height="1120" alt="" />
      <img className="picker__hub-disc theme-light-only" src={hubDiscForLight} width="360" height="360" alt="" />
      <img className="picker__hub-disc theme-dark-only" src={hubDiscForDark} width="360" height="360" alt="" />

      <div className="picker__heading">
        <h1 className="picker__title">
          <span className="picker__title-accent">Five</span> ways in.
        </h1>
        <p className="picker__lede">Pick a category to see its brief.</p>
      </div>

      <div className="picker__controls" role="group" aria-label="Choose a category">
        <div className="picker__wheel" style={{ '--wheel-rotation': `${wheelRotation}deg` }}>
          {categories.map((category, index) => {
            const isSelected = category.id === current.id
            return (
              <div
                key={category.id}
                className="picker__spoke"
                data-state={isSelected ? 'selected' : isAll ? 'all' : 'idle'}
                style={{ '--spoke-angle': `${spokeAngle(index)}deg`, ...categoryVars(category) }}
              >
                <button
                  type="button"
                  className="picker__spoke-button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(category.id)}
                >
                  <span className="picker__spoke-line" />
                  <span className="picker__spoke-label">{category.name}</span>
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className="picker__hub"
          aria-pressed={isAll}
          aria-label="All categories"
          onClick={() => onSelect(allCategories.id)}
        >
          <img className="picker__hub-inner theme-light-only" src={innerDiscForLight} width="140" height="140" alt="" />
          <img className="picker__hub-inner theme-dark-only" src={innerDiscForDark} width="144" height="144" alt="" />
          <span className="picker__hub-label">All</span>
        </button>
      </div>

      <div className="picker__rule" aria-hidden="true" />

      <div className="picker__readout" aria-live="polite">
        <h2 className="picker__readout-name">{current.name}</h2>
        <p className="picker__readout-tagline">{current.tagline}</p>
        <a className="picker__readout-button" href={isAll ? '#briefs' : `#brief-${current.id}`}>
          {isAll ? 'See all five briefs' : `See the ${current.name} brief`}
        </a>
      </div>
    </section>
  )
}
