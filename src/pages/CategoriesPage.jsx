import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import { getRecipes } from '../api/recipes'
import { buildEditorialCategories } from '../config/categories'

function CategoriesPage() {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadCategoriesPageData() {
            try {
                setLoading(true)
                setError('')

                const recipeData = await getRecipes()
                setRecipes(recipeData)
            } catch (err) {
                setError('Kunde inte hämta kategorier just nu.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadCategoriesPageData()
    }, [])

    const categories = useMemo(() => {
        return buildEditorialCategories(recipes)
    }, [recipes])

    const largestCategory = useMemo(() => {
        return [...categories].sort((left, right) => right.recipeCount - left.recipeCount)[0] ?? null
    }, [categories])

    const totalRecipes = recipes.length

    if (loading) {
        return <p className="section container">Laddar kategorier...</p>
    }

    if (error) {
        return <p className="section container">{error}</p>
    }

    if (!categories.length) {
        return (
            <section className="section container">
                <div className="empty-state">
                    <h1>Inga kategorier hittades</h1>
                    <p>Just nu finns det inga kategorier att visa i den redaktionella översikten.</p>
                    <Link className="button" to="/">
                        Till startsidan
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="section page-hero page-hero--categories">
                <div className="container categories-overview">
                    <div className="categories-overview__content">
                        <p className="section-heading__eyebrow">Kategoriöversikt</p>
                        <h1 className="section-heading__title">Alla kategorier på ett ställe</h1>
                        <p className="section-heading__description">
                            Det här är Ricettas rena indexsida för kategorier. Här väljer du väg in i samlingen,
                            medan varje enskild kategori fortsätter vidare till sin egen fokuserade receptsida.
                        </p>
                    </div>

                    <aside className="categories-overview__summary">
                        <p className="categories-overview__summary-label">Snabb överblick</p>
                        <div className="categories-overview__stats">
                            <div className="categories-overview__stat">
                                <span>Kategorier</span>
                                <strong>{categories.length}</strong>
                            </div>
                            <div className="categories-overview__stat">
                                <span>Recept i samlingen</span>
                                <strong>{totalRecipes}</strong>
                            </div>
                            <div className="categories-overview__stat">
                                <span>Navigation</span>
                                <strong>Ren indexvy</strong>
                            </div>
                        </div>

                        {largestCategory ? (
                            <Link className="categories-overview__focus" to={`/category/${largestCategory.slug}`}>
                                <div className="categories-overview__focus-copy">
                                    <span className="categories-overview__focus-label">Flest recept just nu</span>
                                    <strong>{largestCategory.name}</strong>
                                    <p>{largestCategory.recipeCount} recept i kategorin</p>
                                </div>
                                <span className="categories-overview__focus-link">Öppna kategori</span>
                            </Link>
                        ) : null}
                    </aside>
                </div>
            </section>

            <CategoryList
                categories={categories}
                eyebrow="Kategorikatalog"
                title="Välj kategori och gå vidare till rätt receptsida"
                description="Varje kort här är en tydlig startpunkt. Klickar du vidare öppnas den fokuserade kategorisidan med intro, sök och filtrerat receptflöde."
                note={`${categories.length} kategorier i översikten`}
            />
        </>
    )
}

export default CategoriesPage
