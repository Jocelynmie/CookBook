// RecipeCard.js
import "./RecipeCard.css";

function RecipeCard(props) {
  const recipe = props.recipeData;
  // const recipe = recipeData || defaultRecipe;
  return (
    <>
      <div className="recipe-card">
        <div className="recipe-card-header">
          <h3>{recipe.name}</h3>
          <div className="recipe-card-content">
            <div className="recipe-image">
              <img src={recipe.imageUrl} alt={recipe.name}></img>
            </div>
            <div className="recipe-details">
              <p>{recipe.description}</p>
              <div className="recipe-meta">
                <span>{recipe.cookTime} mins</span>
              </div>
            </div>
            <div className="recipe-ingredients">
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} {ingredient.amount} {ingredient.unit}
                  </li>
                ))}
              </ul>
              <div className="recipe-action-buttons">
                <button className="add-to-shopping-list-btn">
                  Add To Shopping List
                </button>
                <button className="delete-recipe-btn">Delete Recipe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import PropTypes from "prop-types";

RecipeCard.propTypes = {
  recipeData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        unit: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default RecipeCard;
