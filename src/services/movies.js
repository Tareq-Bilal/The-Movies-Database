import { get } from '../lib/http';
import { 
  TRENDING_MOVIES_URL, 
  POPULAR_MOVIES_URL,
  BASE_IMAGE_URL
} from '../lib/config';

// Get trending movies
export const getTrendingMovies = async (timeWindow = 'day') => {
  try {
    const data = await get(`${TRENDING_MOVIES_URL}/${timeWindow}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMoviePoster = async () => {
  try {
    // Fetch first page of popular movies
    const data = await get(POPULAR_MOVIES_URL, { page: 1 });
    
    // Get random movie from results
    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
      
      // Return the full poster URL if poster_path exists
      if (randomMovie.poster_path) {
        return `${BASE_IMAGE_URL}${randomMovie.poster_path}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching movie poster:', error);
    throw error;
  }
};


export default {
  getTrendingMovies,
};
