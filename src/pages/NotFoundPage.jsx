
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <section className="section container">
            <div className="empty-state">
                <p className="section-heading__eyebrow">404</p>
                <h1>Den sidan finns inte på menyn.</h1>
                <p>Gå tillbaka till startsidan och prova en annan väg genom receptsamlingen.</p>
                <Link className="button" to="/">
                    Till startsidan
                </Link>
            </div>
        </section>
    )
}

export default NotFoundPage
