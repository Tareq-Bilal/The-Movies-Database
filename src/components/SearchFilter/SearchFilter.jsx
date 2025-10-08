import React from 'react';
import styles from './SearchFilter.module.css';

/**
 * SearchFilter Component - Displays filter options for search results
 */
const SearchFilter = ({
  filters = [],
  activeFilter = 'movie',
  onFilterChange,
}) => {
  const handleFilterClick = (filterId) => {
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Search Results</h2>
      </div>

      <div className={styles.filtersWrapper}>
        {/* Horizontal slider for desktop (1024+) */}
        <div className={styles.horizontalFilters}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => handleFilterClick(filter.id)}
              aria-label={`Filter by ${filter.label}`}
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>{filter.totalResults}</span>
            </button>
          ))}
        </div>

        {/* Vertical list for mobile/tablet (below 1024px) */}
        <div className={styles.verticalFilters}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterItem} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => handleFilterClick(filter.id)}
              aria-label={`Filter by ${filter.label}`}
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>{filter.totalResults}</span>

            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
