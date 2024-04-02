import React, { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import SelectedCharacters from './SelectedCharacters';
import { fetchCharacters } from './api/api'; // This function should fetch character data.
import "./App.css"

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]); // This will store character names for the autocomplete.
  const [selectedCharacters, setSelectedCharacters] = useState([]); // This will store the user's selections.

  useEffect(() => {
    const getCharacters = async () => {
      const chars = await fetchCharacters();
      const characterNames = chars.map((char) => char.name);
      setCharacters(characterNames);
    };

    getCharacters();
  }, []);

  const handleSelection = (character) => {
    setSelectedCharacters([...selectedCharacters, character]);
  };

  const handleRemoveCharacter = (character) => {
    setSelectedCharacters(selectedCharacters.filter((char) => char !== character));
  };

  return (
    <div>
      <Autocomplete suggestions={characters} onSelection={handleSelection} />
      <SelectedCharacters selected={selectedCharacters} onRemove={handleRemoveCharacter} />
    </div>
  );
};

export default CharacterSelector;
