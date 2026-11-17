import './Gradient.css'

/**
 * A Figma gradient layer: an exported SVG, rotated and flipped, behind a section.
 *
 * Figma gives each one as a rotated box inside a bounding frame. Pass the box's
 * centre (`x`, `y`, measured in the 1280px-wide Figma frame), its size before
 * rotation, the rotation, and the image inset Figma puts around the SVG
 * ([top, right, bottom, left] in %). The centre is kept relative to the middle of
 * the section, so wider windows open up evenly on both sides.
 */
export default function Gradient({ src, x, y, width, height, rotate, inset, flip = true }) {
  const [top, right, bottom, left] = inset
  return (
    <div
      className="gradient"
      aria-hidden="true"
      style={{
        '--gradient-x': `${x - 640}px`,
        '--gradient-y': `${y}px`,
        '--gradient-w': `${width}px`,
        '--gradient-h': `${height}px`,
        '--gradient-rotate': `${rotate}deg`,
        '--gradient-flip': flip ? -1 : 1,
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          top: `-${top}%`,
          left: `-${left}%`,
          width: `${100 + left + right}%`,
          height: `${100 + top + bottom}%`,
        }}
      />
    </div>
  )
}
