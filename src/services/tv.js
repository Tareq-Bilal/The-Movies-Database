import { get } from '../lib/http';
import { TRENDING_TV_URL } from '../lib/config';

export const getTrendingTv = async (timeWindow = 'day') => {
  try {
    const data = await get(`${TRENDING_TV_URL}/${timeWindow}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  getTrendingTv,
};