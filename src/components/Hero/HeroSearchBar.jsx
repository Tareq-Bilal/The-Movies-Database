import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSearchBar.module.css';

const HeroSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder,setPlaceholder] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth >= 1024) {
        setPlaceholder('Search for a movie, tv show, person......');
      } else {
        setPlaceholder('Search...');
      }
    };

    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);
    return () => window.removeEventListener('resize', updatePlaceholder);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Only navigate if there's a search term
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HeroSearchBar;
