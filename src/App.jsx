import { useEffect, useState } from 'react'
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
  const { pathname } = useLocation()

  // Trailing slashes shouldn't stop a link from being marked current.
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const activeRoute = routes.find((route) => route.path === normalizedPath)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = activeRoute && activeRoute.id !== 'home' ? `${activeRoute.label} — Firehorse` : 'Firehorse'
  }, [activeRoute])

  return (
    <div className="app">
      <Nav
        current={activeRoute?.id}
        settingsOpen={settingsOpen}
        onOpenSettings={() => setSettingsOpen(true)}
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
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />
    </div>
  )
}
