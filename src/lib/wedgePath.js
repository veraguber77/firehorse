/**
 * SVG path helpers for the Categories wheel. Angles are in degrees, measured
 * the SVG way: 0° points right and positive angles turn clockwise (down), so
 * -90° is straight up and +90° straight down.
 */

const round = (value) => Math.round(value * 100) / 100

/** Point at radius `r` and angle `deg` around (cx, cy), as [x, y]. */
export function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180
  return [round(cx + r * Math.cos(rad)), round(cy + r * Math.sin(rad))]
}

/**
 * `d` string for an annular sector (a wedge of a ring) between radii r1 < r2
 * and angles a0 < a1. Used for the wedges, the hub ring segments and the hit areas.
 */
export function wedgePath(cx, cy, r1, r2, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0
  const [ox0, oy0] = polar(cx, cy, r2, a0)
  const [ox1, oy1] = polar(cx, cy, r2, a1)
  const [ix1, iy1] = polar(cx, cy, r1, a1)
  const [ix0, iy0] = polar(cx, cy, r1, a0)
  return [
    `M${ox0} ${oy0}`,
    `A${r2} ${r2} 0 ${large} 1 ${ox1} ${oy1}`,
    `L${ix1} ${iy1}`,
    `A${r1} ${r1} 0 ${large} 0 ${ix0} ${iy0}`,
    'Z',
  ].join(' ')
}

/** `d` string for an open arc of radius r from a0 to a1 (for stroked bands). */
export function arcPath(cx, cy, r, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1}`
}
