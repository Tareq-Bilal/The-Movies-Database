import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.module.css';
import CustomDropdown from './CustomDropdown';
import SliderCard from './SliderCard';

const Slider = ({
  title,
  onLoadingChange,
  fetchResult,
  activeFilter: activeFilterProp,
  setActiveFilter: setActiveFilterProp,
  backgroundImage = '',
}) => {
  const options = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
  ];

  // support lifting the filter state to the parent
  const [internalFilter, setInternalFilter] = useState('today');
  const activeFilter =
    typeof activeFilterProp !== 'undefined' ? activeFilterProp : internalFilter;

  const handleFilterChange = (value) => {
    if (typeof setActiveFilterProp === 'function') {
      setActiveFilterProp(value);
    } else {
      setInternalFilter(value);
    }
  };
  const [isAtStart, setIsAtStart] = useState(true);
  const sliderRef = useRef(null);

  const {
    data: trendingData = [],
    loading = false,
    error = null,
  } = typeof fetchResult !== 'undefined' ? fetchResult : {};

  // Maintain scroll position during filter changes
  useEffect(() => {
    if (sliderRef.current && !loading) {
      // Reset scroll to start when new data loads
      sliderRef.current.scrollLeft = 0;
      setIsAtStart(true);
    }
  }, [activeFilter, loading]);

  // Notify parent about loading state changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const scrollLeft = sliderRef.current.scrollLeft;
        setIsAtStart(scrollLeft === 0);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      className={`${styles.sliderWrapper} ${backgroundImage ? styles.hasBackground : ''}`}
    >
      <div
        className={`${styles.backgroundWrapper} ${backgroundImage ? styles.hasBackground : ''}`}
        style={
          backgroundImage ? { '--bg-image': `url(${backgroundImage})` } : {}
        }
      ></div>
      <div className={styles.filterContainer}>
        <div className={styles.filterLeft}>
          <span className={styles.sectionTitle}>{title}</span>
          <div className={styles.filterDropdown}>
            <CustomDropdown
              options={options}
              value={activeFilter}
              onChange={handleFilterChange}
              className={styles.dropdownSelect}
            />
          </div>
          <div className={styles.filterButtons}>
            {/* Toggle buttons for large desktop (1024px+) */}
            <div className={styles.filterToggle}>
              <button
                className={`${styles.filterBtn} ${activeFilter === 'today' ? styles.active : ''}`}
                onClick={() => handleFilterChange('today')}
              >
                Today
              </button>
              <button
                className={`${styles.filterBtn} ${activeFilter === 'week' ? styles.active : ''}`}
                onClick={() => handleFilterChange('week')}
              >
                This Week
              </button>
              <div className={styles.toggleBackground}></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.sliderContainer} ${isAtStart ? styles.showAfter : styles.hideAfter}`}
      >
        <div className={styles.cardsSlider} ref={sliderRef}>
          {/* Show empty state during loading */}
          {loading && <div className={styles.loadingState}>Loading ...</div>}
          {/* Show error state */}
          {!loading && error && (
            <div className={styles.errorState}>Failed to load data</div>
          )}
          {/* Show no data state */}
          {!loading && !error && trendingData.length === 0 && (
            <div className={styles.placeholderCard}>No data</div>
          )}
          {/* Show data when loaded */}
          {!loading &&
            !error &&
            trendingData.length > 0 &&
            trendingData.map((m) => (
              <SliderCard
                key={m.id}
                data={m}
                hasBackground={!!backgroundImage}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
