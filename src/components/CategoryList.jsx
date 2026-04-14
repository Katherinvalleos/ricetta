
import { Link } from 'react-router-dom'

function CategoryList({ categories, title, description, eyebrow = 'Kategorier' }) {
    return (
        <section className="section container" id="categories">
            <div className="section-heading">
                <div className="section-heading__content">
                    <p className="section-heading__eyebrow">{eyebrow}</p>
                    <h2 className="section-heading__title">{title}</h2>
                    <p className="section-heading__description">{description}</p>
                </div>
            </div>

            <div className="category-list">
                {categories.map((category) => (
                    <Link className="category-card" key={category.slug} to={`/category/${category.slug}`}>
                        <div className="category-card__image-wrap">
                            <img className="category-card__image" src={category.image} alt={category.name} />
                        </div>
                        <div className="category-card__body">
                            <span className="category-card__count">{category.recipeCount} recept</span>
                            <h3 className="category-card__title">{category.name}</h3>
                            <p className="category-card__description">{category.description}</p>
                            <div className="category-card__footer">
                                <span className="category-card__accent">{category.accent}</span>
                                <span className="category-card__link">Visa kategori</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CategoryList
