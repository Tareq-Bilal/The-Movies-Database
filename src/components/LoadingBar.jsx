import React from 'react';
import styles from './LoadingBar.module.css';

const LoadingBar = ({ isLoading }) => {
  console.log('LoadingBar - isLoading:', isLoading); // Debug log

  if (!isLoading) return null;

  return (
    <div className={styles.loadingBarContainer}>
      <div className={styles.loadingBar}></div>
    </div>
  );
};

export default LoadingBar;
