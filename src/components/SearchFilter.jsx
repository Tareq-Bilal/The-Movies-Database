import React, { useState } from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({
  results = {},
  onFilterChange,
  activeFilter = 'movies',
}) => {
  const filters = [
    { id: 'movies', label: 'Movies', count: results.movies || 0 },
    { id: 'tv', label: 'TV Shows', count: results.tv || 0 },
    { id: 'people', label: 'People', count: results.people || 0 },
    { id: 'keywords', label: 'Keywords', count: results.keywords || 0 },
    {
      id: 'collections',
      label: 'Collections',
      count: results.collections || 0,
    },
    { id: 'companies', label: 'Companies', count: results.companies || 0 },
    { id: 'networks', label: 'Networks', count: results.networks || 0 },
    { id: 'awards', label: 'Awards', count: results.awards || 0 },
  ];

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
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>{filter.count}</span>
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
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>{filter.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
