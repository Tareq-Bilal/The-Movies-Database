import React, { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { IoMdClose } from 'react-icons/io';

const SearchBar = forwardRef(({ onClick, isLoading = false, onSearch, value = '', onFocus, onEnter }, ref) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(value);
  const [placeholder, setPlaceholder] = useState('Search...');

  // Update placeholder based on screen size
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

  // Sync with external value prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Call search callback if provided
    if (onSearch) {
      onSearch(newValue);
    }
  };

  // Derived states from inputValue
  const hasValue = inputValue.trim() !== '';
  const showLoader = isLoading && hasValue;

  const handleInputClick = (e) => {
    // Prevent the section click from firing when clicking input
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const handleInputFocus = (e) => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && hasValue) {
      // Navigate to search page on Enter key press
      navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
      
      // Hide trending list
      if (onEnter) {
        onEnter();
      }
    }
  };

  return (
    <section ref={ref} className={styles.searchBar}>
      <button className={styles.searchButton}>
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
      />
      {hasValue ? (
        showLoader ? (
          <Loader2 className={styles.spin} size={20} />
        ) : (
          <button
            className={styles.clearButton}
            onClick={() => {
              setInputValue('');
              if (onSearch) {
                onSearch('');
              }
            }}
          >
            <IoMdClose />
          </button>
        )
      ) : null}
    </section>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
