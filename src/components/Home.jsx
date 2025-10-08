import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import LoadingBar from './LoadingBar';
import styles from './Home.module.css';
import Hero from './Hero';
import Slider from './Slider';
import useFetchTrending from '../hooks/useFetchTrending';
import useSearch from '../hooks/useSearch';
import TrendingList from './TrendingList';
import { useFetchPoster, getRandomPoster } from '../hooks/useFetchPoster';
import {
  TRENDING_MOVIES_URL,
  TRENDING_TV_URL,
  TRENDING_ALL_URL,
} from '../lib/config';
import Footer from './Footer';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrendingList, setShowTrendingList] = useState(false);
  // support separate filters for movies and tv sliders
  const [moviesWindow, setMoviesWindow] = useState('day');
  const [tvWindow, setTvWindow] = useState('day');
  const trendingListRef = useRef(null);
  const searchAreaRef = useRef(null);

  const moviesFetch = useFetchTrending(TRENDING_MOVIES_URL, moviesWindow);
  const tvFetch = useFetchTrending(TRENDING_TV_URL, tvWindow);
  const trendingList = useFetchTrending(TRENDING_ALL_URL, 'day');
  const searchResults = useSearch(searchQuery);
  // fetch a poster to use as a background image for sliders
  const { data: postersData = [] } = useFetchPoster();
  const sliderBackground =
    postersData && postersData.length > 0 ? getRandomPoster(postersData) : '';

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Show trending list when user starts typing or clear when empty
    setShowTrendingList(query.trim().length > 0);
  };

  const handleSearchClick = () => {
    // Show trending list when search button is clicked
    setShowTrendingList(true);
  };

  // Handle clicking outside the search area to hide trending list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target)
      ) {
        setShowTrendingList(false);
        setSearchQuery(''); // Also clear search query when clicking outside
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
    <div>
      <LoadingBar isLoading={isLoading} />
      <Navbar onSearchClick={handleSearchClick} />
      <div ref={searchAreaRef}>
        <SearchBar
          onSearch={handleSearch}
          onClick={handleSearchClick}
          isLoading={searchQuery ? searchResults.loading : trendingList.loading}
        />
        {showTrendingList && (
          <div ref={trendingListRef}>
            <TrendingList
              list={
                searchQuery && searchResults.data
                  ? searchResults.data.results
                  : trendingList.data
              }
              type={searchQuery ? 'search' : 'trending'}
              query={searchQuery}
              isLoading={
                searchQuery ? searchResults.loading : trendingList.loading
              }
            />
          </div>
        )}
      </div>
      <Hero
        title="Welcome."
        subtitle="Millions of movies, TV shows and people to discover. Explore now."
      />
      <Slider
        title="Trending Movies"
        onLoadingChange={handleLoadingChange}
        fetchResult={moviesFetch}
        activeFilter={moviesWindow === 'day' ? 'today' : 'week'}
        setActiveFilter={(val) =>
          setMoviesWindow(val === 'today' ? 'day' : 'week')
        }
      />
      <Slider
        title="Trending TV"
        onLoadingChange={handleLoadingChange}
        fetchResult={tvFetch}
        backgroundImage={sliderBackground}
        activeFilter={tvWindow === 'day' ? 'today' : 'week'}
        setActiveFilter={(val) => setTvWindow(val === 'today' ? 'day' : 'week')}
      />
      <Footer />
    </div>
  );
};

export default Home;
