import './Nav.css'
import logoForLight from '../assets/logo-red-dark.png'
import logoForDark from '../assets/logo-red-light.png'
import gearForLight from '../assets/gear-dark.svg'
import gearForDark from '../assets/gear-light.svg'

const links = [
  { id: 'categories', label: 'Categories', href: '#categories' },
  { id: 'timeline', label: 'Timeline', href: '#timeline' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
]

/**
 * Site nav — Figma component "Nav" (262:4567 light, 322:10208 dark).
 * `current` marks the active page link: 'home' | 'categories' | 'timeline' | 'faq'.
 */
export default function Nav({ current = 'home', onOpenSettings, settingsOpen = false }) {
  return (
    <header className="nav">
      <a className="nav__logo" href="#" aria-label="Firehorse — home">
        <img className="nav__logo-img theme-light-only" src={logoForLight} alt="" />
        <img className="nav__logo-img theme-dark-only" src={logoForDark} alt="" />
      </a>

      <nav className="nav__links" aria-label="Main">
        {links.map((link) => (
          <a
            key={link.id}
            className="nav__link"
            href={link.href}
            aria-current={current === link.id ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="nav__button nav__button--settings"
        onClick={onOpenSettings}
        aria-haspopup="dialog"
        aria-expanded={settingsOpen}
      >
        <img className="theme-light-only" src={gearForLight} width="16" height="16" alt="" />
        <img className="theme-dark-only" src={gearForDark} width="16" height="16" alt="" />
        Settings
      </button>

      <a className="nav__button nav__button--submit" href="#submit">
        Submit
      </a>
    </header>
  )
}
