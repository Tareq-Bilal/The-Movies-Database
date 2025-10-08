import React, { useState, useRef, useEffect } from 'react';
import styles from './TrendingTvSlider.module.css';
import TrendingDropdownFilter from '../TrendingDropDownFilter/TrendingDropdownFilter';
import SliderCard from './../shared/SliderCard';
import FilterToggle from '../shared/FilterToggle';
import LoadingBar from '../layout/LoadingBar';
import { getTrendingTv } from '../../services/tv';
import { getMoviePoster } from '../../services/movies';

const Slider = () => {
  const [activeFilter, setActiveFilter] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);

  const options = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
  ];

  // Fetch background image on component mount
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const posterUrl = await getMoviePoster();
        setBackgroundImage(posterUrl);
      } catch (err) {
        console.error('Error fetching background image:', err);
      }
    };

    fetchBackgroundImage();
  }, []);

  // Fetch trending TV shows using the service
  useEffect(() => {
    const fetchTrendingTv = async () => {
      setLoading(true);
      setError(null);

      try {
        // Map filter to API time window
        const timeWindow = activeFilter === 'today' ? 'day' : 'week';
        const result = await getTrendingTv(timeWindow);
        setData(result);
      } catch (err) {
        console.error('Error fetching trending TV shows:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTv();
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

  // Get trending TV shows from the fetched data
  const trendingData = data?.results || [];

  return (
    <div
      ref={wrapperRef}
      className={`${styles.sliderWrapper} `}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(135deg, rgba(24, 110, 207, 0.9) 0%, rgba(10, 70, 129, 0.9) 30%, rgba(10, 70, 129, 0.9) 100%), url(${backgroundImage})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={styles.filterContainer}>
        <div className={styles.filterLeft}>
          <span className={styles.sectionTitle}>Trending TV</span>
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

      <div
        className={`${styles.sliderContainer} ${isScrolled ? styles.scrolled : ''}`}
        ref={sliderRef}
      >
        {loading && <LoadingBar isLoading={loading} />}
        <div
          className={`${styles.sliderCards} ${loading ? styles.loading : ''}`}
        >
          {loading ? (
            <div className={styles.loadingState}></div>
          ) : error ? (
            <div className={styles.errorState}>Failed to load data</div>
          ) : trendingData.length === 0 ? (
            <div className={styles.placeholderCard}>No data</div>
          ) : (
            trendingData.map((tvShow) => (
              <SliderCard key={tvShow.id} data={tvShow} theme="dark" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
