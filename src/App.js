import React, { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import SelectedCharacters from './SelectedCharacters';
import { fetchCharacters } from './api/api';
import "./App.css";

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const chars = await fetchCharacters();
      if (Array.isArray(chars)) {
        const characterNames = chars.map(char => char.name);
        setCharacters(characterNames);
      }
    };

    getCharacters();
  }, []);

  const handleSelection = (character) => {
    setSelectedCharacters(current => [...current, character]);
  };

  const handleRemoveCharacter = (character) => {
    setSelectedCharacters(current => current.filter((char) => char !== character));
  };

  return (
    <div>
      <Autocomplete suggestions={characters} onSelection={handleSelection} />
      <SelectedCharacters selected={selectedCharacters} onRemove={handleRemoveCharacter} />
    </div>
  );
};

export default CharacterSelector;
