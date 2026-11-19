import { Link } from 'react-router'
import './Footer.css'
import logoForLight from '../assets/logo-sky-blue-dark.png'
import logoForDark from '../assets/logo-deep-blue-light.png'

const columns = [
  {
    title: 'Competition',
    links: [
      { label: 'Categories', to: '/categories' },
      { label: 'Timeline', to: '/timeline' },
      { label: 'Prizes', href: '#prizes' },
      { label: 'Judges', href: '#judges' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'About', href: '#about' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Past Winners', href: '#past-winners' },
      { label: 'Press', href: '#press' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: '#instagram' },
      { label: 'LinkedIn', href: '#linkedin' },
    ],
  },
]

/** Site footer — Figma "Footer / Light" (294:1177) and "Footer / Dark" (336:662). */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__cta">
          <h2 className="footer__cta-title">Ready to enter?</h2>
          <p className="footer__cta-text">
            Submissions close November 14, 2026 at 11:59 PM PT. Free to enter, open to everyone.
          </p>
          <a className="footer__cta-button button" href="#submit">
            Submit an Entry
          </a>
        </div>

        <div className="footer__columns">
          {columns.map((column) => (
            <nav key={column.title} className="footer__column" aria-label={column.title}>
              <h3 className="footer__column-title">{column.title}</h3>
              <ul className="footer__list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link className="footer__link" to={link.to}>
                        {link.label}
                      </Link>
                    ) : (
                      <a className="footer__link" href={link.href}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer__bar">
        <div className="footer__logo">
          <img className="footer__logo-img theme-light-only" src={logoForLight} alt="Firehorse" />
          <img className="footer__logo-img theme-dark-only" src={logoForDark} alt="Firehorse" />
        </div>
        <p className="footer__copyright">
          © 2026 Firehorse Design Competition. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
