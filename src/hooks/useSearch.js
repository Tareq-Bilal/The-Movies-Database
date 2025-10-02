import { useState, useEffect } from 'react';
import { get } from '../utils/http';

/**
 * Custom hook for searching movies by name
 * @param {string} query - Search query string
 * @returns {Object} - { data, loading, error }
 */
const useSearch = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          query: query.trim(),
          include_adult: false,
          language: 'en-US',
          page: 1,
        };

        const response = await get('/search/movie', params);
        setData(response);
      } catch (err) {
        setError(err.message || 'Failed to search movies');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  return { data, loading, error };
};

export default useSearch;
