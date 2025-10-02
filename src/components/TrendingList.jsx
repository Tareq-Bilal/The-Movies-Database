import React from 'react';
import TrendingListElement from './TrendingListElement';
import { IoMdSearch } from 'react-icons/io';
import styles from './TrendingList.module.css';
import { FaArrowTrendUp } from 'react-icons/fa6';

const TrendingList = ({
  list,
  type = 'trending',
  query = '',
  isLoading = false,
}) => {
  const isSearchResult = type === 'search';
  // Limit trending list to 12 items
  const displayList = list ? list.slice(0, 12) : [];

  return (
    <div className={styles.trendingList}>
      {!query && (
        <div className={styles.trendingListHeader}>
          <TrendingListElement
            title={<span style={{ fontSize: '1.2rem' }}>Trending</span>}
            icon={<FaArrowTrendUp size={18} />}
          />
        </div>
      )}
      {displayList &&
        displayList.map((item, index) => (
          <TrendingListElement
            key={index}
            title={<span>{item.title || item.name}</span>}
            icon={<IoMdSearch size={15} />}
            searchQuery={item.title || item.name}
          />
        ))}
      {isSearchResult &&
        query &&
        !isLoading &&
        (!list || list.length === 0) && (
          <div className={styles.noResults}>
            <span>No Results</span>
          </div>
        )}
    </div>
  );
};

export default TrendingList;
