import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SettingsDrawer from './components/SettingsDrawer.jsx'
import { useTheme } from './theme.js'
import './App.css'

export default function App() {
  const [theme, setTheme] = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="app">
      <Nav current="categories" settingsOpen={settingsOpen} onOpenSettings={() => setSettingsOpen(true)} />
      <main className="app__main" />
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
