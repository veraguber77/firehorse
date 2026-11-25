import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button.jsx'
import Gradient from '../components/Gradient.jsx'
import SectionNav from '../components/SectionNav.jsx'
import { faqTopics } from '../faq.js'
import gradientHeader from '../assets/faq/gradient.webp'
import './Faq.css'

// A topic becomes current once its top is this close to where an index link lands it
// (its scroll-margin in Faq.css, which is larger below 1024px, under the chip bar).
const CURRENT_REACH = 64

/** FAQ page — Figma "FAQ Page" (light 262:4326, dark 322:9511). */
export default function Faq() {
  // The topic being read; the topic nav highlights it.
  const [currentId, setCurrentId] = useState(faqTopics[0].id)
  const sectionRefs = useRef({})

  useEffect(() => {
    function update() {
      let next = faqTopics[0].id
      const margin = parseFloat(getComputedStyle(sectionRefs.current[next]).scrollMarginTop)
      for (const { id } of faqTopics) {
        if (sectionRefs.current[id]?.getBoundingClientRect().top <= margin + CURRENT_REACH) next = id
      }
      // On tall screens the page can run out of scroll before the last topic reaches the line.
      const { scrollHeight } = document.documentElement
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= scrollHeight - 2) next = faqTopics.at(-1).id
      setCurrentId(next)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="faq">
      <header className="faq-header">
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
        <h1 className="faq-header__title">Everything people ask us.</h1>
        <div className="faq-header__intro">
          <p className="faq-header__lede">
            Read the questions other designers have asked. Still wondering about something? Start a chat with the
            Firehorse assistant.
          </p>
          {/* TODO(ai-assistant): opens the Firehorse assistant chat. */}
          <Button color="red" className="faq-header__button">
            Start a chat
          </Button>
        </div>
      </header>

      <div className="faq-body">
        {/* The index sticks within this row only, so it stops above the closing block. */}
        <div className="faq-topics">
          <SectionNav
            className="faq-index"
            label="FAQ topics"
            items={faqTopics}
            hrefFor={(id) => `#${id}`}
            currentId={currentId}
          />

          <div className="faq-transcript">
            {faqTopics.map(({ id, name, items }) => (
              <section
                key={id}
                id={id}
                ref={(node) => {
                  sectionRefs.current[id] = node
                }}
                className="faq-topic"
                aria-labelledby={`${id}-title`}
              >
                <h2 id={`${id}-title`} className="faq-topic__title">
                  <span className="faq-topic__title-text">{name}</span>
                </h2>
                {items.map(({ question, answer }) => (
                  <div key={question} className="faq-exchange">
                    <div className="faq-message faq-message--you">
                      <p className="faq-message__from">You</p>
                      <h3 className="faq-message__bubble">{question}</h3>
                    </div>
                    <div className="faq-message">
                      <p className="faq-message__from">Firehorse</p>
                      <p className="faq-message__bubble">{answer}</p>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>

        <section className="faq-closing" aria-labelledby="faq-closing-title">
          <div className="faq-closing__text">
            <h2 id="faq-closing-title" className="faq-closing__title">
              <span className="faq-closing__title-text">Still have a question?</span>
            </h2>
            <p className="faq-closing__note">
              Chat with the Firehorse assistant. It answers from the competition rules and FAQ, and only talks
              Firehorse.
            </p>
          </div>
          {/* TODO(ai-assistant): opens the chat, which replaces this block (Figma 262:4393 / 322:10502). */}
          <Button color="cinder" className="faq-closing__button">
            Start a chat
          </Button>
        </section>
      </div>
    </div>
  )
}
