import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__main">
                    <div className="footer__brand">
                        <p className="eyebrow">Ricetta</p>
                        <h2>En varm journal för italienska smaker, långsamma såser och generösa middagar.</h2>
                        <p>
                            Ricetta samlar recept som känns inbjudande, eleganta och lätta att återvända till
                            när du vill laga något italienskt med lite mer känsla.
                        </p>
                    </div>

                    <nav className="footer__nav" aria-label="Sidfotens länkar">
                        <Link className="footer__link" to="/">
                            Hem
                        </Link>
                        <Link className="footer__link" to="/categories">
                            Alla kategorier
                        </Link>
                    </nav>
                </div>

                <div className="footer__bottom">
                    <span>För dig som vill hitta nästa italienska favorit med lite mer matlust och rytm.</span>
                    <span>Ricetta &copy; {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
