import { Link } from 'react-router-dom'
import RecipeMeta from './RecipeMeta'

function FeaturedShowcase({ recipes }) {
  const [leadRecipe, ...supportingRecipes] = recipes

  if (!leadRecipe) {
    return null
  }

  return (
    <section className="section container" id="featured">
      <div className="section-heading">
        <div className="section-heading__content">
          <p className="section-heading__eyebrow">Populära recept</p>
          <h2 className="section-heading__title">
            Handplockade favoriter som ger startsidan mer tyngd och tydlig matlust.
          </h2>
          <p className="section-heading__description">
            Ett mer redaktionellt upplägg där ett recept får ta plats medan övriga favoriter
            stöttar med snabb orientering och stark bildnärvaro.
          </p>
        </div>

        <div className="section-heading__aside">
          <span className="section-heading__note">{recipes.length} utvalda recept</span>
          <Link className="section-heading__link" to={`/recipe/${leadRecipe.id}`}>
            Visa veckans favorit
          </Link>
        </div>
      </div>

      <div className="featured-showcase">
        <article className="featured-showcase__lead">
          <div className="featured-showcase__lead-media">
            <img
              className="featured-showcase__lead-image"
              src={leadRecipe.image}
              alt={leadRecipe.title}
            />
          </div>
          <div className="featured-showcase__lead-content">
            <span className="featured-showcase__label">Veckans favorit</span>
            <h3 className="featured-showcase__lead-title">{leadRecipe.title}</h3>
            <p className="featured-showcase__lead-text">{leadRecipe.description}</p>
            <RecipeMeta
              className="featured-showcase__meta"
              time={leadRecipe.time}
              difficulty={leadRecipe.difficulty}
              servings={leadRecipe.servings}
            />
            <div className="featured-showcase__lead-footer">
              <span>{leadRecipe.reviewCount} omdömen i testdatan</span>
              <Link className="button" to={`/recipe/${leadRecipe.id}`}>
                Läs receptet
              </Link>
            </div>
          </div>
        </article>

        <div className="featured-showcase__stack">
          {supportingRecipes.map((recipe) => (
            <Link className="featured-showcase__item" key={recipe.id} to={`/recipe/${recipe.id}`}>
              <img className="featured-showcase__item-image" src={recipe.image} alt={recipe.title} />
              <div className="featured-showcase__item-body">
                <span className="featured-showcase__item-category">{recipe.categoryLabel}</span>
                <h3 className="featured-showcase__item-title">{recipe.title}</h3>
                <p className="featured-showcase__item-text">{recipe.excerpt}</p>
                <div className="featured-showcase__item-meta">
                  <span>{recipe.time}</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedShowcase
