import { useState } from "react";
import "./AddRecipeForm.css";
import IngredientInput from "./IngredientInput"; // 导入 IngredientInput 组件

function AddRecipeForm() {
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    cookTime: 30,
    ingredients: [{ name: "", amount: "", unit: "" }],
  });

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [name]: value,
    };
    setRecipeData({
      ...recipeData,
      ingredients: updatedIngredients,
    });
  };

  const addIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [
        ...recipeData.ingredients, //copy before
        { name: "", amount: "", unit: "" }, //add new one(empty)
      ],
    });
  };

  //   const removeIngredient = (index) => {
  //     const updatedIngredients = recipeData.ingredients.filter(
  //       (element, i) => i !== index
  //     ); //need to be saved

  //     setRecipeData({
  //       ...recipeData,
  //       ingredients: updatedIngredients,
  //     });
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 准备提交的数据
      const recipeToSubmit = {
        ...recipeData,
        cookTime: parseInt(recipeData.cookTime, 10) || 0,
      };

      // 发送数据到API
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const result = await response.json();
      console.log("Recipe added successfully:", result);

      setRecipeData({
        name: "",
        description: "",
        cookTime: 30,
        ingredients: [{ name: "", amount: "", unit: "" }],
      });

      alert("Recipe added successfully!");

      //get all recipes
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to add recipe: " + error.message);
    }
  };

  return (
    <div className="add-recipe-form-container">
      <div className="add-recipe-form-header">
        <h3>Add New Recipe</h3>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>
        {/* 食谱名称 */}
        <div className="form-group">
          <label htmlFor="name">Name:*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipeData.name}
            onChange={(e) =>
              setRecipeData({ ...recipeData, name: e.target.value })
            }
            required
          />
        </div>

        {/* 食谱描述 */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={recipeData.description}
            onChange={(e) =>
              setRecipeData({ ...recipeData, description: e.target.value })
            }
          />
        </div>

        {/* 烹饪时间 */}
        <div className="form-group">
          <label htmlFor="cookTime">CookTime (mins)*</label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            min="1"
            value={recipeData.cookTime}
            onChange={(e) =>
              setRecipeData({ ...recipeData, cookTime: e.target.value })
            }
            required
          />
        </div>

        {/* 食谱图片 */}
        <div className="form-group">
          <label htmlFor="image">Recipe Image</label>
          <input type="file" id="image" name="image" accept="image/*" />
        </div>

        {/* 配料部分 */}
        <div className="form-group ingredients-section">
          <label>Ingredients*</label>

          {recipeData.ingredients.map((ingredient, index) => (
            <IngredientInput
              key={index}
              ingredient={ingredient}
              index={index}
              onChange={handleIngredientChange}
            />
          ))}

          {/* 添加配料按钮 */}
          <button
            type="button"
            className="add-ingredient-btn"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </div>

        {/* 表单操作按钮 */}
        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;
