import './Gradient.css'
import GradientArt from './GradientArt.jsx'

/**
 * A Figma gradient layer: the exported art, rotated and flipped, behind a section.
 *
 * Figma gives each one as a rotated box inside a bounding frame. Pass the box's
 * centre (`x`, `y`, measured in the Figma section frame `frame` = [width, height]),
 * its size before rotation, the rotation, and the image inset Figma puts around the
 * art ([top, right, bottom, left] in %).
 *
 * The Figma frame stays centred in the section at its Figma size, growing only
 * to match a wider section. The art runs past the frame, so taller sections
 * show more of it instead of zooming in. `lazy` is for sections below the first screen.
 */
export default function Gradient({ src, frame = [1280, 600], x, y, width, height, rotate, inset, flip = true, lazy = false }) {
  const [frameWidth, frameHeight] = frame
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
          <GradientArt src={src} inset={inset} lazy={lazy} />
        </div>
      </div>
    </div>
  )
}
