import './CategoryPicker.css'
import { allCategories, categories, categoryVars, getCategory } from '../categories.js'
import gradient from '../assets/picker/gradient.svg'
import ringForLight from '../assets/picker/wheel-ring-light.svg'
import ringForDark from '../assets/picker/wheel-ring-dark.svg'
import hubDiscForLight from '../assets/picker/hub-disc-light.svg'
import hubDiscForDark from '../assets/picker/hub-disc-dark.svg'
import innerDiscForLight from '../assets/picker/inner-disc-light.svg'
import innerDiscForDark from '../assets/picker/inner-disc-dark.svg'

// Spokes sit 20° apart. The pointer is the horizontal line through the hub
// (0°); positive angles point down. "All" rests with the second spoke
// (Web App) on the pointer, as in Figma.
const SPOKE_STEP = 20
const REST_INDEX = 1

// Geometry of the 800px-tall section, used to keep labels off its edges.
const SECTION_HEIGHT = 800
const HUB_Y = 440
const LABEL_START = 244 // px from the hub centre to where a label starts
const LABEL_CHAR_WIDTH = 17.5 // approx. advance per character at 28px
const LABEL_HALF_HEIGHT = 14
const EDGE_MARGIN = 24

/** Index of the spoke that sits on the pointer for a selection ('all' rests on Web App). */
function pointerIndex(id) {
  const index = categories.findIndex((category) => category.id === id)
  return index === -1 ? REST_INDEX : index
}

/** Steepest angle (degrees from the pointer) at which a label still clears the section edge. */
function steepestAngle(category, room) {
  const reach = LABEL_START + category.name.length * LABEL_CHAR_WIDTH
  const ratio = (room - EDGE_MARGIN - LABEL_HALF_HEIGHT) / reach
  return ratio >= 1 ? 90 : (Math.asin(ratio) * 180) / Math.PI
}

/**
 * Angle of each spoke for a selection. The wheel turns as one piece: the
 * selected spoke sits on the pointer and the rest keep their order above and
 * below it, 20° apart. If a label on one side would reach the section edge
 * (only below the pointer, with Poster selected), that side's spacing tightens
 * just enough for every label to fit.
 */
function spokeAngles(id) {
  const pointer = pointerIndex(id)
  const sideStep = (room, onSide) =>
    categories.reduce((step, category, index) => {
      const offset = Math.abs(index - pointer)
      return onSide(index) ? Math.min(step, steepestAngle(category, room) / offset) : step
    }, SPOKE_STEP)

  const stepAbove = sideStep(HUB_Y, (index) => index < pointer)
  const stepBelow = sideStep(SECTION_HEIGHT - HUB_Y, (index) => index > pointer)
  return categories.map((_, index) => (index - pointer) * (index < pointer ? stepAbove : stepBelow))
}

/**
 * Categories picker wheel — Figma "Categories / Picker" (262:4412 light, 322:10427 dark).
 * `selected` is a category id or 'all'. Desktop layout only for now.
 */
export default function CategoryPicker({ selected, onSelect }) {
  const current = getCategory(selected) ?? allCategories
  const isAll = current.id === allCategories.id

  const angles = spokeAngles(current.id)

  return (
    <section className="picker" data-category={current.id} style={categoryVars(current)}>
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
        <div className="picker__wheel">
          {categories.map((category, index) => {
            const isSelected = category.id === current.id
            return (
              <div
                key={category.id}
                className="picker__spoke"
                data-state={isSelected ? 'selected' : isAll ? 'all' : 'idle'}
                style={{ '--spoke-angle': `${angles[index]}deg`, ...categoryVars(category) }}
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
        <a
          className={`picker__readout-button button ${isAll ? 'button--palette' : 'button--category'}`}
          href={isAll ? '#briefs' : `#brief-${current.id}`}
        >
          {isAll ? 'See all five briefs' : `See the ${current.name} brief`}
        </a>
      </div>
    </section>
  )
}
