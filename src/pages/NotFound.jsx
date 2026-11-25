import Button from '../components/Button.jsx'
import Gradient from '../components/Gradient.jsx'
import gradientHeader from '../assets/faq/gradient.webp'
import './NotFound.css'

/** Any unknown address. Not in Figma: the FAQ header's layout and gradient, with ways back. */
export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <Gradient
        src={gradientHeader}
        frame={[1280, 613]}
        x={851.39}
        y={506.43}
        width={1781.383}
        height={1385.513}
        rotate={-136.22}
        inset={[6.86, 3.8, 7.21, 5.33]}
      />
      <h1 id="not-found-title" className="not-found__title">
        Page <span className="not-found__title-accent">not found.</span>
      </h1>
      <p className="not-found__text">This page doesn’t exist, or it has moved.</p>
      <div className="not-found__actions">
        <Button color="red" to="/">
          Back to home
        </Button>
        <Button color="cinder" className="btn-dark-cream" to="/categories">
          View categories
        </Button>
      </div>
    </section>
  )
}
