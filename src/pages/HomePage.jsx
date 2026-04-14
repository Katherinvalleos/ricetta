import { useEffect, useMemo, useState } from 'react'
import CategoryList from '../components/CategoryList'
import FeaturedShowcase from '../components/FeaturedShowcase'
import Hero from '../components/Hero'
import RecipeGrid from '../components/RecipeGrid'
import { getCategories, getRecipes } from '../api/recipes'

function HomePage() {
    const [query, setQuery] = useState('')
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadHomePageData() {
            try {
                setLoading(true)
                setError('')

                const [recipeData, categoryData] = await Promise.all([
                    getRecipes(),
                    getCategories(),
                ])

                setRecipes(recipeData)
                setCategories(categoryData)
            } catch (err) {
                setError('Kunde inte hämta recept just nu.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadHomePageData()
    }, [])

    const normalizedQuery = query.trim().toLowerCase()

    const featuredRecipes = useMemo(() => {
        return recipes.slice(0, 3)
    }, [recipes])

    const filteredRecipes = useMemo(() => {
        if (!normalizedQuery) return recipes

        return recipes.filter((recipe) => {
            const searchableText = [
                recipe.title,
                recipe.description,
                ...(recipe.categories || []),
                ...(recipe.instructions || []),
                ...(recipe.ingredients || []).map(
                    (ingredient) => `${ingredient.name} ${ingredient.amount} ${ingredient.unit}`
                ),
            ]
                .join(' ')
                .toLowerCase()

            return searchableText.includes(normalizedQuery)
        })
    }, [recipes, normalizedQuery])

    const editorialHighlight = featuredRecipes[1] || featuredRecipes[0]

    if (loading) {
        return <p className="container section">Laddar recept...</p>
    }

    if (error) {
        return <p className="container section">{error}</p>
    }

    if (!recipes.length) {
        return <p className="container section">Inga recept hittades.</p>
    }

    return (
        <>
            <Hero
                featuredRecipe={featuredRecipes[0]}
                secondaryRecipe={featuredRecipes[1]}
                searchValue={query}
                onSearchChange={setQuery}
                categories={categories}
            />

            <FeaturedShowcase recipes={featuredRecipes} />

            {editorialHighlight && (
                <section className="section container">
                    <div className="editorial-banner">
                        <div className="editorial-banner__content">
                            <p className="section-heading__eyebrow">Från Ricettas kök</p>
                            <h2 className="section-heading__title">
                                En startsida som känns mer som ett matmagasin än en vanlig kursdemo.
                            </h2>
                            <p className="section-heading__description">
                                Balansen mellan stora bilder, luftiga sektioner och varm palett ger sajten en mer
                                sammanhällen identitet samtidigt som komponenterna förblir enkla att vidareutveckla.
                            </p>
                        </div>

                        <article className="editorial-banner__card">
                            <img
                                className="editorial-banner__image"
                                src={editorialHighlight.imageUrl}
                                alt={editorialHighlight.title}
                            />
                            <div className="editorial-banner__body">
                                <span className="editorial-banner__label">Nästa favorit</span>
                                <h3>{editorialHighlight.title}</h3>
                                <p>{editorialHighlight.description}</p>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            <CategoryList
                categories={categories}
                eyebrow="Kategorier"
                title="Hitta rätt stämning för hela den italienska menyn"
                description="Varje kategori har fått ett tydligare uttryck så att det blir enklare att navigera mellan pasta, förrätter, pizza och desserter."
            />

            <RecipeGrid
                eyebrow={normalizedQuery ? 'Sökresultat' : 'Fler recept'}
                title={normalizedQuery ? `Träffar för "${query}"` : 'Fler italienska favoriter'}
                description={
                    normalizedQuery
                        ? 'Filtreringen sker nu mot data från API:t så att sökupplevelsen redan känns användbar.'
                        : 'Ett bredare receptflöde för att testa receptkort, rytm och responsivitet över flera typer av rätter.'
                }
                recipes={filteredRecipes}
                emptyMessage="Prova en bredare sökning som pasta, skaldjur eller förrätt."
            />
        </>
    )
}

export default HomePage