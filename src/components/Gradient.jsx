import './Gradient.css'

/**
 * A Figma gradient layer: an exported SVG, rotated and flipped, behind a section.
 *
 * Figma gives each one as a rotated box inside a bounding frame. Pass the box's
 * centre (`x`, `y`, measured in the Figma section frame `frame` = [width, height]),
 * its size before rotation, the rotation, and the image inset Figma puts around the
 * SVG ([top, right, bottom, left] in %).
 *
 * The Figma frame is scaled to cover the section, like `background-size: cover`,
 * so the composition holds when the section is taller or wider than in Figma.
 */
export default function Gradient({ src, frame = [1280, 600], x, y, width, height, rotate, inset, flip = true }) {
  const [frameWidth, frameHeight] = frame
  const [top, right, bottom, left] = inset
  return (
    <div className="gradient" aria-hidden="true">
      <div
        className="gradient__frame"
        style={{ '--frame-w': frameWidth, '--frame-h': frameHeight }}
      >
        <div
          className="gradient__layer"
          style={{
            '--layer-x': x,
            '--layer-y': y,
            '--layer-w': width,
            '--layer-h': height,
            '--layer-rotate': `${rotate}deg`,
            '--layer-flip': flip ? -1 : 1,
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
      </div>
    </div>
  )
}
