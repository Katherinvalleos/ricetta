import { useEffect, useMemo, useState } from 'react'
import CategoryList from '../components/CategoryList'
import FeaturedShowcase from '../components/FeaturedShowcase'
import Hero from '../components/Hero'
import RecipeGrid from '../components/RecipeGrid'
import { getRecipes } from '../api/recipes'
import { buildEditorialCategories, filterRecipesBySearch } from '../config/categories'

function HomePage() {
    const [query, setQuery] = useState('')
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadHomePageData() {
            try {
                setLoading(true)
                setError('')

                const recipeData = await getRecipes()
                setRecipes(recipeData)
            } catch (err) {
                setError('Kunde inte hämta recept just nu.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadHomePageData()
    }, [])

    const categories = useMemo(() => {
        return buildEditorialCategories(recipes)
    }, [recipes])

    const featuredRecipes = useMemo(() => {
        return recipes.slice(0, 3)
    }, [recipes])

    const teaserCategories = useMemo(() => {
        return categories.slice(0, 3)
    }, [categories])

    const filteredRecipes = useMemo(() => {
        return filterRecipesBySearch(recipes, query, 'all')
    }, [recipes, query])

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
                                sammanhållen identitet samtidigt som komponenterna förblir enkla att vidareutveckla.
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
                categories={teaserCategories}
                eyebrow="Kategorier"
                title="Börja i några av Ricettas tydligaste kategorispår"
                description="Startsidan visar nu bara en mindre teaser, medan hela katalogen har flyttat till en egen destinationssida för bättre navigation och tydligare informationsarkitektur."
                note={`${categories.length} kategorier totalt`}
                actionLabel="Se alla kategorier"
                actionTo="/categories"
            />

            <RecipeGrid
                eyebrow={query.trim() ? 'Sökresultat' : 'Fler recept'}
                title={query.trim() ? `Träffar för "${query}"` : 'Fler italienska favoriter'}
                description={
                    query.trim()
                        ? 'Sökningen matchar nu recepttitlar, ingredienser och kategoriord så att resultatet känns mer användbart redan innan den slutliga API-integrationen.'
                        : 'Ett bredare receptflöde för att testa receptkort, rytm och responsivitet över flera typer av rätter.'
                }
                recipes={filteredRecipes}
                emptyMessage="Prova en bredare sökning som pasta, skaldjur eller förrätt."
            />
        </>
    )
}

export default HomePage
