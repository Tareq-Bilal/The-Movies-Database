import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import styles from './TrendingListELement.module.css';

const TrendingListElement = ({ title, icon, onClick, searchQuery, onHide }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      // Hide the trending list after navigation
      if (onHide) {
        onHide();
      }
    }
  };

  return (
    <div className={styles.trendingListElement} onClick={handleClick}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default TrendingListElement;
