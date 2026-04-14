import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getCategories, getRecipes } from '../api/recipes'

function Header() {
    const [categories, setCategories] = useState([])
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function loadHeaderData() {
            try {
                const [categoryData, recipeData] = await Promise.all([
                    getCategories(),
                    getRecipes(),
                ])

                setCategories(categoryData)
                setRecipes(recipeData)
            } catch (err) {
                console.error('Kunde inte hämta header-data', err)
            }
        }

        loadHeaderData()
    }, [])

    const spotlightCategories = categories.slice(0, 4)
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