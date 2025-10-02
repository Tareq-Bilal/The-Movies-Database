import useFetchTrending from '../hooks/useFetchTrending';
import { TRENDING_MOVIES_URL } from '../lib/config';
import { BASE_URL } from '../lib/api';

export const getTrendingMovies = async (time_window) => {
  try {
    const { data, error, isLoading } = await useFetchTrending(
      `${TRENDING_MOVIES_URL}${time_window}`
    );
    return { data, error, isLoading };
  } catch (err) {
    return { data: null, error: err, isLoading: false };
  }
};

export default { getTrendingMovies };
