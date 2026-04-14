function IngredientList({ ingredients }) {
    return (
        <ul className="ingredient-list">
            {ingredients.map((ingredient) => (
                <li className="ingredient-list__item" key={ingredient._id}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
            ))}
        </ul>
    )
}

export default IngredientList