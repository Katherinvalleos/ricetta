import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import RecipeGrid from '../components/RecipeGrid'
import SearchBar from '../components/SearchBar'
import { getCategories, getRecipesByCategory } from '../api/recipes'

function CategoryPage() {
    const { categoryName } = useParams()
    const [categories, setCategories] = useState([])
    const [recipesInCategory, setRecipesInCategory] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadCategoryPageData() {
            try {
                setLoading(true)
                setError('')

                const [categoryData, recipeData] = await Promise.all([
                    getCategories(),
                    getRecipesByCategory(categoryName),
                ])

                setCategories(categoryData)
                setRecipesInCategory(recipeData)
            } catch (err) {
                setError('Kunde inte hämta kategorin just nu.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (categoryName) {
            loadCategoryPageData()
        }
    }, [categoryName])

    const category = useMemo(() => {
        return categories.find((item) => item.slug === categoryName)
    }, [categories, categoryName])

    const normalizedQuery = query.trim().toLowerCase()

    const filteredRecipes = useMemo(() => {
        if (!normalizedQuery) return recipesInCategory

        return recipesInCategory.filter((recipe) => {
            const searchableText = [
                recipe.title,
                recipe.description,
                ...(recipe.categories || []),
                ...(recipe.ingredients || []).map(
                    (ingredient) => `${ingredient.name} ${ingredient.amount} ${ingredient.unit}`
                ),
            ]
                .join(' ')
                .toLowerCase()

            return searchableText.includes(normalizedQuery)
        })
    }, [recipesInCategory, normalizedQuery])

    const alternateCategories = categories.filter((item) => item.slug !== categoryName)

    if (loading) {
        return <p className="section container">Laddar kategori...</p>
    }

    if (error) {
        return <p className="section container">{error}</p>
    }

    if (!category) {
        return (
            <section className="section container">
                <div className="empty-state">
                    <h1>Kategorin kunde inte hittas</h1>
                    <p>Den kategori du försökte öppna finns inte i API-datan.</p>
                    <Link className="button" to="/">
                        Till startsidan
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="section page-hero">
                <div className="container page-hero__grid">
                    <div className="page-hero__content">
                        <p className="section-heading__eyebrow">Kategori</p>
                        <h1 className="section-heading__title">{category.name}</h1>
                        <p className="section-heading__description">
                            H�r hittar du recept inom kategorin {category.name.toLowerCase()}.
                        </p>
                        <p className="page-hero__accent">
                            {category.recipeCount} recept i denna kategori.
                        </p>
                    </div>

                    <div className="page-hero__panel">
                        <div className="page-hero__card">
                            <div className="page-hero__image page-hero__image--placeholder">
                                <span>{category.name}</span>
                            </div>
                        </div>

                        <SearchBar
                            compact
                            value={query}
                            onChange={setQuery}
                            label={`Sök inom ${category.name.toLowerCase()}`}
                            placeholder={`Hitta recept i kategorin ${category.name.toLowerCase()}`}
                        />
                    </div>
                </div>
            </section>

            <RecipeGrid
                eyebrow="I denna kategori"
                title={`Recept inom ${category.name.toLowerCase()}`}
                description="Kategoriurvalet hämtas nu från API:t och filtreras direkt i gränssnittet."
                recipes={filteredRecipes}
                emptyMessage={`Inga recept i ${category.name.toLowerCase()} matchade den här sökningen just nu.`}
            />

            <CategoryList
                categories={alternateCategories.slice(0, 4)}
                eyebrow="Fler kategorier"
                title="Fortsätt utforska det italienska köket"
                description="De här genvägarna gör det enkelt att hoppa vidare mellan olika kategorier."
            />
        </>
    )
}

export default CategoryPage