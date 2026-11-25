import { useEffect, useState } from 'react'

/** Runs the callback once the page has loaded and the browser has nothing more urgent to do. */
function afterLoad(callback) {
  const idle = () => (window.requestIdleCallback ?? ((run) => setTimeout(run, 500)))(callback)
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
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
