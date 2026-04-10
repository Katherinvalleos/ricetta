import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import IngredientList from '../components/IngredientList'
import InstructionSteps from '../components/InstructionSteps'
import RatingStars from '../components/RatingStars'
import RecipeGrid from '../components/RecipeGrid'
import RecipeMeta from '../components/RecipeMeta'
import { getRecipeById, getRelatedRecipes } from '../data/recipes'

function RecipePage() {
  const { id } = useParams()
  const recipe = getRecipeById(id)

  if (!recipe) {
    return (
      <section className="section container">
        <div className="empty-state">
          <h1>Receptet kunde inte hittas</h1>
          <p>Det recept du försökte öppna finns inte i den nuvarande testdatan.</p>
          <Link className="button" to="/">
            Till startsidan
          </Link>
        </div>
      </section>
    )
  }

  const relatedRecipes = getRelatedRecipes(recipe.id, recipe.category)

  return (
    <>
      <section className="section recipe-hero">
        <div className="container recipe-hero__grid">
          <div className="recipe-hero__content">
            <Link className="back-link" to={`/category/${recipe.category}`}>
              Tillbaka till {recipe.categoryLabel.toLowerCase()}
            </Link>
            <p className="section-heading__eyebrow">{recipe.location}</p>
            <h1 className="section-heading__title">{recipe.title}</h1>
            <p className="recipe-hero__lede">{recipe.description}</p>

            <RecipeMeta
              className="recipe-hero__meta"
              time={recipe.time}
              difficulty={recipe.difficulty}
              servings={recipe.servings}
            />

            <div className="tag-list">
              {recipe.tags.map((tag) => (
                <span className="tag-list__item" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="recipe-hero__image-card">
            <img className="recipe-hero__image" src={recipe.image} alt={recipe.title} />
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
                <span className="detail-list__label">Kock</span>
                <span className="detail-list__value">{recipe.author}</span>
              </div>
              <div className="detail-list__item">
                <span className="detail-list__label">Kategori</span>
                <span className="detail-list__value">{recipe.categoryLabel}</span>
              </div>
              <div className="detail-list__item">
                <span className="detail-list__label">Omdömen</span>
                <span className="detail-list__value">{recipe.reviewCount} i testdatan</span>
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

          <RatingStars initialRating={recipe.rating} reviewCount={recipe.reviewCount} />
          <CommentSection comments={recipe.comments} />
        </div>
      </section>

      <RecipeGrid
        eyebrow="Liknande recept"
        title="Fler recept att upptäcka"
        description="Relaterade recept gör detaljsidan mer levande redan nu och ger en tydlig plats för framtida rekommendationer från den kommande datakällan."
        recipes={relatedRecipes}
        emptyMessage="Fler relaterade recept dyker upp här när receptsamlingen växer."
      />
    </>
  )
}

export default RecipePage
