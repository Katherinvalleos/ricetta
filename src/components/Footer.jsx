import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../api/recipes'

function Footer() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch (err) {
                setError('Kunde inte h�mta kategorier.')
                console.error(err)
            }
        }

        loadCategories()
    }, [])

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__top">
                    <div className="footer__brand">
                        <p className="eyebrow">Ricetta</p>
                        <h2>Italienska recept med varm premiumkänsla och tydlig redaktionell ton.</h2>
                        <p>
                            Byggd som grundstruktur för Ricettas skolarbete, med riktig receptdata från API:t
                            som nästa steg i utvecklingen.
                        </p>
                    </div>

                    <div className="footer__links" aria-label="Sidfotens länkar">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                className="footer__link"
                                to={`/category/${category.slug}`}
                            >
                                {category.name}
                            </Link>
                        ))}

                        {error && <p className="footer__error">{error}</p>}
                    </div>
                </div>

                <div className="footer__bottom">
                    <span>Utvecklad lokalt för kursprojektet med data från API.</span>
                    <span>Ricetta &copy; {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer