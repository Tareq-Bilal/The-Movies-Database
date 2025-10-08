import { useState, useEffect } from 'react';
import { fetchData } from '../lib/api';

const useMultiSearch = (query, page = 1) => {
  const [results, setResults] = useState({
    movies: [],
    tv: [],
    people: [],
    keywords: [],
    collections: [],
    companies: [],
    networks: [],
    awards: [],
  });

  const [counts, setCounts] = useState({
    movies: 0,
    tv: 0,
    people: 0,
    keywords: 0,
    collections: 0,
    companies: 0,
    networks: 0,
    awards: 0,
  });

  const [totalPages, setTotalPages] = useState({
    movies: 0,
    tv: 0,
    people: 0,
    keywords: 0,
    collections: 0,
    companies: 0,
    networks: 0,
    awards: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setResults({
        movies: [],
        tv: [],
        people: [],
        keywords: [],
        collections: [],
        companies: [],
        networks: [],
        awards: [],
      });
      setCounts({
        movies: 0,
        tv: 0,
        people: 0,
        keywords: 0,
        collections: 0,
        companies: 0,
        networks: 0,
        awards: 0,
      });
      setTotalPages({
        movies: 0,
        tv: 0,
        people: 0,
        keywords: 0,
        collections: 0,
        companies: 0,
        networks: 0,
        awards: 0,
      });
      return;
    }

    const searchAllEndpoints = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchPromises = [
          // Movies
          fetchData(
            `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
          )
            .then((data) => {
              console.log('Movies results:', data);
              return { type: 'movies', data };
            })
            .catch((err) => {
              console.error('Movies search error:', err);
              return {
                type: 'movies',
                data: { results: [], total_results: 0 },
              };
            }),

          // TV Shows
          fetchData(
            `/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
          )
            .then((data) => {
              console.log('TV results:', data);
              return { type: 'tv', data };
            })
            .catch((err) => {
              console.error('TV search error:', err);
              return { type: 'tv', data: { results: [], total_results: 0 } };
            }),

          // People
          fetchData(
            `/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
          )
            .then((data) => {
              console.log('People results:', data);
              return { type: 'people', data };
            })
            .catch((err) => {
              console.error('People search error:', err);
              return {
                type: 'people',
                data: { results: [], total_results: 0 },
              };
            }),

          // Keywords
          fetchData(
            `/search/keyword?query=${encodeURIComponent(query)}&page=${page}`
          )
            .then((data) => {
              console.log('Keywords results:', data);
              return { type: 'keywords', data };
            })
            .catch((err) => {
              console.error('Keywords search error:', err);
              return {
                type: 'keywords',
                data: { results: [], total_results: 0 },
              };
            }),

          // Collections
          fetchData(
            `/search/collection?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
          )
            .then((data) => {
              console.log('Collections results:', data);
              return { type: 'collections', data };
            })
            .catch((err) => {
              console.error('Collections search error:', err);
              return {
                type: 'collections',
                data: { results: [], total_results: 0 },
              };
            }),

          // Companies
          fetchData(
            `/search/company?query=${encodeURIComponent(query)}&page=${page}`
          )
            .then((data) => {
              console.log('Companies results:', data);
              return { type: 'companies', data };
            })
            .catch((err) => {
              console.error('Companies search error:', err);
              return {
                type: 'companies',
                data: { results: [], total_results: 0 },
              };
            }),

          // Networks
          fetchData(
            `/search/network?query=${encodeURIComponent(query)}&page=${page}`
          )
            .then((data) => {
              console.log('Networks results:', data);
              return { type: 'networks', data };
            })
            .catch((err) => {
              console.error('Networks search error:', err);
              return {
                type: 'networks',
                data: { results: [], total_results: 0 },
              };
            }),

          // Awards
          fetchData(
            `/search/award?query=${encodeURIComponent(query)}&page=${page}`
          )
            .then((data) => {
              console.log('Awards results:', data);
              return { type: 'awards', data };
            })
            .catch((err) => {
              console.error('Awards search error:', err);
              return {
                type: 'awards',
                data: { results: [], total_results: 0 },
              };
            }),
        ];

        const searchResults = await Promise.all(searchPromises);

        const newResults = {};
        const newCounts = {};
        const newTotalPages = {};

        searchResults.forEach(({ type, data }) => {
          newResults[type] = data.results || [];
          newCounts[type] = data.total_results || 0;
          newTotalPages[type] = data.total_pages || 0;
        });

        console.log('Final results:', newResults);
        console.log('Final counts:', newCounts);
        console.log('Total pages:', newTotalPages);

        setResults(newResults);
        setCounts(newCounts);
        setTotalPages(newTotalPages);
      } catch (err) {
        setError(err.message);
        console.error('Multi-search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchAllEndpoints();
    }, 500); // Debounce 500ms

    return () => clearTimeout(debounceTimer);
  }, [query, page]);

  return { results, counts, totalPages, loading, error };
};

export default useMultiSearch;
