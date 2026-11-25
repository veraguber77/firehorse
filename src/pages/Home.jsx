import { Link } from 'react-router'
import Button from '../components/Button.jsx'
import Gradient from '../components/Gradient.jsx'
import { categories, categoryVars, getCategory } from '../categories.js'
import { stages as milestones } from '../timeline.js'
import gradientHero from '../assets/home/gradient-hero.webp'
import gradientIntro from '../assets/home/gradient-intro.webp'
import gradientBeat from '../assets/home/gradient-beat.webp'
import gradientTurnA from '../assets/home/gradient-turn-a.webp'
import gradientTurnB from '../assets/home/gradient-turn-b.webp'
import gradientClosing from '../assets/home/gradient-closing.webp'
import horseHead from '../assets/home/horse-head.svg'
import iconPoster from '../assets/home/icon-poster.svg'
import iconWebApp from '../assets/home/icon-web-app.svg'
import iconMobileApp from '../assets/home/icon-mobile-app.svg'
import iconIllustration from '../assets/home/icon-illustration.svg'
import iconMotion from '../assets/home/icon-motion.svg'
import iconAll from '../assets/home/icon-all.svg'
import './Home.css'

const categoryIcons = {
  poster: iconPoster,
  'web-app': iconWebApp,
  'mobile-app': iconMobileApp,
  illustration: iconIllustration,
  motion: iconMotion,
}

// Image insets Figma puts around the two gradient sizes ([top, right, bottom, left] in %).
const WIDE_INSET = [6.86, 3.8, 7.21, 5.33]
const NARROW_INSET = [6.86, 5.74, 7.21, 5.69]

const yearBars = [
  { year: '1966', label: 'Missed It', tone: 'past' },
  { year: '2026', label: 'Your Turn', tone: 'now' },
  { year: '2086', label: 'Too Late', tone: 'future' },
]

const questions = [
  'Who can enter?',
  'Is AI allowed?',
  'When do submissions open and close?',
  'How many categories can I enter?',
  'Is there an entry fee?',
]

/** Homepage — Figma "Homepage" (light 262:4137, dark 322:9254). */
export default function Home() {
  // TODO(motion): steps advance through the four milestones. Static on step 1 for now; the
  // bars, markers and the button colour all follow this index once it cycles.
  const activeStep = 0
  const activeMilestone = milestones[activeStep]

  // TODO(motion): the reel cycles through the five category names in code.
  // Static for now, showing Web App as in Figma.
  const reelCategory = getCategory('web-app')

  return (
    <div className="home">
      {/* Hero */}
      <section className="home-hero">
        <Gradient
          src={gradientHero}
          frame={[1280, 800]}
          x={698.66}
          y={535.48}
          width={1666.886}
          height={1385.513}
          rotate={-114.46}
          inset={[14.13, 11.78, 14.47, 11.73]}
        />
        <div className="home-hero__rule" aria-hidden="true" />
        <p className="home-hero__overline">THE YEAR OF THE FIRE HORSE — 2026 DESIGN COMPETITION</p>
        <img className="home-hero__horse" src={horseHead} width="605.727" height="599.959" alt="" />

        <h1 className="home-hero__title">
          <span className="home-hero__year">2026</span> is the Year of the{' '}
          <span className="home-hero__accent">Fire Horse.</span>
        </h1>
        <p className="home-hero__subtitle">
          Five open categories. Judged by senior designers. Submissions close November 14.
        </p>
        <div className="home-hero__ctas">
          <Button color="red" href="#submit">
            Submit an Entry
          </Button>
          <Button color="cinder" className="btn-dark-cream" href="#open-categories">
            View Categories ↓
          </Button>
        </div>
      </section>

      {/* Intro beat */}
      <section className="home-beat home-beat--inferno">
        <Gradient
          src={gradientIntro}
          x={698.66}
          y={-264.52}
          width={1666.886}
          height={1385.513}
          rotate={-114.46}
          inset={NARROW_INSET}
        />
        <p className="home-beat__text">This year, Firehorse invites designers to respond.</p>
      </section>

      {/* About — once every sixty years */}
      <section className="home-about">
        <div className="home-about__headline-col">
          <h2 className="home-about__headline">
            Once every <span className="home-about__headline-accent">sixty years.</span>
          </h2>
          <p className="home-about__body">
            In the sixty-year cycle of the Chinese Zodiac, the Fire Horse returns only once. The current one
            began on February 17, 2026.
          </p>
        </div>

        <ol className="home-bars" aria-label="Fire Horse years">
          {yearBars.map((bar) => (
            <li key={bar.year} className={`home-bars__item home-bars__item--${bar.tone}`}>
              <div className="home-bars__fill">
                <span className="home-bars__year-box">
                  <span className="home-bars__year">{bar.year}</span>
                </span>
              </div>
              <span className="home-bars__label">{bar.label}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Statement band */}
      <section className="home-statement">
        <h2 className="home-statement__title">Firehorse is an open design competition across five categories.</h2>
        <p className="home-statement__text">
          Poster, Web App, Mobile App, Illustration, and Motion/Animation. AI is welcome but not required.
        </p>
        <p className="home-statement__dates">Submissions open October 1 and close November 14, 2026.</p>
      </section>

      {/* Second beat */}
      <section className="home-beat home-beat--ember">
        <Gradient
          src={gradientBeat}
          x={621.33}
          y={-9.93}
          width={1781.381}
          height={1385.513}
          rotate={37.36}
          inset={WIDE_INSET}
        />
        <p className="home-beat__text">Take control of the horse while riding into the fire.</p>
      </section>

      {/* Category reel */}
      <section className="home-reel" style={categoryVars(reelCategory)}>
        <p className="home-reel__lead">Enter with a</p>
        <div className="home-reel__window">
          <p className="home-reel__word">{reelCategory.name}</p>
        </div>
        <div className="home-reel__rule" aria-hidden="true" />
      </section>

      {/* Open categories */}
      <section id="open-categories" className="home-categories" aria-labelledby="open-categories-title">
        <div className="home-categories__header">
          <h2 id="open-categories-title" className="home-categories__overline">
            OPEN CATEGORIES
          </h2>
          <p className="home-categories__meta">5 tracks · open to all</p>
        </div>

        <ul className="home-categories__grid">
          {categories.map((category, index) => (
            <li
              key={category.id}
              className={`home-card ${index < 3 ? 'home-card--third' : 'home-card--half'}`}
              data-category={category.id}
              data-ink={category.ink}
              style={categoryVars(category)}
            >
              <Link className="home-card__link" to={`/categories?category=${category.id}`}>
                <span className="home-card__icon">
                  <img src={categoryIcons[category.id]} width="24" height="24" alt="" />
                </span>
                <span className="home-card__text">
                  <span className="home-card__title">{category.briefName ?? category.name}</span>
                  <span className="home-card__tagline">{category.tagline}</span>
                </span>
                <span className="home-card__more">Learn more →</span>
              </Link>
            </li>
          ))}
          <li className="home-card home-card--wide">
            <Link className="home-card__link" to="/categories?category=all">
              <span className="home-card__left">
                <span className="home-card__icon">
                  <img src={iconAll} width="24" height="24" alt="" />
                </span>
                <span className="home-card__text">
                  <span className="home-card__title">View all categories</span>
                  <span className="home-card__tagline">
                    Compare the full briefs, specs and judging for all five categories.
                  </span>
                </span>
              </span>
              <span className="home-card__more">See all briefs →</span>
            </Link>
          </li>
        </ul>
      </section>

      {/* Your turn */}
      <section className="home-beat home-beat--blaze">
        <Gradient
          src={gradientTurnA}
          x={540.79}
          y={105.05}
          width={1781.381}
          height={1385.513}
          rotate={53.37}
          inset={WIDE_INSET}
        />
        <Gradient
          src={gradientTurnB}
          x={1367.32}
          y={648.7}
          width={1781.385}
          height={1385.513}
          rotate={-139.63}
          inset={WIDE_INSET}
        />
        <p className="home-beat__text">Your turn.</p>
      </section>

      {/* Timeline teaser */}
      <section className="home-timeline" aria-labelledby="home-timeline-title">
        <div className="home-timeline__progress">
          <p className="home-timeline__overline">TIMELINE — STEP 1 OF 4</p>
          <div className="home-timeline__bars" aria-hidden="true">
            {milestones.map((milestone, index) => (
              <span
                key={milestone.id}
                className="home-timeline__bar"
                data-active={index === activeStep}
                style={{ '--milestone-color': milestone.color }}
              />
            ))}
          </div>
        </div>

        <div className="home-timeline__detail">
          <div className="home-timeline__text">
            <p className="home-timeline__date">Oct 1, 2026</p>
            <h2 id="home-timeline-title" className="home-timeline__title">
              Submissions Open
            </h2>
            <p className="home-timeline__body">
              The competition opens to all entrants worldwide. Create your account, read the brief, and start
              working. Entry is free.
            </p>
            <Button color={activeMilestone.buttonColor} className="home-timeline__button" to="/timeline">
              See the full timeline →
            </Button>
          </div>
          <p className="home-timeline__number" aria-hidden="true">
            01
          </p>
        </div>

        <ul className="home-timeline__milestones">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.id}
              className="home-timeline__milestone"
              data-active={index === activeStep}
              style={{ '--milestone-color': milestone.color }}
            >
              <span className="home-timeline__marker" aria-hidden="true" />
              {milestone.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Closing tagline */}
      <section className="home-beat home-beat--afterglow">
        <Gradient
          src={gradientClosing}
          x={543.72}
          y={302.76}
          width={1666.886}
          height={1385.513}
          rotate={-29.26}
          inset={NARROW_INSET}
        />
        <p className="home-beat__text">Let your flame run wild.</p>
      </section>

      {/* FAQ teaser */}
      <section className="home-faq" aria-labelledby="home-faq-title">
        <div className="home-faq__list-col">
          <h2 id="home-faq-title" className="home-faq__title">
            Questions?
          </h2>
          {/* Static: question 1 shown as selected, as in Figma. */}
          <ol className="home-faq__list">
            {questions.map((question, index) => (
              <li key={question} className="home-faq__question" data-selected={index === 0}>
                <span className="home-faq__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="home-faq__question-text">{question}</span>
              </li>
            ))}
          </ol>
          <Button color="red" className="home-faq__all btn-dark-cream" to="/faq">
            See all questions
          </Button>
        </div>

        <div className="home-faq__card">
          <p className="home-faq__card-number" aria-hidden="true">
            01
          </p>
          <div className="home-faq__answer">
            <h3 className="home-faq__answer-question">Who can enter?</h3>
            <p className="home-faq__answer-text">The competition is open to designers worldwide.</p>
          </div>
          <div className="home-faq__card-footer">
            <p className="home-faq__card-prompt">Still wondering?</p>
            {/* TODO(ai-assistant): opens the Ask Firehorse AI assistant. */}
            <Button color="cinder">Ask Firehorse</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
