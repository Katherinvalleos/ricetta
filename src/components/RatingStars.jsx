import { useState } from 'react'
import { formatAverageRating, getAverageRatingValue, isValidRecipeRating } from '../utils/ratings'

function RatingStars({
    averageRating,
    isSubmitting = false,
    successMessage = '',
    errorMessage = '',
    onSubmitRating,
}) {
    const numericAverageRating = getAverageRatingValue(averageRating)
    const roundedRating = numericAverageRating === null ? 0 : Math.round(numericAverageRating)
    const [selectedRating, setSelectedRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)

    const activeRating = hoveredRating || selectedRating || roundedRating

    async function handleRatingClick(value) {
        if (isSubmitting || !isValidRecipeRating(value)) {
            return
        }

        setSelectedRating(value)
        await onSubmitRating?.(value)
    }

    const statusText = (() => {
        if (isSubmitting) return 'Skickar ditt betyg...'
        if (errorMessage) return errorMessage
        if (successMessage) return successMessage
        if (selectedRating > 0) return `Ditt betyg: ${selectedRating} av 5 stjärnor.`

        return numericAverageRating === null
            ? 'Inga betyg ännu. Var först med att sätta betyg.'
            : `Nuvarande snittbetyg: ${formatAverageRating(numericAverageRating)} av 5.`
    })()

    return (
        <section className="panel rating-panel">
            <div className="rating-panel__headline">
                <div>
                    <p className="section-heading__eyebrow">Betyg</p>
                    <h2 className="panel__title">Vad tycker du om receptet?</h2>
                    <p className="rating-panel__summary">
                        {numericAverageRating === null
                            ? 'Det här receptet väntar fortfarande på sitt första betyg.'
                            : `Snittbetyg från API:t: ${formatAverageRating(numericAverageRating)} av 5.`}
                    </p>
                </div>
                <div className="rating-panel__score" aria-label={formatAverageRating(numericAverageRating)}>
                    {numericAverageRating === null ? '–' : formatAverageRating(numericAverageRating)}
                </div>
            </div>

            <div className="rating-stars" aria-label="Kontroller för receptbetyg">
                {[1, 2, 3, 4, 5].map((value) => {
                    const isActive = value <= activeRating

                    return (
                        <button
                            key={value}
                            className={`rating-stars__button${isActive ? ' is-active' : ''}`}
                            type="button"
                            aria-label={`Ge ${value} av 5 stjärnor`}
                            aria-pressed={selectedRating === value}
                            disabled={isSubmitting}
                            onBlur={() => setHoveredRating(0)}
                            onClick={() => handleRatingClick(value)}
                            onFocus={() => setHoveredRating(value)}
                            onMouseEnter={() => setHoveredRating(value)}
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            &#9733;
                        </button>
                    )
                })}
            </div>

            <p
                className={[
                    'rating-panel__note',
                    successMessage ? 'rating-panel__note--success' : '',
                    errorMessage ? 'rating-panel__note--error' : '',
                ].filter(Boolean).join(' ')}
                aria-live="polite"
            >
                {statusText}
            </p>
        </section>
    )
}

export default RatingStars
