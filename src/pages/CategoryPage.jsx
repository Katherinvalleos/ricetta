import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import RecipeGrid from '../components/RecipeGrid'
import SearchBar from '../components/SearchBar'
import { categories, getCategoryBySlug, getRecipesByCategory } from '../data/recipes'

function CategoryPage() {
  const { categoryName } = useParams()
  const category = getCategoryBySlug(categoryName)
  const [query, setQuery] = useState('')

  if (!category) {
    return (
      <section className="section container">
        <div className="empty-state">
          <h1>Kategorin kunde inte hittas</h1>
          <p>Den kategori du försökte öppna finns inte i den nuvarande testdatan.</p>
          <Link className="button" to="/">
            Till startsidan
          </Link>
        </div>
      </section>
    )
  }

  const recipesInCategory = getRecipesByCategory(category.slug)
  const normalizedQuery = query.trim().toLowerCase()
  const filteredRecipes = normalizedQuery
    ? recipesInCategory.filter((recipe) => {
        const searchableText = [recipe.title, recipe.excerpt, recipe.description, ...recipe.ingredients]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedQuery)
      })
    : recipesInCategory

  const alternateCategories = categories.filter((item) => item.slug !== category.slug)

  return (
    <>
      <section className="section page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__content">
            <p className="section-heading__eyebrow">Kategori</p>
            <h1 className="section-heading__title">{category.name}</h1>
            <p className="section-heading__description">{category.description}</p>
            <p className="page-hero__accent">{category.accent}</p>
          </div>

          <div className="page-hero__panel">
            <div className="page-hero__card">
              <img className="page-hero__image" src={category.image} alt={category.name} />
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
        description="Kategoriurvalet är redan kopplat till URL-strukturen, vilket gör det enkelt att byta till riktig data i nästa steg."
        recipes={filteredRecipes}
        emptyMessage={`Inga recept i ${category.name.toLowerCase()} matchade den här sökningen just nu.`}
      />

      <CategoryList
        categories={alternateCategories.slice(0, 4)}
        eyebrow="Fler kategorier"
        title="Fortsätt utforska det italienska köket"
        description="De här genvägarna ger kategorisidan mer djup utan att vi behöver lägga till en separat sidokolumn."
      />
    </>
  )
}

export default CategoryPage
