import { Link } from 'react-router-dom'
import RecipeMeta from './RecipeMeta'

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <Link className="recipe-card__image-wrap" to={`/recipe/${recipe.id}`}>
        <img className="recipe-card__image" src={recipe.image} alt={recipe.title} />
        <span className="recipe-card__category">{recipe.categoryLabel}</span>
        <span className="recipe-card__rating">{recipe.rating.toFixed(1)}</span>
      </Link>

      <div className="recipe-card__body">
        <div className="recipe-card__copy">
          <p className="recipe-card__eyebrow">Från {recipe.location}</p>
          <h3 className="recipe-card__title">
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p className="recipe-card__excerpt">{recipe.excerpt}</p>
        </div>

        <div className="recipe-card__tags">
          {recipe.tags.slice(0, 2).map((tag) => (
            <span className="recipe-card__tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <RecipeMeta
          time={recipe.time}
          difficulty={recipe.difficulty}
          servings={recipe.servings}
        />

        <div className="recipe-card__footer">
          <span>{recipe.reviewCount} omdömen</span>
          <Link className="recipe-card__link" to={`/recipe/${recipe.id}`}>
            Visa recept
          </Link>
        </div>
      </div>
    </article>
  )
}

export default RecipeCard
