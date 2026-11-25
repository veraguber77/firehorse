import { useState } from 'react'
import BriefBand from '../components/BriefBand.jsx'
import CategoryPicker from '../components/CategoryPicker.jsx'
import { allCategories, categories, getCategory } from '../categories.js'
import './Categories.css'

export default function Categories() {
  // A category id from src/categories.js, or 'all'. ?category= is a dev aid for deep links.
  const [selected, setSelected] = useState(
    () => new URLSearchParams(window.location.search).get('category') ?? 'web-app',
  )

  const current = getCategory(selected) ?? allCategories
  const isAll = current.id === allCategories.id
  const shown = isAll ? categories : [current]

  return (
    <div className="categories">
      <CategoryPicker selected={current.id} onSelect={setSelected} />
      <div id="briefs">
        {shown.map((category) => (
          <BriefBand
            key={category.id}
            category={category}
            // Figma's "Show gradient" setting: only the Web App band, only on the All view.
            showGradient={isAll && category.id === 'web-app'}
          />
        ))}
      </div>
    </div>
  )
}
