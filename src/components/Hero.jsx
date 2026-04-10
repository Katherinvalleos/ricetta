import { Link } from 'react-router-dom'
import RecipeMeta from './RecipeMeta'
import SearchBar from './SearchBar'

function Hero({ featuredRecipe, secondaryRecipe, searchValue, onSearchChange, categories }) {
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
            <Link className="button" to={`/recipe/${featuredRecipe.id}`}>
              Se veckans recept
            </Link>
            <a className="button button--secondary" href="#categories">
              Utforska kategorier
            </a>
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
            {categories.slice(0, 5).map((category) => (
              <Link className="hero__chip" key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-card">
            <img
              className="hero__image"
              src={featuredRecipe.image}
              alt={featuredRecipe.title}
              loading="eager"
            />
            <div className="hero__overlay">
              <span className="hero__overlay-label">Veckans utvalda</span>
              <h2 className="hero__overlay-title">{featuredRecipe.title}</h2>
              <p>{featuredRecipe.excerpt}</p>
              <RecipeMeta
                className="hero__overlay-meta"
                time={featuredRecipe.time}
                difficulty={featuredRecipe.difficulty}
                servings={featuredRecipe.servings}
              />
            </div>
          </div>

          <Link className="hero__taste-card" to={`/recipe/${secondaryRecipe.id}`}>
            <span className="hero__taste-label">Nästa favorit</span>
            <strong>{secondaryRecipe.title}</strong>
            <p>{secondaryRecipe.excerpt}</p>
          </Link>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>{categories.length}</strong>
              <span>tydliga kategorier</span>
            </div>
            <div className="hero__stat">
              <strong>{featuredRecipe.rating.toFixed(1)}</strong>
              <span>betyg på startsidans huvudrecept</span>
            </div>
            <div className="hero__stat">
              <strong>{featuredRecipe.reviewCount}</strong>
              <span>omdömen i testdatan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
