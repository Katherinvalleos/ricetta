import { Link } from 'react-router-dom'
import RecipeMeta from './RecipeMeta'

function RecipeCard({ recipe }) {
    const rating = Number(recipe?.rating ?? recipe?.avgRating ?? 0)
    const image = recipe?.imageUrl || recipe?.image
    const categoryLabel = recipe?.categoryLabel || recipe?.categories?.[0] || 'Okänd kategori'
    const excerpt = recipe?.excerpt || recipe?.description || ''
    const tags = recipe?.tags || recipe?.categories || []
    const location = recipe?.location || 'Ricetta'
    const time = recipe?.time || `${recipe?.timeInMins ?? '-'} min`
    const difficulty = recipe?.difficulty || '-'
    const servings = recipe?.servings || '-'
    const reviewCount = recipe?.reviewCount ?? 0

    return (
        <article className="recipe-card">
            <Link className="recipe-card__image-wrap" to={`/recipe/${recipe.id}`}>
                <img className="recipe-card__image" src={image} alt={recipe.title} />
                <span className="recipe-card__category">{categoryLabel}</span>
                <span className="recipe-card__rating">{rating.toFixed(1)}</span>
            </Link>

            <div className="recipe-card__body">
                <div className="recipe-card__copy">
                    <p className="recipe-card__eyebrow">Från {location}</p>
                    <h3 className="recipe-card__title">
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </h3>
                    <p className="recipe-card__excerpt">{excerpt}</p>
                </div>

                <div className="recipe-card__tags">
                    {tags.slice(0, 2).map((tag) => (
                        <span className="recipe-card__tag" key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>

                <RecipeMeta
                    time={time}
                    difficulty={difficulty}
                    servings={servings}
                />

                <div className="recipe-card__footer">
                    <span>{reviewCount} omdömen</span>
                    <Link className="recipe-card__link" to={`/recipe/${recipe.id}`}>
                        Visa recept
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default RecipeCard