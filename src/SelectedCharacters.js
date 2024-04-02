import React from 'react';

const SelectedCharacters = ({ selected, onRemove }) => (
  <ul>
    {selected.map((character, index) => (
      <li key={index}>
        {character} <button onClick={() => onRemove(character)}>Remove</button>
      </li>
    ))}
  </ul>
);

export default SelectedCharacters;
