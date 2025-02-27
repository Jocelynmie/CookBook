import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function RecipeList({ recipes: propRecipes, setRecipes, fetchRecipes }) {
  const [loading, setLoading] = useState(true);
  const [localRecipes, setLocalRecipes] = useState([]);

  useEffect(() => {
    // 如果父组件提供了 recipes，使用这些 recipes
    if (propRecipes && propRecipes.length > 0) {
      setLocalRecipes(propRecipes);
      setLoading(false);
      return;
    }

    // 否则自己获取 recipes
    async function loadRecipes() {
      try {
        setLoading(true);
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setLocalRecipes(data);
        // 如果父组件提供了 setRecipes 函数，更新父组件状态
        if (setRecipes) {
          setRecipes(data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, [propRecipes, setRecipes]);

  // 当父组件想要刷新数据时使用
  useEffect(() => {
    if (fetchRecipes) {
      fetchRecipes();
    }
  }, [fetchRecipes]);

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      {localRecipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        localRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id ? recipe._id.$oid || recipe._id : Math.random()}
            recipeData={recipe}
          />
        ))
      )}
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.array,
  setRecipes: PropTypes.func,
  fetchRecipes: PropTypes.func,
};

export default RecipeList;
