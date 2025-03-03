import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import PropTypes from "prop-types";

function RecipeList({ onRecipeDeleted }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取食谱数据
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载和刷新数据
  useEffect(() => {
    fetchRecipes();
  }, []);

  // 处理食谱删除
  const handleRecipeDeleted = (recipeId) => {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => {
        const recipeIdStr =
          typeof recipe._id === "object"
            ? recipe._id.$oid || recipe._id.toString()
            : recipe._id;

        const deletedIdStr =
          typeof recipeId === "object"
            ? recipeId.$oid || recipeId.toString()
            : recipeId;

        return recipeIdStr !== deletedIdStr;
      })
    );

    // 通知父组件(如果有的话)
    if (onRecipeDeleted) {
      onRecipeDeleted(recipeId);
    }
  };

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id ? recipe._id.$oid || recipe._id : Math.random()}
            recipeData={recipe}
            onRecipeDeleted={handleRecipeDeleted}
          />
        ))
      )}
    </div>
  );
}

RecipeList.propTypes = {
  onRecipeDeleted: PropTypes.func,
};

export default RecipeList;
