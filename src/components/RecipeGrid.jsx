
import RecipeCard from './RecipeCard'

function RecipeGrid({
    title,
    description,
    recipes,
    emptyMessage,
    sectionId,
    eyebrow = 'Utvalda recept',
}) {
    return (
        <section className="section container" id={sectionId}>
            <div className="section-heading">
                <div className="section-heading__content">
                    <p className="section-heading__eyebrow">{eyebrow}</p>
                    <h2 className="section-heading__title">{title}</h2>
                    <p className="section-heading__description">{description}</p>
                </div>
            </div>

            {recipes.length > 0 ? (
                <div className="recipe-grid">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h3>Inga recept matchade just nu.</h3>
                    <p>{emptyMessage}</p>
                </div>
            )}
        </section>
    )
}

export default RecipeGrid
