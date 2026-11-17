import { useCallback, useState } from 'react'

const STORAGE_KEY = 'firehorse-theme'

/**
 * Light/dark theme state. The initial value is whatever the inline script in
 * index.html put on <html data-theme> (saved choice, else system preference).
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  const setTheme = useCallback((next) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable — the theme still applies for this page view.
    }
    setThemeState(next)
  }, [])

  return [theme, setTheme]
}
