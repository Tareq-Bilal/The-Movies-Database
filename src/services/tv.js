import useFetchTrending from '../hooks/useFetchTrending';

export const getTrendingTV = (url, time_window) => {
  const { data, error, isLoading } = useFetchTrending(`${url}${time_window}`);
  return { data, error, isLoading };
};

export default { getTrendingTV };
