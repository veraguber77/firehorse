import { useRef } from 'react'
import './GradientArt.css'
import { useNearScreen } from '../lib/useNearScreen.js'

/**
 * The picture inside a gradient layer. The Figma SVGs (kept next to each .webp in src/assets)
 * stack five blurs and two noise filters, which is slow to draw while scrolling. So the colours
 * are baked to a half-size WebP without grain, and the grain is one shared tile on top.
 * After changing a gradient SVG, its .webp has to be baked again.
 *
 * `inset` is how far the art runs past its layer: [top, right, bottom, left] in %.
 * `lazy`, for sections below the first screen, downloads it after everything on that screen.
 */
export default function GradientArt({ src, inset, lazy = false }) {
  const [top, right, bottom, left] = inset
  const ref = useRef(null)
  const ready = useNearScreen(ref, lazy)
  return (
    <span
      ref={ref}
      className="gradient-art"
      style={{
        top: `-${top}%`,
        left: `-${left}%`,
        width: `${100 + left + right}%`,
        height: `${100 + top + bottom}%`,
        '--art': ready ? `url("${src}")` : undefined,
      }}
    >
      {ready && (
        <>
          <img src={src} alt="" decoding="async" />
          <span className="gradient-art__grain" />
        </>
      )}
    </span>
  )
}
