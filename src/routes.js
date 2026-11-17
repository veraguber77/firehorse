import Home from './pages/Home.jsx'
import Categories from './pages/Categories.jsx'
import Timeline from './pages/Timeline.jsx'
import Faq from './pages/Faq.jsx'

/**
 * One entry per page. `id` is the value passed to <Nav current>;
 * entries with `inNav` appear as nav links, in this order.
 */
export const routes = [
  { id: 'home', path: '/', label: 'Home', Component: Home },
  { id: 'categories', path: '/categories', label: 'Categories', Component: Categories, inNav: true },
  { id: 'timeline', path: '/timeline', label: 'Timeline', Component: Timeline, inNav: true },
  { id: 'faq', path: '/faq', label: 'FAQ', Component: Faq, inNav: true },
]

export const navLinks = routes.filter((route) => route.inNav)
