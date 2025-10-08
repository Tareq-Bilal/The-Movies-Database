import React from 'react';
import MovieSearchResult from '../MovieSearchResult/MovieSearchResult';
import TVSearchResult from '../TVSearchResult/TVSearchResult';
import Person from '../Person/Person';
import Company from '../Company/Company';
import Keyword from '../Keyword/Keyword';
import Collection from '../Collection/Collection';
import Network from '../Network/Network';
import Award from '../Award/Award';
import styles from './SearchList.module.css';

/**
 * Component map for different content types
 */
const COMPONENT_MAP = {
  movie: MovieSearchResult,
  tv: TVSearchResult,
  person: Person,
  company: Company,
  keyword: Keyword,
  collection: Collection,
  network: Network,
  award: Award,
};

/**
 * SearchList Component - Displays search results
 */
const SearchList = ({ results = [], loading = false, error = null, filterType = 'movie' }) => {
  // Loading state
  if (loading) {
    return (
      <div className={styles.searchList}>
        <div className={styles.loadingState}>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.searchList}>
        <div className={styles.errorState}>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (results.length === 0) {
    return (
      <div className={styles.searchList}>
        <div className={styles.emptyState}>
          <p>There are no {filterType}s that matched your query.</p>
        </div>
      </div>
    );
  }

  // Get the appropriate component for the filter type
  const ResultComponent = COMPONENT_MAP[filterType];

  // Render results
  return (
    <div className={styles.searchList}>
      {results.map((item) => (
        <ResultComponent key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchList;
