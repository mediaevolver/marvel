import React, { useState, useEffect } from 'react';
import { fetchCharacters } from './api/api';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const CharacterDisplay = ({ characters, onCharacterSelect }) => (
    <div className="character-display">
      {characters.map((character) => (
        <div key={character.id} onClick={() => onCharacterSelect(character)}>
          <img src={character.thumbnail} alt={character.name} />
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );

  const SelectedCharacters = ({ selectedCharacters, onRemoveCharacter }) => (
    <ul className="selected-characters">
      {selectedCharacters.map((character) => (
        <li key={character.id}>
          {character.name} <button onClick={() => onRemoveCharacter(character.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
  
  useEffect(() => {
    const getCharacters = async () => {
      const charactersFromApi = await fetchCharacters();
      setCharacters(charactersFromApi);
    };

    getCharacters();
  }, []);

  const handleCharacterSelect = (character) => {
    setSelectedCharacters([...selectedCharacters, character]);
  };

  const handleRemoveCharacter = (id) => {
    setSelectedCharacters(selectedCharacters.filter((character) => character.id !== id));
  };

  return (
    <div className="app">
      <CharacterDisplay characters={characters} onCharacterSelect={handleCharacterSelect} />
      <SelectedCharacters selectedCharacters={selectedCharacters} onRemoveCharacter={handleRemoveCharacter} />
    </div>
  );
};

export default App;
