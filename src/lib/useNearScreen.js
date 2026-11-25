import { useEffect, useState } from 'react'

/** Runs the callback a moment after the page and its fonts have loaded, when the browser is idle. */
function afterLoad(callback) {
  const idle = () => (window.requestIdleCallback ?? setTimeout)(callback)
  // The brand fonts' own promise (index.html), but never stuck behind a slow font server.
  const fonts = Promise.race([window.brandFonts, new Promise((done) => setTimeout(done, 6000))])
  const settled = () => fonts.then(() => setTimeout(idle, 1000))
  if (document.readyState === 'complete') settled()
  else window.addEventListener('load', settled, { once: true })
}

/**
 * For art further down the page: false at first, so it doesn't compete with what's on screen.
 * Turns true when the element is about to be scrolled to, or after the page has loaded,
 * whichever comes first, so a fast scroll still finds it there. Pass enabled = false to skip
 * the wait.
 */
export function useNearScreen(ref, enabled) {
  const [near, setNear] = useState(!enabled)

  useEffect(() => {
    if (near) return
    let stopped = false
    const show = () => !stopped && setNear(true)
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && show())
    observer.observe(ref.current)
    afterLoad(show)
    return () => {
      stopped = true
      observer.disconnect()
    }
  }, [near, ref])

  return near
}
