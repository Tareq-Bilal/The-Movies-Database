import { useState, useEffect } from 'react';
import token from '../lib/config';

const useFetchTrendingMovies = (time_window = 'day') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/${time_window}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error(`TMDB error ${response.status}`);
        const json = await response.json();
        if (mounted) setTimeout(() => setData(json.results || []), 1000);
      } catch (err) {
        if (mounted) setTimeout(() => setError(err), 1000);
      } finally {
        if (mounted) setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchTrending();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [time_window]);

  return { data, loading, error };
};

export default useFetchTrendingMovies;
