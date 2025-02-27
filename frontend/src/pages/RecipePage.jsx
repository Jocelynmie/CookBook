// import React from "react";
import RecipeList from "../components/RecipeList";
import AddRecipeForm from "../components/AddRecipeForm";

function RecipePage() {
  return (
    <div>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default RecipePage;
