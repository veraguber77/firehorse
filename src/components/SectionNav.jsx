import { useEffect, useRef } from 'react'
import './SectionNav.css'

/**
 * In-page navigation for a stack of sections (Timeline stages, FAQ topics). At 1024px and up
 * it is a tall list in the left column, placed by the page's own class. Below that it is a
 * bar of chips that sticks to the top of the screen and scrolls sideways if it needs to.
 *
 * - `items`: [{ id, name, color? }]. `hrefFor(id)` gives the #anchor; `color` is the
 *   underline under the current chip (Inferno if left out).
 * - `currentId` is the section being read, `currentToken` its aria-current value.
 */
export default function SectionNav({
  label,
  items,
  hrefFor,
  currentId,
  currentToken = 'location',
  className = '',
  ...rest
}) {
  const listRef = useRef(null)
  const linkRefs = useRef({})

  // Keep the current chip in view: scrolls the bar only, never the page (as scrollIntoView could).
  useEffect(() => {
    const list = listRef.current
    const link = linkRefs.current[currentId]
    if (!link || list.scrollWidth <= list.clientWidth) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: reduceMotion ? 'instant' : 'smooth',
    })
  }, [currentId])

  return (
    <nav className={`section-nav ${className}`} aria-label={label} {...rest}>
      <ol ref={listRef} className="section-nav__list">
        {items.map(({ id, name, color }) => (
          <li key={id}>
            <a
              ref={(node) => {
                linkRefs.current[id] = node
              }}
              className="section-nav__link"
              href={hrefFor(id)}
              aria-current={id === currentId ? currentToken : undefined}
              style={color ? { '--section-color': color } : undefined}
            >
              <span className="section-nav__text">{name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
