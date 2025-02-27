// import React from "react";
import PropTypes from "prop-types";

function IngredientInput({ ingredient, index, onChange }) {
  return (
    <div className="ingredient-row">
      <input
        type="text"
        name="name"
        placeholder="Ingredient name"
        value={ingredient.name}
        onChange={(e) => onChange(index, e)}
        required
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={ingredient.amount}
        onChange={(e) => onChange(index, e)}
      />
      <input
        type="text"
        name="unit"
        placeholder="Unit"
        value={ingredient.unit}
        onChange={(e) => onChange(index, e)}
      />
      {/* <button
        type="button"
        className="remove-ingredient-btn"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
      >
        Del
      </button> */}
    </div>
  );
}

// PropTypes
IngredientInput.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // canRemove: PropTypes.bool.isRequired,
};
export default IngredientInput;
