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
import "./App.css";
import SuggestionPage from "./pages/SuggestionPage";
// import Test from "./Test";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes-page" element={<RecipePage />} />
          <Route path="/shopping-list-page" element={<ShoppingListPage />} />
          <Route path="/suggestions" element={<SuggestionPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>Made by Jocelyn Yang © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
