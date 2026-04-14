
import { useState } from 'react'

function RatingStars({ initialRating, reviewCount }) {
    const roundedRating = Math.round(initialRating)
    const [selectedRating, setSelectedRating] = useState(0)

    return (
        <section className="panel rating-panel">
            <div className="rating-panel__headline">
                <div>
                    <p className="section-heading__eyebrow">Betygsförhandsvisning</p>
                    <h2 className="panel__title">Vad tycker du om receptet?</h2>
                </div>
                <div className="rating-panel__score">{initialRating.toFixed(1)}</div>
            </div>

            <div className="rating-stars" aria-label="Kontroller för receptbetyg">
                {[1, 2, 3, 4, 5].map((value) => {
                    const isActive = value <= (selectedRating || roundedRating)

                    return (
                        <button
                            key={value}
                            className={`rating-stars__button${isActive ? ' is-active' : ''}`}
                            type="button"
                            aria-label={`Ge ${value} stjärnor`}
                            onClick={() => setSelectedRating(value)}
                        >
                            &#9733;
                        </button>
                    )
                })}
            </div>

            <p className="rating-panel__note">
                {selectedRating > 0
                    ? `Ditt förhandsbetyg: ${selectedRating} av 5 stjärnor.`
                    : `${reviewCount} omdömen finns just nu kopplade till receptet i testdatan.`}
            </p>
        </section>
    )
}

export default RatingStars
