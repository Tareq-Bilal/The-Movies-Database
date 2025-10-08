import React from 'react';
import MovieSearchCard from './MovieSearchCard';
import Keyword from './Keyword';
import Company from './Company';
import Person from './Person';
import Network from './Network';
import styles from './SearchingList.module.css';

const SearchingList = ({
  results = [],
  loading = false,
  error = null,
  filterType = 'movies',
}) => {
  if (loading) {
    return (
      <div className={styles.searchingList}>
        <div className={styles.loadingMessage}>Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.searchingList}>
        <div className={styles.errorMessage}>Error: {error}</div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className={styles.searchingList}>
        <div className={styles.noResults}>No results found</div>
      </div>
    );
  }

  // Handle different result types
  const getItemData = (item) => {
    // For keywords, collections, and companies
    if (
      filterType === 'keywords' ||
      filterType === 'collections' ||
      filterType === 'companies'
    ) {
      return {
        title: item.name,
        original_title: null,
        release_date: null,
        poster_path: item.poster_path || item.logo_path || null,
        overview: null,
        knownForDepartment: null,
        knownForTitles: null,
      };
    }

    // For people - extract known_for titles
    if (filterType === 'people') {
      const knownForTitles = item.known_for
        ? item.known_for
            .map((work) => work.original_title || work.original_name)
            .filter(Boolean)
            .join(', ')
        : '';

      return {
        title: item.name,
        original_title: null,
        release_date: null,
        poster_path: item.profile_path,
        overview: null,
        knownForDepartment: item.known_for_department,
        knownForTitles: knownForTitles,
      };
    }

    // For movies, TV shows
    return {
      title: item.title || item.name,
      original_title: item.original_title || item.original_name,
      release_date: item.release_date || item.first_air_date,
      poster_path: item.poster_path || item.profile_path,
      overview: item.overview || item.known_for_department,
      knownForDepartment: null,
      knownForTitles: null,
    };
  };

  // Render keywords differently
  if (filterType === 'keywords') {
    return (
      <div className={styles.searchingList}>
        <div className={styles.keywordsContainer}>
          {results.map((item, index) => (
            <Keyword key={item.id || index} keyword={item.name} />
          ))}
        </div>
      </div>
    );
  }

  // Render companies differently
  if (filterType === 'companies') {
    return (
      <div className={styles.searchingList}>
        <div className={styles.companiesContainer}>
          {results.map((item, index) => (
            <Company key={item.id || index} company={item} />
          ))}
        </div>
      </div>
    );
  }

  // Render people differently
  if (filterType === 'people') {
    return (
      <div className={styles.searchingList}>
        <div className={styles.peopleContainer}>
          {results.map((item, index) => (
            <Person key={item.id || index} person={item} />
          ))}
        </div>
      </div>
    );
  }

  // Render networks differently
  if (filterType === 'networks') {
    return (
      <div className={styles.searchingList}>
        <div className={styles.networksContainer}>
          {results.map((item, index) => (
            <Network key={item.id || index} network={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.searchingList}>
      {results.map((item, index) => {
        const itemData = getItemData(item);
        return <MovieSearchCard key={item.id || index} {...itemData} />;
      })}
    </div>
  );
};

export default SearchingList;
