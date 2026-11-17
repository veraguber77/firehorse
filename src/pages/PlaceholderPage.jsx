import './PlaceholderPage.css'

/** Stand-in page body: just a title until the real page is designed. */
export default function PlaceholderPage({ title }) {
  return (
    <section className="placeholder-page">
      <h1 className="placeholder-page__title">{title}</h1>
    </section>
  )
}
