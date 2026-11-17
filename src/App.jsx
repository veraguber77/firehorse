import Nav from './components/Nav.jsx'

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
    <>
      <Nav current="categories" />
      <main style={{ padding: 'var(--spacing-64)' }}>
        <button type="button" onClick={toggleTheme}>
          Toggle theme (temporary)
        </button>
      </main>
    </>
  )
}
