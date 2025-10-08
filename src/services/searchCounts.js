import { searchMulti } from './search';

/**
 * Fetch result counts for all filter types
 * @param {string} query - Search query string
 * @returns {Promise<Object>} Counts object with format { movie: 150, tv: 45, ... }
 */
export const fetchSearchCounts = async (query) => {
  // Return empty counts if query is empty
  if (!query || query.trim() === '') {
    return {};
  }

  const filterTypes = ['movie', 'tv', 'person', 'company', 'keyword', 'collection', 'network', 'award'];
  
  try {
    // Fetch counts for all filter types in parallel
    const promises = filterTypes.map(async (type) => {
      try {
        const data = await searchMulti(query, type, 1);
        return { type, count: data.total_results || 0 };
      } catch (error) {
        console.error(`Error fetching count for ${type}:`, error);
        return { type, count: 0 };
      }
    });

    const results = await Promise.all(promises);
    
    // Convert array to object
    const countsObject = results.reduce((acc, { type, count }) => {
      acc[type] = count;
      return acc;
    }, {});

    return countsObject;
  } catch (error) {
    console.error('Error fetching search counts:', error);
    return {};
  }
};
