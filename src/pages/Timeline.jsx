import { Link } from 'react-router'
import Gradient from '../components/Gradient.jsx'
import { stages } from '../timeline.js'
import gradientIntroA from '../assets/timeline/gradient-intro-a.svg'
import gradientIntroB from '../assets/timeline/gradient-intro-b.svg'
import gradientClosing from '../assets/home/gradient-closing.svg'
import './Timeline.css'

/** Timeline page — Figma "Timeline Page" (light 262:4250, dark 322:9420). Desktop only for now. */
export default function Timeline() {
  return (
    <div className="timeline">
      {/* Intro */}
      <section className="timeline-intro" aria-labelledby="timeline-title">
        <Gradient
          src={gradientIntroA}
          frame={[1280, 800]}
          x={611.11}
          y={585.77}
          width={1491.889}
          height={799.291}
          rotate={13.04}
          inset={[12.16, 4.58, 12.51, 6.45]}
        />
        <Gradient
          src={gradientIntroB}
          frame={[1280, 800]}
          x={1166.48}
          y={727.67}
          width={1666.886}
          height={1385.513}
          rotate={-141.58}
          inset={[6.86, 5.74, 7.21, 5.69]}
        />

        <div className="timeline-intro__rail">
          <h1 id="timeline-title" className="timeline-intro__title">
            <span className="timeline-intro__title-the">The</span>{' '}
            <span className="timeline-intro__title-accent">timeline</span>
          </h1>
        </div>

        <div className="timeline-intro__content">
          <p className="timeline-intro__lede">
            Firehorse runs in four stages. Submissions are open now and close on November 14, 2026. Judging and
            the winners’ reveal follow.
          </p>
          {/* Stage tickets: body on the left, coloured date stub on the right. */}
          <ol className="timeline-intro__list">
            {stages.map((stage, index) => (
              <li key={stage.id}>
                <a
                  className="timeline-ticket"
                  href={`#stage-${stage.id}`}
                  data-ink={stage.ink}
                  style={{ '--ticket-color': stage.color }}
                >
                  <span className="timeline-ticket__body">
                    <span className="timeline-ticket__stage">STAGE {String(index + 1).padStart(2, '0')}</span>
                    <span className="timeline-ticket__name">{stage.name}</span>
                  </span>
                  <span className="timeline-ticket__date">{stage.listDate}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One band per stage. TODO(motion): the rail could stick and advance as the bands scroll by. */}
      {stages.map((stage) => (
        <section
          key={stage.id}
          id={`stage-${stage.id}`}
          className="timeline-stage"
          data-ink={stage.ink}
          style={{ '--stage-color': stage.color, '--stage-color-hover': stage.hoverColor }}
          aria-labelledby={`stage-${stage.id}-title`}
        >
          <ol className="timeline-stage__rail" aria-label="Stages">
            {stages.map((railStage) => (
              <li
                key={railStage.id}
                className="timeline-stage__rail-item"
                aria-current={railStage.id === stage.id ? 'step' : undefined}
              >
                {railStage.name}
              </li>
            ))}
          </ol>

          <div className="timeline-stage__content">
            <p className="timeline-stage__date">{stage.date}</p>
            <h2 id={`stage-${stage.id}-title`} className="timeline-stage__title">
              {stage.title}
            </h2>
            <p className="timeline-stage__body">{stage.body}</p>
            {stage.cta && (
              <a
                className={`timeline-stage__button button button--on-section${stage.ink === 'cream' ? ' button--on-dark' : ''}`}
                href={stage.cta.href}
              >
                {stage.cta.label}
              </a>
            )}
          </div>
        </section>
      ))}

      {/* Closing tagline */}
      <section className="timeline-closing">
        <Gradient
          src={gradientClosing}
          x={543.72}
          y={302.76}
          width={1666.886}
          height={1385.513}
          rotate={-29.26}
          inset={[6.86, 5.74, 7.21, 5.69]}
        />
        <p className="timeline-closing__title">Let your flame run wild.</p>
        <p className="timeline-closing__text">Submissions close November 14, 2026.</p>
        <div className="timeline-closing__buttons">
          <a className="timeline-closing__button timeline-closing__button--solid" href="#submit">
            Submit an Entry
          </a>
          <Link className="timeline-closing__button timeline-closing__button--outline" to="/faq">
            Read the FAQ
          </Link>
        </div>
      </section>
    </div>
  )
}
