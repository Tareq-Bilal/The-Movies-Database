import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchingList from '../components/SearchingList';
import SearchFilter from '../components/SearchFilter';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import TrendingList from '../components/TrendingList';
import Pagination from '../components/Pagination';
import useMultiSearch from '../hooks/useMultiSearch';
import useFetchTrending from '../hooks/useFetchTrending';
import { TRENDING_ALL_URL } from '../lib/config';
import styles from './SearchingPage.module.css';

const SearchingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('query') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  // Use 'a' as default search query if no query param
  const [searchQuery, setSearchQuery] = useState(queryParam || 'a');
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [activeFilter, setActiveFilter] = useState('movies');
  const [showTrendingList, setShowTrendingList] = useState(false);
  const searchAreaRef = useRef(null);

  const { results, counts, totalPages, loading, error } = useMultiSearch(
    searchQuery,
    currentPage
  );
  const trendingList = useFetchTrending(TRENDING_ALL_URL, 'day');

  useEffect(() => {
    // If no query param, set to 'a', otherwise use the query param
    setSearchQuery(queryParam || 'a');
    setCurrentPage(pageParam);
    setShowTrendingList(false);
  }, [queryParam, pageParam]);

  const handleSearch = (query) => {
    const searchTerm = query && query.trim() !== '' ? query : 'a';
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to page 1 on new search
    setShowTrendingList(false);

    if (query && query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}&page=1`);
    } else {
      // If empty, navigate to /search which will default to 'a'
      navigate('/search?page=1');
    }
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1); // Reset to page 1 when filter changes
    // Update URL with new page
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&page=1`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update URL with new page, preserving query
    navigate(`/search?query=${encodeURIComponent(searchQuery)}&page=${page}`);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    if (!searchQuery || searchQuery.trim() === '') {
      setShowTrendingList(true);
    }
  };

  // Handle clicking outside the search area to hide trending list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target)
      ) {
        setShowTrendingList(false);
      }
    };

    // Add event listener when trending list is shown
    if (showTrendingList) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTrendingList]);

  return (
    <>
      <Navbar />
      <div ref={searchAreaRef}>
        <SearchBar
          value={searchQuery}
          onSearch={handleSearch}
          onClick={handleSearchClick}
          isLoading={loading || trendingList.loading}
        />
        {showTrendingList && (
          <TrendingList
            list={trendingList.data}
            type="trending"
            isLoading={trendingList.loading}
          />
        )}
      </div>

      {searchQuery && (
        <div className={styles['filter-list-wrapper']}>
          <SearchFilter
            results={counts}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <div className={styles['list-pagination-wrapper']}>
            <SearchingList
              results={results[activeFilter] || []}
              loading={loading}
              error={error}
              filterType={activeFilter}
            />
            {!loading && !error && results[activeFilter]?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages[activeFilter] || 1}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchingPage;
