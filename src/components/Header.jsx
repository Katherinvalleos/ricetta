import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getRecipes } from '../api/recipes'
import { buildEditorialCategories, getPrimaryNavigationCategories } from '../config/categories'

function Header() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function loadHeaderData() {
            try {
                const recipeData = await getRecipes()
                setRecipes(recipeData)
            } catch (err) {
                console.error('Kunde inte hämta header-data', err)
            }
        }

        loadHeaderData()
    }, [])

    const spotlightCategories = useMemo(() => {
        return getPrimaryNavigationCategories(buildEditorialCategories(recipes))
    }, [recipes])

    const editorsPick = recipes[0]

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
                        end
                        className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
                        to="/"
                    >
                        Hem
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
                        to="/categories"
                    >
                        Alla kategorier
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

                {editorsPick && (
                    <Link className="header-cta" to={`/recipe/${editorsPick.id}`}>
                        Redaktionens val
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header
