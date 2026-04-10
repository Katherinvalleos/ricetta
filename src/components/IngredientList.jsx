function IngredientList({ ingredients }) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <li className="ingredient-list__item" key={ingredient}>
          {ingredient}
        </li>
      ))}
    </ul>
  )
}

export default IngredientList
