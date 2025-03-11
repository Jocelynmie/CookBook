// import React from "react";

import { useState } from "react";
import SuggestionList from "../components/SuggestionList";

function Suggestions() {
  const [name, setName] = useState("");
  const [newSuggestion, setNewSuggestion] = useState("");
  //   const [suggestions, setSuggestion] = useState([]);

  return (
    <div>
      <h1>Suggestions</h1>
      <div className="suggestions-form-container">
        <h2>Please Submit Your Suggestions</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Your name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="suggestion">Suggestion:</label>
            <textarea
              id="suggestion"
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <SuggestionList />
    </div>
  );
}

export default Suggestions;
