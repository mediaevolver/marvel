import React from 'react';

const SelectedCharacters = ({ selected, onRemove }) => (
    <div className="addedResults">
        <ul>
            {selected.map((character, index) => (
                <li key={index}>
                    {character} <button onClick={() => onRemove(character)}>Remove</button>
                </li>
            ))}
        </ul>
    </div>
);

export default SelectedCharacters;
