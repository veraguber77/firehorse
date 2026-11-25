import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SettingsDrawer from './components/SettingsDrawer.jsx'
import { usePageMeta } from './lib/usePageMeta.js'
import NotFound from './pages/NotFound.jsx'
import { notFoundMeta, pageMeta } from './pageMeta.js'
import { routes } from './routes.js'
import { useTheme } from './theme.js'
import './App.css'

export default function App() {
  const [theme, setTheme] = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const drawerOpener = useRef(null)
  const mainRef = useRef(null)
  const { pathname } = useLocation()

  // Trailing slashes shouldn't stop a link from being marked current.
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const activeRoute = routes.find((route) => route.path === normalizedPath)
  const meta = activeRoute ? pageMeta[activeRoute.id] : notFoundMeta

  const shownMeta = useRef(meta)

  usePageMeta(meta)

  // New page: start at the top (or at the #section in the address). After the first one,
  // keyboard and screen reader users continue from the new page's content, and its title is read out.
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const section = hash && document.getElementById(hash)
    if (section) section.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })

    if (shownMeta.current === meta) return
    shownMeta.current = meta
    mainRef.current.focus({ preventScroll: true })
    setAnnouncement(meta.title)
  }, [meta])

  // Settings on wide screens, the menu below 1024px: one drawer, two openers.
  function openDrawer(event) {
    drawerOpener.current = event.currentTarget
    setSettingsOpen(true)
  }

  function closeDrawer() {
    setSettingsOpen(false)
    // <dialog> restores focus itself, except where a click doesn't focus a button (Safari).
    drawerOpener.current?.focus({ preventScroll: true })
  }

  // A page link in the menu: focus goes to the new page instead of back to the menu button.
  function followDrawerLink() {
    drawerOpener.current = null
    setSettingsOpen(false)
  }

  function skipToContent(event) {
    event.preventDefault()
    mainRef.current.focus()
    mainRef.current.scrollIntoView({ behavior: 'instant' })
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={skipToContent}>
        Skip to content
      </a>
      <Nav
        current={activeRoute?.id}
        settingsOpen={settingsOpen}
        onOpenSettings={openDrawer}
      />
      <main ref={mainRef} id="main" className="app__main" tabIndex={-1}>
        <Routes>
          {routes.map(({ id, path, Component }) => (
            <Route key={id} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SettingsDrawer
        open={settingsOpen}
        current={activeRoute?.id}
        onClose={closeDrawer}
        onNavigate={followDrawerLink}
        theme={theme}
        onThemeChange={setTheme}
      />
      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
