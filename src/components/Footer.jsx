import { Link } from 'react-router-dom'
import { categories } from '../data/recipes'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="eyebrow">Ricetta</p>
            <h2>Italienska recept med varm premiumkänsla och tydlig redaktionell ton.</h2>
            <p>
              Byggd som grundstruktur för Ricettas skolarbete, med testdata på plats medan
              kopplingen till riktig data fortfarande ligger i nästa fas.
            </p>
          </div>

          <div className="footer__links" aria-label="Sidfotens länkar">
            {categories.map((category) => (
              <Link key={category.slug} className="footer__link" to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>Utvecklad lokalt för kursprojektet med svenskt testinnehåll.</span>
          <span>
            Ricetta &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
