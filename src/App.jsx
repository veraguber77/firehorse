// Temporary smoke test for tokens + fonts. Replaced by the real layout
// once the nav, footer and settings drawer are built.
const swatches = [
  '--background-secondary',
  '--surface-default',
  '--surface-elevated',
  '--accent-primary',
  '--accent-secondary',
  '--accent-tertiary',
]

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
    <main style={{ padding: 'var(--spacing-48)', display: 'grid', gap: 'var(--spacing-24)' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 72, lineHeight: 1, color: 'var(--text-brand-primary)' }}>
        Firehorse
      </p>
      <h2 style={{ fontWeight: 700, fontSize: 32 }}>ITC Avant Garde Gothic Pro — headings and buttons</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 560 }}>
        Neue Haas Grotesk Text Pro — body and UI. If all three lines look distinct, the Adobe Fonts
        project is loading correctly.
      </p>
      <div style={{ display: 'flex', gap: 'var(--spacing-12)' }}>
        {swatches.map((token) => (
          <div
            key={token}
            title={token}
            style={{
              width: 64,
              height: 64,
              background: `var(${token})`,
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
            }}
          />
        ))}
      </div>
      <button
        onClick={toggleTheme}
        style={{
          justifySelf: 'start',
          padding: 'var(--spacing-12) var(--spacing-24)',
          background: 'var(--accent-primary)',
          color: 'var(--text-on-accent)',
          border: 0,
          borderRadius: 'var(--radius-sm)',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Toggle theme
      </button>
    </main>
  )
}
