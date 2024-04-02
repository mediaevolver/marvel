import React, { useState, useEffect } from 'react';
import "./Autocomplete.css";

const Autocomplete = ({ suggestions = [], onSelection }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (userInput) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [userInput, suggestions]);

  const handleSelection = (suggestion) => {
    setUserInput('');
    setFilteredSuggestions([]);
    onSelection && onSelection(suggestion);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Start typing..."
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      />
      <ul className="suggestions-list">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelection(suggestion)} className="suggestion-item">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
