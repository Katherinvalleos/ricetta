export function getAverageRatingValue(rating) {
    if (rating === null || rating === undefined) {
        return null
    }

    const numericRating = Number(rating)

    return Number.isFinite(numericRating) ? numericRating : null
}

export function formatAverageRating(rating, fallback = 'Inga betyg ännu') {
    const averageRating = getAverageRatingValue(rating)

    return averageRating === null ? fallback : averageRating.toFixed(1)
}

export function isValidRecipeRating(rating) {
    const numericRating = Number(rating)

    return Number.isInteger(numericRating) && numericRating >= 1 && numericRating <= 5
}
