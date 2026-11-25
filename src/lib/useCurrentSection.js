import { useEffect, useState } from 'react'

/**
 * The id of the section being read, worked out from where the sections are on screen (so it
 * is right after any kind of jump, not only after scrolling past each one).
 *
 * The current section is the last one whose top has passed a line across the screen:
 * `line(firstSection)` gives that line in px from the top of the viewport. At the very bottom
 * of the page it is the last section, even if the page ran out of scroll before the line.
 *
 * `ids` and `line` must be constants (defined outside the component); `prefix` is put before
 * an id to get the section element's own id.
 */
export function useCurrentSection(ids, line, prefix = '') {
  const [currentId, setCurrentId] = useState(ids[0])

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(prefix + id))
    if (sections.includes(null)) return

    function update() {
      const limit = line(sections[0])
      let next = 0
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= limit) next = index
      })
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (window.scrollY > 0 && atBottom) next = ids.length - 1
      setCurrentId(ids[next])
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, line, prefix])

  return currentId
}
