import React, { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import SelectedCharacters from './SelectedCharacters';
import { fetchCharacters } from './api/api';
import "./App.css";

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  useEffect(() => {
    let isMounted = true;  // Track the mounted status to avoid state update if the component is unmounted

    const getCharacters = async () => {
      try {
        const chars = await fetchCharacters();
        if (Array.isArray(chars) && isMounted) {
          const characterNames = chars.map(char => char.name);
          setCharacters(characterNames);
        }
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        if (isMounted) {
          setCharacters([]);
        }
      }
    };

    getCharacters();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
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
