import { API_TOKEN, BASE_URL } from './config';

/**
 * Base HTTP request function
 * @param {string} endpoint - API endpoint 
 * @returns {Promise<Object>} - Response data
 */
const httpRequest = async (endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    }
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('HTTP request failed:', error);
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
