import { useState, useEffect } from 'react';
import { searchMulti } from '../services/search';

/**
 * Custom hook for managing search functionality
 * @param {string} query - Search query string
 * @param {string} filter - Active filter type (movie, tv, person, etc.)
 * @param {number} page - Current page number
 * @returns {Object} Search state and data
 */
export const useSearch = (query, filter = 'movie', page = 1) => {
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't search if query is empty
    if (!query || query.trim() === '') {
      setResults([]);
      setTotalPages(0);
      setTotalResults(0);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchMulti(query, filter, page);
        
        setResults(data.results || []);
        setTotalPages(data.total_pages || 0);
        setTotalResults(data.total_results || 0);
      } catch (err) {
        console.error('Search error:', err);
        setError(err.message || 'Failed to fetch search results');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, filter, page]);

  return {
    results,
    totalPages,
    totalResults,
    isLoading,
    error,
  };
};
