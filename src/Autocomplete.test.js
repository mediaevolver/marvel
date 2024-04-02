import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Autocomplete from './Autocomplete';

describe('Autocomplete', () => {
  const testSuggestions = ['Apple', 'Banana', 'Orange'];

  test('renders input element', () => {
    render(<Autocomplete suggestions={testSuggestions} />);
    expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
  });

  test('filters suggestions based on input', () => {
    const testSuggestions = ['Apple', 'Banana', 'Orange'];
    render(<Autocomplete suggestions={testSuggestions} />);
    fireEvent.change(screen.getByPlaceholderText('Start typing...'), { target: { value: 'a' } });
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  test('clears input on selection', () => {
    const handleSelectionMock = jest.fn();
    render(<Autocomplete suggestions={testSuggestions} onSelection={handleSelectionMock} />);
    fireEvent.change(screen.getByPlaceholderText('Start typing...'), { target: { value: 'a' } });
    fireEvent.click(screen.getByText('Apple'));
    expect(handleSelectionMock).toHaveBeenCalledWith('Apple');
    expect(screen.getByPlaceholderText('Start typing...').value).toBe('');
  });
});
