import { useEffect, useState } from 'react';
import token from '../lib/config';
import { BASE_IMAGE_URL } from '../lib/config';

const url =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  },
};

export function useFetchPoster() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.results); // TMDB returns results array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return { data, loading, error };
}

// Get a random movie poster from the fetched data
export const getRandomPoster = (data) => {
  if (data && data.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return `${BASE_IMAGE_URL}${data[randomIndex].poster_path}`;
  }
  return '';
};
