import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSearchBar.module.css';

const HeroSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
          placeholder="Search..."
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
