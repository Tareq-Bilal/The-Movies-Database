import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { Loader2 } from 'lucide-react';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ onClick, isLoading = false, onSearch, value = '' }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(
    !value || value.trim() === ''
  );

  // Sync with external value prop
  useEffect(() => {
    setInputValue(value);
    setIsSearchEmpty(!value || value.trim() === '');
  }, [value]);

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(true);
    setIsSearchEmpty(newValue.trim() === '');

    // Call search callback if provided
    if (onSearch) {
      onSearch(newValue);
    }

    // Clear previous timeout
    if (handleInputChange.timeoutId) {
      clearTimeout(handleInputChange.timeoutId);
    }

    // Set new timeout to stop loading after user stops typing
    handleInputChange.timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 800); // Stop loading 800ms after user stops typing
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (handleInputChange.timeoutId) {
        clearTimeout(handleInputChange.timeoutId);
      }
    };
  }, []);

  const showLoader = isLoading || isTyping;

  const handleInputClick = (e) => {
    // Prevent the section click from firing when clicking input
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // Navigate to search page on Enter key press
      navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <section className={styles.searchBar} onClick={onClick}>
      <button className={styles.searchButton}>
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      {!isSearchEmpty && !isTyping ? (
        <button
          className={styles.clearButton}
          onClick={() => {
            setInputValue('');
            setIsSearchEmpty(true);
            if (onSearch) {
              onSearch('');
            }
          }}
        >
          <IoMdClose />
        </button>
      ) : (
        showLoader && <Loader2 className={styles.spin} size={20} />
      )}
    </section>
  );
};

export default SearchBar;
