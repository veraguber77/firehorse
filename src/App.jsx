import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SettingsDrawer from './components/SettingsDrawer.jsx'
import NotFound from './pages/NotFound.jsx'
import { routes } from './routes.js'
import { useTheme } from './theme.js'
import './App.css'

export default function App() {
  const [theme, setTheme] = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const drawerOpener = useRef(null)
  const { pathname } = useLocation()

  // Trailing slashes shouldn't stop a link from being marked current.
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const activeRoute = routes.find((route) => route.path === normalizedPath)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = activeRoute && activeRoute.id !== 'home' ? `${activeRoute.label} — Firehorse` : 'Firehorse'
  }, [activeRoute])

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

  return (
    <div className="app">
      <Nav
        current={activeRoute?.id}
        settingsOpen={settingsOpen}
        onOpenSettings={openDrawer}
      />
      <main className="app__main">
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
        theme={theme}
        onThemeChange={setTheme}
      />
    </div>
  )
}
