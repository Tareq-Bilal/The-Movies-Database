import React, { useState, useEffect, useRef } from 'react';
import TrendingListElement from './TrendingListElement';
import { IoMdSearch } from 'react-icons/io';
import styles from './TrendingList.module.css';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { getTrendingMovies } from '../../services/movies';
import { searchMovies } from '../../services/search';

const TrendingList = ({ query = '', onLoadingChange, show = false, onHide, searchBarRef }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);
  
  // Fetch movies based on search query
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      
      try {
        let data;
        if (query.trim()) {
          // Search movies when user types
          data = await searchMovies(query.trim());
        } else {
          // Show trending movies when no search
          data = await getTrendingMovies('day');
        }
        
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
        if (onLoadingChange) onLoadingChange(false);
      }
    };

    fetchMovies();
  }, [query, onLoadingChange]);

  const hasQuery = query.trim() !== '';
  const hasMovies = movies.length > 0;
  const displayMovies = movies.slice(0, 11);

  // Click outside to hide
  useEffect(() => {
    const handleClickOutside = (e) => {
      const outsideList = listRef.current && !listRef.current.contains(e.target);
      const outsideSearchBar = searchBarRef?.current && !searchBarRef.current.contains(e.target);
      
      if (outsideList && outsideSearchBar && onHide) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [show, onHide, searchBarRef]);

  if (!show) return null;

  return (
    <div ref={listRef} className={styles.trendingList}>
      {/* Show trending header only when no search query */}
      {!hasQuery && (
        <div className={styles.trendingListHeader}>
          <TrendingListElement
            title={<span style={{ fontSize: '1.2rem' }}>Trending</span>}
            icon={<FaArrowTrendUp size={18} />}
          />
        </div>
      )}

      {/* Show movie list */}
      {displayMovies.map((movie) => (
        <TrendingListElement
          key={movie.id}
          title={<span>{movie.title || movie.name}</span>}
          icon={<IoMdSearch size={15} />}
          searchQuery={movie.title || movie.name}
          onHide={onHide}
        />
      ))}

      {/* Show no results when searching but nothing found */}
      {!hasMovies && (
        <div className={styles.noResults}>
          <span>No Results</span>
        </div>
      )}
    </div>
  );
};

export default TrendingList;
