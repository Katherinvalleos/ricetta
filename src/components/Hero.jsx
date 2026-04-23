import { Link } from 'react-router-dom'
import RecipeMeta from './RecipeMeta'
import SearchBar from './SearchBar'

function Hero({
    featuredRecipe,
    secondaryRecipe,
    searchValue,
    onSearchChange,
    categories = [],
}) {
    const safeFeaturedRecipe = featuredRecipe ?? null
    const safeSecondaryRecipe = secondaryRecipe ?? null
    const safeCategories = categories ?? []

    const featuredRating = Number(safeFeaturedRecipe?.rating ?? safeFeaturedRecipe?.avgRating ?? 0)
    const featuredReviewCount = safeFeaturedRecipe?.reviewCount ?? 0

    return (
        <section className="hero">
            <div className="container hero__grid">
                <div className="hero__content">
                    <p className="hero__badge">Italienska smaker med modern premiumkänsla</p>
                    <h1 className="hero__title">Utforska italienska smaker i en mer elegant receptupplevelse.</h1>
                    <p className="hero__description">
                        Ricetta samlar varm typografi, tydlig bildhierarki och inspirerande italienska rätter
                        i ett gränssnitt som redan känns polerat innan den riktiga datakällan är inkopplad.
                    </p>

                    <div className="hero__search-panel">
                        <SearchBar
                            value={searchValue}
                            onChange={onSearchChange}
                            label="Sök recept"
                            scopes={[
                                {
                                    label: 'Recept',
                                    placeholder: 'Sök efter carbonara, tiramisu eller pinsa',
                                },
                                {
                                    label: 'Ingredienser',
                                    placeholder: 'Sök efter tomat, burrata, citron eller tryffel',
                                },
                            ]}
                            helperText="Gränssnittet är redan förberett för både receptsökning och ingredienssökning."
                        />
                        <p className="hero__search-note">
                            Sökgränssnittet fungerar redan mot testdatan så att design och flöden känns
                            verkliga under utvecklingen.
                        </p>
                    </div>

                    <div className="hero__actions">
                        {safeFeaturedRecipe ? (
                            <Link className="button" to={`/recipe/${safeFeaturedRecipe.id}`}>
                                Se veckans recept
                            </Link>
                        ) : (
                            <span className="button button--disabled">Se veckans recept</span>
                        )}

                        <Link className="button button--secondary" to="/categories">
                            Utforska kategorier
                        </Link>
                    </div>

                    <div className="hero__feature-list">
                        <div className="hero__feature">
                            <strong>Bildstarkt</strong>
                            <span>Stor toppsektion med tydligt fokus på maten och ett lugnare premiumuttryck.</span>
                        </div>
                        <div className="hero__feature">
                            <strong>Responsivt</strong>
                            <span>Layouten faller om mjukt från stor skärm till mobil utan att tappa karaktär.</span>
                        </div>
                        <div className="hero__feature">
                            <strong>Utbyggbart</strong>
                            <span>Komponenterna är enkla att bygga vidare på när riktig data och filtrering kopplas in.</span>
                        </div>
                    </div>

                    <div className="hero__chips">
                        {safeCategories.slice(0, 5).map((category) => (
                            <Link className="hero__chip" key={category.slug} to={`/category/${category.slug}`}>
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__image-card">
                        {safeFeaturedRecipe ? (
                            <>
                                <img
                                    className="hero__image"
                                    src={safeFeaturedRecipe.imageUrl || safeFeaturedRecipe.image}
                                    alt={safeFeaturedRecipe.title}
                                    loading="eager"
                                />
                                <div className="hero__overlay">
                                    <span className="hero__overlay-label">Veckans utvalda</span>
                                    <h2 className="hero__overlay-title">{safeFeaturedRecipe.title}</h2>
                                    <p>{safeFeaturedRecipe.excerpt || safeFeaturedRecipe.description}</p>
                                    <RecipeMeta
                                        className="hero__overlay-meta"
                                        time={safeFeaturedRecipe.time || `${safeFeaturedRecipe.timeInMins ?? '-'} min`}
                                        difficulty={safeFeaturedRecipe.difficulty || '-'}
                                        servings={safeFeaturedRecipe.servings || '-'}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="hero__overlay">
                                <span className="hero__overlay-label">Laddar</span>
                                <h2 className="hero__overlay-title">Hämtar recept...</h2>
                            </div>
                        )}
                    </div>

                    {safeSecondaryRecipe ? (
                        <Link className="hero__taste-card" to={`/recipe/${safeSecondaryRecipe.id}`}>
                            <span className="hero__taste-label">Nästa favorit</span>
                            <strong>{safeSecondaryRecipe.title}</strong>
                            <p>{safeSecondaryRecipe.excerpt || safeSecondaryRecipe.description}</p>
                        </Link>
                    ) : (
                        <div className="hero__taste-card">
                            <span className="hero__taste-label">Nästa favorit</span>
                            <strong>Laddar...</strong>
                            <p>Fler recept visas snart.</p>
                        </div>
                    )}

                    <div className="hero__stats">
                        <div className="hero__stat">
                            <strong>{safeCategories.length}</strong>
                            <span>tydliga kategorier</span>
                        </div>
                        <div className="hero__stat">
                            <strong>{featuredRating.toFixed(1)}</strong>
                            <span>betyg på startsidans huvudrecept</span>
                        </div>
                        <div className="hero__stat">
                            <strong>{featuredReviewCount}</strong>
                            <span>omdömen i testdatan</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
