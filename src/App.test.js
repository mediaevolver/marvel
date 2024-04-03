import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterSelector from './App';
import { fetchCharacters } from './api/api';

jest.mock('./api/api');

describe('CharacterSelector', () => {

  test('renders CharacterSelector without crashing', async () => {
    fetchCharacters.mockResolvedValueOnce([]);
    await act(async () => {
      render(<CharacterSelector />);
    });

    // Use waitFor to ensure all promises and state updates have completed
    await waitFor(() => screen.findByPlaceholderText('Start typing...'));
  });

 test('renders Autocomplete with initial empty suggestions', async () => {
  const mockCharacters = [];
  fetchCharacters.mockResolvedValueOnce(mockCharacters);
  render(<CharacterSelector />);

  await waitFor(() => {
    expect(fetchCharacters).toHaveBeenCalledTimes(1);
  });

  // Using waitFor to ensure we give enough time for any list items to potentially render
  await waitFor(() => {
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });
});


});