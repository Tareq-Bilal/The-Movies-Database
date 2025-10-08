import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomDropdown.module.css';
import { FaChevronDown } from 'react-icons/fa';

const CustomDropdown = ({ options = [], value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.selectedText}>{selectedOption?.label}</span>
        <FaChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options
            .filter((option) => option.value !== value)
            .map((option) => (
              <button
                key={option.value}
                className={styles.dropdownItem}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={false}
              >
                {option.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
