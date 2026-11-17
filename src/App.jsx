import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

// Temporary until the settings drawer exists.
function toggleTheme() {
  const root = document.documentElement
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
  root.dataset.theme = next
  try {
    localStorage.setItem('firehorse-theme', next)
  } catch {
    // Storage unavailable — theme still applies for this page view.
  }
}

export default function App() {
  return (
    <div className="app">
      <Nav current="categories" />
      <main className="app__main">
        <button type="button" onClick={toggleTheme}>
          Toggle theme (temporary)
        </button>
      </main>
      <Footer />
    </div>
  )
}
