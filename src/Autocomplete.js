import React, { useState, useEffect } from 'react';

const Autocomplete = ({ suggestions = [], onSelection }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const filtered = userInput
      ? suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(userInput.toLowerCase())
        )
      : [];
    setFilteredSuggestions(filtered);
  }, [userInput, suggestions]);

  const handleSelection = (suggestion) => {
    setUserInput('');
    setFilteredSuggestions([]);
    if (onSelection) {
      onSelection(suggestion);
    }
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Start typing..."
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelection(suggestion)} className="suggestion-item">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
