// import React from "react";
import RecipeList from "../components/RecipeList";
import WeeklyMealPlan from "../components/WeeklyMealPlan";

function Homepage() {
  return (
    <div className="home-page">
      <div className="recipes-section">
        <RecipeList />
      </div>
      <div className="meal-plan-section">
        <WeeklyMealPlan />
      </div>
    </div>
  );
}

export default Homepage;
