import { useState } from 'react'
import CategoryPicker from '../components/CategoryPicker.jsx'

export default function Categories() {
  // A category id from src/categories.js, or 'all'. ?category= is a dev aid for deep links.
  const [selected, setSelected] = useState(
    () => new URLSearchParams(window.location.search).get('category') ?? 'web-app',
  )

  return <CategoryPicker selected={selected} onSelect={setSelected} />
}
