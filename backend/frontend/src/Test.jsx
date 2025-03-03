import { useState, useCallback } from "react";
import RecipeList from "../components/RecipeList";
import AddRecipeForm from "../components/AddRecipeForm";

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 创建一个函数来获取所有食谱
  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch("/api/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  // 当新食谱添加成功后调用此函数
  const handleRecipeAdded = useCallback(() => {
    // 更新 refreshTrigger 以触发 RecipeList 的重新获取数据
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <div>
      <AddRecipeForm onRecipeAdded={handleRecipeAdded} />
      <RecipeList
        recipes={recipes}
        setRecipes={setRecipes}
        fetchRecipes={fetchRecipes}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default RecipePage;
