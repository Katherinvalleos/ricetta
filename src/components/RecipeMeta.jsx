
function RecipeMeta({ time, difficulty, servings, className = '' }) {
    const metaItems = [
        { label: 'Tillagningstid', value: time },
        { label: 'Svårighetsgrad', value: difficulty },
        { label: 'Portioner', value: servings ? `${servings} portioner` : null },
    ].filter((item) => item.value)

    return (
        <dl className={['recipe-meta', className].filter(Boolean).join(' ')}>
            {metaItems.map((item) => (
                <div className="recipe-meta__item" key={item.label}>
                    <dt className="recipe-meta__label">{item.label}</dt>
                    <dd className="recipe-meta__value">{item.value}</dd>
                </div>
            ))}
        </dl>
    )
}

export default RecipeMeta
