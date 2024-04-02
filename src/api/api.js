const API_BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const API_KEY = process.env.REACT_APP_MARVEL_API_KEY;

export const fetchCharacters = async () => {
  const url = `${API_BASE_URL}/characters?apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    // Check if the expected data structure is present
    return data.data && data.data.results ? data.data.results : [];
  } catch (error) {
    console.error('Error fetching data from Marvel API:', error);
    return []; // Ensure function always returns an array, even in case of an error
  }
};

