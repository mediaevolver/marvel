import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterSelector from './App';
import { fetchCharacters } from './api/api';

jest.mock('./api/api');

describe('CharacterSelector', () => {
  test('renders CharacterSelector without crashing', async () => {
    fetchCharacters.mockResolvedValueOnce([]);
    render(<CharacterSelector />);
    expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
  });

  test('renders Autocomplete with initial empty suggestions', async () => {
    fetchCharacters.mockResolvedValueOnce([]);
    render(<CharacterSelector />);
    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });

  test('SelectedCharacters renders when characters are selected', async () => {
    const fakeCharacters = [{ name: 'Iron Man' }, { name: 'Thor' }];
    fetchCharacters.mockResolvedValueOnce(fakeCharacters);
    render(<CharacterSelector />);
    await waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
  
    // Diagnostic log to inspect what's rendered at this point
    console.log(screen.debug());

    // Use findBy to await the appearance of the button
    const characterButton = await screen.findByText(fakeCharacters[0].name);
    userEvent.click(characterButton);

    // Another diagnostic log to inspect changes after the interaction
    console.log(screen.debug());

    // Verify that the selected character's remove button is rendered
    await waitFor(() => {
      expect(screen.getByText(`${fakeCharacters[0].name} Remove`)).toBeInTheDocument();
    });
  });
});
