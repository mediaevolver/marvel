import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedCharacters from './SelectedCharacters'; // Adjust the import path as necessary

describe('SelectedCharacters', () => {

  test('displays a list of selected characters', () => {
    const selected = ['Character A', 'Character B', 'Character C'];
    render(<SelectedCharacters selected={selected} onRemove={() => {}} />);

    selected.forEach(character => {
      expect(screen.getByText(character)).toBeInTheDocument();
    });
  });

  test('calls onRemove with character name when remove button is clicked', () => {
    const selected = ['Character A'];
    const handleRemove = jest.fn();
    render(<SelectedCharacters selected={selected} onRemove={handleRemove} />);

    fireEvent.click(screen.getByText('Remove'));
    expect(handleRemove).toHaveBeenCalledWith('Character A');
  });
});
