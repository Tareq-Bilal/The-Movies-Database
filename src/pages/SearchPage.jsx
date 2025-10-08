import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.css';
import SearchFilter from '../components/SearchFilter/SearchFilter';
import SearchingList from '../components/SearchList/SearchList';
import Pagination from '../components/Pagination/Pagination';
import { useSearch } from '../hooks/useSearch';
import { fetchSearchCounts } from '../services/searchCounts';
import SearchTip from '../components/SearchTip/SearchTip';

// Filter configuration
const FILTERS = [
  { id: 'movie', label: 'Movies' },
  { id: 'tv', label: 'TV Shows' },
  { id: 'person', label: 'People' },
  { id: 'company', label: 'Companies' },
  { id: 'keyword', label: 'Keywords' },
  { id: 'collection', label: 'Collections' },
  { id: 'network', label: 'Networks' },
  { id: 'award', label: 'Awards' }
];

const SearchingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get URL parameters
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  const filter = searchParams.get('filter') || 'movie';

  // Local state for active filter
  const [activeFilter, setActiveFilter] = useState(filter);
  const [counts, setCounts] = useState({});

  // Use custom search hook
  const { results, totalPages, isLoading, error } = useSearch(
    query,
    activeFilter,
    page
  );

  // Fetch counts for all filter types
  useEffect(() => {
    const loadCounts = async () => {
      if (query) {
        const searchCounts = await fetchSearchCounts(query);
        setCounts(searchCounts);
      } else {
        setCounts({});
      }
    };

    loadCounts();
  }, [query]);

  // Merge counts with filter configuration
  /*
   * Memoized version of the FILTERS array, enhanced with result counts for each filter.
   * The useMemo hook ensures that this value is only recomputed when the `counts` dependency changes,
   *preventing unnecessary re-renders of components that rely on this data.
  */
  
  const filtersWithCounts = useMemo(() => {
    return FILTERS.map(filter => ({
      ...filter,
      totalResults: counts[filter.id] || 0
    }));
  }, [counts]);

  // Update URL when filter changes
  useEffect(() => {
    if (query) {
      setSearchParams({
        query,
        filter: activeFilter,
        page: 1, // Reset to page 1 when filter changes
      });
    }
  }, [activeFilter]);

  // Sync activeFilter with URL parameter
  useEffect(() => {
    setActiveFilter(filter);
  }, [filter]);

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setSearchParams({
      query,
      filter: activeFilter,
      page: newPage,
    });
    
  };

  // Don't render if no query
  if (!query) {
    return (
      <div className={styles.noQuery}>
        <p>Enter a search query to see results</p>
      </div>
    );
  }

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>

        <div className={styles.filterListWrapper}>
          {/* Filter Sidebar */}

          <div className={styles.filterTipWrapper}>
          <SearchFilter
            filters={filtersWithCounts}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <SearchTip />
</div>
          {/* Results and Pagination */}
          <div className={styles.listPaginationWrapper}>
            <SearchingList
              results={results}
              loading={isLoading}
              error={error}
              filterType={activeFilter}
            />

            {/* Pagination */}
            {!isLoading && !error && results.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingPage;
