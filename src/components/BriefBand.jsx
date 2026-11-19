import './BriefBand.css'
import { categoryVars } from '../categories.js'
import gradient from '../assets/brief/gradient.svg'

/**
 * Category brief band — Figma "Categories / Brief band" (262:4488, dark 322:10265).
 * `showGradient` adds the Figma gradient background (used for Web App on the All view).
 */
export default function BriefBand({ category, showGradient = false }) {
  const name = category.briefName ?? category.name
  const titleId = `brief-${category.id}-title`

  return (
    <section
      id={`brief-${category.id}`}
      className="brief"
      data-category={category.id}
      data-ink={category.ink}
      style={categoryVars(category)}
      aria-labelledby={titleId}
    >
      {showGradient && (
        <div className="brief__gradient" aria-hidden="true">
          <img src={gradient} alt="" />
        </div>
      )}

      <div className="brief__index" aria-hidden="true">
        {category.index}
      </div>

      <div className="brief__body">
        <h2 id={titleId} className="brief__title">
          {name}
        </h2>
        <p className="brief__tagline">{category.tagline}</p>

        <ol className="brief__requirements">
          {category.requirements.map((requirement, index) => (
            <li key={requirement.label} className="brief__row">
              <span className="brief__row-number" aria-hidden="true">
                {index + 1}
              </span>
              <div className="brief__row-text">
                <h3 className="brief__row-label">{requirement.label}</h3>
                <p className="brief__row-detail">{requirement.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="brief__actions">
          <a
            className={`brief__button button button--on-section${category.ink === 'cream' ? ' button--on-dark' : ''}`}
            href="#submit"
          >
            Submit to {name}
          </a>
        </div>
      </div>

      <div className="brief__rule" aria-hidden="true" />
    </section>
  )
}
