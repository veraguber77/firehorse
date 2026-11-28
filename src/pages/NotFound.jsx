import Button from '../components/Button.jsx'
import Gradient from '../components/Gradient.jsx'
import gradientArt from '../assets/not-found/gradient.webp'
import embers from '../assets/not-found/embers.svg'
import './NotFound.css'

/*
 * Figma "404 Page", light (453:1839) and dark (453:1878). Both themes share the art: a
 * gradient rising from the bottom right and a scatter of embers. Figma's frame is 1280 × 800
 * with the nav; this section is the 728px below it, so Figma y values are 72 less here.
 */
const FRAME = [1280, 728]

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <Gradient
        src={gradientArt}
        frame={FRAME}
        x={926.34}
        y={496.39}
        width={1033.363}
        height={858.93}
        rotate={-70.99}
        inset={[11.32, 9.45, 11.66, 9.4]}
      />
      {/* The embers sit in the same frame as the gradient, so the two stay together. */}
      <div className="gradient not-found__embers" aria-hidden="true">
        <div className="gradient__frame" style={{ '--frame-w': FRAME[0], '--frame-h': FRAME[1] }}>
          <img src={embers} width="1280" height="800" alt="" />
        </div>
      </div>

      <div className="not-found__content">
        <p className="not-found__overline">Error 404</p>
        <h1 id="not-found-title" className="not-found__title">
          This page <span className="not-found__title-accent">burnt out.</span>
        </h1>
        <p className="not-found__text">
          Nothing left here but embers. The rest of the site is still very much on fire.
        </p>
        <div className="not-found__actions">
          <Button color="red" to="/">
            Back home
          </Button>
          <Button color="cinder" className="btn-dark-cream" to="/categories">
            See the categories
          </Button>
        </div>
      </div>
    </section>
  )
}
