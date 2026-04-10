import { useState } from 'react'
import CategoryList from '../components/CategoryList'
import FeaturedShowcase from '../components/FeaturedShowcase'
import Hero from '../components/Hero'
import RecipeGrid from '../components/RecipeGrid'
import { categories, featuredRecipes, recipes } from '../data/recipes'

function HomePage() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredRecipes = normalizedQuery
    ? recipes.filter((recipe) => {
        const searchableText = [
          recipe.title,
          recipe.categoryLabel,
          recipe.excerpt,
          recipe.description,
          ...recipe.ingredients,
          ...recipe.tags,
        ]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedQuery)
      })
    : recipes

  const editorialHighlight = featuredRecipes[1]

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
              src={editorialHighlight.image}
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
            ? 'Filtreringen sker direkt mot testdatan så att sökupplevelsen redan känns användbar.'
            : 'Ett bredare receptflöde för att testa receptkort, rytm och responsivitet över flera typer av rätter.'
        }
        recipes={filteredRecipes}
        emptyMessage="Prova en bredare sökning som pasta, burrata, risotto eller tiramisu."
      />
    </>
  )
}

export default HomePage
