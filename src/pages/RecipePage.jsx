import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import IngredientList from '../components/IngredientList'
import InstructionSteps from '../components/InstructionSteps'
import RatingStars from '../components/RatingStars'
import RecipeGrid from '../components/RecipeGrid'
import RecipeMeta from '../components/RecipeMeta'
import { getRecipeById, getRelatedRecipes } from '../api/recipes'

function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [relatedRecipes, setRelatedRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadRecipePageData() {
            try {
                setLoading(true)
                setError('')

                const recipeData = await getRecipeById(id)

                if (!recipeData) {
                    setRecipe(null)
                    return
                }

                setRecipe(recipeData)

                const primaryCategory = recipeData.categories?.[0]
                if (primaryCategory) {
                    const relatedData = await getRelatedRecipes(recipeData.id, primaryCategory)
                    setRelatedRecipes(relatedData)
                } else {
                    setRelatedRecipes([])
                }
            } catch (err) {
                setError('Kunde inte hämta receptet just nu.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            loadRecipePageData()
        }
    }, [id])

    if (loading) {
        return <p className="section container">Laddar recept...</p>
    }

    if (error) {
        return <p className="section container">{error}</p>
    }

    if (!recipe) {
        return (
            <section className="section container">
                <div className="empty-state">
                    <h1>Receptet kunde inte hittas</h1>
                    <p>Det recept du försökte öppna finns inte i API-datan.</p>
                    <Link className="button" to="/">
                        Till startsidan
                    </Link>
                </div>
            </section>
        )
    }

    const primaryCategory = recipe.categories?.[0]
    const categorySlug = primaryCategory?.toLowerCase().replace(/\s+/g, '-')
    const reviewCount = recipe.avgRating ? 1 : 0

    return (
        <>
            <section className="section recipe-hero">
                <div className="container recipe-hero__grid">
                    <div className="recipe-hero__content">
                        {primaryCategory && (
                            <Link className="back-link" to={`/category/${categorySlug}`}>
                                Tillbaka till {primaryCategory.toLowerCase()}
                            </Link>
                        )}

                        <p className="section-heading__eyebrow">Ricetta</p>
                        <h1 className="section-heading__title">{recipe.title}</h1>
                        <p className="recipe-hero__lede">{recipe.description}</p>

                        <RecipeMeta
                            className="recipe-hero__meta"
                            time={`${recipe.timeInMins} min`}
                            difficulty="-"
                            servings="-"
                        />

                        <div className="tag-list">
                            {(recipe.categories || []).map((tag) => (
                                <span className="tag-list__item" key={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="recipe-hero__image-card">
                        <img className="recipe-hero__image" src={recipe.imageUrl} alt={recipe.title} />
                    </div>
                </div>
            </section>

            <section className="section container recipe-layout">
                <aside className="recipe-sidebar">
                    <div className="panel">
                        <p className="section-heading__eyebrow">Kökets noter</p>
                        <h2 className="panel__title">Ingredienser</h2>
                        <IngredientList ingredients={recipe.ingredients} />
                    </div>

                    <div className="panel recipe-sidebar__details">
                        <p className="section-heading__eyebrow">Receptdetaljer</p>
                        <div className="detail-list">
                            <div className="detail-list__item">
                                <span className="detail-list__label">Kategori</span>
                                <span className="detail-list__value">{primaryCategory || 'Okänd'}</span>
                            </div>
                            <div className="detail-list__item">
                                <span className="detail-list__label">Pris</span>
                                <span className="detail-list__value">{recipe.price} kr</span>
                            </div>
                            <div className="detail-list__item">
                                <span className="detail-list__label">Betyg</span>
                                <span className="detail-list__value">
                                    {recipe.avgRating ? recipe.avgRating : 'Inga betyg ännu'}
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="recipe-content">
                    <section className="panel">
                        <p className="section-heading__eyebrow">Steg för steg</p>
                        <h2 className="panel__title">Gör så här</h2>
                        <InstructionSteps steps={recipe.instructions} />
                    </section>

                    <RatingStars initialRating={recipe.avgRating || 0} reviewCount={reviewCount} />
                    <CommentSection comments={[]} />
                </div>
            </section>

            <RecipeGrid
                eyebrow="Liknande recept"
                title="Fler recept att upptäcka"
                description="Relaterade recept hämtas nu från API:t och bygger vidare på samma kategori."
                recipes={relatedRecipes}
                emptyMessage="Fler relaterade recept dyker upp här när receptsamlingen växer."
            />
        </>
    )
}

export default RecipePage