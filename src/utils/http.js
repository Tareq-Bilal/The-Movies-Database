import { API_TOKEN } from '../lib/config';
import { BASE_URL, IMAGE_BASE_URL } from '../lib/api';
// TMDB API base configuration

// Default request options
const defaultOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

/**
 * Generic HTTP request function
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Request options (method, headers, body, etc.)
 * @returns {Promise<Object>} - Response data
 */
export const httpRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('HTTP Request failed:', error);
    throw error;
  }
};

/**
 * GET request wrapper
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - Response data
 */
export const get = async (endpoint, params = {}) => {
  const urlParams = new URLSearchParams(params);
  const queryString = urlParams.toString();
  const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

  return httpRequest(fullEndpoint);
};
