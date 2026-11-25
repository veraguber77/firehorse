import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button.jsx'
import Gradient from '../components/Gradient.jsx'
import SectionNav from '../components/SectionNav.jsx'
import { stages } from '../timeline.js'
import gradientIntroA from '../assets/timeline/gradient-intro-a.webp'
import gradientIntroB from '../assets/timeline/gradient-intro-b.webp'
import gradientClosing from '../assets/home/gradient-closing.webp'
// Inlined (not an <img>) so the mane can take its colour from CSS via currentColor.
import horseHead from '../assets/horse-head-timeline.svg?raw'
import './Timeline.css'

/** Timeline page — Figma "Timeline Page" (light 262:4250, dark 322:9420). */
export default function Timeline() {
  // The stage band under the middle of the viewport; the stage nav highlights it.
  const [activeId, setActiveId] = useState(stages[0].id)
  const activeStage = stages.find((stage) => stage.id === activeId) ?? stages[0]
  const bandRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id.replace('stage-', ''))
        }
      },
      // A 0px-tall line across the middle of the viewport: the band crossing it is active.
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const node of Object.values(bandRefs.current)) {
      if (node) observer.observe(node)
    }
    return () => observer.disconnect()
  }, [])

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

        {/* Figma "Graphic — Horse head / Dark blue / Dark" (431:1839). */}
        <div className="timeline-intro__horse" aria-hidden="true" dangerouslySetInnerHTML={{ __html: horseHead }} />

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

      {/* One band per stage, with one rail that sticks on the left (a chip bar on top of the
          screen below 1024px) while the bands scroll by. */}
      <div className="timeline-stages">
        <SectionNav
          className="timeline-rail"
          label="Stages"
          items={stages}
          hrefFor={(id) => `#stage-${id}`}
          currentId={activeStage.id}
          currentToken="step"
          data-ink={activeStage.ink}
        />

        {stages.map((stage) => (
          <section
            key={stage.id}
            id={`stage-${stage.id}`}
            ref={(node) => {
              bandRefs.current[stage.id] = node
            }}
            className="timeline-stage"
            data-ink={stage.ink}
            style={{ '--stage-color': stage.color }}
            aria-labelledby={`stage-${stage.id}-title`}
          >
            <div className="timeline-stage__content">
              <p className="timeline-stage__date">{stage.date}</p>
              <h2 id={`stage-${stage.id}-title`} className="timeline-stage__title">
                {stage.title}
              </h2>
              <p className="timeline-stage__body">{stage.body}</p>
              {stage.cta && (
                <Button color="cinder" href={stage.cta.href}>
                  {stage.cta.label}
                </Button>
              )}
            </div>
          </section>
        ))}
      </div>

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
      </section>
    </div>
  )
}
