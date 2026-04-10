import { Link, NavLink } from 'react-router-dom'
import { categories, featuredRecipes } from '../data/recipes'

function Header() {
  const spotlightCategories = categories.slice(0, 4)
  const editorsPick = featuredRecipes[0]

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" to="/">
          <span className="brand__mark">R</span>
          <span className="brand__text">
            <span className="brand__title">Ricetta</span>
            <span className="brand__subtitle">Italiensk receptjournal</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primär navigering">
          <NavLink
            className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
            to="/"
          >
            Hem
          </NavLink>
          {spotlightCategories.map((category) => (
            <NavLink
              key={category.slug}
              className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              to={`/category/${category.slug}`}
            >
              {category.name}
            </NavLink>
          ))}
        </nav>

        <Link className="header-cta" to={`/recipe/${editorsPick.id}`}>
          Redaktionens val
        </Link>
      </div>
    </header>
  )
}

export default Header
