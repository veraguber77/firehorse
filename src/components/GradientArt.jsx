import './GradientArt.css'

/**
 * The picture inside a gradient layer. The Figma SVGs (kept next to each .webp in src/assets)
 * stack five blurs and two noise filters, which is slow to draw while scrolling. So the colours
 * are baked to a half-size WebP without grain, and the grain is one shared tile on top.
 * After changing a gradient SVG, its .webp has to be baked again.
 *
 * `inset` is how far the art runs past its layer: [top, right, bottom, left] in %.
 */
export default function GradientArt({ src, inset }) {
  const [top, right, bottom, left] = inset
  return (
    <span
      className="gradient-art"
      style={{
        top: `-${top}%`,
        left: `-${left}%`,
        width: `${100 + left + right}%`,
        height: `${100 + top + bottom}%`,
        '--art': `url("${src}")`,
      }}
    >
      <img src={src} alt="" decoding="async" />
      <span className="gradient-art__grain" />
    </span>
  )
}
