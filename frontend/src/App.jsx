// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingListPage from "./pages/ShoppingListPage";
// import RecipeCard from "./components/RecipeCard";
// import { Router } from "react-router-dom";
// import AddRecipeForm from "./components/AddRecipeForm";
import Navbar from "./components/Navbar";
// import RecipeList from "./components/RecipeList";
import RecipePage from "./pages/RecipePage";
// import Test from "./Test";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* 主页路由 */}
        <Route path="/recipes-page" element={<RecipePage />} />
        <Route path="/shopping-list-page" element={<ShoppingListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
