import { useState, useEffect } from 'react';
import { get } from '../utils/http';

/**
 * useFetchTrending
 * @param {string} url - base url (e.g. 'https://api.themoviedb.org/3/trending/movie')
 * @param {string} time_window - 'day' or 'week'
 */
const useFetchTrending = (url, time_window = 'day') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let mounted = true;
    const controller = new AbortController();

    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the project's `get` helper which already handles the base URL and headers
        const endpoint = `${url}/${time_window}`;
        const json = await get(endpoint);
        if (mounted) {
          setData(json.results || []);
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTrending();

    return () => {
      // Cleanup function to prevent state updates on an unmounted component
      mounted = false;
      controller.abort();
    };
  }, [url, time_window]);

  return { data, loading, error };
};

export default useFetchTrending;
