import React from 'react';
import styles from './FilterToggle.module.css';

const FilterToggle = ({ activeFilter, onFilterChange, options = [] }) => {
  return (
    <div className={styles.filterButtons}>
      <div className={styles.filterToggle}>
        {options.map((option) => (
          <button
            key={option.value}
            className={`${styles.filterBtn} ${activeFilter === option.value ? styles.active : ''}`}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
        <div className={styles.toggleBackground}></div>
      </div>
    </div>
  );
};

export default FilterToggle;