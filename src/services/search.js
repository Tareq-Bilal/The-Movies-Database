import { get } from '../lib/http';

/**
 * Search across multiple content types
 * @param {string} query - Search query
 * @param {string} type - Type of content (movie, tv, person, multi)
 * @param {number} page - Page number
 * @returns {Promise<Object>} Search results
 */
export const searchMulti = async (query, type = 'movie', page = 1) => {
  if (!query || query.trim() === '') {
    return { results: [], total_pages: 0, total_results: 0 };
  }

  const endpoint = `/search/${type}`;
  
  try {
    const data = await get(endpoint, {
      query: query.trim(),
      page,
      include_adult: false,
    });
    
    return data;
  } catch (error) {
    console.error(`Error searching ${type}:`, error);
    throw error;
  }
};

/**
 * Search movies only
 */
export const searchMovies = (query, page = 1) => searchMulti(query, 'movie', page);

/**
 * Search TV shows only
 */
export const searchTV = (query, page = 1) => searchMulti(query, 'tv', page);

/**
 * Search people only
 */
export const searchPeople = (query, page = 1) => searchMulti(query, 'person', page);

/**
 * Search companies only
 */
export const searchCompanies = (query, page = 1) => searchMulti(query, 'company', page);

/**
 * Search keywords only
 */
export const searchKeywords = (query, page = 1) => searchMulti(query, 'keyword', page);

/** 
 * Search collections only
 */
export const searchCollections = (query, page = 1) => searchMulti(query, 'collection', page);

/** 
 * Search networks only
 */
export const searchNetworks = (query, page = 1) => searchMulti(query, 'network', page);

/**
 * Search awards only
 */
export const searchAwards = (query, page = 1) => searchMulti(query, 'award', page);

