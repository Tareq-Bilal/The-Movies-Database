import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from an API.
 * @param {string} url - The API endpoint.
 * @returns {Object} - { data, error, loading }
 */
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

/**
 * Custom hook for managing state in localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - The initial value.
 * @returns {Array} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom hook for fetching a poster image.
 * @param {string} posterPath - The poster path from the API.
 * @returns {string} - The full URL of the poster image.
 */
export const useFetchPoster = (posterPath) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  return posterPath ? `${baseUrl}${posterPath}` : '';
};
