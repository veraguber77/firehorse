import { useRef, useState } from 'react'
import './ExtrudeWheel.css'
import { allCategories, categories } from '../categories.js'
import { arcPath, polar, wedgePath } from '../lib/wedgePath.js'

/*
 * Geometry, in SVG user units, "wheel units". The wheel centre is the SVG origin (0, 0), and
 * centreX / centreY say where it sits in the visible box (width × height). On screen one unit
 * is --wheel-u (ExtrudeWheel.css), so everything scales together. Angles are wedgePath's:
 * 0 points right, -90 up, and they turn clockwise.
 *
 * left    Desktop and tablet (Figma 262:4412): one unit is 1px in the 1280 × 800 frame. The
 *         centre is 40 from the left edge, so the left half of the wheel is off-screen.
 * bottom  Mobile: the same wheel turned to rise from the bottom edge, fanning left to right.
 *         It is drawn at about a third of the size, so the hub is bigger in proportion (ALL
 *         stays tappable) and the band has more room.
 */
const GEOMETRY = {
  left: {
    start: -90, // straight up
    centreX: 40,
    centreY: 440,
    width: 602, // just past the outer band
    height: 800,
    rAll: 70, // ALL button
    rHub: 100, // hub colour ring 70-100, wedges start here
    rWedge: 548,
    rBand: 558.5, // 3px outer band, 557-560 (Figma "Wheel ring": r 558.5, 3px stroke)
  },
  bottom: {
    start: 180, // straight left
    centreX: 560,
    centreY: 560,
    width: 1120,
    height: 624, // the strip below the centre matches the 40 units beside it on desktop
    rAll: 112,
    rHub: 150,
    rWedge: 536,
    rBand: 554,
  },
}

const SWEEP = 36

function buildWheel({ start, rAll, rHub, rWedge, rBand }) {
  const end = start + categories.length * SWEEP
  return {
    /** Scale at which a coloured wedge is fully hidden behind the hub ring. */
    restScale: rHub / rWedge,
    segments: categories.map((category, index) => {
      const a0 = start + index * SWEEP
      const a1 = a0 + SWEEP
      const mid = a0 + SWEEP / 2
      return {
        category,
        index,
        mid,
        // Labels read outward from the centre, except where that would be upside down.
        flip: Math.cos((mid * Math.PI) / 180) < -0.01,
        wedge: wedgePath(0, 0, rHub, rWedge, a0, a1),
        // The coloured wedge reaches under the hub ring (from r ALL), so no seam shows at its edge.
        fill: wedgePath(0, 0, rAll, rWedge, a0, a1),
        hub: wedgePath(0, 0, rAll, rHub, a0, a1),
        band: arcPath(0, 0, rBand, a0, a1),
      }
    }),
    // Motion's outer edge across the hub ring, where the last wedge ends.
    motionHubEdge: `M${polar(0, 0, rAll, end).join(' ')} L${polar(0, 0, rHub, end).join(' ')}`,
  }
}

const WHEELS = { left: buildWheel(GEOMETRY.left), bottom: buildWheel(GEOMETRY.bottom) }

/** Devices with a real hover: the only ones that get the wedge preview. */
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')

/**
 * Categories "Extrude" wheel — Figma "Categories / Picker" (262:4412 light, 322:10427 dark).
 * One inline SVG: off wedges (also the hit areas), coloured wedges that extrude from the
 * hub, the hub colour ring and the outer band, all built from the same wedgePath() so the
 * colour boundaries line up exactly. ALL is an HTML <button> laid over the hub.
 *
 * All motion is CSS transitions driven by data attributes (see ExtrudeWheel.css).
 * GSAP (later motion pass) could replace them with one timeline per selection change:
 * retract the previous wedge, extrude the next, then tint the label.
 *
 * `selected` is a category id or 'all'. `orientation` is the edge the wheel grows from:
 * 'left' (desktop, tablet) or 'bottom' (mobile).
 */
export default function ExtrudeWheel({ selected, onSelect, orientation = 'left' }) {
  const { centreX, centreY, width, height, rAll, rBand } = GEOMETRY[orientation]
  const { restScale, segments, motionHubEdge } = WHEELS[orientation]
  const isAll = selected === allCategories.id
  const selectedIndex = categories.findIndex((category) => category.id === selected)

  // Wedge being previewed by hover (mouse only) or keyboard focus, and the one showing a focus ring.
  const [hovered, setHovered] = useState(-1)
  const [focused, setFocused] = useState(-1)
  const [focusVisible, setFocusVisible] = useState(false)
  const radios = useRef([])

  // Roving tabindex: the selected wedge, else the first one.
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex

  function handleKeyDown(event, index) {
    const count = categories.length
    let next = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % count
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(categories[index].id)
      return
    }
    if (next !== null) {
      event.preventDefault()
      radios.current[next]?.focus()
    }
  }

  return (
    <div
      className="wheel"
      data-all={isAll}
      data-orientation={orientation}
      style={{
        '--wheel-w': width,
        '--wheel-h': height,
        '--wheel-cx': centreX,
        '--wheel-cy': centreY,
        '--wheel-r-all': rAll,
        '--wheel-rest': restScale,
      }}
    >
      <svg
        className="wheel__svg"
        viewBox={`${-centreX} ${-centreY} ${width} ${height}`}
      >
        <defs>
          {segments.map(({ category, fill }) => (
            <clipPath key={category.id} id={`wheel-clip-${category.id}`}>
              <path d={fill} />
            </clipPath>
          ))}
        </defs>

        {/* Wheel face and outer band (never animate) */}
        <circle className="wheel__face" r={rBand} aria-hidden="true" />
        <g className="wheel__band" aria-hidden="true">
          {segments.map(({ category, band }) => (
            <path key={category.id} d={band} style={{ stroke: category.color }} />
          ))}
        </g>

        {/* Off wedges: always there, and the hit areas */}
        <g className="wheel__radios" role="radiogroup" aria-label="Categories">
          {segments.map(({ category, index, wedge }) => (
            <g
              key={category.id}
              ref={(node) => {
                radios.current[index] = node
              }}
              className="wheel__radio"
              role="radio"
              aria-checked={category.id === selected}
              aria-label={category.name}
              tabIndex={index === tabStop ? 0 : -1}
              onClick={() => onSelect(category.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPointerEnter={(event) => {
                // On touch a tap selects straight away, without a preview first.
                if (event.pointerType !== 'touch' && canHover.matches) setHovered(index)
              }}
              onPointerLeave={() => setHovered((current) => (current === index ? -1 : current))}
              onFocus={(event) => {
                setFocused(index)
                setFocusVisible(event.currentTarget.matches(':focus-visible'))
              }}
              onBlur={() => setFocused((current) => (current === index ? -1 : current))}
            >
              <path className="wheel__base" d={wedge} />
            </g>
          ))}
        </g>

        {/* Beneath the wedges, so it frames Motion's own edge when Motion is out (dark only) */}
        <path className="wheel__hub-edge" d={motionHubEdge} aria-hidden="true" />

        {/* Coloured wedges, scaled from the centre */}
        <g className="wheel__fills" aria-hidden="true">
          {segments.map(({ category, index, fill }) => {
            const on = isAll || category.id === selected
            const preview = !on && (hovered === index || (focused === index && focusVisible))
            return (
              <g
                key={category.id}
                className="wheel__fill"
                data-category={category.id}
                data-on={on}
                data-preview={preview}
                style={{
                  '--wedge-color': category.color,
                  '--wedge-delay': isAll ? `${index * 70}ms` : '80ms',
                }}
              >
                <path d={fill} />
                {category.id === 'motion' && (
                  <path
                    className="wheel__fill-edge"
                    d={fill}
                    clipPath={`url(#wheel-clip-${category.id})`}
                  />
                )}
              </g>
            )
          })}
        </g>

        {/* Keyboard focus outline along the wedge edge */}
        {focused !== -1 && focusVisible && (
          <path className="wheel__focus" d={segments[focused].wedge} aria-hidden="true" />
        )}

        {/* Hub colour ring (static, except Motion fades out when on in dark mode) */}
        <g className="wheel__hub" aria-hidden="true">
          {segments.map(({ category, hub }) => (
            <path
              key={category.id}
              d={hub}
              data-category={category.id}
              data-on={isAll || category.id === selected}
              style={{ '--hub-color': category.color }}
            />
          ))}
          {/* Over the ring while Motion is in, so its black base reads on the navy (dark only) */}
          <path className="wheel__hub-edge" d={motionHubEdge} data-on={isAll || selected === 'motion'} />
        </g>

        {/* Labels, inside each wedge, reading outward */}
        <g className="wheel__labels" aria-hidden="true">
          {segments.map(({ category, index, mid, flip }) => {
            const on = isAll || category.id === selected
            const preview = !on && (hovered === index || (focused === index && focusVisible))
            return (
              <text
                key={category.id}
                className="wheel__label"
                data-ink={category.ink}
                data-on={on}
                data-preview={preview}
                style={{
                  '--label-angle': `${flip ? mid + 180 : mid}deg`,
                  '--label-side': flip ? -1 : 1,
                  '--wedge-delay': isAll ? `${index * 70}ms` : '80ms',
                }}
              >
                {category.name.toUpperCase()}
              </text>
            )
          })}
        </g>
      </svg>

      <button
        type="button"
        className="wheel__all"
        aria-pressed={isAll}
        aria-label="All categories"
        onClick={() => onSelect(allCategories.id)}
      >
        <span className="wheel__all-label" aria-hidden="true">
          All
        </span>
      </button>
    </div>
  )
}
