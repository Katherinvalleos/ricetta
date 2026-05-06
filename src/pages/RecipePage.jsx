import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import IngredientList from '../components/IngredientList'
import InstructionSteps from '../components/InstructionSteps'
import RatingStars from '../components/RatingStars'
import RecipeGrid from '../components/RecipeGrid'
import RecipeMeta from '../components/RecipeMeta'
import { getRecipeById, getRelatedRecipes, postRecipeRating } from '../api/recipes'
import { getPrimaryCategoryForRecipe, getUiCategoryLabels } from '../config/categories'
import { formatAverageRating, isValidRecipeRating } from '../utils/ratings'

function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [relatedRecipes, setRelatedRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [ratingSubmitting, setRatingSubmitting] = useState(false)
    const [ratingSuccessMessage, setRatingSuccessMessage] = useState('')
    const [ratingErrorMessage, setRatingErrorMessage] = useState('')

    useEffect(() => {
        async function loadRecipePageData() {
            try {
                setLoading(true)
                setError('')
                setRatingSuccessMessage('')
                setRatingErrorMessage('')

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

    async function handleRatingSubmit(rating) {
        if (ratingSubmitting || !recipe?.id) {
            return
        }

        if (!isValidRecipeRating(rating)) {
            setRatingSuccessMessage('')
            setRatingErrorMessage('Välj ett betyg mellan 1 och 5.')
            return
        }

        try {
            setRatingSubmitting(true)
            setRatingSuccessMessage('')
            setRatingErrorMessage('')

            const ratingResponse = await postRecipeRating(recipe.id, rating)

            if (ratingResponse?.id) {
                setRecipe(ratingResponse)
            } else if ('avgRating' in (ratingResponse || {})) {
                setRecipe((currentRecipe) => ({
                    ...currentRecipe,
                    avgRating: ratingResponse.avgRating,
                }))
            } else {
                const refreshedRecipe = await getRecipeById(recipe.id)
                setRecipe(refreshedRecipe)
            }

            setRatingSuccessMessage('Tack för ditt betyg!')
        } catch (err) {
            setRatingErrorMessage('Betyget kunde inte sparas just nu. Försök igen om en stund.')
            console.error(err)
        } finally {
            setRatingSubmitting(false)
        }
    }

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

    const primaryCategory = getPrimaryCategoryForRecipe(recipe)
    const categorySlug = primaryCategory?.slug
    const categoryLabels = getUiCategoryLabels(recipe)

    return (
        <>
            <section className="section recipe-hero">
                <div className="container recipe-hero__grid">
                    <div className="recipe-hero__content">
                        {primaryCategory?.name && (
                            <Link className="back-link" to={`/category/${categorySlug}`}>
                                Tillbaka till {primaryCategory.name.toLowerCase()}
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
                            {categoryLabels.map((tag) => (
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
                                <span className="detail-list__value">{primaryCategory?.name || 'Okänd'}</span>
                            </div>
                            <div className="detail-list__item">
                                <span className="detail-list__label">Pris</span>
                                <span className="detail-list__value">{recipe.price} kr</span>
                            </div>
                            <div className="detail-list__item">
                                <span className="detail-list__label">Betyg</span>
                                <span className="detail-list__value">{formatAverageRating(recipe.avgRating)}</span>
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

                    <RatingStars
                        averageRating={recipe.avgRating}
                        errorMessage={ratingErrorMessage}
                        isSubmitting={ratingSubmitting}
                        onSubmitRating={handleRatingSubmit}
                        successMessage={ratingSuccessMessage}
                    />
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
