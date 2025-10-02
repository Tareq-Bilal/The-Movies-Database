import { API_TOKEN } from './config';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || API_TOKEN;

/**
 * Fetch data from TMDB API
 * @param {string} endpoint - API endpoint (e.g., '/movie/popular')
 * @param {object} options - Additional fetch options
 * @returns {Promise<object>} - API response data
 */
export const fetchData = async (endpoint, options = {}) => {
  try {
    let url = endpoint;

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    // Use Bearer token if available, otherwise use API key
    if (ACCESS_TOKEN) {
      headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
      console.log('Using Bearer token authentication');
    } else if (API_KEY) {
      // Add API key to URL if no access token
      const separator = endpoint.includes('?') ? '&' : '?';
      url = `${endpoint}${separator}api_key=${API_KEY}`;
      console.log('Using API key authentication');
    } else {
      console.error('No API authentication configured!');
    }

    const fullUrl = `${BASE_URL}${url}`;
    console.log('Fetching:', fullUrl);

    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

/**
 * Fetch data with retry logic
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<object>} - API response data
 */
export const fetchWithRetry = async (endpoint, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchData(endpoint, options);
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
};

/**
 * Get full image URL from TMDB
 * @param {string} path - Image path from API
 * @param {string} size - Image size (e.g., 'w500', 'original')
 * @returns {string} - Full image URL
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export { BASE_URL, IMAGE_BASE_URL };
