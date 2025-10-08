import React, { useState, useRef, useEffect } from 'react';
import styles from './TrendingMoviesSlider.module.css';
import TrendingDropdownFilter from '../TrendingDropDownFilter/TrendingDropdownFilter';
import SliderCard from './../shared/SliderCard';
import FilterToggle from '../shared/FilterToggle';
import LoadingBar from '../layout/LoadingBar';
import { getTrendingMovies } from '../../services/movies';

const Slider = () => {
  const [activeFilter, setActiveFilter] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);

  const options = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
  ];

  // Fetch trending movies using the service
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Map filter to API time window
        const timeWindow = activeFilter === 'today' ? 'day' : 'week';
        const result = await getTrendingMovies(timeWindow);
        setData(result);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [activeFilter]);

  // Handle scroll to show/hide the blur overlay
  useEffect(() => {
    const sliderContainer = sliderRef.current;
    if (!sliderContainer) return;

    const handleScroll = () => {
      // If scrolled more than 10px, consider it scrolled
      setIsScrolled(sliderContainer.scrollLeft > 10);
    };

    sliderContainer.addEventListener('scroll', handleScroll);
    return () => sliderContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle filter change for both toggle and dropdown
  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  // Get trending movies from the fetched data
  const trendingData = data?.results || [];

  return (
    <div ref={wrapperRef} className={`${styles.sliderWrapper} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.filterContainer}>
        <div className={styles.filterLeft}>
          <span className={styles.sectionTitle}>Trending Movies</span>
          <div className={styles.filterDropdown}>
            <TrendingDropdownFilter
              options={options}
              value={activeFilter}
              onChange={handleFilterChange}
              className={styles.dropdownSelect}
            />
          </div>
          <FilterToggle 
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            options={options}
          />
        </div>
      </div>

      <div className={styles.sliderContainer} ref={sliderRef}>
        {loading && <LoadingBar isLoading={loading} />}
        <div className={`${styles.cardsSlider} ${loading ? styles.loading : ''}`}>
         {loading ? (
            <div className={styles.loadingState}></div>
          ) : error ? (
            <div className={styles.errorState}>Failed to load data</div>
          ) : trendingData.length === 0 ? (
            <div className={styles.placeholderCard}>No data</div>
          ) : (
            trendingData.map((movie) => (
              <SliderCard key={movie.id} data={movie} theme="light" />
            ))
          )}        
          </div>
      </div>
    </div>
  );
};

export default Slider;
