import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'
import { getRecipes } from '../api/recipes'
import {
    buildEditorialCategories,
    filterRecipesBySearch,
    getCategoryBySlug,
    getRecipesForCategory,
} from '../config/categories'

function CategoryPage() {
    const { slug } = useParams()
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('')
    const [searchScope, setSearchScope] = useState('recipes')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadCategoryPageData() {
            try {
                setLoading(true)
                setError('')

                const recipeData = await getRecipes()
                setRecipes(recipeData)
            } catch (err) {
                setError('Kunde inte hämta kategorin just nu.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            loadCategoryPageData()
        }
    }, [slug])

    useEffect(() => {
        setQuery('')
        setSearchScope('recipes')
    }, [slug])

    const categories = useMemo(() => {
        return buildEditorialCategories(recipes)
    }, [recipes])

    const category = useMemo(() => {
        return getCategoryBySlug(slug, recipes)
    }, [slug, recipes])

    const recipesInCategory = useMemo(() => {
        return category ? getRecipesForCategory(recipes, category) : []
    }, [category, recipes])

    const filteredRecipes = useMemo(() => {
        return filterRecipesBySearch(recipesInCategory, query, searchScope)
    }, [recipesInCategory, query, searchScope])

    const alternateCategories = useMemo(() => {
        return categories.filter((item) => item.slug !== category?.slug).slice(0, 3)
    }, [categories, category])

    if (loading) {
        return <p className="section container">Laddar kategori...</p>
    }

    if (error) {
        return <p className="section container">{error}</p>
    }

    if (!category) {
        return (
            <section className="section container">
                <div className="empty-state">
                    <h1>Kategorin kunde inte hittas</h1>
                    <p>Den kategori du försökte öppna finns inte i den nuvarande samlingen.</p>
                    <Link className="button" to="/">
                        Till startsidan
                    </Link>
                </div>
            </section>
        )
    }

    const categoryLabel = category.name.toLowerCase()
    const filteredCountLabel = query.trim()
        ? `${filteredRecipes.length} av ${recipesInCategory.length} recept visas`
        : `${recipesInCategory.length} recept i kategorin`
    const sectionTitle = query.trim() ? `Träffar för "${query}"` : `Recept inom ${categoryLabel}`
    const sectionDescription = query.trim()
        ? searchScope === 'ingredients'
            ? `Filtreringen söker nu efter ingredienser inom ${categoryLabel}, så att söket redan känns redo för nästa steg.`
            : `Filtreringen söker nu inom recepttitlar, ingredienser, kategoriord, beskrivningar och instruktioner för ${categoryLabel}.`
        : category.description
    const leadRecipe = recipesInCategory[0]

    return (
        <>
            <section className="section page-hero page-hero--category">
                <div className="container category-destination">
                    <div className="category-destination__content">
                        <p className="section-heading__eyebrow">Kategori</p>
                        <h1 className="section-heading__title">{category.pageTitle}</h1>
                        <p className="section-heading__description">{category.pageIntro}</p>
                        <div className="category-destination__stats">
                            <div className="category-destination__stat">
                                <span>Kategori</span>
                                <strong>{category.name}</strong>
                            </div>
                            <div className="category-destination__stat">
                                <span>Recept just nu</span>
                                <strong>{recipesInCategory.length}</strong>
                            </div>
                            <div className="category-destination__stat">
                                <span>Sökläge</span>
                                <strong>{searchScope === 'ingredients' ? 'Ingredienser' : 'Recept'}</strong>
                            </div>
                        </div>
                        <p className="category-destination__accent">{category.accent}</p>
                    </div>

                    <div className="category-destination__panel">
                        <div className="category-destination__media">
                            {leadRecipe ? (
                                <img
                                    className="category-destination__image"
                                    src={leadRecipe.imageUrl || leadRecipe.image}
                                    alt={leadRecipe.title}
                                />
                            ) : (
                                <div className="category-destination__image category-destination__image--placeholder" />
                            )}
                            <div className="category-destination__overlay">
                                <span className="category-destination__kicker">I fokus</span>
                                <h2 className="category-destination__overlay-title">
                                    {leadRecipe ? leadRecipe.title : category.name}
                                </h2>
                                <p>{category.description}</p>
                            </div>
                        </div>

                        <div className="category-destination__search">
                            <div className="category-destination__search-header">
                                <div>
                                    <p className="category-destination__search-eyebrow">Filtrera samlingen</p>
                                    <h2 className="category-destination__search-title">Sök inom {categoryLabel}</h2>
                                </div>
                                <span className="category-destination__search-note">{filteredCountLabel}</span>
                            </div>

                            <SearchBar
                                compact
                                value={query}
                                onChange={setQuery}
                                activeScope={searchScope}
                                onScopeChange={setSearchScope}
                                label={`Sök inom ${categoryLabel}`}
                                buttonLabel="Filtrera"
                                scopes={[
                                    {
                                        key: 'recipes',
                                        label: 'Recept',
                                        placeholder: category.searchPlaceholders?.recipes,
                                    },
                                    {
                                        key: 'ingredients',
                                        label: 'Ingredienser',
                                        placeholder: category.searchPlaceholders?.ingredients,
                                    },
                                ]}
                                helperText={`Sökningen är nu begränsad till ${categoryLabel} och förberedd för både recept- och ingredienssökning.`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section container">
                <div className="section-heading">
                    <div className="section-heading__content">
                        <p className="section-heading__eyebrow">I denna kategori</p>
                        <h2 className="section-heading__title">{sectionTitle}</h2>
                        <p className="section-heading__description">{sectionDescription}</p>
                    </div>

                    <div className="section-heading__aside">
                        <span className="section-heading__note">{filteredCountLabel}</span>
                        <span className="section-heading__note">
                            {searchScope === 'ingredients' ? 'Filtrerar på ingredienser' : 'Filtrerar på receptinnehåll'}
                        </span>
                    </div>
                </div>

                {filteredRecipes.length > 0 ? (
                    <div className="recipe-grid recipe-grid--category">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                variant="category"
                                categoryLabelOverride={category.name}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state category-empty-state">
                        <h3>Inga recept matchade din filtrering</h3>
                        <p>
                            Prova att söka bredare inom {categoryLabel} eller byt till ett annat sökläge för att
                            hitta fler träffar.
                        </p>
                        <button className="button button--secondary" type="button" onClick={() => setQuery('')}>
                            Rensa sökning
                        </button>
                    </div>
                )}
            </section>

            {alternateCategories.length > 0 ? (
                <CategoryList
                    categories={alternateCategories}
                    eyebrow="Fler kategorier"
                    title="Fortsätt utforska det italienska köket"
                    description="Varje kategori har nu en tydligare egen identitet, så att navigeringen känns mer som ett magasin än en filtrerad startsida."
                />
            ) : null}
        </>
    )
}

export default CategoryPage
