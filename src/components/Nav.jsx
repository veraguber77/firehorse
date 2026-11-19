import { Link } from 'react-router'
import './Nav.css'
import { navLinks } from '../routes.js'
import logoForLight from '../assets/logo-red-dark.png'
import logoForDark from '../assets/logo-red-light.png'
import gearForLight from '../assets/gear-dark.svg'
import gearForDark from '../assets/gear-light.svg'

/**
 * Site nav — Figma component "Nav" (262:4567 light, 322:10208 dark).
 * `current` marks the active page link: 'home' | 'categories' | 'timeline' | 'faq'.
 */
export default function Nav({ current = 'home', onOpenSettings, settingsOpen = false }) {
  return (
    <header className="nav">
      <Link className="nav__logo" to="/" aria-label="Firehorse — home">
        <img className="nav__logo-img theme-light-only" src={logoForLight} alt="" />
        <img className="nav__logo-img theme-dark-only" src={logoForDark} alt="" />
      </Link>

      <nav className="nav__links" aria-label="Main">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            className="nav__link"
            to={link.path}
            aria-current={current === link.id ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="nav__button nav__button--settings button button--secondary"
        onClick={onOpenSettings}
        aria-haspopup="dialog"
        aria-expanded={settingsOpen}
      >
        <img className="theme-light-only" src={gearForLight} width="16" height="16" alt="" />
        <img className="theme-dark-only" src={gearForDark} width="16" height="16" alt="" />
        Settings
      </button>

      <a className="nav__button nav__button--submit button" href="#submit">
        Submit
      </a>
    </header>
  )
}
